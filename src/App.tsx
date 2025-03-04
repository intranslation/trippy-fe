import { APIProvider, Map } from "@vis.gl/react-google-maps";
import "./App.css";
import MapHandler from "./components/maps/map-handler";
import { useEffect, useState } from "react";
import { AutocompleteInput } from "./components/maps/autocomplete-input";
import { Directions } from "./components/maps/directions";
import { useStore } from "./store/zustand";

function App() {
  const mapsKey = import.meta.env.VITE_GOOGLE_MAPS_KEY;
  const { setUserLocation } = useStore();

  if (mapsKey === undefined) {
    console.log(Error("Couldn't retrieve maps api key."));
  }

  const [departurePlace, setDeparturePlace] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [arrivalPlace, setArrivalPlace] =
    useState<google.maps.places.PlaceResult | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  return (
    <APIProvider apiKey={mapsKey}>
      <div className="relative h-screen w-screen p-4">
        <div className="absolute top-0 left-[50%] z-10 flex -translate-x-[50%] translate-y-[100px] gap-4 bg-white px-4 py-2">
          <div className="flex flex-col gap-2">
            <label>Departure</label>
            <AutocompleteInput onPlaceSelect={setDeparturePlace} />
          </div>
          <div className="flex flex-col gap-2">
            <label>Destination</label>
            <AutocompleteInput onPlaceSelect={setArrivalPlace} />
          </div>
        </div>

        <Map
          className="z-0 h-full w-full"
          defaultCenter={{ lat: 22.54992, lng: 0 }}
          defaultZoom={3}
          gestureHandling={"greedy"}
          reuseMaps
          disableDefaultUI={true}
        />
        <Directions
          departurePoint={departurePlace}
          destinationPoint={arrivalPlace}
        />
        <MapHandler place={departurePlace || arrivalPlace} />
      </div>
    </APIProvider>
  );
}

export default App;
