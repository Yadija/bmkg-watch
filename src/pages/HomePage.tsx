import { Card, CardBody, Option, Select, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';

import { fetchNewestEarthquake, fetchWeather } from '../api';
import { NewestEarthquake, WeatherData } from '../interface';
import { formatWeatherData } from '../utils';

export default function HomePage() {
  const [newestEarthquake, setNewestEarthquake] = useState<NewestEarthquake | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [valueArea, setValueArea] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const weather = await fetchWeather();
      setWeather(weather);

      if (weather) setValueArea(weather.areas[0].id);

      const earthquake = await fetchNewestEarthquake();
      setNewestEarthquake(earthquake);
    };

    fetchData();
  }, []);
  if (!weather) return null;

  const formattedWeather = formatWeatherData(weather);
  return (
    <section className='flex flex-col-reverse gap-5 lg:flex-row'>
      <section className='flex-1'>
        <section className='flex justify-between'>
          <Typography variant='h1' className='mb-2 text-2xl font-semibold'>
            Perkiraan cuaca
          </Typography>
          <a href='/cuaca' className='text-blue-500 underline'>
            lihat semua
          </a>
        </section>

        <Select
          variant='outlined'
          label='-- Pilih Wilayah --'
          value={valueArea}
          onChange={(value) => {
            if (value) setValueArea(value);
          }}
        >
          {formattedWeather.areas.map((area) => (
            <Option key={area.id} value={area.id}>
              {area.name}
            </Option>
          ))}
        </Select>

        {valueArea &&
          formattedWeather.areas
            .filter((area) => area.id === valueArea)
            .map((area) => (
              <Card key={area.id} className='mt-2 bg-gray-200'>
                <CardBody>
                  <Typography variant='h2' className='mb-2 text-xl font-semibold'>
                    {area.name}{' '}
                    <span className='text-sm'>({formattedWeather.issue.datetime})</span>
                  </Typography>

                  <section className='grid grid-cols-1 gap-5 md:grid-cols-2'>
                    {area.timeranges.slice(0, 4).map((timerange) => (
                      <Card key={timerange.hourly}>
                        <CardBody>
                          <Typography
                            variant='h3'
                            className='mb-2 text-base font-semibold'
                          >
                            {timerange.datetime}
                          </Typography>

                          {timerange.parameters.map((parameter) => (
                            <Typography
                              key={parameter.id}
                              variant='paragraph'
                              className='text-sm'
                            >
                              <span className='font-bold'>{parameter.description}</span>:{' '}
                              {parameter.values[0].value} {parameter.values[0].unit}
                            </Typography>
                          ))}
                        </CardBody>
                      </Card>
                    ))}
                  </section>
                </CardBody>
              </Card>
            ))}
      </section>

      <section className='w-full lg:w-[350px]'>
        {newestEarthquake && (
          <Card className='sticky top-2 rounded-lg border p-4 shadow-md'>
            <CardBody className='flex flex-col'>
              <Typography variant='h1' className='text-center text-2xl font-bold'>
                Info Gempa Terbaru
              </Typography>
              <a href='/gempa' className='m-auto w-full'>
                <img
                  src={`https://data.bmkg.go.id/DataMKG/TEWS/${newestEarthquake.shakemap}`}
                  alt='Shakemap'
                  className='mt-2 h-auto w-full cursor-pointer overflow-hidden transition-opacity hover:opacity-90'
                  title={newestEarthquake.wilayah}
                />
              </a>
            </CardBody>
          </Card>
        )}
      </section>
    </section>
  );
}
