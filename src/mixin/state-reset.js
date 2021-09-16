import {toggleTimelineCurrentClass} from "@/utils/util.js"

export default {
  methods: {
    todoFileChanged() {
      // all states reset
      this.$store.commit("changeIsShownAlert", false);
      this.$store.commit("changeIsFileSelected", false);
      this.$store.commit("changeApiCatStatus", "");
      this.$store.commit("changeIsAccpetedStatus", "");
      this.$store.commit("changeSubmitDisabled", true);
      toggleTimelineCurrentClass("is-selected-a-photo");
      // bouding box
      const boxes = document.getElementsByClassName("bounding-box");
      const boxArray = Array.prototype.slice.call(boxes);
      for (let box of boxArray) {
        box.remove();
      }
      // tooltip
      this.$store.commit("changeIsGoTooltip", false);
      // accept check
      this.isCheckedAcceptData = false;  // ModalWindow.vue
    },
  }
}
