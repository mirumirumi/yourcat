<template>
  <div id="photos-wrap">
    <div class="photo" v-for="imgData in imgDataArray" :key="imgData">
      <!-- <a :href="imgData.url" class="spotlight"> -->
        <img :src="imgData.url" :alt="imgData.title" crossorigin="Anonymous" />
      <!-- </a> -->
      <div class="download">
        <button @click="onClickDownload(imgData.url)">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	 viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
              <path d="M382.56,233.376C379.968,227.648,374.272,224,368,224h-64V16c0-8.832-7.168-16-16-16h-64c-8.832,0-16,7.168-16,16v208h-64 c-6.272,0-11.968,3.68-14.56,9.376c-2.624,5.728-1.6,12.416,2.528,17.152l112,128c3.04,3.488,7.424,5.472,12.032,5.472 c4.608,0,8.992-2.016,12.032-5.472l112-128C384.192,245.824,385.152,239.104,382.56,233.376z"/>
              <path d="M432,352v96H80v-96H16v128c0,17.696,14.336,32,32,32h416c17.696,0,32-14.304,32-32V352H432z"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { apiKey } from "@/utils/secret.js";
import Spotlight from "spotlight.js/src/js/spotlight.js";
// import baguetteBox from "baguettebox.js";
export default {
  data() {
    return {
      imgDataArray: [],
      index: null,
    };
  },
  created() {
    this.getImgDataArray();
  },
  mounted() {
// window.addEventListener("load", () => {
//   baguetteBox.run("#photos-wrap", {
//     "captions": false,
//     "overlayBackgroundColor": "rgb(36,33,32,0.87)",
//   });
// });
  },
  methods: {
    onClickDownload(url) {
      execDownload(url);
    },
    async getImgDataArray() { 
      try {
        this.$store.state.filepathArray = await getImages();
      } catch (e) {



        return;
      }
      for (const imgData of this.$store.getters.sortOnceRandomOrder) {
        this.imgDataArray.push({
          url: makeS3Url(imgData),
          title: makeFileName(imgData),
        });
      }
    },
  },
  components: {

  }
};

function getImages() {
  return new Promise(async (resolve) => {
    let result = [];
    try {
      const res = await axios.get(
        process.env.VUE_APP_API_ENDPOINT + "get-image", {
          headers: {
            "x-api-key": apiKey,
          }
        },
      );
      result = res.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
    resolve(result);
  });
}

function makeS3Url(idArray) {
  return process.env.VUE_APP_S3_BUCKET_URL + idArray + ".jpg";
}

function makeFileName(path) {
  const [, piece] = /([0-9a-f]{8})-.*?$/gmi.exec(path);
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
</script>

<style lang="scss" scoped>
#photos-wrap {
  column-count: 3;
  column-gap: 0.7%;
}
.photo {
  position: relative;
  // margin-bottom: 2.3%;
  margin-bottom: 1.3%;
  a {
    display: block;
    &:hover + div{
      display: block;
    }
  }
}
img {
  width: 100%;
  // vertical-align: middle;
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
</style>


