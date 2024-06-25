import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import { EarthquakeData } from '../../interface';

interface EarthquakeItemProps {
  earthquake: EarthquakeData;
}

export default function EarthquakeItem({ earthquake }: EarthquakeItemProps) {
  return (
    <section className='flex flex-[1] flex-col justify-evenly rounded-lg border p-4 shadow-md lg:px-10 xl:flex-row'>
      <section className='flex flex-[1] flex-col justify-evenly'>
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
        {earthquake.potensi && (
          <p>
            <span className='font-bold'>Potensi:</span> {earthquake.potensi}
          </p>
        )}
        {earthquake.dirasakan && (
          <p>
            <span className='font-bold'>Dirasakan (Skala MMI):</span>{' '}
            {earthquake.dirasakan}
          </p>
        )}
      </section>

      <section className='m-auto mt-5 w-full xl:mt-0 xl:max-w-[350px]'>
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
      </section>
    </section>
  );
}
