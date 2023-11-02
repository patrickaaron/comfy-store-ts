import { useState } from "react";
import { cn, formatPrice } from "../lib/utils";

interface FormRangeProps {
  label: string;
  name: string;
  value?: string | number;
  min?: number | string;
  max: number | string;
  step: number;
  size?: string;
}

export const FormRange = ({
  label,
  name,
  value,
  min = 0,
  max,
  step,
  size,
}: FormRangeProps) => {
  const [selectedPrice, setSelectedPrice] = useState(value || max);

  return (
    <div className="form-control">
      <label htmlFor={name} className="label cursor-pointer">
        <span className="label-text">{label}</span>
        <span>{formatPrice(Number(selectedPrice))}</span>
      </label>
      <input
        type="range"
        name={name}
        min={min}
        max={max}
        value={selectedPrice}
        step={step}
        onChange={(e) => setSelectedPrice(e.target.value)}
        className={cn("range range-primary", size)}
      />
      <div className="w-full flex justify-between text-xs px-2 mt-2">
        <span className="font-bold text-md">0</span>
        <span className="font-bold text-md">
          Max: {formatPrice(Number(selectedPrice))}
        </span>
      </div>
    </div>
  );
};
