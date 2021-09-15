import {toggleTimelineCurrentClass} from "@/utils/util.js"

export default {
  methods: {
    todoCloseModal() {
      this.$store.commit("toggleIsModalOpen");
      this.$store.commit("falseOverLimit");
      document.getElementById("img").value = "";
      setTimeout(() => {
        // img file
        this.$store.commit("trueNoFile");
        this.$store.commit("falseShowAlert");
        const img = document.getElementById("preview-image");
        if (img) img.remove();

        // progress
        this.$store.commit("changeFileSelected", false);
        this.$store.commit("changeApiCatStatus", "");
        this.$store.commit("changeApiSameStatus", "");
        this.$store.commit("changeSubmitDisabled", true);
        toggleTimelineCurrentClass("is-selected-a-photo");
      }, 100);
    }
  }
}
