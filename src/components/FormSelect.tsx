import { cn } from "../lib/utils";
import { Options } from "./Options";

interface FormSelectProps {
  label: string;
  name: string;
  options: string[];
  defaultValue?: string;
  size?: string;
}

export const FormSelect = ({
  label,
  name,
  options,
  defaultValue,
  size,
}: FormSelectProps) => {
  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="label-text">{label}</span>
      </label>
      <select
        name={name}
        id={name}
        className={cn("select select-bordered", size)}
        defaultValue={defaultValue}
      >
        <Options data={options} />
      </select>
    </div>
  );
};
