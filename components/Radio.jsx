import { StyledRadioLabel } from "@/components/styles/radioStyle";
import { nanoid } from "nanoid";
import { useMemo, useRef } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

function Radio({ variant = "tick", selected = "", options = [], name = "radio", onChange = () => {}, ...props }) {
  const idRef = useRef(nanoid());
  const formattedOptions = useMemo(() => {
    if (options.every((option) => typeof option === "object")) return options;
    return options.map((option) => ({ label: option, value: option }));
  }, [options]);

  const tick = (value) => {
    if (variant !== "tick") return null;
    return selected === value ? <MdCheckBox className="text-accent" /> : <MdCheckBoxOutlineBlank />;
  };

  const handleInput = (e) => {
    if (selected === e.target.value) onChange("");
    else onChange(e.target.value);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {formattedOptions.map((option) => (
        <StyledRadioLabel
          htmlFor={`${option.label}-${idRef.current}`}
          key={option.label}
          variant={variant}
          isSelected={selected === option.value}
        >
          <span className="inline-flex items-center gap-1">
            {tick(option.value)}
            {option.label}
          </span>
          <input
            hidden
            type="radio"
            id={`${option.label}-${idRef.current}`}
            name={`${name}-${idRef.current}`}
            value={option.value}
            onClick={handleInput}
          />
        </StyledRadioLabel>
      ))}
    </div>
  );
}

export default Radio;
