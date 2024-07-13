import { Card, CardBody, Option, Select, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';

import { fetchWeather } from '../api';
import WeatherContent from '../components/weather/WeatherContent';
import { Province } from '../constant';
import { WeatherData } from '../interface';
import { formatWeatherData } from '../utils';

export default function WeatherPage() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [regencyId, setRegencyId] = useState<string>('');
  const [datetime, setDatetime] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const weather = await fetchWeather();
      const datetime = weather ? formatWeatherData(weather).issue.datetime : '';
      setDatetime(datetime);
    };

    fetchData();
  }, []);

  const handleChange = async (province: keyof typeof Province) => {
    const weather = await fetchWeather(province);
    setWeather(weather);
  };

  const formattedWeather = weather ? formatWeatherData(weather) : null;

  return (
    <section className='min-h-[calc(100vh-160px)] p-4'>
      <Card className='mb-5'>
        <CardBody>
          <Typography variant='h2' className='mb-2 text-xl font-semibold'>
            Waktu mengambil data pada BMKG
          </Typography>

          {datetime ? (
            <Typography variant='paragraph'>{datetime}</Typography>
          ) : (
            <Typography
              as='div'
              variant='paragraph'
              className='h-[26px] w-56 animate-pulse rounded-full bg-gray-300'
            >
              &nbsp;
            </Typography>
          )}
        </CardBody>
      </Card>
      <Card>
        <CardBody className='flex flex-col justify-between gap-5 lg:flex-row'>
          <Select
            variant='outlined'
            label='-- Pilih Provinsi --'
            onChange={(value) => handleChange(value as keyof typeof Province)}
          >
            {Object.keys(Province).map((key) => (
              <Option key={key} value={key}>
                {Province[key as keyof typeof Province]}
              </Option>
            ))}
          </Select>

          <Select
            variant='outlined'
            label='-- Pilih Kabupaten / Kota --'
            onChange={(value) => setRegencyId(value as string)}
            disabled={!formattedWeather}
          >
            {formattedWeather ? (
              formattedWeather.areas.map((area) => (
                <Option key={area.id} value={area.id}>
                  {area.name}
                </Option>
              ))
            ) : (
              <Option value=''>-- Pilih Provinsi Terlebih Dahulu --</Option>
            )}
          </Select>
        </CardBody>
      </Card>

      {formattedWeather &&
        regencyId &&
        formattedWeather.areas
          .filter((area) => area.id === regencyId)
          .map((area) => (
            <Card key={area.id} className='mt-5'>
              <CardBody>
                <Typography variant='h2' className='mb-2 text-xl font-semibold'>
                  {area.name}
                </Typography>

                {area.timeranges.length === 0 ? (
                  <Typography variant='paragraph' className='text-red-500'>
                    Data tidak tersedia untuk kota / kabupaten ini.
                  </Typography>
                ) : (
                  <WeatherContent timeranges={area.timeranges} />
                )}
              </CardBody>
            </Card>
          ))}
    </section>
  );
}
