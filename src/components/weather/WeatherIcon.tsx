import {
  WiCloud,
  WiCloudy,
  WiDayCloudy,
  WiDayHaze,
  WiDayRain,
  WiDayRainMix,
  WiDayShowers,
  WiDaySleet,
  WiDaySunny,
  WiDayThunderstorm,
  WiFog,
  WiNa,
} from 'react-icons/wi';

interface WeatherIconProps {
  value: string;
}

export default function WeatherIcon({ value }: WeatherIconProps) {
  const size = 120;

  switch (value) {
    case '0':
      return <WiDaySunny size={size} />;
    case '1':
    case '2':
      return <WiDayCloudy size={size} />;
    case '3':
      return <WiCloud size={size} />;
    case '4':
      return <WiCloudy size={size} />;
    case '5':
    case '45':
      return <WiDayHaze size={size} />;
    case '10':
      return <WiFog size={size} />;
    case '60':
      return <WiDayShowers size={size} />;
    case '61':
      return <WiDaySleet size={size} />;
    case '63':
      return <WiDayRain size={size} />;
    case '80':
      return <WiDayRainMix size={size} />;
    case '95':
    case '99':
      return <WiDayThunderstorm size={size} />;
    default:
      return <WiNa size={size} title='Tidak diketahui' />;
  }
}
