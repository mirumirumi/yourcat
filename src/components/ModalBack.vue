<template>
  <div class="overlay" @click="cancel">

  </div>
</template>

<script>
import ModalClose from "@/mixin/modal-close.js";
export default {
  mixins: [
    ModalClose,
  ],
  methods: {
    cancel() {
      this.todoCloseModal();
    },
  },
}
</script>

<style lang="scss" scoped>
.overlay{
  position:fixed;
  top:0;
  left:0;
  display: flex;
  align-items: center;
  justify-content: center;
  width:100%;
  height:100%;
  background-color:rgba(0, 0, 0, 0.111);
  opacity: 0;
  z-index:1;
  pointer-events: none;
  transition: all 0.23s ease-in-out;
}

</style>






































