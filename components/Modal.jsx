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

  const closeModalOnOverlayClick = (e) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) closeModal();
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="modal fixed inset-0 bg-gray-700 p-4 h-screen overflow-y-auto flex flex-col justify-center items-center"
      style={{ background: "rgba(0,0,0,0.7)" }}
      onClick={closeModalOnOverlayClick}
    >
      {children}
    </div>,
    modalContainer
  );
}

export default Modal;
