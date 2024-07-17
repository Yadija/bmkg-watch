// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { PiWind } from 'react-icons/pi';
import { WiHumidity, WiWindDeg } from 'react-icons/wi';
// Import required modules
import { Navigation } from 'swiper/modules';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import { CARD } from '../../constant';
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

                return (
                  <SwiperSlide key={timerange.hourly}>
                    <section className='relative flex cursor-default flex-col gap-5 bg-blue-200'>
                      <section className='absolute top-0'>
                        <p className='p-3 text-2xl font-bold sm:text-xl'>
                          {timerange.datetime.split(' ').pop()}
                        </p>
                      </section>

                      <section className='flex flex-col justify-between gap-5 lg:flex-row'>
                        <section className='grid h-[200px] w-full place-items-center overflow-hidden'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={2}
                            stroke='currentColor'
                            className='size-12'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z'
                            />
                          </svg>
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
                          icon={PiWind}
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
