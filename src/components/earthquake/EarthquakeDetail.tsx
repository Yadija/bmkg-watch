import { Card, CardBody, Dialog, Typography } from '@material-tailwind/react';
import { useState } from 'react';

import { NewestEarthquake } from '../../interface';
import EarthquakeDetailSkeleton from '../skeleton/EarthquakeDetailSkeleton';

interface EarthquakeDetailProps {
  earthquake: NewestEarthquake | null;
}

export default function EarthquakeDetail({ earthquake }: EarthquakeDetailProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((prev) => !prev);

  if (!earthquake) {
    return <EarthquakeDetailSkeleton />;
  }

  return (
    <>
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
          <button className='m-auto w-full max-w-[450px]' onClick={handleOpen}>
            <img
              src={`https://data.bmkg.go.id/DataMKG/TEWS/${earthquake.shakemap}`}
              alt='Shakemap'
              className='mt-2 h-auto w-full cursor-pointer overflow-hidden bg-gray-200 transition-opacity hover:opacity-90'
            />
          </button>
        </CardBody>
      </Card>
      <Dialog size='sm' open={open} handler={handleOpen}>
        <img
          src={`https://data.bmkg.go.id/DataMKG/TEWS/${earthquake.shakemap}`}
          alt='Shakemap'
          className='h-auto w-full'
        />
      </Dialog>
    </>
  );
}
