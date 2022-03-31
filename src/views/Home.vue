<template>
  <section id="description">
    <div class="title">
      <h2>Publish Your Cat!</h2>
    </div>
    <div class="content">
      <p>Post a photo of your best cat.</p>
      <p>This is not a SNS. There is no account and no comments on the photos. Once you post a picture, you don't even know when you will see it again.</p>
      <p>This is a once-in-a-lifetime encounter!<span style="
        display: inline-block;
        margin-left: 0.37em;
        color: transparent;
        text-shadow: 0 0 0 #8c8885;
        transform: rotate(17deg);
      ">🐾</span></p>
    </div>
  </section>
  <buttons></buttons>
  <main id="photos">
    <photos></photos>
  </main>
  <footer>
    <span>Want to see more Nyanko🐱?&nbsp;&nbsp;Then let's <span id="footer-new-random" @click="newRandom()">New Random Cats</span>.</span>
  </footer>
  <transition name="fade">
    <buttons v-show="judgeScrolled && !getIsModalOpen" :isScrolled="isScrolled"></buttons>
  </transition>
</template>

<script>
import Photos from "@/components/Photos.vue";
import Buttons from "@/components/Buttons.vue";
import ModalClose from "@/mixin/modal-close.js";
import StateReset from "@/mixin/state-reset.js";
export default {
  mixins: [
    ModalClose,
    StateReset,
  ],
  created() {
    window.addEventListener("scroll", this.onScroll);
  },
  data() {
    return {
      // lang: "en",
      scrollVal: 0,
      isScrolled: false,
    };
  },
  methods: {
    newRandom() {
      this.$store.dispatch("sortNewRandomOrder");
    },
    onScroll() {
      this.scrollVal = document.documentElement.scrollTop;
    },
  },
  computed: {
    getIsModalOpen() {
      return this.$store.state.isModalOpen;
    },
    judgeScrolled() {
      this.isScrolled = 477 < this.scrollVal;
      return this.isScrolled;
    },
  },
  components: {
    Photos,
    Buttons,
  },
  beforeRouteLeave(to, from, next) {
    this.todoCloseModal();
    next();
  },
};
</script>

<style lang="scss" scoped>
footer {
  margin: 3.5em auto 4em;
  text-align: center;
  & > span {
    font-size: 1.1em;
    color: #8f8b88;
    #footer-new-random {
      display: inline-block;
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>


