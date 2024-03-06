import { motion } from "framer-motion";
import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";

function Sidebar({ children, appendTo, isOpen, closeSidebar, position = "end" }) {
  const sidebarContainer = document.querySelector(appendTo);

  const close = useCallback(() => {
    document.body.style.overflowY = "auto";
    closeSidebar();
  }, [closeSidebar]);

  useEffect(() => {
    const closeOnEscapeKey = (e) => (e.key === "Escape" ? close() : null);
    document.body.addEventListener("keydown", closeOnEscapeKey);
    document.body.style.overflowY = isOpen ? "hidden" : "auto";
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [close, isOpen]);

  const closeSidebarOnOverlayClick = (e) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) close();
  };

  const classes = `sidebar fixed inset-0 h-screen overflow-x-hidden overflow-y-auto flex ${
    position === "end" ? "justify-end" : "justify-start"
  }`;

  if (!isOpen) return null;

  return createPortal(
    <div className={classes} style={{ background: "rgba(0,0,0,0.7)" }} onClick={closeSidebarOnOverlayClick}>
      <motion.div
        className="w-80 max-w-xs h-full bg-white"
        initial={{ translateX: position === "end" ? "100%" : "-100%" }}
        animate={{ translateX: "0px" }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </div>,
    sidebarContainer
  );
}

export default Sidebar;
