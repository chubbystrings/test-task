<template>
  <div class="img--wrapper tint" :style="{ backgroundImage: `url(${image})` }" @click="handleClick"> 
    <div class="profile-info">
      <p>{{ name }}</p>
      <small>{{ location }}</small>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useReducer } from "@/store";
import { openModal } from '@/store/actions'

export default defineComponent({
  props: ["image", 'location', 'name'],
  setup(props) {
      const {  dispatch } = useReducer();

      const handleClick = () => {
          dispatch(openModal({ image: props.image, name: props.name, location: props.location}))
      }


      return { handleClick }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.img--wrapper {
  width: 170px;
  color: white;
  margin: 0 1rem .5rem 0;
  display: inline-block;
  width: 100%;
  border-radius: 10px;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  box-shadow: $boxShadow;
  
  

  & .profile-info {
    position: absolute;
    bottom: 20px;
    padding: 0px 20px;
    color: #fff;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    gap: 3px;
    width: 162px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

    & p {
        font-size: 15px;
    }

    & small {
        font-size: 11px;
    }
  }
}

.tint {
  position: relative;
  cursor: pointer;
}

.tint:before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0, 0.2);
  transition: background .3s linear;
  border-radius: 10px;
}

.tint:hover:before {
  background: none;
}


</style>
