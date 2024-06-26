import { Card, CardBody, Typography } from '@material-tailwind/react';

import { NewestEarthquake } from '../../interface';

interface EarthquakeDetailProps {
  earthquake: NewestEarthquake;
}

export default function EarthquakeDetail({ earthquake }: EarthquakeDetailProps) {
  return (
    <Card className='rounded-lg border p-4 shadow-md'>
      <Typography variant='h1' className='mb-4 text-center text-2xl font-bold'>
        Info Gempa Terbaru
      </Typography>
      <CardBody className='flex flex-col lg:flex-row'>
        <section className='flex flex-[1] flex-col justify-evenly px-4 lg:px-10'>
          <Typography variant='h2' className='mb-2 text-xl font-semibold'>
            {earthquake.wilayah}
          </Typography>
          <Typography variant='paragraph'>
            <span className='font-bold'>Tanggal:</span> {earthquake.tanggal}
          </Typography>
          <Typography variant='paragraph'>
            <span className='font-bold'>Jam:</span> {earthquake.jam}
          </Typography>
          <Typography variant='paragraph'>
            <span className='font-bold'>Latitude:</span> {earthquake.lintang}
          </Typography>
          <Typography variant='paragraph'>
            <span className='font-bold'>Longitude:</span> {earthquake.bujur}
          </Typography>
          <Typography variant='paragraph'>
            <span className='font-bold'>Magnitude:</span> {earthquake.magnitude}
          </Typography>
          <Typography variant='paragraph'>
            <span className='font-bold'>Kedalaman:</span> {earthquake.kedalaman}
          </Typography>
          <Typography variant='paragraph'>
            <span className='font-bold'>Potensi:</span> {earthquake.potensi}
          </Typography>
          <Typography variant='paragraph'>
            <span className='font-bold'>Dirasakan (Skala MMI):</span>{' '}
            {earthquake.dirasakan}
          </Typography>
        </section>
        <section className='m-auto w-full max-w-[450px]'>
          <img
            src={`https://data.bmkg.go.id/DataMKG/TEWS/${earthquake.shakemap}`}
            alt='Shakemap'
            className='mt-2 h-auto w-full'
          />
        </section>
      </CardBody>
    </Card>
  );
}
