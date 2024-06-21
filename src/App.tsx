import { useEffect, useState } from 'react';

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

function App() {
  const [newestEarthquake, setNewestEarthquake] = useState<NewestEarthquake | null>(null);

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

  useEffect(() => {
    fetchNewestEarthquake();
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
    </main>
  );
}

export default App;
