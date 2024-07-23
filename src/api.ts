import {
  Area,
  EarthquakeData,
  Issue,
  NewestEarthquake,
  Parameter,
  Timerange,
  WeatherData,
} from './interface';

const parseEarthquakeData = (xmlDoc: XMLDocument) => {
  const gempaElements = Array.from(xmlDoc.getElementsByTagName('gempa'));
  return gempaElements.map((gempa) => {
    const tanggal = gempa.getElementsByTagName('Tanggal')[0].textContent || '';
    const jam = gempa.getElementsByTagName('Jam')[0].textContent || '';
    const coordinates =
      gempa.getElementsByTagName('coordinates')[0].textContent?.split(',') || [];
    const lintang = gempa.getElementsByTagName('Lintang')[0].textContent || '';
    const bujur = gempa.getElementsByTagName('Bujur')[0].textContent || '';
    const magnitude = gempa.getElementsByTagName('Magnitude')[0].textContent || '';
    const kedalaman = gempa.getElementsByTagName('Kedalaman')[0].textContent || '';
    const wilayah = gempa.getElementsByTagName('Wilayah')[0].textContent || '';
    const potensi = gempa.getElementsByTagName('Potensi')[0]?.textContent || '';
    const dirasakan = gempa.getElementsByTagName('Dirasakan')[0]?.textContent || '';

    return {
      tanggal,
      jam,
      coordinates,
      lintang,
      bujur,
      magnitude,
      kedalaman,
      wilayah,
      potensi,
      dirasakan,
    };
  });
};

export const parseWeatherData = (xmlDoc: XMLDocument): WeatherData => {
  const issueElement = xmlDoc.getElementsByTagName('issue')[0];

  const getTagValue = (parent: Element, tagName: string) => {
    const element = parent.getElementsByTagName(tagName)[0];
    return element ? element.textContent || '' : '';
  };

  const padTwoDigits = (num: string) => num.padStart(2, '0');

  const year = getTagValue(issueElement, 'year');
  const month = padTwoDigits(getTagValue(issueElement, 'month'));
  const day = padTwoDigits(getTagValue(issueElement, 'day'));
  const hour = padTwoDigits(getTagValue(issueElement, 'hour'));
  const minute = padTwoDigits(getTagValue(issueElement, 'minute'));
  const second = padTwoDigits(getTagValue(issueElement, 'second'));

  let timestamp = getTagValue(issueElement, 'timestamp');
  if (!timestamp && year && month && day && hour && minute && second) {
    timestamp = `${year}${month}${day}${hour}${minute}${second}`;
  }

  const issue: Issue = {
    timestamp,
    year,
    month,
    day,
    hour,
    minute,
    second,
  };

  const areas = Array.from(xmlDoc.getElementsByTagName('area')).map((area) => {
    const parameters = Array.from(area.getElementsByTagName('parameter')).map(
      (parameter) => {
        const timeranges = Array.from(parameter.getElementsByTagName('timerange')).map(
          (timerange) => {
            const values = Array.from(timerange.getElementsByTagName('value')).map(
              (value) => ({
                unit: value.getAttribute('unit') || '',
                value: value.textContent || '',
              }),
            );

            return {
              type: timerange.getAttribute('type') || '',
              datetime: timerange.getAttribute('datetime') || '',
              hour: timerange.getAttribute('h'),
              day: timerange.getAttribute('day'),
              values,
            } as Timerange;
          },
        );

        return {
          id: parameter.getAttribute('id') || '',
          description: parameter.getAttribute('description') || '',
          type: parameter.getAttribute('type') || '',
          timeranges,
        } as Parameter;
      },
    );

    return {
      id: area.getAttribute('id') || '',
      name: getTagValue(area, 'name'),
      latitude: area.getAttribute('latitude') || '',
      longitude: area.getAttribute('longitude') || '',
      description: area.getAttribute('description') || '',
      domain: area.getAttribute('domain') || '',
      type: area.getAttribute('type') || '',
      parameters,
    } as Area;
  });

  return {
    issue,
    areas,
  };
};

export const fetchNewestEarthquake = async (): Promise<NewestEarthquake | null> => {
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

    return {
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
    };
  } catch (error) {
    console.error('Error fetching earthquake data:', error);
    return null;
  }
};

export const fetchEarthquake5Min = async (): Promise<EarthquakeData[] | null> => {
  const url = 'https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.xml';
  try {
    const response = await fetch(url);
    const text = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, 'application/xml');
    return parseEarthquakeData(xmlDoc);
  } catch (error) {
    console.error('Error fetching earthquake data:', error);
    return null;
  }
};

export const fetchEarthquakeFelt = async (): Promise<EarthquakeData[] | null> => {
  const url = 'https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.xml';
  try {
    const response = await fetch(url);
    const text = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, 'application/xml');
    return parseEarthquakeData(xmlDoc);
  } catch (error) {
    console.error('Error fetching earthquake data:', error);
    return null;
  }
};

export const fetchWeather = async (
  province = 'Indonesia',
): Promise<WeatherData | null> => {
  const url = `https://data.bmkg.go.id/DataMKG/MEWS/DigitalForecast/DigitalForecast-${province}.xml`;
  try {
    const response = await fetch(url);
    const text = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, 'application/xml');
    return parseWeatherData(xmlDoc);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};
