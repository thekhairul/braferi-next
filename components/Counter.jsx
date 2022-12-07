import { useEffect, useState } from "react";
import { TbMinus, TbPlus } from "react-icons/tb";

function Counter({ max = 10, min = 1, value = 1, className = "", ...props }) {
  const [count, setCount] = useState(value);

  useEffect(() => {
    if (count > max) setCount(max);
  }, [max]);

  const handleCount = (val) => {
    if (val >= min && val <= max) {
      setCount(val);
    }
  };

  return (
    <div className={`inline-flex ${className}`} {...props}>
      <button className="text-dark text-2xl px-2" onClick={() => handleCount(count - 1)}>
        <TbMinus />
      </button>
      <input type="digit" className="flex-grow text-center w-6 focus:outline-none" value={count} readOnly />
      <button className="text-dark text-2xl px-2" onClick={() => handleCount(count + 1)}>
        <TbPlus />
      </button>
    </div>
  );
}

export default Counter;
