<template>
  <section id="description">
    <site-description></site-description>
  </section>
  <buttons></buttons>
  <main id="photos">
    <photos></photos>
  </main>
  <footer>
    <span>Want to see more Nyanko🐱?&nbsp;&nbsp;Then let's <span id="footer-new-random" @click="newRandom()">New Random Cats</span>.</span>
  </footer>
</template>

<script>
// @ is an alias to /src
import SiteDescription from "@/components/SiteDescription.vue";
import Photos from "@/components/Photos.vue";
import Buttons from "@/components/Buttons.vue";
export default {
  methods: {
    newRandom() {
      this.$store.dispatch("sortNewRandomOrder");
    },
  },
  components: {
    SiteDescription,
    Photos,
    Buttons,
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
      text-decoration: underline;
      cursor: pointer;
    }
  }
}

</style>


