<template>
  <router-view v-slot="slotProps">
    <div class="container">
      <transition mode="out-in" name="route">
        <component :is="slotProps.Component"></component>
      </transition>
    </div>
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<style lang="scss">
body,
p,
a,
h1,
h2,
h3,
h4,
h5 {
  margin: 0;
  padding: 0;
  font-family: Mulish;
}

.route-enter-from,
.route-leave-to {
  opacity: 0;
}

.route-enter-active,
.route-leave-active {
  transition: all 0.3s ease-out;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
}
</style>
