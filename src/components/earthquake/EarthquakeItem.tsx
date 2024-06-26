import { Card, CardBody, Typography } from '@material-tailwind/react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import { EarthquakeData } from '../../interface';

interface EarthquakeItemProps {
  earthquake: EarthquakeData;
}

export default function EarthquakeItem({ earthquake }: EarthquakeItemProps) {
  return (
    <Card className='flex w-full flex-col justify-evenly xl:flex-row'>
      <CardBody className='flex w-full flex-col justify-evenly'>
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
        {earthquake.potensi && (
          <Typography variant='paragraph'>
            <span className='font-bold'>Potensi:</span> {earthquake.potensi}
          </Typography>
        )}
        {earthquake.dirasakan && (
          <Typography variant='paragraph'>
            <span className='font-bold'>Dirasakan (Skala MMI):</span>{' '}
            {earthquake.dirasakan}
          </Typography>
        )}
      </CardBody>

      <CardBody className='m-auto mt-5 w-full xl:mt-0 xl:max-w-[350px]'>
        <MapContainer
          center={[Number(earthquake.coordinates[0]), Number(earthquake.coordinates[1])]}
          zoom={8}
          scrollWheelZoom={false}
          className='h-96 w-full'
        >
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker
            position={[
              Number(earthquake.coordinates[0]),
              Number(earthquake.coordinates[1]),
            ]}
          >
            <Popup>{earthquake.potensi || earthquake.dirasakan}</Popup>
          </Marker>
        </MapContainer>
      </CardBody>
    </Card>
  );
}
