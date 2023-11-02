import { cn } from "../lib/utils";

interface FormCheckboxProps {
  label: string;
  name: string;
  defaultValue?: boolean;
  size?: string;
}

export const FormCheckbox = ({
  label,
  name,
  defaultValue,
  size,
}: FormCheckboxProps) => {
  return (
    <div className="form-control items-center">
      <label htmlFor={name} className="label cursor-pointer">
        <span className="label-text">{label}</span>
      </label>
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultValue}
        className={cn("checkbox checkbox-primary", size)}
      />
    </div>
  );
};
