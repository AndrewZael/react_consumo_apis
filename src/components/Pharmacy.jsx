import React from "react";

function Pharmacy(props) {
  const setCenter = (lat, lng) => {
    props.setCenterMap({ lat: parseFloat(lat), lng: parseFloat(lng) });
    props.setMenuOpen(false);
  };

  const inputChecked = (element) => {
    element.checked = true;
  };

  const validatePhone = (number) => {
    return /^\+([0-9])*$/.test(number);
  };

  return (
    <>
      <input
        type="radio"
        id={`radio-${props.local_id}`}
        name="place"
        className="d-none"
      />
      <label
        onClick={() => setCenter(props.local_lat, props.local_lng)}
        htmlFor={`radio-${props.local_id}`}
        title={props.local_nombre}
        className="wrap-pharmacy px-3 py-3 rounded bg-white border shadow-sm mb-2 w-100"
      >
        <div className="row">
          <div className="col-9 pb-3">
            <h2 className="h5">{props.local_nombre}</h2>
            <ul className="list-unstyled mt-3 mb-0 small">
              <li className="mb-2">
                <ul className="d-flex list-unstyled">
                  <span className="material-icons me-2">place</span>
                  <li className="lh-sm">
                    Dirección <br />
                    <strong>
                      {props.local_direccion}, {props.comuna_nombre}
                    </strong>
                  </li>
                </ul>
              </li>

              <li className="d-flex mb-2">
                <span className="material-icons me-2">schedule</span>
                <ul className="d-flex list-unstyled">
                  <li className="me-3 lh-sm">
                    Apertura <br />
                    <strong>{props.funcionamiento_hora_apertura} hrs.</strong>
                  </li>
                  <li className="lh-sm">
                    Cierre <br />
                    <strong>{props.funcionamiento_hora_cierre} hrs.</strong>
                  </li>
                </ul>
              </li>

              <li className="d-flex">
                <span className="material-icons me-2">event</span>
                <ul className="d-flex list-unstyled">
                  <li className="lh-sm">
                    Día de funcionamiento
                    <br /> <strong>{props.funcionamiento_dia}</strong>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          {validatePhone(props.local_telefono) ? (
            <div className="col-3 d-flex align-items-center justify-content-center">
              <a
                onClick={(e) => e.stopPropagation()}
                href={`tel:${props.local_telefono}`}
                title="Llamar"
                className="btn"
              >
                <span className="material-icons md-36">call</span>
              </a>
            </div>
          ) : null}
          {props.local_lat !== "" || props.local_lng !== "" ? (
            <div className="col-12 text-end border-top pt-3">
              <button
                htmlFor={`radio-${props.local_id}`}
                onClick={() => {
                  inputChecked(
                    document.getElementById(`radio-${props.local_id}`)
                  );
                  setCenter(props.local_lat, props.local_lng);
                }}
                className="btn btn-primary"
                title="Ver ubicación"
              >
                Ver en el mapa &raquo;
              </button>
            </div>
          ) : null}
        </div>
      </label>
    </>
  );
}

export default Pharmacy;
