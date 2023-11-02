interface OptionsProps {
  range?: [number, number, number];
  data?: number[] | string[];
}

export const Options = ({ range = [1, 10, 1], data }: OptionsProps) => {
  const [start, stop, step] = [...range];
  // If data is available, range will be ignored
  if (data && data.length > 0) {
    return data.map((v) => (
      <option key={v} value={v}>
        {v}
      </option>
    ));
  }

  return Array.from({ length: (stop - start) / step + 1 }, (_, i) => {
    const amount = start + i * step;
    return (
      <option key={amount} value={amount}>
        {amount}
      </option>
    );
  });
};
