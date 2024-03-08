import { nanoid } from "nanoid";
import { useRef } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

function Checkbox({ value = false, onChange, className, ...props }) {
  const idRef = useRef(nanoid());

  return (
    <label
      htmlFor={`checkbox-${idRef.current}`}
      className={`inline-flex items-center gap-2 cursor-pointer ${className || ""}`}
      {...props}
    >
      {value ? <MdCheckBox className="text-accent" /> : <MdCheckBoxOutlineBlank />}
      <input
        id={`checkbox-${idRef.current}`}
        type="checkbox"
        hidden
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
      />
      {props.children}
    </label>
  );
}

export default Checkbox;
