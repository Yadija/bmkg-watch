import 'leaflet/dist/leaflet.css';

import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

interface NewestEarthquake {
  tanggal: string;
  jam: string;
  lintang: string;
  bujur: string;
  magnitude: string;
  kedalaman: string;
  wilayah: string;
  potensi: string;
  dirasakan: string;
  shakemap: string;
}

interface EarthquakeData {
  tanggal: string;
  jam: string;
  coordinates: string[];
  lintang: string;
  bujur: string;
  magnitude: string;
  kedalaman: string;
  wilayah: string;
  potensi?: string;
  dirasakan?: string;
}

function App() {
  const [newestEarthquake, setNewestEarthquake] = useState<NewestEarthquake | null>(null);
  const [earthquake5Min, setEarthquake5Min] = useState<EarthquakeData[] | null>(null);
  const [earthquakeFelt, setEarthquakeFelt] = useState<EarthquakeData[] | null>(null);

  const fetchNewestEarthquake = async () => {
    const url = 'https://data.bmkg.go.id/DataMKG/TEWS/autogempa.xml';
    try {
      const response = await fetch(url);
      const text = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, 'application/xml');

      const gempa = xmlDoc.getElementsByTagName('gempa')[0];

      const tanggal = gempa.getElementsByTagName('Tanggal')[0].textContent || '';
      const jam = gempa.getElementsByTagName('Jam')[0].textContent || '';
      const lintang = gempa.getElementsByTagName('Lintang')[0].textContent || '';
      const bujur = gempa.getElementsByTagName('Bujur')[0].textContent || '';
      const magnitude = gempa.getElementsByTagName('Magnitude')[0].textContent || '';
      const kedalaman = gempa.getElementsByTagName('Kedalaman')[0].textContent || '';
      const wilayah = gempa.getElementsByTagName('Wilayah')[0].textContent || '';
      const potensi = gempa.getElementsByTagName('Potensi')[0].textContent || '';
      const dirasakan = gempa.getElementsByTagName('Dirasakan')[0].textContent || '';
      const shakemap = gempa.getElementsByTagName('Shakemap')[0].textContent || '';

      setNewestEarthquake({
        tanggal,
        jam,
        lintang,
        bujur,
        magnitude,
        kedalaman,
        wilayah,
        potensi,
        dirasakan,
        shakemap,
      });
    } catch (error) {
      console.error('Error fetching earthquake data:', error);
    }
  };

  const fetchEarthquake5Min = async () => {
    const url = 'https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.xml';
    try {
      const response = await fetch(url);
      const text = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, 'application/xml');

      const gempaElements = Array.from(xmlDoc.getElementsByTagName('gempa'));
      const earthquakesData = gempaElements.map((gempa) => {
        const tanggal = gempa.getElementsByTagName('Tanggal')[0].textContent || '';
        const jam = gempa.getElementsByTagName('Jam')[0].textContent || '';
        const coordinates =
          gempa.getElementsByTagName('coordinates')[0].textContent?.split(',') || [];
        const lintang = gempa.getElementsByTagName('Lintang')[0].textContent || '';
        const bujur = gempa.getElementsByTagName('Bujur')[0].textContent || '';
        const magnitude = gempa.getElementsByTagName('Magnitude')[0].textContent || '';
        const kedalaman = gempa.getElementsByTagName('Kedalaman')[0].textContent || '';
        const wilayah = gempa.getElementsByTagName('Wilayah')[0].textContent || '';
        const potensi = gempa.getElementsByTagName('Potensi')[0].textContent || '';

        return {
          tanggal,
          jam,
          coordinates,
          lintang,
          bujur,
          magnitude,
          kedalaman,
          wilayah,
          potensi,
        };
      });

      setEarthquake5Min(earthquakesData);
    } catch (error) {
      console.error('Error fetching earthquake data:', error);
    }
  };

  const fetchEarthquakeFelt = async () => {
    const url = 'https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.xml';
    try {
      const response = await fetch(url);
      const text = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, 'application/xml');

      const gempaElements = Array.from(xmlDoc.getElementsByTagName('gempa'));
      const earthquakesData = gempaElements.map((gempa) => {
        const tanggal = gempa.getElementsByTagName('Tanggal')[0].textContent || '';
        const jam = gempa.getElementsByTagName('Jam')[0].textContent || '';
        const coordinates =
          gempa.getElementsByTagName('coordinates')[0].textContent?.split(',') || [];
        const lintang = gempa.getElementsByTagName('Lintang')[0].textContent || '';
        const bujur = gempa.getElementsByTagName('Bujur')[0].textContent || '';
        const magnitude = gempa.getElementsByTagName('Magnitude')[0].textContent || '';
        const kedalaman = gempa.getElementsByTagName('Kedalaman')[0].textContent || '';
        const wilayah = gempa.getElementsByTagName('Wilayah')[0].textContent || '';
        const dirasakan = gempa.getElementsByTagName('Dirasakan')[0].textContent || '';

        return {
          tanggal,
          jam,
          coordinates,
          lintang,
          bujur,
          magnitude,
          kedalaman,
          wilayah,
          dirasakan,
        };
      });

      setEarthquakeFelt(earthquakesData);
    } catch (error) {
      console.error('Error fetching earthquake data:', error);
    }
  };

  useEffect(() => {
    fetchNewestEarthquake();
    fetchEarthquake5Min();
    fetchEarthquakeFelt();
  }, []);

  if (!newestEarthquake) {
    return <div className='mt-10 text-center'>Loading...</div>;
  }

  return (
    <main className='container mx-auto p-4'>
      <section className='rounded-lg border p-4 shadow-md'>
        <h1 className='mb-4 text-center text-2xl font-bold'>Info Gempa Terbaru</h1>
        <section className='flex flex-col lg:flex-row'>
          <section className='flex flex-[1] flex-col justify-evenly px-4 lg:px-10'>
            <h2 className='mb-2 text-xl font-semibold'>{newestEarthquake.wilayah}</h2>
            <p>
              <span className='font-bold'>Tanggal:</span> {newestEarthquake.tanggal}
            </p>
            <p>
              <span className='font-bold'>Jam:</span> {newestEarthquake.jam}
            </p>
            <p>
              <span className='font-bold'>Latitude:</span> {newestEarthquake.lintang}
            </p>
            <p>
              <span className='font-bold'>Longitude:</span> {newestEarthquake.bujur}
            </p>
            <p>
              <span className='font-bold'>Magnitude:</span> {newestEarthquake.magnitude}
            </p>
            <p>
              <span className='font-bold'>Kedalaman:</span> {newestEarthquake.kedalaman}
            </p>
            <p>
              <span className='font-bold'>Potensi:</span> {newestEarthquake.potensi}
            </p>
            <p>
              <span className='font-bold'>Dirasakan:</span> {newestEarthquake.dirasakan}
            </p>
          </section>
          <section className='m-auto w-full max-w-[450px]'>
            <img
              src={`https://data.bmkg.go.id/DataMKG/TEWS/${newestEarthquake.shakemap}`}
              alt='Shakemap'
              className='mt-2 h-auto w-full'
            />
          </section>
        </section>
      </section>

      <section className='flex flex-col justify-between gap-5 lg:flex-row'>
        {/* <section> */}
        <section className='flex flex-[1] justify-between gap-5'>
          <section className='flex flex-[1] flex-col gap-5'>
            <h1 className='mt-4 text-center text-2xl font-bold'>
              Daftar 5 Gempabumi M 5,0+
            </h1>
            {earthquake5Min &&
              earthquake5Min.map((earthquake, index) => (
                <section
                  key={index}
                  className='flex flex-[1] flex-col justify-evenly rounded-lg border p-4 shadow-md lg:px-10 xl:flex-row'
                >
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
                  </section>

                  <section className='m-auto mt-5 w-full xl:mt-0 xl:max-w-[350px]'>
                    <MapContainer
                      center={[
                        Number(earthquake.coordinates[0]),
                        Number(earthquake.coordinates[1]),
                      ]}
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
                        <Popup>{earthquake.potensi}</Popup>
                      </Marker>
                    </MapContainer>
                  </section>
                </section>
              ))}
          </section>
        </section>

        <section className='flex flex-[1] justify-between gap-5'>
          <section className='flex flex-[1] flex-col gap-5'>
            <h1 className='mt-4 text-center text-2xl font-bold'>
              Daftar 5 Gempabumi Dirasakan
            </h1>
            {earthquakeFelt &&
              earthquakeFelt.map((earthquake, index) => (
                <section
                  key={index}
                  className='flex flex-[1] flex-col justify-evenly rounded-lg border p-4 shadow-md lg:px-10 xl:flex-row'
                >
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
                    {earthquake.dirasakan && (
                      <p>
                        <span className='font-bold'>Dirasakan:</span>{' '}
                        {earthquake.dirasakan}
                      </p>
                    )}
                  </section>

                  <section className='m-auto mt-5 w-full xl:mt-0 xl:max-w-[350px]'>
                    <MapContainer
                      center={[
                        Number(earthquake.coordinates[0]),
                        Number(earthquake.coordinates[1]),
                      ]}
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
                        <Popup>{earthquake.potensi}</Popup>
                      </Marker>
                    </MapContainer>
                  </section>
                </section>
              ))}
          </section>
        </section>
      </section>
    </main>
  );
}

export default App;
