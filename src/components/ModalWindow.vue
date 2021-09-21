<template>
  <div class="modal-wrap">
    <div class="image-form">
      <label v-if="getIsNotExistFile" for="img" class="choose-image">
        <span class="plus">+</span>
      </label>
      <transition name="popup-delay">
        <alert-box v-if="getIsOverLimit" >
          Oops, the file size must be 5MB or less!
        </alert-box>
      </transition>
      <div ref="preview" id="preview-wrap">
        <label v-show="!getIsNotExistFile" for="img" class="change-image">
          <svg height="512pt" viewBox="-32 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
            <path d="m235.605469 203.519531v25.742188c0 8.175781 1.632812 15.035156 4.855469 20.378906 4.445312 7.375 11.742187 11.601563 20.027343 11.601563 8.117188 0 16.183594-3.953126 23.972657-11.742188l85.023437-85.023438c18.667969-18.667968 18.667969-49.042968 0-67.710937l-85.023437-85.023437c-7.789063-7.792969-15.855469-11.742188-23.972657-11.742188-12.386719 0-24.882812 9.890625-24.882812 31.980469v23.378906c-120.710938 7.128906-220.640625 99.765625-235.492188 221.050781-.832031 6.773438 3.019531 13.257813 9.367188 15.769532 1.796875.710937 3.667969 1.054687 5.515625 1.054687 4.679687 0 9.21875-2.191406 12.109375-6.140625 39.835937-54.429688 103.796875-86.925781 171.09375-86.925781 12.46875 0 25.007812 1.125 37.40625 3.351562zm0 0"/>
            <path d="m438.253906 219.820312c-6.347656-2.515624-13.589844-.421874-17.625 5.089844-39.832031 54.425782-103.792968 86.921875-171.089844 86.921875-12.46875 0-25.007812-1.125-37.40625-3.351562v-25.742188c0-22.089843-12.5-31.980469-24.882812-31.980469-8.117188 0-16.183594 3.953126-23.976562 11.746094l-85.023438 85.019532c-18.664062 18.667968-18.664062 49.042968.003906 67.714843l85.019532 85.019531c7.792968 7.792969 15.859374 11.742188 23.976562 11.742188 12.382812 0 24.882812-9.890625 24.882812-31.980469v-23.378906c120.714844-7.128906 220.640626-99.765625 235.492188-221.046875.832031-6.777344-3.019531-13.261719-9.371094-15.773438zm0 0"/>
          </svg>
          <tooltip :type="'hover'" style="bottom: 47px; right: calc(-133px / 2 - -50px / 2);">
            Change the Photo📸
          </tooltip>
        </label>
      </div>
      <input @change="onFileSelect()" ref="fileInput" id="img" type="file" accept="image/jpeg, image/png, image/gif" style="display: none;">
    </div>
    <div class="progress-wrap">
      <div class="items">
        <progress-box class="is-selected-a-photo current" :isFileSelected="getIsFileSelected">
          Click above "+" area to select a photo
        </progress-box>
        <progress-box class="is-the-cat" :apiStatus="getApiCatStatus" :isGoTooltip="getIsGoTooltip">
          We're checking to see if that's a Nyanko<span class="emoji">🐱</span> in this picture...
        </progress-box>
        <progress-box class="is-accepted" :apiStatus="getIsAcceptedStatus">
          We expect you to agree to the terms of use below...
        </progress-box>
      </div>
    </div>
    <div class="accept-box">
      <label for="accept" @click="falseIsShownAlert(); enableSubmitButton()">
        <input type="checkbox" id="accept" v-model="isCheckedAcceptData">
        <span class="checkbox"></span>
        <span class="content">I agree to the <router-link to="/privacy">Privacy Policy</router-link> and <router-link to="/license">License Statement</router-link> by submitting this image file.</span>
      </label>
    </div>
    <transition name="popup">
      <alert-box v-show="getIsShownAlert" class="accept">
        Please accept privacy policy and license statement.
      </alert-box>
    </transition>
    <div class="btn-wrap">
      <button id="submit" @click="onClickSubmit()" :disabled="getSubmitDisabled">
        <load-spinner v-if="getIsSubmitting" :color="'#ffffff'" :strokeWidth="5" style="flex-grow: 1;"></load-spinner>
        <span v-else style="flex-grow: 1;">Submit !</span>
      </button>
      <button id="cancel" @click="cancel()">Cancel</button>
    </div>
  </div>
