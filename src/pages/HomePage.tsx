import {
  Card,
  CardBody,
  Dialog,
  Option,
  Select,
  Typography,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';

import { fetchNewestEarthquake, fetchWeather } from '../api';
import WeatherContent from '../components/weather/WeatherContent';
import { NewestEarthquake, WeatherData } from '../interface';
import { formatWeatherData } from '../utils';

export default function HomePage() {
  const [newestEarthquake, setNewestEarthquake] = useState<NewestEarthquake | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [areaId, setAreaId] = useState<string>('');

  // dialog
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((prev) => !prev);

  useEffect(() => {
    const fetchData = async () => {
      const weather = await fetchWeather();
      setWeather(weather);
      setAreaId(weather?.areas[0].id || '');

      const earthquake = await fetchNewestEarthquake();
      setNewestEarthquake(earthquake);
    };

    fetchData();
  }, []);

  const formattedWeather = weather ? formatWeatherData(weather) : null;

  return (
    <>
      <header className='mb-5 rounded-lg border bg-green-300 p-4 shadow-md'>
        <Typography variant='paragraph' className='text-lg'>
          Data ini diperoleh dari <span className='font-bold'>BMKG</span> (Badan
          Meteorologi, Klimatologi, dan Geofisika Indonesia).
        </Typography>
        <Typography variant='paragraph' className='text-sm'>
          BMKG bertanggung jawab untuk menyediakan informasi terkait cuaca, iklim, dan
          aktivitas seismik di seluruh Indonesia. Untuk informasi lebih lanjut, silakan
          kunjungi situs web{' '}
          <a
            href='https://www.bmkg.go.id'
            target='_blank'
            className='text-blue-500 underline hover:text-blue-700'
            rel='noreferrer'
          >
            bmkg
          </a>
          .
        </Typography>
      </header>

      <section className='flex min-h-[calc(100vh-160px)] flex-col-reverse gap-5 lg:flex-row'>
        <section className='flex-1'>
          <section className='flex justify-between'>
            <Typography variant='h1' className='mb-2 text-2xl font-semibold'>
              Perkiraan cuaca
            </Typography>
            <a href='/cuaca' className='text-blue-500 underline'>
              lihat semua
            </a>
          </section>

          {formattedWeather ? (
            <>
              <Select
                variant='outlined'
                label='-- Pilih Wilayah --'
                value={areaId}
                onChange={(value) => {
                  if (value) setAreaId(value);
                }}
              >
                {formattedWeather.areas.map((area) => (
                  <Option key={area.id} value={area.id}>
                    {area.name}
                  </Option>
                ))}
              </Select>

              {areaId &&
                formattedWeather.areas
                  .filter((area) => area.id === areaId)
                  .map((area) => (
                    <Card key={area.id} className='mt-2'>
                      <CardBody>
                        <Typography variant='h2' className='text-xl font-semibold'>
                          {area.name}{' '}
                          <span className='text-sm'>
                            ({formattedWeather.issue.datetime})
                          </span>
                        </Typography>

                        <WeatherContent timeranges={area.timeranges.slice(0, 4)} />
                      </CardBody>
                    </Card>
                  ))}
            </>
          ) : (
            <section className='w-full animate-pulse'>
              <section className='h-10 w-full rounded-lg bg-white'></section>
              <Card className='mt-2 w-full rounded-lg bg-white'>
                <CardBody>
                  <Typography
                    as='div'
                    variant='h2'
                    className='mb-2 h-6 w-72 rounded-full bg-gray-300'
                  >
                    &nbsp;
                  </Typography>
                  <Typography
                    as='div'
                    variant='paragraph'
                    className='mb-5 ml-3 mt-8 h-6 w-52 rounded-full bg-gray-300 p-3'
                  >
                    &nbsp;
                  </Typography>

                  <section className='h-[420px] w-full bg-gray-300 lg:h-[300px]'></section>
                </CardBody>
              </Card>
            </section>
          )}
        </section>

        <section className='w-full lg:w-[350px]'>
          {newestEarthquake ? (
            <Card className='sticky top-2 rounded-lg border p-4 shadow-md'>
              <CardBody className='flex flex-col'>
                <Typography variant='h1' className='mb-2 text-center text-2xl font-bold'>
                  Info Gempa Terbaru
                </Typography>
                <button className='m-auto w-full' onClick={handleOpen}>
                  <img
                    src={`https://data.bmkg.go.id/DataMKG/TEWS/${newestEarthquake.shakemap}`}
                    alt='Shakemap'
                    className='h-auto w-full cursor-pointer overflow-hidden transition-opacity hover:opacity-90'
                    title={newestEarthquake.wilayah}
                  />
                </button>
              </CardBody>
            </Card>
          ) : (
            <Card className='sticky top-2 rounded-lg border p-4 shadow-md'>
              <CardBody>
                <Typography variant='h1' className='mb-2 text-center text-2xl font-bold'>
                  Info Gempa Terbaru
                </Typography>

                <section className='m-auto w-full animate-pulse'>
                  <section className='grid h-[600px] w-full place-items-center overflow-hidden bg-gray-300 lg:h-[270px]'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={2}
                      stroke='currentColor'
                      className='size-12 text-gray-500'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z'
                      />
                    </svg>
                  </section>
                </section>
              </CardBody>
            </Card>
          )}
        </section>
      </section>

      <Dialog size='sm' open={open} handler={handleOpen}>
        <img
          src={`https://data.bmkg.go.id/DataMKG/TEWS/${newestEarthquake?.shakemap}`}
          alt='Shakemap'
          className='h-auto w-full'
        />
      </Dialog>
    </>
  );
}
