import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Filter from './Filter';
import Pharmacy from './Pharmacy';

const ListPharmacy = ({ setMarkets, setCenterMap }) => {

  const [listPharmacy, setLisPharmacy] = useState([]);
  const [listPharmacyFiltered, setListPharmacyFiltered] = useState(listPharmacy);

  useEffect(() => {
    getPharmacy()
      .then((res) => {
        setLisPharmacy(res);
        setListPharmacyFiltered(res);
        const locations = [];
        res.map((item) =>
          locations.push({
            lat: item.local_lat,
            lng: item.local_lng,
            name: item.local_nombre,
          })
        );
        setMarkets(locations);
      })
      .catch((err) => console.log(err));
  }, [setMarkets]);

  const getPharmacy = async () => {
    const url = 'https://farmanet.minsal.cl/index.php/ws/getLocalesTurnos';
    const response = await fetch(url);
    return await response.json();
  }

  return (
    <>
      <Filter 
        listPharmacy={listPharmacy}
        listPharmacyFiltered={listPharmacyFiltered}
        setListPharmacyFiltered={setListPharmacyFiltered} />
      <nav className="px-3">
      {
        listPharmacyFiltered?.map(item => 
          <Pharmacy
            setCenterMap={setCenterMap}
            key={item.local_id}
            local_id={item.local_id} 
            local_nombre={item.local_nombre}
            local_direccion={item.local_direccion}
            comuna_nombre={item.comuna_nombre}
            local_telefono={item.local_telefono}
            funcionamiento_hora_apertura={item.funcionamiento_hora_apertura}
            funcionamiento_hora_cierre={item.funcionamiento_hora_cierre}
            funcionamiento_dia={item.funcionamiento_dia}
            local_lat={item.local_lat}
            local_lng={item.local_lng}
          />)
      }
      </nav>
    </>
  )
}

export default ListPharmacy;