import { create } from "zustand";

interface State {
  userLocation: google.maps.LatLngLiteral | undefined;
  places: Array<google.maps.places.PlaceResult>;
  setUserLocation: (latlng: google.maps.LatLngLiteral) => void;
  addPlaces: (place: google.maps.places.PlaceResult) => void;
}

export const store = create<State>((set) => ({
  userLocation: undefined,
  places: [],
  setUserLocation: (latlng) => set({ userLocation: latlng }),
  addPlaces: (place) =>
    set((state) => ({
      places: [...state.places, place],
    })),
}));

export const useStore = () => store((state) => state);
