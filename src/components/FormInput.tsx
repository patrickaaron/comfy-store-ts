import { cn } from "../lib/utils";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const FormInput = ({
  label,
  name,
  type,
  placeholder,
  value,
  defaultValue,
  onChange,
  className,
  required,
}: FormInputProps) => {
  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        required={required}
        className={cn(
          "input input-bordered dark:placeholder:text-slate-600",
          className
        )}
        onChange={onChange}
      />
    </div>
  );
};
