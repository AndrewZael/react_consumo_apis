import React, { useEffect, useState } from "react";
import Toast from "react-bootstrap/Toast";

const AlertToast = ({ toastShow, title, message }) => {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);
  useEffect(() => {
    setShow(toastShow);
  }, [toastShow]);

  return (
    <Toast
      bg="info"
      className="position-absolute z-1 bottom-0 start-0 end-0 mx-auto mb-3"
      show={show}
      onClose={toggleShow}
    >
      <Toast.Header>
        <strong className="me-auto">{title}</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
};

export default AlertToast;