</template>

<script>
import AlertBox from "@/components/AlertBox.vue";
import ProgressBox from "@/components/ProgressBox.vue";
import LoadSpinner from "@/components/LoadSpinner.vue";
import Tooltip from "@/components/Tooltip.vue";
import ModalClose from "@/mixin/modal-close.js";
import StateReset from "@/mixin/state-reset.js";
import { toggleTimelineCurrentClass } from "@/utils/util.js";
import { delay } from "@/utils/util.js";
import { removeExif } from "@/utils/util.js";
import { getImageFileType } from "@/utils/util.js";
import { apiKey } from "@/utils/secret.js";
const timeToDrawCheckmark = 1333;
export default {
  mixins: [
    ModalClose,
    StateReset,
  ],
  created() {
    close: {
      document.addEventListener("keydown", (e) => {
        if (e.keyCode === 27 && this.$store.state.isModalOpen) {
          this.todoCloseModal();
        }
      });
    }
  },
  data() {
    return {
      isCheckedAcceptData: false,
      imgB64: "",
    };
  },
  methods: {
    async onFileSelect() {
      // init for previous img file reset
      this.todoFileChanged();

      // delete previous preview thumb
      const img = document.getElementById("preview-image");
      const file = this.$refs.fileInput.files[0];
      this.imgB64 = "";
      if (img) img.remove();
      if (!file) {
        this.$store.commit("changeIsNotExistFile", true);
        return;
      }

      // read files and size check
      if (isOverSizeLimit(file)) {
        this.$store.commit("changeIsOverLimit", true);
        this.$refs.fileInput.value = '';
        return;
      }
      this.$store.commit("changeIsOverLimit", false);
      this.$store.commit("changeIsNotExistFile", false);

      // remove EXIF data
      const imageType = await getImageFileType(file);
      let blob;
      if (imageType === "JPG") {
        blob = await removeExif(file);
      } else {
        blob = file;  // for arg1 of makePreviewFile()
      }

      // preview thumb & get base64
      const target = this.$refs.preview;
      this.imgB64 = await makePreviewFile(blob, target);

      // trigger file selected
      this.$store.commit("changeIsFileSelected", true);
      await delay(timeToDrawCheckmark);
      toggleTimelineCurrentClass("is-the-cat");
      this.$store.commit("changeApiCatStatus", "start");

      // check API (is-the-cat)
      this.axios.post(
        "https://kkqe8obe2i.execute-api.ap-northeast-1.amazonaws.com/yourcat-dev-apis/is-the-cat", {
          img: this.imgB64,
        }, {
          headers: {
            "x-api-key": apiKey,
          }
        },
      ).then(async (res) => {
        // console.log(res.data);
        if (res.data.cat.judge) {  // cat!
          this.$store.commit("changeApiCatStatus", "succeeded");
          drawBoundingBox(res.data.cat.bounding_box, target);

          await delay(timeToDrawCheckmark);
          toggleTimelineCurrentClass("is-accepted");
          this.$store.commit("changeIsAccpetedStatus", "start");

          if (this.isCheckedAcceptData) {
            this.enableSubmitButton();
          }
        } else if (res.data.dog.judge) {  // dog!
          drawBoundingBox(res.data.dog.bounding_box, target);
          this.APIFailed("failed-dog");
        } else {  // no!
          this.APIFailed("failed");
        }
      }).catch(async (error) => {
        console.log(error);
        this.APIFailed("error");
      });
    },
    // when api result is failure
    async APIFailed(result) {
      this.$store.commit("changeApiCatStatus", result);
      await delay(555);
      this.$store.commit("changeIsGoTooltip", true);
    },
    onClickSubmit() {
      // validation
      if (!this.isCheckedAcceptData) {
        this.$store.commit("changeIsShownAlert", true);
      }

      // spinner
      this.$store.commit("changeIsSubmitting", true);

      // submit
      this.axios.post(
        "https://kkqe8obe2i.execute-api.ap-northeast-1.amazonaws.com/yourcat-dev-apis/post-image", {
          img: this.imgB64,
        }, {
          headers: {
            "x-api-key": apiKey,
          }
        },
      ).then(async (res) => {
        // console.log(res.data);
        // spinner
        this.$store.commit("changeIsSubmitting", false);

        const uuid_regexp = new RegExp(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}(\..*)$/, "gmi");
      }).catch(async (error) => {
        console.log(error);
        // spinner
        this.$store.commit("changeIsSubmitting", false);


        return;
      });

      // modal on


    },
    cancel() {
      this.todoCloseModal();
    },
    falseIsShownAlert() {
      this.$store.commit("changeIsShownAlert", false);
    },
    enableSubmitButton() {
      if (this.$store.state.apiCatStatus === "succeeded") {
        this.$store.commit("changeSubmitDisabled", false);
        this.$store.commit("changeIsAccpetedStatus", "succeeded");
      }
    },
  },
  computed: {
    getIsNotExistFile() {
      return this.$store.state.isNotExistFile;
    },
    getIsOverLimit() {
      return this.$store.state.isOverLimit;
    },
    getIsShownAlert() {
      return this.$store.state.isShownAlert;
    },
    getIsFileSelected() {
      return this.$store.state.isFileSelected;
    },
    getApiCatStatus() {
      return this.$store.state.apiCatStatus;
    },
    getIsAcceptedStatus() {
      return this.$store.state.isAcceptedStatus;
    },
    getSubmitDisabled() {
      return this.$store.state.submitDisabled;
    },
    getIsGoTooltip() {
      return this.$store.state.isGoTooltip;
    },
    getIsSubmitting() {
      return this.$store.state.isSubmitting;
    },
  },
  components: {
    AlertBox,
    ProgressBox,
    LoadSpinner,
    Tooltip,
  },
}

