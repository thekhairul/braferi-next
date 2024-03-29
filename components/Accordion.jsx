import { AnimatePresence, motion } from "framer-motion";

const Accordion = ({ id, expanded, setExpanded, title, children }) => {
  const isOpen = expanded === id;

  return (
    <div className="bg-white overflow-hidden rounded-md shadow w-full mb-2">
      <button className="border-b focus:outline-none p-4 text-left w-full" onClick={() => setExpanded(id)}>
        {title || "Accordion Title"}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="p-4"
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
          >
            {children || "Accordion Content"}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordion;
