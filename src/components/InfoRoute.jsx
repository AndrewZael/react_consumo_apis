import React, { useEffect, useState } from "react";

const InfoRoute = (props) => {

  const [active, setActive] = useState(true);

  useEffect(() => {
    console.log(props);
    setActive(true);
  }, [props.infoRoute]);

  return (
    <div
      id="info-route"
      className={`px-3 pt-3 rounded-top bg-white shadow end-0 start-0 z-1 col-11 col-xl-6 col-xxl-4 mx-auto ${
        active && "open"
      }`}
    >
      <button
        onClick={() => setActive(false)}
        className="btn btn-light rounded-circle p-1 position-absolute d-flex p-0 rounded"
      >
        <span className="material-icons">close</span>
      </button>
      <div className="overflow-auto h-100">
        <h2 className="h3 mb-1">
          <span className="material-icons align-middle me-2">directions_car_filled</span>
          <span className="align-middle">{props.infoRoute.duration.text}.</span>
        </h2>
        <h3 className="h4">
          <span className="material-icons align-middle me-2">route</span>
          <span className="align-middle">{props.infoRoute.distance.text}.</span>
        </h3>
        <div className="row mx-auto mt-3 small pb-3">
          <div className="col-6">
            <span>Desde</span>
            <p className="mb-0 fw-bold">{props.infoRoute.start_address}</p>
          </div>
          <div className="col-6">
            <span>Hasta</span>
            <p className="mb-0 fw-bold">{props.infoRoute.end_address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoRoute;
