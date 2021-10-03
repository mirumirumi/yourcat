<template>
  <div id="app-content" :class="{'blur': getIsModalOpen}">
    <header>
      <div id="site-logo">
        <h1><a href="/">🐱</a></h1>
      </div>
      <nav id="nav">
        <router-link to="/privacy">Privacy</router-link>
        <!-- <router-link to="/contact">Contact</router-link> -->
        <a class="twitter-icon" href="https://twitter.com/">
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
    <buttons :isScrolled="isScrolled" v-show="judgeScrolled && !getIsModalOpen"></buttons>
  </transition>
  <transition name="fade">
    <modal-window v-show="getIsModalOpen"></modal-window>
  </transition>
  <modal-back :class="{'modal-on': getIsModalOpen}"></modal-back>
</template>

<script>
import Buttons from "@/components/Buttons.vue";
import ModalWindow from '@/components/ModalWindow.vue';
import ModalBack from "@/components/ModalBack.vue";
export default {
  created() {
    window.addEventListener("scroll", this.onScroll);
  },
  data() {
    return {
      scrollVal: 0,
      isScrolled: false,
    };
  },
  methods: {
    onScroll() {
      const val = document.documentElement.scrollTop;
      this.scrollVal = val;
    },
  },
  computed: {
    getIsModalOpen() {
      return this.$store.state.isModalOpen;
    },
    judgeScrolled() {
      const result = 477 < this.scrollVal;
      this.isScrolled = result;
      return result;
    },
  },
  components: {
    Buttons,
    ModalWindow,
    ModalBack,
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
  background-color: #fffcf9;
  // font-size: 18px;
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
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.popup-enter-from {
  transform: scale(0);
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

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 11px 33px 22px;
}
h1 {
  font-size: 1em;
}
h1 a {
  text-decoration: none;
}
#nav a {
  margin-right: 2.3em;
  color: #bbbbba;
  font-size: 0.9em;
  font-weight: bold;
  text-decoration: none;
}
#nav a:last-child {
  margin-right: 0em;
}
.twitter-icon {
  position: relative;
}
.twitter-icon svg {
  position: absolute;
  top: 53%;
  transform: translateY(-50%);
  width: 14.4px;
}
.blur {
  filter: blur(9px);
}
.modal-on {
  opacity: 1 !important;
  pointer-events: auto !important;
}
</style>
