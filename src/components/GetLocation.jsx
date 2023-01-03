import { useEffect } from "react";

const GetLocation = ({ setUserLocation }) => {
 
 const position = pos => {
    setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
  }  
  const getLocation = () => {
    navigator.geolocation ?
        navigator.geolocation.getCurrentPosition(position) :
        console.log('Yu navegador no soporta geolocation');
  }

  useEffect(() => {
    getLocation();
  }, []);

}

export default GetLocation