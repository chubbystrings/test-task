import { reactive, readonly, toRefs } from "vue";
import { useGetImages } from './../composables/useGetPictures';

interface INITIAL_STATE {
  // searchedGames: GAMES[];
  searchIsEmpty: boolean;
  isSearching: boolean;
  modalOpen: boolean;
  images: Record<string, any>[];
  loader: boolean;
  modalContent: {
    image: string;
    name: string;
    location: string;
  };
  searchTerm: string;
  searchedImages: Record<string, any>[];
}
interface ACTION {
  type: string;
  payload?: any;
}

const initialState: INITIAL_STATE = reactive({
  images: [],
  loader: false,
  searchedImages: [],
  searchIsEmpty: false,
  isSearching: false,
  modalOpen: false,
  modalContent: {
    image: "",
    name: "",
    location: "",
  },
  searchTerm: '',
});

export const useReducer = () => {
  const handleOpenModal = (payload: {
    image: string;
    name: string;
    location: string;
  }) => {
    initialState.modalContent = { ...payload };
    initialState.modalOpen = true;
  };

  const handleCloseModal = () => {
    initialState.modalOpen = false;
    initialState.modalContent = {
      image: "",
      name: "",
      location: "",
    };
  };

  const handleOpenSearchProgress = () => {
    initialState.isSearching = true;
  };

  const handleCloseSearchProgress = () => {
    initialState.isSearching = false;
  };

  const handleLoadImages = async () => {
    const { getImages } = useGetImages();

    const results = await getImages("");
    
    initialState.images = results;
  }

  const handleSearch = async (searchTerm: string) => {
    
    const { getImages } = useGetImages();

    const results = await getImages(searchTerm);
    initialState.searchedImages = results
    initialState.searchTerm = searchTerm;
    if (initialState.searchedImages.length === 0) {
      initialState.searchIsEmpty = true;
    } else {
      initialState.searchIsEmpty = false;
    }
  };

 const handleRemoveSearchTerm = () => {
   initialState.searchTerm = ''
 }

  const dispatch = (action: ACTION) => {
    switch (action.type) {
      case "OPEN_MODAL":
        handleOpenModal(action.payload);
        return;
      case "CLOSE_MODAL":
        handleCloseModal();
        return;
      case "SEARCHING":
        handleOpenSearchProgress();
        return;
      case "LOAD_IMAGES":
        handleLoadImages()
        return
      case "STOP_SEARCHING":
        handleCloseSearchProgress();
        return;
      case "SEARCH":
        handleSearch(action.payload)
        return
      case "REMOVE_SEARCH_TERM":
        handleRemoveSearchTerm()
        return
      default:
        throw Error("Action not recognized");
    }
  };

  return { state: readonly(toRefs(initialState)), dispatch };
};
