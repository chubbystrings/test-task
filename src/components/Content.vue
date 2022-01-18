<template>
  <section>
    <div class="staggered" v-if="!isSearching && !searchIsEmpty">
      <Image
        v-for="(result, i) in results"
        :key="i"
        :image="result.urls.regular"
        :location="result.user.location"
        :name="result.user.name"
      />
    </div>
    <div class="staggered" v-if="isSearching">
      <div class="loading" v-for="(div, i) in divs" :key="i">
        <p class="inner-loading"></p>
        <p class="inner-loading"></p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { loadImages } from "@/store/actions";
import { useReducer } from "@/store";
import Image from "./Image.vue";

export default defineComponent({
  components: {
    Image,
  },
  setup() {
    const { dispatch, state } = useReducer();
    const isSearching = computed(() => state.isSearching);
    const divs = ref([1, 2, 3, 4, 5, 6, 7, 8]);

    const images = computed(() => {
      if (state.searchedImages.length > 0) {
        return state.searchedImages;
      }

      return state.images;
    });

    const searchIsEmpty = computed(() => state.searchIsEmpty);

    onMounted(() => {
      dispatch(loadImages());
    });

    return { results: images, isSearching, divs, searchIsEmpty };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
section {
  width: 50%;
  margin: 0 auto;
  z-index: 10;
  margin-top: -40px;

  .staggered {
    columns: 3 200px;
    column-gap: 2.5rem;
    @for $i from 1 through $cards {
      & div:nth-of-type(#{$i}) {
        $h: (random(150) + 180) + px;
        height: $h;
      }
    }

    .loading {
      position: relative;
      background-color: #f5f5f5;
      width: 100%;
      border-radius: 10px;
      margin: 0 1rem 0.5rem 0;
      display: inline-block;
      padding: 10px;

      & > p {
        position: absolute;
        background-color: #e2e2e2;
        width: 170px;
        height: 15px;
        bottom: 45px;
       
      }

      & p:nth-of-type(1) {
        position: absolute;
        background-color: #e2e2e2;
        width: 150px;
        height: 15px;
        bottom: 15px;
      }

      & p::after {
        display: block;
        content: "";
        position: absolute;
        width: 80%;
        height: 100%;
        bottom: 5px;
        transform: translateX(-100%);
        background: -webkit-gradient(
          linear,
          left top,
          right top,
          from(transparent),
          color-stop(rgba(255, 255, 255, 0.2)),
          to(transparent)
        );

        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.2),
          transparent
        );

        animation: loading 1.1s infinite;
      }

       @media screen and (max-width: 676px) {
          width: calc(100% - 20px);
        }
    }

    .loading::after {
      display: block;
      content: "";
      position: absolute;
      width: 80%;
      height: 100%;
      top: 0;
      transform: translateX(-100%);
      background: -webkit-gradient(
        linear,
        left top,
        right top,
        from(transparent),
        color-stop(rgba(255, 255, 255, 0.2)),
        to(transparent)
      );
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
      );
      animation: loading 1.1s infinite;
    }
  }

  @media screen and (max-width: 881px) {
    width: 65%;
  }

  @media screen and (max-width: 425px) {
    width: 80%;
  }
}
</style>