function isOverSizeLimit(file) {
  const sizeLimit = 1024 * 1024 * 5;  //5MB
  return sizeLimit < file.size;
}

async function makePreviewFile(file, target) {
  const imgB64 = await fileReader(file, target);
  return imgB64;

  function fileReader(file, target) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        const img = document.createElement("img");
        img.src = imageUrl;
        img.id = "preview-image";
        img.style.maxWidth = "100%";
        img.style.maxHeight = "300px";
        img.style.boxSizing = "border-box";
        img.style.border = "5.7px solid #ebded3";
        img.style.borderRadius = "7px";
        img.style.opacity = "0";
        img.style.transition = "0.23s all ease-out";
        target.appendChild(img);
        setTimeout(() => {
          img.style.opacity = "1";
          resolve(reader.result);
        }, 33.3);
      }
    });
  }
}

function encodeImgToBase64(img) {
  const canvas = document.createElement("canvas");
  canvas.width  = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  return canvas.toDataURL("image/jpeg");
}

function drawBoundingBox(boundingBoxArray, target) {
  for (let box of boundingBoxArray) {
    const boxElem = document.createElement("div");
    boxElem.className = "bounding-box"
    boxElem.style.position = "absolute";
    boxElem.style.border = "3.3px dashed rgb(237 128 68 / 77.7%)";
    boxElem.style.borderRadius = "9px";
    boxElem.style.width = box.width * 100 + "%";
    boxElem.style.height = box.height * 100 + "%";
    boxElem.style.left = box.left * 100 + "%";
    boxElem.style.top = box.top * 100 + "%";
    boxElem.style.zIndex = "2";
    boxElem.style.transform = "scale(0)";
    boxElem.style.transition="0.23s all cubic-bezier(.69,1.1,.54,1.17)";
    target.appendChild(boxElem);
    setTimeout(() => {
      boxElem.style.transform = "scale(1)";
    }, 33.3);
  }
}
</script>

