import { useState } from "react";
import GetLocation from "./components/GetLocation";
import Map from "./components/Map";
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.scss';
import ListPharmacy from "./components/ListPharmacy";

function App() {

  const [userLocation, setUserLocation] = useState();
  const [markers, setMarkers] = useState([]);
  const [centerMap, setCenterMap] = useState({});

  return (
    <div className="App">
      <GetLocation setUserLocation={setUserLocation} />

      <main className="row mx-0 min-vh-100">
        <section className="col-3 pb-2 px-0 overflow-auto vh-100 border-end" title="Lista de farmacias">
          <ListPharmacy setMarkers={setMarkers}
          setCenterMap={setCenterMap}
          />
        </section>
        
        <section className="col-9 position-relative"
        title="Mapa con ubicaciones de farmacias">
            {markers.length > 0 ?
            <Map
              userLocation={userLocation} 
              markers={markers}
              centerMap={centerMap}
              /> : null
            }
        </section>
      </main>

    </div>
  );
}

export default App;
