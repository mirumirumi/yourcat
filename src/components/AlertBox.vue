<template>
  <div class="alert">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" licence="https://fontawesome.com/v5.15/icons/exclamation-circle">
    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path>
    </svg>
    <span>
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
div.alert {
  display: flex;
  margin-top: 1.1em;
  padding: 0.45em 1em 0.4em;
  font-size: 0.93em;
  color: #fe5e5e;
  font-weight: bold;
  background-color: #fee6e6;
  border-radius: 5px;
  svg {
    width: 1em;
    margin-right: 0.5em;
  }
}
</style>
