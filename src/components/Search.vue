<template>
  <transition name="fade" mode="out-in" appear>
    <div class="input--wrapper" v-if="!globalSearchTerm">
      <input type="text" placeholder="search photo" v-model="searchTerm" />
      <img src="/images/search-icon.svg" />
      <div class="clear" @click="handleClear">x</div>
    </div>

    <div class="result-text" v-else>
      <h2 v-if="globalSearchTerm && !searchIsEmpty">
        Search Results for <span>"{{ globalSearchTerm }}"</span>
      </h2>
      <h2 v-if="searchIsEmpty">
        Oops No Results for <span>"{{ globalSearchTerm }}"</span>
      </h2>
      <img src="/images/search-icon.svg" @click="handleClick" />
    </div>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useReducer } from "@/store";
import { searching, search, removeSearchTerm } from "@/store/actions";

export default defineComponent({
  setup() {
    const searchTerm = ref("");
    const { state, dispatch } = useReducer();
    let init = "initial";
    let timer: number;
    let searchParams = new URLSearchParams(window.location.search);

    const route = useRoute();
    const host = window.location.protocol + "//" + window.location.host;

    const handleClick = () => {
      dispatch(removeSearchTerm());
    };

    const handleClear = () => {
        searchTerm.value = ''
    }

    const globalSearchTerm = computed(() => state.searchTerm);
    const searchIsEmpty = computed(() => state.searchIsEmpty);

    onMounted(() => {
      if (route.query.q) {
        dispatch(search(route.query.q as string));
        searchTerm.value = route.query.q as string;
      } else {
        dispatch(search(""));
      }
    });

    const replaceUrl = () => {
      if (!searchTerm.value) {
        window.history.replaceState({}, "", host);
      } else {
        searchParams.set("q", searchTerm.value);

        if (window.history.replaceState) {
          const url =
            host + window.location.pathname + "?" + searchParams.toString();

          window.history.replaceState(
            {
              path: url,
            },
            "",
            url
          );
        }
      }
    };

    watch(searchTerm, () => {
      console.log(init + "here");
      if (init === "") {
        dispatch(searching());
        replaceUrl();
        clearTimeout(timer);
        timer = setTimeout(() => {
          dispatch(search(searchTerm.value));
        }, 2000);
      } else {
        init = "";
      }
    });
    return { searchTerm, globalSearchTerm, handleClick, searchIsEmpty, handleClear };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.input--wrapper {
  position: relative;
  width: 80%;
  display: grid;
  place-items: center;
  input {
    width: 100%;
    height: 50px;
    border-radius: 5px;
    border: none;
    outline: none;
    box-shadow: $boxShadow;
    padding: 10px 50px;
    box-sizing: border-box;
    margin: 0 auto;
    font-size: 20px;
  }
  & img {
    position: absolute;
    left: 15px;
    width: 18px;
  }

  & .clear {
    position: absolute;
    right: 15px;
    width: 5px;
    font-weight: 900;
    cursor: pointer;
  }
}

.result-text {
  display: flex;
  justify-content: space-around;
  gap: 10px;
  align-items: center;
  width: 100%;
  padding: 5px 10px;
  box-sizing: border-box;

  & h2 {
    font-size: 40px;

    & span {
      font-weight: 100;
      color: rgba(0, 0, 0, 0.5);
      text-transform: capitalize;
    }

    @media screen and (max-width: 545px) {
      font-size: 25px;
    }

    @media screen and (max-width: 327px) {
      font-size: 17px;
    }
  }

  & img {
    width: 30px;
    cursor: pointer;
    @media screen and (max-width: 545px) {
      width: 20px;
    }
  }

  @media screen and (max-width: 327px) {
    flex-direction: column;
    justify-content: center;
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

@keyframes move {
  from {
    transform: scaleX(1);
  }
  50% {
    transform: scaleX(0.75);
  }
  to {
    transform: scaleX(1);
  }
}
</style>
