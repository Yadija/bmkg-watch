import { NewestEarthquake } from '../../interface';

interface EarthquakeDetailProps {
  earthquake: NewestEarthquake;
}

export default function EarthquakeDetail({ earthquake }: EarthquakeDetailProps) {
  return (
    <section className='rounded-lg border p-4 shadow-md'>
      <h1 className='mb-4 text-center text-2xl font-bold'>Info Gempa Terbaru</h1>
      <section className='flex flex-col lg:flex-row'>
        <section className='flex flex-[1] flex-col justify-evenly px-4 lg:px-10'>
          <h2 className='mb-2 text-xl font-semibold'>{earthquake.wilayah}</h2>
          <p>
            <span className='font-bold'>Tanggal:</span> {earthquake.tanggal}
          </p>
          <p>
            <span className='font-bold'>Jam:</span> {earthquake.jam}
          </p>
          <p>
            <span className='font-bold'>Latitude:</span> {earthquake.lintang}
          </p>
          <p>
            <span className='font-bold'>Longitude:</span> {earthquake.bujur}
          </p>
          <p>
            <span className='font-bold'>Magnitude:</span> {earthquake.magnitude}
          </p>
          <p>
            <span className='font-bold'>Kedalaman:</span> {earthquake.kedalaman}
          </p>
          <p>
            <span className='font-bold'>Potensi:</span> {earthquake.potensi}
          </p>
          <p>
            <span className='font-bold'>Dirasakan (Skala MMI):</span>{' '}
            {earthquake.dirasakan}
          </p>
        </section>
        <section className='m-auto w-full max-w-[450px]'>
          <img
            src={`https://data.bmkg.go.id/DataMKG/TEWS/${earthquake.shakemap}`}
            alt='Shakemap'
            className='mt-2 h-auto w-full'
          />
        </section>
      </section>
    </section>
  );
}
