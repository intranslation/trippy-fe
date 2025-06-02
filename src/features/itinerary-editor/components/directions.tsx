import { useStore } from "@/store/maps";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

interface DirectionsProps {
  departurePoint: google.maps.places.PlaceResult | null;
  destinationPoint: google.maps.places.PlaceResult | null;
}

export const Directions = ({
  departurePoint,
  destinationPoint,
}: DirectionsProps) => {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const selected = routes[0];
  const leg = selected?.legs[0];

  const { places } = useStore();

  useEffect(() => {
    if (!routesLibrary || !map) return;

    if (!directionsService || !directionsRenderer) return;

    if (!destinationPoint || !departurePoint) return;

    const waypoints: google.maps.DirectionsWaypoint[] = [];

    if (places) {
      places.map((placeResult) => {
        const point: google.maps.DirectionsWaypoint = {
          location: placeResult.geometry?.location,
        };
        waypoints.push(point);
      });
    }

    directionsService
      .route({
        travelMode: google.maps.TravelMode.DRIVING,
        destination: destinationPoint?.geometry?.location as google.maps.LatLng,
        origin: departurePoint?.geometry?.location as google.maps.LatLng,
        waypoints,
      })
      .then((response) => {
        console.log(response);
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      });
  }, [
    places,
    departurePoint,
    destinationPoint,
    directionsRenderer,
    directionsService,
    map,
    routesLibrary,
  ]);

  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(
      new routesLibrary.DirectionsRenderer({
        map,
      }),
    );
  }, [routesLibrary, map]);

  if (!leg) return null;

  return (
    <div className="absolute top-100 left-0 bg-white">
      {/* <h2>{selected.summary}</h2>
      <p>
        {leg.start_address.split(",")[0]} to {leg.end_address.split(",")[0]}
      </p>
      <p>Distance: {leg.distance?.text}</p>
      <p>Duration: {leg.duration?.text}</p>

      <h2>Other Routes</h2> */}
    </div>
  );
};
