<template>
  <div class="progress">
    <div class="text-content">
      <span :class="{'api-started': isStartedAPI}">
        <slot></slot>
      </span>
    </div>
    <div class="indicator">
      <load-spinner v-if="judgeProgressFlag" class="progress">
      </load-spinner>
      <svg v-else-if="judgeFlag(['succeeded'])" class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
        <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
        <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
      </svg>
      <div v-else-if="judgeFlag(['failed','error'])" style="width: 100%;">
        <svg class="failed" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
        <circle class="path circle" fill="none" stroke="#e96e6e" stroke-width="10" stroke-miterlimit="10" cx="65.1" cy="65.1" r="57"/>
        <line class="path line" fill="none" stroke="#e96e6e" stroke-width="10" stroke-linecap="round" stroke-miterlimit="10" x1="65.1" y1="37" x2="65.1" y2="75" data-v-94ed5144=""></line>
        <line class="path line" fill="none" stroke="#e96e6e" stroke-width="10" stroke-linecap="round" stroke-miterlimit="10" x1="65.1" y1="92" x2="65.1" y2="94" data-v-94ed5144=""></line>
        </svg>
        <tooltip v-if="getJudgeResult === 'dog'" :color="'error'" :line="2" style="width: 195px;">
          This is a Wanko🐶 !&nbsp;&nbsp;&nbsp;It's cute,<br>but I'm sorry, We can't approve it...
        </tooltip>
        <tooltip v-if="getJudgeResult === 'none'" :color="'error'" style="width: 245px">
          There doesn't seem to be a cat in this photo 🤔
        </tooltip>
        <tooltip v-if="getJudgeResult === 'error'" :color="'error'" style="width: 235px">
          Something went wrong. Please retry again.
        </tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import Tooltip from "@/components/Tooltip.vue";
import LoadSpinner from "@/components/LoadSpinner.vue";
export default {
  props: {
    dur: {
      type: String,
      default: "1s",
    },
    isFileSelected: {
      type: Boolean,
      default: false,
    },
    apiStatus: {
      type: String,
      default: "",
    },
  },
  computed: {
    isStartedAPI() {
      return this.apiStatus != "";
    },
    judgeProgressFlag() {
      return this.apiStatus == "start";
    },
    judgeFlag: function() {
      return function (status) {
        for (let s of status) {
          if (this.apiStatus.indexOf(s) !== -1
              || this.apiStatus === s
              || this.isFileSelected) {
            return true;
          }
        }
        return false;
      }
    },
    getJudgeResult() {
      if (this.apiStatus === "failed-dog") {
        return "dog";
      } else if (this.apiStatus === "failed") {
        return "none";
      } else if (this.apiStatus === "error") {
        return "error";
      }
    },
  },
  components: {
    Tooltip,
    LoadSpinner,
  }
};
</script>

<style lang="scss">
span.emoji {
  color: transparent;
  text-shadow: 0 0 0 #ded8d4;
}
.api-started {
  span.emoji {
    color: #6b6968;
    text-shadow: none;
  }
}
</style>

<style lang="scss" scoped>
div.progress {
  display: flex;
  align-items: center;
  margin: 0.5em auto;
  div.indicator {
    position: relative;
    display: flex;
    align-items: center;
    width: 23px;
    height: 23px;
  }
  div.text-content {
    margin: auto 0.7em auto 1em;
    span {
      color: #ded8d4;
      transition: 0.37s all ease-out;
      &.api-started {
        color: #6b6968;
      }
    }
  }
}

// 1
.is-selected-a-photo {
  .text-content span {
    color: #6b6968 !important;
  }
  .progress, .failed, .unknown {
    display: none !important;
  }
}

// 2
.is-the-cat {
  .text-content span {
    // for Emoji
    line-height: 1;
  }
}

.checkmark__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 10px;
  stroke-miterlimit: 10;
  stroke: #86cb72;
  fill: none;
  animation: stroke 0.37s cubic-bezier(.93,0,.02,1) forwards;
}
.checkmark {
  width: 23px;
  height: 23px;
  border-radius: 50%;
  display: block;
  stroke-width: 5px;
  stroke: #fff;
  stroke-miterlimit: 10;
  margin: 10% auto;
  box-shadow: inset 0px 0px 0px #86cb72;
  animation: fill 0.23s ease-in-out 0.3s forwards, scale 0.2s ease-in-out 0.77s both;
}
.checkmark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.23s cubic-bezier(.94,-0.03,.68,1.06) 0.51s forwards;
}
@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes scale {
  0%, 100% {
    transform: none;
  }
  50% {
    transform: scale3d(1.17, 1.17, 1);
  }
}
@keyframes fill {
  100% {
    box-shadow: inset 0px 0px 0px 30px #86cb72;
  }
}
.path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 0;
  &.circle {
    animation: dash 0.37s cubic-bezier(.93,0,.02,1) forwards;
  }
  &.line {
    stroke-dashoffset: 1000;
    animation: dash 0.23s ease 0.23s forwards;
  }
}
@keyframes dash {
  0% {
    stroke-dashoffset: 1000;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

</style>
