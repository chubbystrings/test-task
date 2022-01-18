<template>
  <teleport to="body">
    <transition name="fade" appear>
      <div class="overlay" v-if="isOpen"></div>
    </transition>
    <transition name="pop">
      <div class="modal" v-if="isOpen">
        <div class="info--wrapper">
          <div class="close--btn" @click="handleClick">X</div>
          <div class="img" :style="{ backgroundImage: `url(${image})` }"></div>
          <div class="info">
            <h2>{{ name }}</h2>
            <small>{{ location ? location : "Unknown Location" }}</small>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import { useReducer } from "@/store";
import { closeModal } from "@/store/actions";

export default defineComponent({
  props: ["image", "location", "name"],

  setup() {
    const { state, dispatch } = useReducer();

    const handleClick = () => dispatch(closeModal());
    const name = computed(() => state.modalContent.name);
    const image = computed(() => state.modalContent.image);
    const location = computed(() => state.modalContent.location);
    const isOpen = computed(() => state.modalOpen);

    return { name, image, location, handleClick, isOpen };
  },
});
</script>
<style lang="scss" scoped>
.overlay {
  content: "";
  position: absolute;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 998;
  background: #2c3e50;
  opacity: 0.6;
}
.modal {
  position: absolute;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 50rem;
  height: 500px;
  border-radius: 10px;
  background: #fff;
  z-index: 999;
  display: flex;
  flex-direction: column;
  box-shadow: $boxShadow;

  & .close--btn {
    position: absolute;
    right: -25px;
    top: -15px;
    z-index: 999;
    color: #fff;
    cursor: pointer;
  }

  & .info--wrapper {
    display: grid;
    grid-template-rows: 4fr 0.5fr;
    width: 100%;
    & .img {
      /* width: 100%; */
      /* height: 70vh; */
      /* object-fit: cover;
      object-position: 100% 30%; */
      background-repeat: no-repeat;
      background-size: cover;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      background-position: center center;
    }

    & .info {
      padding: 25px;

      h2 {
        @media screen and (max-width: 325px) {
            font-size: 15px;
        }
      }
      small {
           @media screen and (max-width: 325px) {
            font-size: 12px;
        }
      }
    }
  }

  @media screen and (max-width: 875px) {
    width: calc(100% - 100px);
  }

  @media screen and (max-width: 325px) {
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s linear;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
  transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.3);
}
</style>
