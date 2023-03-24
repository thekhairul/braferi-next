import { FaRegSadTear } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";

function Loader({ type = "loading" }) {
  let placeholder = null;
  if (type === "loading") placeholder = <FiLoader className="text-5xl" />;
  if (type === "error") placeholder = <FaRegSadTear className="text-5xl" />;
  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-white shadow-lg rounded-md">
      {placeholder}
    </div>
  );
}

export default Loader;
