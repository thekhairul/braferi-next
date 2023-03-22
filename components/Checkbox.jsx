import { nanoid } from "nanoid";
import { useEffect, useRef, useState } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

function Checkbox({ checked = false, onChange, className, ...props }) {
  const [isChecked, setIsChecked] = useState(checked);
  const idRef = useRef(nanoid());

  useEffect(() => {
    onChange(isChecked);
  }, [isChecked]);

  return (
    <label
      htmlFor={`checkbox-${idRef.current}`}
      className={`inline-flex items-center gap-2 cursor-pointer ${className || ""}`}
      {...props}
    >
      {isChecked ? <MdCheckBox className="text-accent" /> : <MdCheckBoxOutlineBlank />}
      <input
        id={`checkbox-${idRef.current}`}
        type="checkbox"
        hidden
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      />
      {props.children}
    </label>
  );
}

export default Checkbox;
