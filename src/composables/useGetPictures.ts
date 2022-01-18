import unsplash from "../services/axios";
import { ref } from "vue";
import { useReducer} from '@/store';
import { searching, stopSearching} from '@/store/actions'

export const useGetImages = () => {
  const error = ref("");
  const isLoading = ref(false);
  const { dispatch } = useReducer()

  const getImages = async (searchTerm: string) => {
    isLoading.value = true
    dispatch(searching())
    try {
      const { data } = await unsplash.get(
        `/search/photos/?page=1&per_page=8&query=${searchTerm || "African"}`
      );

      isLoading.value = false;
      dispatch(stopSearching())
      return data.results
    } catch (err: any) {
      error.value = err.message;
      isLoading.value = false;
      dispatch(stopSearching())
    }
    
  };
  return  { error, isLoading, getImages };
};
