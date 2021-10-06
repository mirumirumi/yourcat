<template>
  <div class="loading-block" :class="{'stop-loading': isStopAnimation}" :style="{height: height + 'px'}"></div>
</template>

<script>
export default {
  props: {
    height: {
      type: Number,
      default: 50,
    },
    isStopAnimation: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.loading-block {
  position: relative;
  display: inline-block;
  margin-bottom: 3.7%;
  width: 100%;
  border-radius: 5px;
  background-color: #DDDBDD;
  overflow: hidden;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(
      90deg,
      rgba(#fff, 0) 0,
      rgba(#fff, 0.2) 20%,
      rgba(#fff, 0.5) 60%,
      rgba(#fff, 0)
    );
    transform: translateX(-200%);
    animation: skeleton 2.1s infinite;
  }
}
.stop-loading {
  &::after {
    content: none !important;
  }
}
@keyframes skeleton {
  100% {
    transform: translateX(100%);
  }
}
</style>
