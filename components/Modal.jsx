import { motion } from "framer-motion";
import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";

function Modal({ children, appendTo, isOpen, closeModal }) {
  const modalContainer = document.querySelector(appendTo);

  const close = useCallback(() => {
    document.body.style.overflowY = "auto";
    closeModal();
  }, [closeModal]);

  useEffect(() => {
    const closeOnEscapeKey = (e) => (e.key === "Escape" ? close() : null);
    document.body.addEventListener("keydown", closeOnEscapeKey);
    document.body.style.overflowY = isOpen ? "hidden" : "auto";
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [close, isOpen]);

  const closeModalOnOverlayClick = (e) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) close();
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="modal fixed inset-0 bg-gray-700 p-4 h-screen overflow-y-auto flex flex-col justify-center items-center"
      style={{ background: "rgba(0,0,0,0.7)" }}
      onClick={closeModalOnOverlayClick}
    >
      <motion.div
        className="max-w-full max-h-full"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </div>,
    modalContainer
  );
}

export default Modal;
