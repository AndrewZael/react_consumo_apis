import React from "react";
import Sort from "./Sort";
import noResult from "../assets/img/no-result.png";

const Filter = ({
  listPharmacy,
  listPharmacyFiltered,
  setListPharmacyFiltered,
  setNoticeInfo,
  setMenuOpen
}) => {
  const filter = (e) => {
    const val = e.target.value.toLowerCase();
    const newList = listPharmacy.filter((item) => {
      return item
        ? search(item.comuna_nombre, val) || search(item.local_nombre, val)
        : listPharmacy;
    });
    setListPharmacyFiltered(newList);
    newList.length === 0
      ? setNoticeInfo({
          img: noResult,
          title: "No existen resultados",
          message: `Lo sentimos, no se encontraron resultados para <strong>${val}</strong>`,
        })
      : setNoticeInfo({});
  };

  const search = (item, value) => item.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(value);

  return (
    <>
      <header className="mb-3 p-3 border-bottom bg-light position-sticky top-0 z-2 d-flex">
        <button onClick={() => setMenuOpen(false)} className="btn d-md-none ps-0">
          <span className="material-icons align-middle">arrow_back</span>
        </button>
        <label className="input-group">
          <input
            type="search"
            onChange={filter}
            className="form-control border-end-0"
            placeholder="Ej: Cruz verde / Buin"
            aria-label="Filtro de lista de farmacias"
            aria-describedby="icon-search"
          />
          <span
            className="input-group-text bg-white  material-icons"
            id="icon-search"
          >
            search
          </span>
        </label>
        <Sort
          listPharmacyFiltered={listPharmacyFiltered}
          setListPharmacyFiltered={setListPharmacyFiltered}
        />
      </header>
    </>
  );
};

export default Filter;
