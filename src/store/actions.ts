import {
  OPEN_MODAL,
  CLOSE_MODAL,
  SEARCHING,
  STOP_SEARCHING,
  SEARCH,
  LOAD_IMAGES,
  REMOVE_SEARCH_TERM
} from "./actionsTypes";

export const openModal = (payload: Record<string, any>) => ({
  type: OPEN_MODAL,
  payload: payload
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});

export const searching = () => ({
  type: SEARCHING
})

export const stopSearching = () => ({
  type: STOP_SEARCHING
})

export const search = (payload: string) => ({
  type: SEARCH,
  payload
})

export const loadImages = () => ({
  type: LOAD_IMAGES
})

export const removeSearchTerm = () => ({
  type: REMOVE_SEARCH_TERM
})




