import { useState } from "react";
import GetLocation from "./components/GetLocation";
import Map from "./components/Map";
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.scss';
import ListPharmacy from "./components/ListPharmacy";

function App() {

  const [userLocation, setUserLocation] = useState();
  const [list, setList] = useState([]);
  const [centerMap, setCenterMap] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="App">
      <GetLocation setUserLocation={setUserLocation} />

      <main className="row mx-0 min-vh-100">
        <header className="col-12 px-0">
          <button onClick={() => setMenuOpen(true)} className="btn">
            <span className="material-icons align-middle">menu</span>
          </button>
        </header>
        <section id="wrap-cards" className={`position-fixed col-12 z-2 bg-white pb-2 px-0 overflow-auto vh-100 border-end ${menuOpen && 'open'}`} title="Lista de farmacias">
          <ListPharmacy setList={setList}
          setCenterMap={setCenterMap}
          setMenuOpen={setMenuOpen}
          />
        </section>
        
        <section className="col-12 px-0 position-relative"
        title="Mapa con ubicaciones de farmacias">
            {list.length > 0 ?
            <Map
              userLocation={userLocation} 
              list={list}
              centerMap={centerMap}
              /> : null
            }
        </section>
      </main>

    </div>
  );
}

export default App;
