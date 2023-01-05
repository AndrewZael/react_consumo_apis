import React, { useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import iconPharmacy from "../assets/img/pharmacy.png";
import { useEffect } from "react";
import InfoRoute from "./InfoRoute";

let MAP = null;
const COLOR = "red";
let directionRender = null;

const Map = ({ userLocation, markets, centerMap }) => {
  const [infoRoute, setInfoRoute] = useState({});
  useEffect(() => {
    inMap();
  }, [centerMap]);

  // Se inicializa google maps API
  const loader = new Loader({
    apiKey: "AIzaSyAZ2aiyNWB30mWAU9FKjjvf0sOXyvZ3gQA",
    version: "weekly",
  });

  // Opciones de mapa si el usuario aceptar compartir su ubicación
  const options = {
    center: userLocation,
    zoom: 15,
  };

  // Opciones de mapa si usuario no da permiso a su ubicación
  const optionsDefault = {
    center: { lat: -31.7613365, lng: -71.3187697 },
    zoom: 8,
  };

  loader.load().then(() => {
    // Icono de usuario
    const userMarket = {
      path: "M12 2c-4.97 0-9 4.03-9 9 0 4.17 2.84 7.67 6.69 8.69L12 22l2.31-2.31C18.16 18.67 21 15.17 21 11c0-4.97-4.03-9-9-9zm0 2c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.3c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z",
      fillColor: COLOR,
      fillOpacity: 1,
      strokeWeight: 0,
      rotation: 0,
      scale: 2,
      anchor: new window.google.maps.Point(0, 20),
    };

    // Mapa
    if (MAP === null && userLocation !== undefined) {
      MAP = new window.google.maps.Map(document.getElementById("map"));
      directionRender = new window.google.maps.DirectionsRenderer({
        polylineOptions: { strokeColor: COLOR },
      });
      MAP.setCenter(
        userLocation !== undefined ? options.center : optionsDefault.center
      );
      MAP.setZoom(
        userLocation !== undefined ? options.zoom : optionsDefault.zoom
      );
    }

    // Market usuario
    new window.google.maps.Marker({
      position: userLocation,
      map: MAP,
      icon: userMarket,
    });

    // Markest Lista de farmacias
    for (const market of markets) {
      if (market.lat !== "" && market.lng !== "") {
        new window.google.maps.Marker({
          position: new window.google.maps.LatLng(market.lat, market.lng),
          map: MAP,
          icon: iconPharmacy,
        });
      }
    }
  });

  const inMap = () => {
    if (window.google !== undefined) {
      if (JSON.stringify(userLocation) !== "{}") {
        const directionService = new window.google.maps.DirectionsService();
        let route = {
          origin: new window.google.maps.LatLng(userLocation),
          destination: new window.google.maps.LatLng(centerMap),
          travelMode: window.google.maps.DirectionsTravelMode.DRIVING,
        };
        directionService.route(route, function (response, status) {
          switch (status) {
            case "OK":
              const baseRoute = response.routes[0].legs[0];
              const route = {
                distance: baseRoute.distance,
                duration: baseRoute.duration,
                start_address: baseRoute.start_address,
                end_address: baseRoute.end_address,
              };
              setInfoRoute(route);
              directionRender.setDirections(response);
              directionRender.setMap(MAP);
              MAP.setZoom(10);
              break;
            default:
              break;
          }
        });
      } else if (JSON.stringify(centerMap) !== "{}") {
        MAP.setCenter(new window.google.maps.LatLng(centerMap));
        MAP.setZoom(14);
      }
    }
  };

  return (
    <article className="min-vh-100 position-relative">
      {JSON.stringify(infoRoute) !== "{}" ? (
        <InfoRoute
          distance={infoRoute.distance}
          duration={infoRoute.duration}
          start_address={infoRoute.start_address}
          end_address={infoRoute.end_address}
        />
      ) : null}
      <div id="map" className="min-vh-100"></div>
    </article>
  );
};

export default Map;
