import { create } from "zustand";

interface State {
  userLocation: google.maps.LatLngLiteral | undefined;
  setUserLocation: (latlng: google.maps.LatLngLiteral) => void;
}

export const store = create<State>((set) => ({
  userLocation: undefined,
  setUserLocation: (latlng) => set({ userLocation: latlng }),
}));

export const useStore = () => store((state) => state);
