import { EarthquakeData } from '../../interface';
import EarthquakeItem from './EarthquakeItem';

interface EarthquakeListProps {
  title: string;
  earthquakes: EarthquakeData[] | null;
}

export default function EarthquakeList({ title, earthquakes }: EarthquakeListProps) {
  if (!earthquakes) {
    return <p>Loading...</p>;
  }

  return (
    <section className='my-5 w-full'>
      <h1 className='mb-4 text-center text-2xl font-bold'>{title}</h1>
      <section className='flex flex-[1] flex-col gap-5'>
        {earthquakes &&
          earthquakes.map((earthquake, index) => (
            <EarthquakeItem key={index} earthquake={earthquake} />
          ))}
      </section>
    </section>
  );
}
