import { AnimatePresence, motion } from "framer-motion";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
const Accordion = ({ id, expanded, setExpanded, title, children }) => {
  const isOpen = expanded === id;

  return (
    <div className="bg-white overflow-hidden rounded-md shadow w-full mb-2">
      <button
        className="border-b focus:outline-none p-4 text-left text-lg font-semibold w-full inline-flex items-center justify-between"
        onClick={() => setExpanded(id)}
      >
        <span className="text-lg font-semibold">{title || "Accordion Title"}</span>
        {isOpen ? (
          <IoIosArrowUp className="w-6 h-6 text-gray-600" />
        ) : (
          <IoIosArrowDown className="w-6 h-6 text-gray-600" />
        )}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="overflow-hidden"
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{
              height: {
                duration: 0.3,
                ease: "linear",
              },
              opacity: {
                duration: 0.25,
              },
            }}
          >
            <motion.div layout className="p-4">
              {children || "Accordion Content"}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordion;
