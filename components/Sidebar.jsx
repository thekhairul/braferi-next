import { motion } from "framer-motion";
import { useEffect } from "react";
import { createPortal } from "react-dom";

function Sidebar({ children, appendTo, isOpen, closeSidebar }) {
  const sidebarContainer = document.querySelector(appendTo);

  useEffect(() => {
    const closeOnEscapeKey = (e) => (e.key === "Escape" ? closeSidebar() : null);
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [closeSidebar]);

  const closeSidebarOnOverlayClick = (e) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) closeSidebar();
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="sidebar fixed inset-0 h-screen flex justify-end"
      style={{ background: "rgba(0,0,0,0.7)" }}
      onClick={closeSidebarOnOverlayClick}
    >
      <motion.div
        className="w-80 max-w-xs h-full bg-white"
        initial={{ translateX: "100%" }}
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