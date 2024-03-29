<template>
  <div id="photos-wrap">
    <transition name="fade">
      <div class="loading-wrap" v-show="getIsLoadingPhotos">
        <skeleton-loading v-for="block in getBlocks" :size="block.size" :isStopAnimation="isStopAnimation"></skeleton-loading>
      </div>
    </transition>
    <transition name="fade">
      <div class="photo-wrap" v-show="!getIsLoadingPhotos">
        <!-- https://github.com/xieranmaya/blog/issues/6 -->
        <div class="photo" v-for="imgData, index in imgDataArray" :key="imgData" :style="{'width': imgData.size.width * 200 / imgData.size.height + 'px', 'flex-grow': imgData.size.width * 200 / imgData.size.height}">
          <tooltip v-if="(index == 0) && (getIsCompletedSubmit)" style="
            top: -2.4em;
            left: 50%;
            bottom: 0px;
            width: 400px;
            height: 50px;
            font-size: 1.7em;
            line-height: 1.2;
            background-color: #55a465;
            border-radius: 13px 13px 13px 0px;
            transform: scale(0);
            transition: all 0.05s cubic-bezier(0.69, 1.1, 0.54, 1.17) 0.13s, opacity 0.3s ease-in-out;
            cursor: default;
            opacity: 1;
            z-index: 1;
          " id="complete-submit">
            This is the photo of Nyanko🐱 you just posted!<br>Thank you!
          </tooltip>
          <i :style="{'padding-bottom': imgData.size.height / imgData.size.width * 100 + '%'}"></i>
          <img :src="imgData.src" :alt="imgData.title" @click="onClickPhoto(index)" @load="loaded(index)" crossorigin="Anonymous"/>
          <div class="download">
            <button @click="onClickDownload(imgData.src)">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	 viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
              <path d="M382.56,233.376C379.968,227.648,374.272,224,368,224h-64V16c0-8.832-7.168-16-16-16h-64c-8.832,0-16,7.168-16,16v208h-64 c-6.272,0-11.968,3.68-14.56,9.376c-2.624,5.728-1.6,12.416,2.528,17.152l112,128c3.04,3.488,7.424,5.472,12.032,5.472 c4.608,0,8.992-2.016,12.032-5.472l112-128C384.192,245.824,385.152,239.104,382.56,233.376z"/>
              <path d="M432,352v96H80v-96H16v128c0,17.696,14.336,32,32,32h416c17.696,0,32-14.304,32-32V352H432z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
  <transition name="popup">
    <alert-box v-if="isShownAlert" class="load">
      Something went wrong. Please reload the page.
    </alert-box>
  </transition>
</template>

<script>
import Spotlight from "spotlight.js/src/js/spotlight.js";
import SkeletonLoading from "@/components/SkeletonLoading.vue";
import AlertBox from "@/components/AlertBox.vue";
import Tooltip from "@/components/Tooltip.vue";
import { shuffle } from "@/utils/util.js";
import { getImagesAPI } from "@/utils/util.js";
export default {
  data() {
    return {
      imgDataArray: [],
      isLoadedImages: [],
      isStopAnimation: false,
      isShownAlert: false,
    };
  },
  created() {
    (async () => {
      try {
        await this.getImages();
      } catch (e) {
        this.isStopAnimation = true;
        this.isShownAlert = true;
        return;
      }
    }) ();
  },
  watch: {
    isLoadedImages() {
      if (this.isLoadedImages.length === this.imgDataArray.length) {
        this.$store.commit("changeIsLoadingPhotos", false);
        scrollTop();
      }
    },
    newRandom(imgDataArrayState) {
      this.$store.commit("changeIsLoadingPhotos", true);
      this.isLoadedImages = [];  // init
      this.imgDataArray = [];  // init
      this.makeImageDataArray(imgDataArrayState);
    },
  },
  methods: {
    loaded(index) {
      // init
      const removeDuplicateValues = ([...array]) => {
        return array.filter((value, index, self) => self.indexOf(value) === index);
      }
      removeDuplicateValues(this.isLoadedImages);

      // for reactive trigger...
      this.isLoadedImages = this.isLoadedImages.concat([index]);
    },
    onClickPhoto(index) {
      // https://github.com/nextapps-de/spotlight
      Spotlight.show(this.imgDataArray, {
        index: index + 1,
        animation: "slide, fade",  //"play"
        control: "zoom, close",
        title: false,
        // play: 3,  bug (http://github.com/nextapps-de/spotlight/issues/49)
        onshow: (index) => {
          Spotlight.addControl("download-button", (event) => {
            execDownload(this.imgDataArray[index - 1].src);
          });
        },
        onclose: () => {
          Spotlight.removeControl("download-button");
        },
      });
    },
    onClickDownload(url) {
      execDownload(url);
    },
    async getImages() { 
      try {
        this.$store.state.imgDataArrayState = shuffle(await getImagesAPI());
      } catch (e) {
        throw e;
      }
      this.makeImageDataArray(this.$store.state.imgDataArrayState);
    },
    makeImageDataArray(images) {
      for (const image of images) {
        this.imgDataArray.push({
          src: makeS3Url(image.file_id),  // for spotlight too
          title: makeFileName(image.file_id),
          size: {
            width: image.size.width,
            height: image.size.height,
          }
        });
      }
    },
  },
  computed: {
    getBlocks() {
      return this.$store.getters.getBlocks;
    },
    newRandom() {
      return this.$store.state.imgDataArrayState;
    },
    getIsLoadingPhotos() {
      return this.$store.state.isLoadingPhotos;
    },
    getIsCompletedSubmit() {
      return this.$store.state.isCompletedSubmit;
    },
  },
  components: {
    SkeletonLoading,
    AlertBox,
    Tooltip,
  }
};

