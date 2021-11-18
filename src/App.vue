<template>
  <div id="app-content" :class="{'blur': getIsModalOpen}">
    <header>
      <div id="site-logo">
        <h1><a href="/"><img :src="pawPrint">YourCat</a></h1>
      </div>
      <nav id="nav">
        <router-link to="/terms">Terms</router-link>
        <router-link to="/privacy">Privacy</router-link>
        <a class="twitter-icon" href="https://twitter.com/YourCat_photos">
          &nbsp;
          <svg aria-hidden="true" focusable="false" data-prefix="fab"   data-icon="twitter" class="svg-inline--fa fa-twitter fa-w-16"   role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            fill="currentColor"
            d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
          ></path>
          </svg>
        </a>
      </nav>
    </header>
    <router-view />
  </div>
  <transition name="fade">
    <modal-window v-show="getIsModalOpen"></modal-window>
  </transition>
  <modal-back :class="{'modal-on': getIsModalOpen}"></modal-back>
</template>

<script>
import ModalWindow from '@/components/ModalWindow.vue';
import ModalBack from "@/components/ModalBack.vue";
export default {
  data() {
    return {
      pawPrint: "data:image/png;base64,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",
    };
  },
  computed: {
    getIsModalOpen() {
      return this.$store.state.isModalOpen;
    },
  },
  components: {
    ModalWindow,
    ModalBack,
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
  background-color: #fffcf9;
  font-size: 16px;
  @include mobile {
    font-size: 14px;
  }
}
#app {
  margin: auto;
  padding: 3px 13px 50px 13px;
  max-width: 1225px;
  color: #52514f;
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#app-content {
  transition: all 0.23s ease-in-out;
}
h2 {
  margin: 0.3em auto 0.7em;
  font-size: 2em;
  text-align: center;
  @include mobile {
    margin: 0.5em auto -0.1em;
  }
}
.eye-catch {
  margin: 3em auto 2em;
  svg {
    width: 100%;
    height: 100%;
    max-height: 200px;
  }
}
.content {
  margin: 2.3em auto 3em;
  width: 100%;
  max-width: 700px;
  line-height: 1.5;
  p {
    color: #6a6663;
    font-size: 1.1em;
    font-family: "Verdana";
  }
  @include mobile {
    padding: 0 1em;
    width: auto;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
.fade-shuin-enter-from {
  opacity: 0;
}
.fade-shuin-enter-active {
  transition: all 0.2s ease-out;
}
.fade-shuin-enter-to {
  opacity: 1;
}
.popup-enter-from {
  transform: scale(0);
}
.popup-enter-active {
  transition: all 0.13s cubic-bezier(.31,1.15,0,1.27);
}
.popup-enter-to {
  transform: scale(1);
}
.popup-delay-enter-from {
  transform: scale(0);
}
.popup-delay-enter-active {
  transition: all 0.13s cubic-bezier(.31,1.15,0,1.27) 0.3s;
}
.popup-delay-enter-to {
  transform: scale(1);
}
.tooltip-enter-from {
  transform: translateX(50%) scale(0) !important;
}
.tooltip-enter-active {
  transition: all 0.13s cubic-bezier(.31,1.15,0,1.27) !important;
}
.tooltip-enter-to {
  transform: translateX(50%) scale(1.3) !important;
}
.baguetteBox-button {
  background-color: transparent;
}
.baguetteBox-button:focus {
  background-color: transparent;
}
.baguetteBox-button#previous-button,
.baguetteBox-button#next-button {
  transform: scale(0.6, 0.5);
}
::-webkit-scrollbar {
  width: 13px;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #bdb0a8;
}
::-webkit-scrollbar-track {
  background: #e7e7e7;
}
:focus-visible {
  outline: none;
  box-shadow: 0 0 0 0.2rem rgb(240 118 47 / 45%);
}
</style>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 17px 33px 19px;
  @include mobile {
    padding: 13px 23px 23px 7px;
  }
}
#site-logo {
  h1 {
    margin: 0;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.7em;
      color: #52514f;
      text-decoration: none;
      img {
        margin-right: 5px;
        width: 1.111em;
      }
    }
  }
}
#nav a {
  margin-right: 2.3em;
  color: #bbbbba;
  font-size: 0.9em;
  font-weight: bold;
  text-decoration: none;
  &:last-child {
    margin-right: 0em;
  }
}
.twitter-icon {
  position: relative;
  svg {
    position: absolute;
    top: 53%;
    transform: translateY(-50%);
    width: 14.4px;
  }
}
.blur {
  filter: blur(9px);
}
.modal-on {
  opacity: 1 !important;
  pointer-events: auto !important;
}
</style>
