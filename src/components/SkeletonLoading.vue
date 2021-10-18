<template>
  <div class="loading-block-wrap" :style="{'width': size.width * 133 / size.height + 'px', 'flex-grow': size.width * 133 / size.height}">
    <i :style="{'padding-bottom': size.height / size.width * 100 + '%'}"></i>
    <div class="loading-block" :class="{'stop-loading': isStopAnimation}" :height="size.height"></div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Object,
      default: {},
    },
    isStopAnimation: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.loading-block-wrap {
  position: relative;
  flex-grow: 1;
  margin: 5px;
  &:hover > .download{
    display: block;
  }
}
.loading-block {
  position: absolute;
  top: 0;
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  height: 100%;
  flex-grow: 1;
  object-fit: cover;
  vertical-align: bottom;
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
i {
  display: block;
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
