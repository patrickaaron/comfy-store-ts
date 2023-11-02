interface SectionTitleProps {
  title: string;
}

export const SectionTitle = ({ title }: SectionTitleProps) => {
  return (
    <div className="border-b border-gray-200 pb-5">
      <h2 className="text-3xl font-medium tracking-wider">{title}</h2>
    </div>
  );
};
