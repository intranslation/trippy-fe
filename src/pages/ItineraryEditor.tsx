import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import MapHandler from "./../components/maps/map-handler";
import { AutocompleteInput } from "./../components/maps/autocomplete-input";
import { Directions } from "./../components/maps/directions";
import { AdditionalPaths } from "./../components/maps/additional-paths";

import { useEffect, useState } from "react";
import { useStore } from "@/store/zustand";

export default function ItineraryEditor() {
  const mapsKey = import.meta.env.VITE_GOOGLE_MAPS_KEY;
  const { setUserLocation, userLocation, addPlaces } = useStore();

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

  const routeIsDefined = departurePlace && arrivalPlace;
  const routeNotConfigured = !departurePlace || !arrivalPlace;

  return (
    <APIProvider apiKey={mapsKey}>
      <div className="flex">
        <div className="relative h-screen w-[70vw] bg-black p-4">
          <Map
            className="z-0 h-full w-full"
            defaultCenter={{ lat: 22.54992, lng: 0 }}
            defaultZoom={3}
            gestureHandling={"greedy"}
            reuseMaps
            disableDefaultUI={true}
          >
            {routeNotConfigured && departurePlace && (
              <Marker
                position={{
                  lat: departurePlace?.geometry?.location?.lat() || 0,
                  lng: departurePlace?.geometry?.location?.lng() || 0,
                }}
              />
            )}
            {routeNotConfigured && arrivalPlace && (
              <Marker
                position={{
                  lat: arrivalPlace?.geometry?.location?.lat() || 0,
                  lng: arrivalPlace?.geometry?.location?.lng() || 0,
                }}
              />
            )}
            {routeNotConfigured && userLocation && (
              <Marker
                position={{
                  lat: userLocation.lat,
                  lng: userLocation.lng,
                }}
              />
            )}
          </Map>
          <Directions
            departurePoint={departurePlace}
            destinationPoint={arrivalPlace}
          />
          <MapHandler place={departurePlace || arrivalPlace} />
        </div>

        <div className="w-[30vw] bg-white px-4 py-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label>Local de partida</label>
              <AutocompleteInput
                onPlaceSelect={(place) => {
                  setDeparturePlace(place);
                  addPlaces(place);
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>Destino</label>
              <AutocompleteInput
                onPlaceSelect={(place) => {
                  setArrivalPlace(place);
                  addPlaces(place);
                }}
              />
            </div>
          </div>

          <hr className="my-4" />

          <h2 className="uppercase">Sua rota</h2>
          {routeNotConfigured && <span>Nenhuma rota definida ainda</span>}
          {routeIsDefined && <AdditionalPaths />}
        </div>
      </div>
    </APIProvider>
  );
}
