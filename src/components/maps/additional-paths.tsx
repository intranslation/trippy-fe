import { AutocompleteInput } from "./autocomplete-input";
import { useStore } from "@/store/zustand";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";

export const AdditionalPaths = () => {
  const { places: placesInStore, addPlaces } = useStore();

  const addToRoute = (place: google.maps.places.PlaceResult) => {
    addPlaces(place);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="mt-2 text-sm">
          Adicionar mais pontos de interesse
        </label>
        <AutocompleteInput
          onPlaceSelect={(place) => {
            if (place) {
              // onPlaceSelected(place);
              addToRoute(place);
            }
          }}
          clearAfterSelect
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          {placesInStore.map((place, index) => (
            <div className="flex flex-nowrap items-center justify-between">
              <p className="px-2 text-[.8rem]">{`${index + 1}º`}</p>
              <p className="pr-2 text-sm">
                {/* {place.formatted_address && place.formatted_address?.length > 20
                  ? `${place.formatted_address.substring(0, 50)}...`
                  : place.formatted_address} */}
                {place.formatted_address && place.formatted_address}
              </p>

              <Button>
                <TrashIcon fontSize={"2rem"} />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
