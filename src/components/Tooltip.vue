<template>
  <div class="tooltip" :class="{'hover': type === 'hover'}, getColor, {'line2': 2 <= line}, fetchShouldGoPopup" :style="getHeight">
    <span>
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "default",
    },
    color: {
      type: String,
      default: "",
    },
    line: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    getColor() {
      return {
        "info": this.color === "info",
        "error": this.color === "error",
      };
    },
    getHeight() {
      if (2 <= this.line) {
        return `height:calc(21px * ${this.line} * 0.777);line-height:12px;`;
      }
    },
    fetchShouldGoPopup() {
      if (this.$store.state.isGoTooltip) {
        return {"popup": true};
      }
    },
  },
}
</script>

<style lang="scss" scoped>
div.tooltip {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 40px;
  right: 50%;
  width: 133px;
  height: 21px;
  line-height: 18px;
  text-align: center;
  border-radius: 13px;
  background-color: #444444;
  opacity: 0.9;
  transform: translateX(50%) scale(0);
  transition: all 0.05s cubic-bezier(.69,1.1,.54,1.17) 0.13s;
  &.hover {
    transform: scale(0);
    transition: none;
  }
  &.error {
    background-color: #f17978;
    &::before {
      border-top: solid 5.5px #f17978;
    }
    &.popup {
      transform: translateX(50%) scale(1.3);
    }
  }
  span {
    color: #ffffff;
    font-weight: bold;
    font-size: 0.6em;
  }
  &::before {
    content: "";
    position: absolute;
    border: solid 5.5px transparent;
    border-top: solid 5.5px #444444;
    top: 20.4px;
    left: 50%;
    transform: translateX(-50%);
  }
  &.line2 {
    &::before {
      top: 32.2px;
    }
  }
}
</style>
