<template>
  <div class="buttons" :class="{header: isScrolled}">
    <div class="btn-wrap">
      <button class="upload" @click="showUploadForm()">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
          <path d="M380.032,133.472l-112-128C264.992,2.016,260.608,0,256,0c-4.608,0-8.992,2.016-12.032,5.472l-112,128	c-4.128,4.736-5.152,11.424-2.528,17.152C132.032,156.32,137.728,160,144,160h64v208c0,8.832,7.168,16,16,16h64	c8.832,0,16-7.168,16-16V160h64c6.272,0,11.968-3.648,14.56-9.376C385.152,144.896,384.192,138.176,380.032,133.472z"/>
          <path d="M432,352v96H80v-96H16v128c0,17.696,14.336,32,32,32h416c17.696,0,32-14.304,32-32V352H432z"/>
        </svg>
        <span>Upload Your Cat</span>
      </button>
      <button class="random" @click="sortNewRandomOrder()" style="margin: 0">
        <span>New Random Cats</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isScrolled: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    showUploadForm() {
      this.$store.commit("changeIsModalOpen", true);
    },
    sortNewRandomOrder() {
      this.$store.dispatch("sortNewRandomOrder");
    },
  }
}
</script>

<style lang="scss" scoped>
.buttons {
  margin: 1.3em auto 0.7em;
  padding: 0.7em 0 0.7em 0.7em;
  text-align: left;
  border-bottom: solid 2.3px #ebe8e5;
  background-color: #fffcf9;
  &.header {
    position: fixed;
    top: 0;
    left: 0;
    margin-top: 0;
    padding: 0.6em 0 0.6em 0.7em;
    width: 100%;
    border-bottom: none;
    box-shadow: 0 2px 3px 1px rgb(13 13 13 / 19%);
    // opacity: 0.97;
    z-index: 2;
    button {
      font-size: 0.75em;
    }
  }
}
.btn-wrap {
  display: flex;
  button {
    margin-right: 1.5em;
    padding: 0.6em 1.3em 0.57em;
    border: solid 2.3px $primary_color;
    border-radius: 5px;
    font-size: 0.8em;
    font-weight: bold;
    cursor: pointer;
    transition: 0.13s all ease-in-out;
  }
}
.upload {
  display: inline-flex;
  align-items: center;
  color: #ffffff;
  background-color: $primary_color;
  &:hover {
    background-color: $primary_hover_color;
  }
  svg {
    margin-right: 0.7em;
    width: 14px;
    fill: #ffffff;
  }
}
.random {
  color: $primary_color;
  background-color: #ffffff;
  &:hover {
    background-color: $white_hover_color;
  }
}
</style>
