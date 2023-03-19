import { StyledRadioLabel } from "@/components/styles/radioStyle";
import { nanoid } from "nanoid";
import { useEffect, useRef, useState } from "react";

function Radio({ options = [], name = "radio", onChange = () => {}, ...props }) {
  const idRef = useRef(nanoid());
  const [selected, setSelected] = useState("");

  useEffect(() => {
    onChange(selected);
  }, [selected]);

  return (
    <div className="flex flex-wrap gap-1">
      {options.map((option) => (
        <>
          <StyledRadioLabel htmlFor={`${option}-${idRef.current}`} key={option} isSelected={selected === option}>
            <span>{option}</span>
          </StyledRadioLabel>
          <input
            hidden
            type="radio"
            id={`${option}-${idRef.current}`}
            name={`${name}-${idRef.current}`}
            value={option}
            onChange={(e) => setSelected(e.target.value)}
          />
        </>
      ))}
    </div>
  );
}

export default Radio;
