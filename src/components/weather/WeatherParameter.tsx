interface WeatherParameterProps {
  title: string;
  icon: ({ size }: { size: number }) => JSX.Element;
  value: string;
}

export default function WeatherParameter({
  title,
  icon: Icon,
  value,
}: WeatherParameterProps) {
  return (
    <section className='flex cursor-pointer flex-col items-center' title={title}>
      <Icon size={34} />
      <p className='text-sm'>{value}</p>
    </section>
  );
}
