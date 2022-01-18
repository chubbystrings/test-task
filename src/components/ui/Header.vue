<template>
  <header>
      <slot></slot>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

header {
    background-color: $primary;
    height: 200px;
    width: 70%;
    display: grid;
    place-items: center;
    margin: 0 auto;

    @media screen and (max-width: 993px) {
        width: 100%;
    }
}

</style>
