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
  WiNightAltCloudy,
  WiNightAltRain,
  WiNightAltRainMix,
  WiNightAltShowers,
  WiNightAltSleet,
  WiNightAltThunderstorm,
  WiNightClear,
  WiSmog,
} from 'react-icons/wi';

interface WeatherIconProps {
  value: string;
  day?: boolean;
}

export default function WeatherIcon({ value, day = true }: WeatherIconProps) {
  const size = 120;

  switch (value) {
    case '0':
      return day ? <WiDaySunny size={size} /> : <WiNightClear size={size} />;
    case '1':
    case '2':
      return day ? <WiDayCloudy size={size} /> : <WiNightAltCloudy size={size} />;
    case '3':
      return <WiCloud size={size} />;
    case '4':
      return <WiCloudy size={size} />;
    case '5':
      return day ? <WiDayHaze size={size} /> : <WiFog size={size} />;
    case '10':
      return <WiSmog size={size} />;
    case '45':
      return <WiFog size={size} />;
    case '60':
      return day ? <WiDayShowers size={size} /> : <WiNightAltShowers size={size} />;
    case '61':
      return day ? <WiDaySleet size={size} /> : <WiNightAltSleet size={size} />;
    case '63':
      return day ? <WiDayRain size={size} /> : <WiNightAltRain size={size} />;
    case '80':
      return day ? <WiDayRainMix size={size} /> : <WiNightAltRainMix size={size} />;
    case '95':
    case '99':
      return day ? (
        <WiDayThunderstorm size={size} />
      ) : (
        <WiNightAltThunderstorm size={size} />
      );
    default:
      return <WiNa size={size} title='Tidak diketahui' />;
  }
}
