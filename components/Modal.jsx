import { useEffect } from "react";
import { createPortal } from "react-dom";

function Modal({ children, appendTo, isOpen, closeModal }) {
  const modalContainer = document.querySelector(appendTo);

  useEffect(() => {
    const closeOnEscapeKey = (e) => (e.key === "Escape" ? closeModal() : null);
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [closeModal]);

  if (!isOpen) return null;

  return createPortal(
    <div className="modal">
      {children}
      <button onClick={closeModal}>X</button>
    </div>,
    modalContainer
  );
}

export default Modal;
