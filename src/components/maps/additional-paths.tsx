import { useState } from "react";
import { Button } from "../ui/button";
import { AutocompleteInput } from "./autocomplete-input";
import { useStore } from "@/store/zustand";

export const AdditionalPaths = () => {
  const { places: placesInStore, addPlaces } = useStore();
  const [places, setPlaces] = useState<Array<google.maps.places.PlaceResult>>(
    [],
  );
  const [currPlace, setCurrPlace] =
    useState<google.maps.places.PlaceResult | null>();

  const onPlaceSelected = (place: google.maps.places.PlaceResult) => {
    setCurrPlace(place);
  };

  return (
    <div className="absolute top-100 right-5 flex flex-col gap-4 bg-white p-2">
      <AutocompleteInput
        onPlaceSelect={(place) => place && onPlaceSelected(place)}
      />
      <Button
        disabled={!currPlace}
        onClick={() =>
          setPlaces((state) => (currPlace ? [...state, currPlace] : [...state]))
        }
      >
        Salvar
      </Button>
      <Button
        disabled={places.length === 0}
        onClick={() => {
          addPlaces([...placesInStore, ...places]);
          console.log(places);
          setPlaces([]);
        }}
      >
        Add to the route
      </Button>
      <div className="flex flex-nowrap gap-2">
        <div className="flex flex-col gap-2">
          <small className="text-red-600">Places in store</small>
          {placesInStore.map((place) => (
            <p className="text-sm">
              {place.formatted_address && place.formatted_address?.length > 20
                ? `${place.formatted_address.substring(0, 20)}...`
                : place.formatted_address}
            </p>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <small className="text-blue-600">Places not in store</small>
          {places.map((place) => (
            <p className="text-sm">
              {place.formatted_address && place.formatted_address?.length > 20
                ? `${place.formatted_address.substring(0, 20)}...`
                : place.formatted_address}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
