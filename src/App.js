import { useState } from "react";
import GetLocation from "./components/GetLocation";
import Map from "./components/Map";
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.scss';
import ListPharmacy from "./components/ListPharmacy";
import PreloadMap from "./components/PreloadMap";

function App() {

  const [userLocation, setUserLocation] = useState();
  const [list, setList] = useState([]);
  const [centerMap, setCenterMap] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="App">
      <GetLocation setUserLocation={setUserLocation} />

      <main className="row mx-0 min-vh-100">
        <header className="col-12 px-0 d-md-none bg-primary d-flex align-items-center py-1">
          <button onClick={() => setMenuOpen(true)} className="btn btn-primary">
            <span className="material-icons align-middle">manage_search</span>
          </button>
          <h1 className="mb-0 fw-normal h4 text-white">Farmacias de Turno</h1>
        </header>
        <section id="wrap-cards" className={`col-12 col-md-5 col-lg-4 col-xl-3 z-2 bg-white pb-2 px-0 overflow-auto vh-100 border-end ${menuOpen && 'open'}`} title="Lista de farmacias">
          <ListPharmacy setList={setList}
          setCenterMap={setCenterMap}
          setMenuOpen={setMenuOpen}
          />
        </section>
        
        <section className="col-12 col-md-7 col-lg-8 col-xl-9 px-0 position-relative"
        title="Mapa con ubicaciones de farmacias">
            {list.length > 0 ?
            <Map
              userLocation={userLocation} 
              list={list}
              centerMap={centerMap}
              /> : <PreloadMap />
            }
        </section>
      </main>

    </div>
  );
}

export default App;
