import { useStore } from "@/store/zustand";
import { useMap } from "@vis.gl/react-google-maps";
import React, { useEffect } from "react";

interface Props {
  place: google.maps.places.PlaceResult | null;
}

const MapHandler = ({ place }: Props) => {
  const map = useMap();
  const { userLocation } = useStore();

  useEffect(() => {
    if (!map) return;

    if (place && place.geometry?.viewport) {
      map.fitBounds(place.geometry?.viewport);
      return;
    }

    if (userLocation) {
      const coords = {
        lat: userLocation.lat,
        lng: userLocation.lng,
      };
      map.panTo(coords);
      map.setZoom(15);
    }
  }, [map, place]);

  return null;
};

export default React.memo(MapHandler);
