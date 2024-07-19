// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { Typography } from '@material-tailwind/react';
import { WiHumidity, WiStrongWind, WiWindDeg } from 'react-icons/wi';
// Import required modules
import { Navigation } from 'swiper/modules';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import { CARD, WeatherCode } from '../../constant';
import WeatherIcon from './WeatherIcon';
import WeatherParameter from './WeatherParameter';

interface Parameter {
  id: string;
  description: string;
  values: { unit: string; value: string }[];
}

interface Timerange {
  datetime: string;
  day: string;
  hourly: string;
  parameters: Parameter[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface WeatherContentProps {
  timeranges: Timerange[];
}

export default function WeatherContent({ timeranges }: WeatherContentProps) {
  const dailyTimeranges = timeranges.map((timerange) => timerange.day); // [a, a, ..., b, b, ...]
  const uniqueDailyTimeranges = [...new Set(dailyTimeranges)]; // [a, b]

  const getParameterValue = (parameters: Parameter[], id: string, unit: string) => {
    return (
      parameters
        .find((parameter) => parameter.id === id)
        ?.values.find((value) => value.unit === unit)?.value ?? 'N/A'
    );
  };

  const temperature = (parameters: Parameter[], unit: string = 'C') => {
    const value = getParameterValue(parameters, 't', unit);
    return value === 'N/A' ? value : `${value}°${unit}`;
  };

  const humidity = (parameters: Parameter[]) => {
    const value = getParameterValue(parameters, 'hu', '%');
    return value === 'N/A' ? value : `${value}%`;
  };

  const windSpeed = (parameters: Parameter[]) => {
    const value = getParameterValue(parameters, 'ws', 'KPH');
    return value === 'N/A' ? value : `${value.replace('.', ',')} Km/jam`;
  };

  const windDirection = (parameters: Parameter[]) => {
    const value = getParameterValue(parameters, 'wd', 'CARD');
    return value === 'N/A' ? value : CARD[value as keyof typeof CARD];
  };

  const weather = (parameters: Parameter[]) => {
    const value = getParameterValue(parameters, 'weather', 'icon');
    return value;
  };

  return (
    <>
      {uniqueDailyTimeranges.map((day) => (
        <section className='mt-5 grid' key={day}>
          <section>
            <p className='p-3 text-lg font-bold'>
              {timeranges
                .find((timerange) => timerange.day === day)
                ?.datetime.split(' ')
                .slice(0, 4)
                .join(' ')}
            </p>
          </section>

          <Swiper modules={[Navigation]} loop navigation className='w-full'>
            {timeranges
              .filter((timerange) => timerange.day === day)
              .map((timerange) => {
                const parameters = timerange.parameters;

                const time = timerange.datetime.split(' ').pop() as string;
                const hour = parseInt(time?.slice(0, 2), 10);
                const isDay = hour >= 6 && hour < 18;
                const classnameDay = isDay
                  ? 'bg-blue-200 text-blue-gray-700'
                  : 'bg-gray-800 text-gray-400';

                const weatherCode = weather(parameters);
                const weatherName = WeatherCode[weatherCode as keyof typeof WeatherCode];

                return (
                  <SwiperSlide key={timerange.hourly}>
                    <section
                      className={`relative flex cursor-default flex-col gap-5 ${classnameDay}`}
                    >
                      <section className='absolute top-0'>
                        <p className='p-3 text-2xl font-bold sm:text-xl'>{time}</p>
                      </section>

                      <section className='flex flex-col justify-between gap-5 lg:flex-row'>
                        <section className='grid h-[200px] w-full place-items-center overflow-hidden'>
                          <section className='cursor-pointer' title={weatherName}>
                            <WeatherIcon value={weatherCode} day={isDay} />
                            <Typography
                              variant='h1'
                              className='text-center text-2xl font-bold'
                            >
                              {weatherName}
                            </Typography>
                          </section>
                        </section>
                        <section className='grid h-[100px] w-full place-items-center overflow-hidden lg:h-[200px]'>
                          <p className='cursor-pointer text-5xl' title='Suhu'>
                            {temperature(parameters, 'C')}
                          </p>
                        </section>
                      </section>

                      <section className='flex w-full flex-row items-center justify-center gap-5 p-5 lg:justify-start'>
                        <WeatherParameter
                          title='Kelembaban'
                          icon={WiHumidity}
                          value={humidity(parameters)}
                        />
                        <WeatherParameter
                          title='Kecepatan Angin'
                          icon={WiStrongWind}
                          value={windSpeed(parameters)}
                        />
                        <WeatherParameter
                          title='Arah Angin'
                          icon={WiWindDeg}
                          value={windDirection(parameters)}
                        />
                      </section>
                    </section>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </section>
      ))}
    </>
  );
}
