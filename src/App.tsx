import 'leaflet/dist/leaflet.css';

import { useEffect, useState } from 'react';

import { fetchEarthquake5Min, fetchEarthquakeFelt, fetchNewestEarthquake } from './api';
import EarthquakeDetail from './components/earthquake/EarthquakeDetail';
import EarthquakeList from './components/earthquake/EarthquakeList';
import { EarthquakeData, NewestEarthquake } from './interface';

export default function App() {
  const [newestEarthquake, setNewestEarthquake] = useState<NewestEarthquake | null>(null);
  const [earthquake5Min, setEarthquake5Min] = useState<EarthquakeData[] | null>(null);
  const [earthquakeFelt, setEarthquakeFelt] = useState<EarthquakeData[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const newest = await fetchNewestEarthquake();
      setNewestEarthquake(newest);

      const eq5Min = await fetchEarthquake5Min();
      setEarthquake5Min(eq5Min);

      const eqFelt = await fetchEarthquakeFelt();
      setEarthquakeFelt(eqFelt);
    };

    fetchData();
  }, []);

  return (
    <main className='container mx-auto p-4'>
      <header className='mb-5 rounded-lg border p-4 shadow-md'>
        <p className='text-lg'>
          Data ini diperoleh dari{' '}
          <a href='https://www.bmkg.go.id/' className='underline'>
            BMKG
          </a>
        </p>
      </header>

      <EarthquakeDetail earthquake={newestEarthquake} />

      <section className='flex flex-col justify-between gap-5 lg:flex-row'>
        <EarthquakeList title='Daftar 15 Gempabumi M 5,0+' earthquakes={earthquake5Min} />
        <EarthquakeList
          title='Daftar 15 Gempabumi Dirasakan'
          earthquakes={earthquakeFelt}
        />
      </section>
    </main>
  );
}
