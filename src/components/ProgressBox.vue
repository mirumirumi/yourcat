<template>
  <div class="progress">
    <div class="text-content">
      <span :class="{'api-started': isStartedAPI}">
        <slot></slot>
      </span>
    </div>
    <div class="indicator">
      <svg v-show="judgeProgressFlag" class="progress" width="23" height="23" viewBox="-4 -4 45 45" xmlns="http://www.w3.org/2000/svg" stroke="#625345">
        <g fill="none" fill-rule="evenodd">
          <g transform="translate(1 1)" stroke-width="3.7">
            <circle stroke-opacity=".5" cx="18" cy="18" r="18" />
            <path d="M36 18c0-9.94-8.06-18-18-18">
              <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" :dur="dur" repeatCount="indefinite" />
            </path>
          </g>
        </g>
      </svg>
      <svg v-show="judgeFlag('succeeded')" class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
        <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
        <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
      </svg>
      <div v-show="judgeFlag('failed')" class="failed">b</div>
      <div v-show="judgeFlag('unknown')" class="unknown">c</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dur: {
      type: String,
      default: "1s",
    },
    fileSelected: {
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
        return this.apiStatus == status || this.fileSelected;
      }
    },
  },
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
    display: flex;
    align-items: center;
    width: 23px;
    height: 23px;
    svg {

    }
  }
  div.text-content {
    margin: auto 0.7em auto 1em;
    span {
      color: #ded8d4;
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

// 3


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
  animation: fill 0.23s ease-in-out 0.3s forwards, scale 0.2s ease-in-out 0.9s both;
}
.checkmark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.37s cubic-bezier(.94,-0.03,.68,1.06) 0.57s forwards;
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
    transform: scale3d(1.19, 1.19, 1);
  }
}
@keyframes fill {
  100% {
    box-shadow: inset 0px 0px 0px 30px #86cb72;
  }
}

</style>
