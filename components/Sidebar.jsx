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

  //   if (!isOpen) return null;
  // TODO: do the sidebar transition with an animation library and reenable above line

  return createPortal(
    <div
      className={`sidebar fixed inset-0 h-screen flex justify-end ${isOpen ? "" : "invisible"}`}
      style={{ background: "rgba(0,0,0,0.7)" }}
      onClick={closeSidebarOnOverlayClick}
    >
      <div
        className={`w-80 max-w-xs h-full bg-white transition-transform transform-gpu ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {children}
      </div>
    </div>,
    sidebarContainer
  );
}

export default Sidebar;
