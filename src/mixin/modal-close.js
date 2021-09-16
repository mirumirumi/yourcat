export default {
  methods: {
    todoCloseModal() {
      this.$store.commit("changeIsModalOpen", false);
      this.$store.commit("changeIsOverLimit", false);
      document.getElementById("img").value = "";
      setTimeout(() => {
        // img file
        this.$store.commit("changeIsNotExistFile", true);
        this.$store.commit("changeIsShownAlert", false);
        const img = document.getElementById("preview-image");
        if (img) img.remove();

        // mixin in ModalWindow.vue, no import
        this.todoFileChanged();
      }, 100);
    }
  }
}