<style lang="scss" scoped>
.modal-wrap {
  position: fixed;
  top: 48%;
  left: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1.1em 7em 1.1em;
  width: 567px;
  background-color: #fdf6f1;
  border-radius: 11px;
  box-shadow: 1px 2px 7px 1px rgb(13 13 13 / 29%);
  transform: translate(-50%, -50%);
  z-index: 3;
  & > * {
    margin: 1em auto;
  }
}
.image-form{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span.title {
    margin-bottom: 1.7em;
    font-size: 1.333em;
    font-weight: bold;
  }
  label.choose-image {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 170px;
    height: 160px;
    border: dashed 3.777px #d5b08b;
    border-radius: 9px;
    cursor: pointer;
    span.plus {
      color: #d5b08b;
      font-size: 40px;
    }
  }
}
</style>
<style lang="scss">
div#preview-wrap {
  position: relative;
  label.change-image {
    display: none;
    position: absolute;
    width: 50px;
    height: 40px;
    top: 13px;
    right: 15px;
    border: 0;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: 0.07s all ease-in-out;
    svg {
      position: absolute;
      width: 25px;
      height: 25px;
      top: 50%;
      left: 50%;
      fill: #e1e1e1;
      transform: translate(-50%,-50%);
      transition: 0.07s all ease-out;
    }
  }
  &:hover > label {
    display: block;
    &:hover {
      background-color: rgba(0, 0, 0, 0.67);
      svg {
      fill: #ffffff;
      }
      .tooltip {
        transform: scale(1);
        transition: all 0.05s cubic-bezier(.69,1.1,.54,1.17) 0.7s;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.progress-wrap {
  margin: 0.3em auto 0.7em;
}
.items > div {
  position: relative;
}
.items > div::before {
  content: "";
  width: 16px;
  height: 16px;
  // background-color: #c4dde6;
  background-color: #f1dacb;
  border: solid 3px #fdf6f1;
  box-sizing: border-box;
  border-radius: 50%;
  transition: 0.37s all ease-out;
}
.items > div::after {
  content: "";
  position: absolute;
  bottom: -12.1px;
  left: 7px;
  width: 2px;
  height: 16px;
  // background-color: #cce1e4;
  background-color: #e4d2cc;
}
.items > div:last-child::after {
  content: none;
}
.current::before {
  // background-color: #0faadf !important;
  background-color: $primary_color !important;
  // border: solid 3px #cce1e4 !important;
  border: solid 3px #efe1d4 !important;
  // box-shadow: 0 0 3px 1px rgb(37 212 255 / 7%);
  box-shadow: 0 0 3px 1px rgb(255 120 37 / 7%);
}
.accept-box {
  padding: 0.9em 1.3em;
  background-color: #f4efea;
  border-radius: 5px;
  font-size: 0.87em;
  color: #97918d;
  label {
    position: relative;
    user-select: none;
    cursor: pointer;
    input {
      display: none;
      &:checked + span.checkbox {
        background-color: $primary_color;
        border-color: $primary_color;
      }
      &:checked + span.checkbox::after {
        opacity: 1;
      }
    }
    span.checkbox {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 17px;
      height: 17px;
      border: solid 1.9px #b3b0ad;
      border-radius: 3px;
      box-sizing: border-box;
      transition: 0.0777s all ease-in-out;
      &::after {
        content: "";
        position: absolute;
        left: 3.3px;
        top: -1.1px;
        width: 5px;
        height: 10px;
        border: solid #ffffff;
        border-width: 0 2.7px 3px 0;
        border-radius: 0 0.3px 2px 0;
        transform: rotate(45deg);
        opacity: 0;
        transition: 0.09s all ease-in-out;
      }
    }
    span.content {
      padding-left: 27px;
      a {
        color: #97918d;
      }
    }
  }
}
.accept {
  margin: -0.5em auto 1em !important;
  font-size: 0.8em !important;
}
.btn-wrap {
  display: flex;
  align-items: center;
  margin-top: 0.5em;
  button {
    margin-right: 0.567em;
    padding-left: 2.3em;
    padding-right: 2.3em;
    width: 115px;
    height: 35px;
    // padding: 0.6em 2.3em 0.57em;
    border: solid 2.3px $primary_color;
    border-radius: 5px;
    font-size: 0.8em;
    font-weight: bold;
    cursor: pointer;
    transition: 0.13s all ease-in-out;
  }
  #submit {
    display: inline-flex;
    align-items: center;
    color: #ffffff;
    background-color: $primary_color;
    &:hover {
      background-color: $primary_hover_color;
    }
     &[disabled] {
      opacity: 0.5;
      cursor: auto;
      &:hover {
        background-color: $primary_color;
      }
    }
  }
  #cancel {
    margin-right: 0;
    color: $primary_color;
    background-color: transparent;
    border: none;
  }
}
</style>


