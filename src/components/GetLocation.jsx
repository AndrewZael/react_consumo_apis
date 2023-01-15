import { useEffect } from "react";

const GetLocation = ({ setUserLocation }) => {
 
  const getLocation = () => {
    navigator.geolocation ?
        navigator.geolocation.watchPosition((success) => {
          setUserLocation({ lat: success.coords.latitude, lng: success.coords.longitude });
        },(error) => {
          
        }) :
        console.log('Tu navegador no soporta geolocation');
  }

  useEffect(() => {
    getLocation();
  }, []);

}

export default GetLocation