function makeS3Url(fileId) {
  return process.env.VUE_APP_S3_BUCKET_URL + fileId + ".jpg";
}

function makeFileName(fileId) {
  const [, piece] = /([0-9a-f]{8})-.*?$/gmi.exec(fileId);
  return "YourCat_Photo_" + piece;
}

async function execDownload(url) {
  const a = document.createElement("a");
  document.body.appendChild(a);
  const [, piece, ext] = /.*\/([0-9a-f]{8})-.*?(\..*)$/gmi.exec(url);
  a.download = "YourCat_Photo_" + piece + ext;
  const img = document.createElement("img");
  img.src = url;
  img.crossOrigin = "Anonymous";
  a.href = await encodeImgToBase64(img);
  a.click();
  a.remove();
}

function encodeImgToBase64(img) {
  return new Promise(async (resolve) => {
    const canvas = document.createElement("canvas");
    img.onload = () => {
      canvas.width  = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/jpeg"));
    };
  });
}

function scrollTop(){
  if(document.scrollingElement.scrollTop < 10){
    document.scrollingElement.scrollTop = 0;
  }
  else{
    document.scrollingElement.scrollTop = document.scrollingElement.scrollTop / 1.333;
    setTimeout(scrollTop , 10);
  }
}
</script>

<style lang="scss" scoped>
.photo-wrap, .loading-wrap {
  position: relative;
  // column-count: 3;
  // column-gap: 0.7%;
  display: flex;
  flex-wrap: wrap;
  // &::after {
  //   content: '';
  //   flex-grow: 999999999;
  // }
}
.photo {
  position: relative;
  flex-grow: 1;
  margin: 5px;
  cursor: pointer;
  &:hover > .download{
    display: block;
  }
  @include mobile {
    .tooltip {
      top: -2.7em !important;
      left: 0 !important;
      right: 0 !important;
      width: auto !important;
      max-width: 100% !important;
      border-radius: 13px !important;
    }
  }
}
i {
  display: block;
}
img {
  position: absolute;
  top: 0;
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  flex-grow: 1;
  object-fit: cover;
  vertical-align: bottom;
  border-radius: 3px;
  box-sizing: border-box;
  box-shadow: 1px 1px 2px 0px rgb(13 13 13 / 31%);
}
.download {
  display: none;
  position: absolute;
  top: 7px;
  right: 9px;
  button {
    width: 44.444px;
    height: 33.333px;
    padding: 5px 13px 3px;
    border: 0;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: 0.07s all ease-in-out;
    svg {
      fill: #e1e1e1;
      transition: 0.07s all ease-out;
    }
  }
  &:hover {
    display: block;
    & > button {
      background-color: rgba(0, 0, 0, 0.67);
      & > svg {
        fill: #ffffff;
      }
    }
  }
}
.load {
  position: fixed !important;
  bottom: 3em !important;
  left: 3em !important;
  padding: 1.25em 1.7em 1.2em !important;
  font-size: 1.03em !important;
  box-shadow: 1px 1px 3px 1px rgb(0 0 0 / 13%) !important;
}
.tooltip::before{
  top: 50px !important;
  left: 5.5px !important;
  border: solid 11px transparent !important;
  border-top: solid 11px #55a465 !important;
  border-left: solid 0px transparent !important;
  @include mobile {
    left: 50% !important;
    border-left: solid 11px transparent !important;
  }
}
</style>
<style lang="scss" >
#spotlight {
  background-color: #1f1a17f2 !important;
  .spl-title {
    display: none !important;  // temporary
  }
}
.spl-fullscreen {
  display: none !important;
}
.spl-download-button{
  background-size: 17.5px !important;
  padding-top: 1.777px;
  background-image: url("data:image/svg+xml;base64,  PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIGZpbGw9IiNmZmZmZmYiPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik0zODIuNTYsMjMzLjM3NkMzNzkuOTY4LDIyNy42NDgsMzc0LjI3MiwyMjQsMzY4LDIyNGgtNjRWMTZjMC04LjgzMi03LjE2OC0xNi0xNi0xNmgtNjRjLTguODMyLDAtMTYsNy4xNjgtMTYsMTZ2MjA4aC02NA0KCQkJYy02LjI3MiwwLTExLjk2OCwzLjY4LTE0LjU2LDkuMzc2Yy0yLjYyNCw1LjcyOC0xLjYsMTIuNDE2LDIuNTI4LDE3LjE1MmwxMTIsMTI4YzMuMDQsMy40ODgsNy40MjQsNS40NzIsMTIuMDMyLDUuNDcyDQoJCQljNC42MDgsMCw4Ljk5Mi0yLjAxNiwxMi4wMzItNS40NzJsMTEyLTEyOEMzODQuMTkyLDI0NS44MjQsMzg1LjE1MiwyMzkuMTA0LDM4Mi41NiwyMzMuMzc2eiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNNDMyLDM1MnY5Nkg4MHYtOTZIMTZ2MTI4YzAsMTcuNjk2LDE0LjMzNiwzMiwzMiwzMmg0MTZjMTcuNjk2LDAsMzItMTQuMzA0LDMyLTMyVjM1Mkg0MzJ6Ii8+DQoJPC9nPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=");
}
</style>
