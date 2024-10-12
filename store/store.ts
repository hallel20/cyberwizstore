import mongoose from 'mongoose';
import { createStore } from 'zustand'

export interface url {
  _id: mongoose.Types.ObjectId;
  imageUrl: string;
}

type ImagesStoreState = {
    images: url[],
}

type ImagesStoreActions = {
    setImages: (nextPosition: ImagesStoreState['images']) => void;
    removeAllImages: () => void;
}

type ImagesStore = ImagesStoreState & ImagesStoreActions

const ImagesStore = createStore<ImagesStore>()((set) => ({
  images: [],
  setImages: (newImages: url[]) => set({ images: newImages }),
  removeAllImages: () => set({ images: [] }),
}))

export default ImagesStore