<template>
  <section id="description">
    <site-description></site-description>
  </section>
  <buttons></buttons>
  <main id="photos">
    <photos></photos>
  </main>
</template>

<script>
// @ is an alias to /src
import SiteDescription from "@/components/SiteDescription.vue";
import Photos from "@/components/Photos.vue";
import Buttons from "@/components/Buttons.vue";
export default {
  computed: {

  },
  components: {
    SiteDescription,
    Photos,
    Buttons,
  },
};
</script>

<style lang="scss" scoped>
</style>


