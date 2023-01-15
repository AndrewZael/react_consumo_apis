import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Filter from "./Filter";
import Pharmacy from "./Pharmacy";
import PharmacySkeleton from "./PharmacySkeleton";
import empty from "../assets/img/empty.png";
import Notice from "./Notice";

const ListPharmacy = ({ setList, setCenterMap, setMenuOpen }) => {
  const [listPharmacy, setLisPharmacy] = useState([]);
  const [listPharmacyFiltered, setListPharmacyFiltered] =
    useState(listPharmacy);
  const [preload, setPreload] = useState(true);
  const [noticeInfo, setNoticeInfo] = useState({});

  useEffect(() => {
    getPharmacy()
      .then((res) => {
        setLisPharmacy(res);
        setListPharmacyFiltered(res);
        const locations = [];
        res.map((item) =>
          locations.push(item)
        );
        setList(locations);
        setPreload(false);
      })
      .catch((err) => {
        const noticeErrorApi = {
          img: empty,
          title: "Lo sentimos",
          message:
            "Un error ha ocurrido al traer la información, por favor inténtetelo nuevamente.",
        };
        setNoticeInfo(noticeErrorApi);
        setPreload(false);
      });
  }, [setList]);

  const getPharmacy = async () => {
    const url = "https://farmanet.minsal.cl/index.php/ws/getLocalesTurnos";
    const response = await fetch(url);
    return await response.json();
  };

  return (
    <>
      <Filter
        listPharmacy={listPharmacy}
        listPharmacyFiltered={listPharmacyFiltered}
        setListPharmacyFiltered={setListPharmacyFiltered}
        setNoticeInfo={setNoticeInfo}
        setMenuOpen={setMenuOpen}
      />

      {JSON.stringify(noticeInfo) !== "{}" ? (
        <Notice data={noticeInfo} />
      ) : null}

      {preload &&
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <PharmacySkeleton key={`preload-${item}`} />
        ))}

      {listPharmacyFiltered.length > 0 ? (
        <nav className="px-3">
          {listPharmacyFiltered.map((item) => (
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
              setMenuOpen={setMenuOpen}
            />
          ))}
        </nav>
      ) : null}
    </>
  );
};

export default ListPharmacy;
