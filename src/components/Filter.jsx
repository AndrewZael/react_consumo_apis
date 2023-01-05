import React, { useState } from 'react'
import Sort from './Sort';

const Filter = ({ listPharmacy, listPharmacyFiltered, setListPharmacyFiltered }) => {

  const filter = (e) => {
    const newList = listPharmacy.filter(item => {
      return item ?
        item.comuna_nombre.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(e.target.value) ||
        item.local_nombre.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(e.target.value) : listPharmacy;
    }
    );
    setListPharmacyFiltered(newList);
  }

  return (
    <>
      <header className="mb-3 p-3 border-bottom bg-light position-sticky top-0 z-1 d-flex">
        <label className="input-group">
          <input type="search" onChange={filter}
            className="form-control border-end-0"
            placeholder="Ej: Cruz verde"
            aria-label="Filtro de lista de farmacias"
            aria-describedby="icon-search" />
          <span className="input-group-text bg-white  material-icons" id="icon-search">search</span>
        </label>
        <Sort 
          listPharmacyFiltered={listPharmacyFiltered} 
          setListPharmacyFiltered={setListPharmacyFiltered}  />
      </header>
    </>
  )
}

export default Filter