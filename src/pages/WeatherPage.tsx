import { Card, CardBody, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';

import { fetchWeather } from '../api';
import { WeatherData } from '../interface';
import { formatWeatherData } from '../utils';

export default function WeatherPage() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const weather = await fetchWeather();
      setWeather(weather);
    };

    fetchData();
  }, []);
  if (!weather) return null;

  const formattedWeather = formatWeatherData(weather);

  return (
    <>
      <Card className='mb-5'>
        <CardBody>
          <Typography variant='h2' className='mb-2 text-xl font-semibold'>
            Waktu
          </Typography>

          <Typography variant='paragraph'>{formattedWeather.issue.datetime}</Typography>
        </CardBody>
      </Card>

      <Typography variant='h2' className='mb-2 px-5 text-xl font-semibold'>
        Wilayah
      </Typography>

      {formattedWeather.areas.map((area) => (
        <Card key={area.id} className='mb-5'>
          <CardBody>
            <Typography variant='h2' className='mb-2 text-xl font-semibold'>
              {area.name}
            </Typography>

            <section className='grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4'>
              {area.timeranges.map((timerange) => (
                <Card key={timerange.hourly} className='mb-5 bg-gray-200'>
                  <CardBody>
                    <Typography variant='h3' className='mb-2 text-base font-semibold'>
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
    </>
  );
}
