import { CARD, WeatherCode } from '../constant';

interface FormattedParameter {
  id: string;
  description: string;
  values: { unit: string; value: string }[];
}

export function formatParameters(parameters: FormattedParameter[]) {
  return parameters.map((parameter) => {
    let value: string = '';
    switch (parameter.id) {
      case 'hu':
      case 'humax':
      case 'humin':
        value = `${parameter.values.find((value) => value.unit === '%')?.value || '-'}%`;
        break;
      case 't':
      case 'tmax':
      case 'tmin':
        value = `${parameter.values.find((value) => value.unit === 'C')?.value || '-'}°C`;
        break;
      case 'ws':
        value = `${parameter.values.find((value) => value.unit === 'KPH')?.value.replace('.', ',') || '-'} Km/Jam`;
        break;
      case 'wd':
        value =
          CARD[
            parameter.values.find((value) => value.unit === 'CARD')
              ?.value as keyof typeof CARD
          ] || '-';
        break;
      case 'weather':
        // eslint-disable-next-line no-case-declarations
        const icon = parameter.values.find((value) => value.unit === 'icon')?.value;
        value = icon ? `${icon} - ${WeatherCode[icon as keyof typeof WeatherCode]}` : '-';
        break;
      default:
        value = `${parameter.values[0]?.value || ''}${parameter.values[0]?.unit || ''}`;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { values, ...rest } = parameter; // Remove values from the object

    return { ...rest, value };
  });
}
