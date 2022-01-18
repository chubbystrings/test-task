<template>
  <main>
    <Modal />
    <Header>
      <Search />
    </Header>
    <Content />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "./ui/Header.vue";
import Search from "./Search.vue";
import Content from "./Content.vue";
import Modal from './ui/Modal.vue';

export default defineComponent({
  components: {
    Header,
    Search,
    Content,
    Modal
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
