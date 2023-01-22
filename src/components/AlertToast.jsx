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
      id="toast-info"
      className="position-fixed z-2 start-0 end-0 mx-auto"
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
