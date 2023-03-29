import { StyledRadioLabel } from "@/components/styles/radioStyle";
import { nanoid } from "nanoid";
import { useEffect, useMemo, useRef, useState } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

function Radio({ variant = "tick", options = [], name = "radio", onChange = () => {}, ...props }) {
  const idRef = useRef(nanoid());
  const [selected, setSelected] = useState("");

  useEffect(() => {
    onChange(selected);
  }, [selected]);

  const formattedOptions = useMemo(() => {
    if (options.every((option) => typeof option === "object")) return options;
    return options.map((option) => ({ label: option }));
  }, [options]);

  const tick = (option) => {
    if (variant !== "tick") return null;
    return selected === option ? <MdCheckBox className="text-accent" /> : <MdCheckBoxOutlineBlank />;
  };

  const handleInput = (e) => {
    if (selected === e.target.value) setSelected("");
    else setSelected(e.target.value);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {formattedOptions.map((option) => (
        <StyledRadioLabel
          htmlFor={`${option.label}-${idRef.current}`}
          key={option.label}
          variant={variant}
          isSelected={selected === option.label}
        >
          <span className="inline-flex items-center gap-1">
            {tick(option.label)}
            {option.label}
          </span>
          <input
            hidden
            type="radio"
            id={`${option.label}-${idRef.current}`}
            name={`${name}-${idRef.current}`}
            value={option.label}
            onClick={handleInput}
          />
        </StyledRadioLabel>
      ))}
    </div>
  );
}

export default Radio;
