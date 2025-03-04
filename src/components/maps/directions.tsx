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
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  useEffect(() => {
    if (!routesLibrary || !map) return;

    if (!directionsService || !directionsRenderer) return;

    if (!destinationPoint || !departurePoint) return;

    directionsService
      .route({
        travelMode: google.maps.TravelMode.DRIVING,
        destination: destinationPoint?.geometry?.location as google.maps.LatLng,
        origin: departurePoint?.geometry?.location as google.maps.LatLng,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      });
  }, [
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

  // Add the following useEffect to make markers draggable
  // useEffect(() => {
  //   if (!directionsRenderer) return;

  //   // Add the listener to update routes when directions change
  //   const listener = directionsRenderer.addListener(
  //     "directions_changed",
  //     () => {
  //       const result = directionsRenderer.getDirections();
  //       if (result) {
  //         setRoutes(result.routes);
  //       }
  //     },
  //   );

  //   return () => google.maps.event.removeListener(listener);
  // }, [directionsRenderer]);

  // Update direction route
  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;

  return (
    <div className="absolute top-100 left-0 bg-white">
      <h2>{selected.summary}</h2>
      <p>
        {leg.start_address.split(",")[0]} to {leg.end_address.split(",")[0]}
      </p>
      <p>Distance: {leg.distance?.text}</p>
      <p>Duration: {leg.duration?.text}</p>

      <h2>Other Routes</h2>
      <ul>
        {routes.map((route, index) => (
          <li key={route.summary}>
            <button onClick={() => setRouteIndex(index)}>
              {route.summary}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
