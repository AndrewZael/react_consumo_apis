import React, { useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { useEffect } from "react";
import InfoRoute from "./InfoRoute";
import AlertToast from "./AlertToast";
import Pharmacy from "./Pharmacy";
import addCurrentLocation from "google-maps-current-location";

// Iconos
import iconPharmacy from "../assets/img/pharmacy.png";
import iconPerson from "../assets/img/user_location.png";

const COLOR = "red";
let MAP = null;
let currentLocation = null;
let directionRender = null;

const Map = ({ userLocation, list, centerMap }) => {
  const [infoRoute, setInfoRoute] = useState({});
  const [toastShow, setToastShow] = useState(false);
  useEffect(() => {
    inMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      for (const marker of list) {
        if (marker.local_lat !== "" && marker.local_lng !== "") {
              const latLng = new window.google.maps.LatLng(marker.local_lat, marker.local_lng);
              const mark = new window.google.maps.Marker({
                position: latLng,
                map: MAP,
                icon: iconPharmacy
              });
              mark.addListener('click', (e) => {
                getInfoWindow(
                  `${getTemplateInfo(marker)}`, 
                  latLng).open(MAP);
              });
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


  const getTemplateInfo = (data) => {
    return `<ul class="d-flex flex-column m-0 p-0">
      <li class="mb-2"><strong>${data.local_nombre}</strong></li>
      <li class="mb-1">
        <small>Dirección</small><br>
        <strong>${data.local_direccion} ${data.comuna_nombre}</strong>
      </li>
      <li class="mb-1">
        <small>Apertura</small><br>
        <strong>${data.funcionamiento_hora_apertura}</strong>
      </li>
      <li class="mb-1">
        <small>Cierre</small><br>
        <strong>${data.funcionamiento_hora_cierre}</strong>
      </li>
      <li>
        <small>Día de funcionamiento</small><br>
        <strong>${data.funcionamiento_dia}</strong>
      </li>
    </ul>`;
  }

  const getInfoWindow = (content, position) => {
    return new window.google.maps.InfoWindow({
      content,
      position,
      pixelOffset: new window.google.maps.Size(-15, -55)
    });
  }

  const inMap = () => {
    if (window.google !== undefined) {
      const index = list.findIndex(item => 
        item.local_lat == centerMap.lat && item.local_lng == centerMap.lng
      );
      getInfoWindow(
        `${getTemplateInfo(list[index])}`, 
        new window.google.maps.LatLng(centerMap.lat, centerMap.lng)).open(MAP)

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
