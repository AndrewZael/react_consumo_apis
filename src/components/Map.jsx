import React, { useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { useEffect } from "react";
import InfoRoute from "./InfoRoute";
import AlertToast from "./AlertToast";
import addCurrentLocation from "google-maps-current-location";

// Iconos
import iconPharmacy from "../assets/img/pharmacy.png";
import iconPerson from "../assets/img/user_location.png";

const COLOR = "red";
let markersMap = [];
let MAP = null;
let currentLocation = null;
let directionRender = null;

const Map = ({ userLocation, markers, centerMap }) => {
  const [infoRoute, setInfoRoute] = useState({});
  const [toastShow, setToastShow] = useState(false);
  const [viewMarker, setViewMarker] = useState(null);
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
    // Mapa
    if (MAP === null) {
      MAP = new window.google.maps.Map(document.getElementById("map"));
      directionRender = new window.google.maps.DirectionsRenderer({
        polylineOptions: { strokeColor: COLOR },
        suppressMarkers: true,
      });


      // Markest Lista de farmacias
      for (const marker of markers) {
        if (marker.lat !== "" && marker.lng !== "") {
              const mark = new window.google.maps.Marker({
                position: new window.google.maps.LatLng(marker.lat, marker.lng),
                map: MAP,
                icon: iconPharmacy
              });
              markersMap.push(mark);
        }
      }
    } 
    
    if (userLocation !== undefined) {
      if (JSON.stringify(centerMap) === "{}") {
        currentLocation === null && (currentLocation = addCurrentLocation(MAP));
        MAP.setCenter(options.center);
        MAP.setZoom(options.zoom);

        // Market usuario
        new window.google.maps.Marker({
          position: userLocation,
          map: MAP,
          icon: iconPerson,
        });

      }
    } else {
      if (JSON.stringify(centerMap) === "{}") {
        MAP.setCenter(optionsDefault.center);
        MAP.setZoom(optionsDefault.zoom);
      }
    }

  });

  const inMap = () => {
    if (window.google !== undefined) {
      const  indexMark = markersMap.findIndex(mark => 
        mark.getPosition().lat() === centerMap.lat && mark.getPosition().lng() === centerMap.lng
      );
      markersMap[indexMark].setMap(null);
      viewMarker?.setMap(null);
      setViewMarker(null);
      const marker = new window.google.maps.Marker({
        map: MAP,
        animation: window.google.maps.Animation.DROP,
        position: centerMap,
        icon: iconPharmacy
      });
      setViewMarker(marker);
      // marker.addListener("click", e => { console.log(e); });

      if (userLocation !== undefined) {
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
              setToastShow(false);
              directionRender.setDirections(response);
              directionRender.setMap(MAP);
              MAP.setZoom(10);
              break;
            case "ZERO_RESULTS":
              directionRender.setMap(null);
              setInfoRoute({});
              setToastShow(true);
              MAP.setCenter(new window.google.maps.LatLng(centerMap));
              MAP.setZoom(14);
              break;
            default:
              break;
          }
        });
      } else {
        MAP.setCenter(new window.google.maps.LatLng(centerMap));
        MAP.setZoom(14);
      }
    }
  };

  return (
    <>
      <AlertToast
        title="¡Ups! 😥"
        message="No se encontró una ruta para llegar a esta ubicación."
        toastShow={toastShow}
      />
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
    </>
  );
};

export default Map;
