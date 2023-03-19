import { nanoid } from "nanoid";
import { useRef } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

function Checkbox({ checked, onChange, className, ...props }) {
  const idRef = useRef(nanoid());
  return (
    <label
      htmlFor={`checkbox-${idRef.current}`}
      className={`inline-flex items-center gap-2 cursor-pointer ${className || ""}`}
      {...props}
    >
      {checked ? <MdCheckBox className="text-accent" /> : <MdCheckBoxOutlineBlank />}
      <input
        id={`checkbox-${idRef.current}`}
        type="checkbox"
        hidden
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      {props.children}
    </label>
  );
}

export default Checkbox;
