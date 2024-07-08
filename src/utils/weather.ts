import { Parameter, WeatherData } from '../interface';

// Function to extract date components from a datetime string
const extractDate = (datetime: string) => ({
  year: datetime.substring(0, 4),
  month: datetime.substring(4, 6),
  day: datetime.substring(6, 8),
  hour: datetime.substring(8, 10),
  minute: datetime.substring(10, 12),
});

// Function to format date to a human-readable string
const formatDate = (date: { year: string; month: string; day: string }) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(`${date.month}/${date.day}/${date.year}`).toLocaleDateString(
    'id-ID',
    options,
  );
};

// Function to format both date and time to a human-readable string
const formatDateTime = (date: {
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
}) => `${formatDate(date)} ${date.hour}:${date.minute}`;

// Function to get hourly parameters for a specific hour
const getHourlyParameters = (parameters: Parameter[], hour: string) =>
  parameters
    .filter((parameter) => parameter.type === 'hourly')
    .map((parameter) => {
      const timerange = parameter.timeranges.filter(
        (timerange) => timerange.hour === hour,
      )[0];
      return timerange
        ? {
            id: parameter.id,
            description: parameter.description,
            values: timerange.values,
          }
        : null;
    })
    .filter(Boolean);

// Function to get timeranges from parameters
const getTimeranges = (parameters: Parameter[]) => {
  const hourlyParameters = parameters.filter(
    (parameter) => parameter.type === 'hourly',
  )[0];

  if (!hourlyParameters || !hourlyParameters.timeranges.length) {
    return [];
  }

  const hours = hourlyParameters.timeranges.map((timerange) => timerange.hour as string);

  return hours.map((hour) => {
    const datetime = hourlyParameters.timeranges.filter(
      (timerange) => timerange.hour === hour,
    )[0].datetime;
    const date = extractDate(datetime);
    const formattedDate = formatDateTime(date);

    return {
      hourly: hour,
      day: date.day,
      datetime: formattedDate,
      parameters: getHourlyParameters(parameters, hour),
    };
  });
};

// Function to get daily parameters for a specific day
const getDailyParameters = (parameters: Parameter[], day: string) =>
  parameters
    .filter((parameter) => parameter.type === 'daily')
    .map((parameter) => {
      const timerange = parameter.timeranges.filter(
        (timerange) => timerange.datetime.substring(6, 8) === day,
      )[0];
      return timerange
        ? {
            id: parameter.id,
            description: parameter.description,
            values: timerange.values,
          }
        : null;
    })
    .filter(Boolean);

// Function to format weather data
export function formatWeatherData(weather: WeatherData) {
  // Extract and format the issue date
  const issueDate = extractDate(weather.issue.timestamp);
  const formattedIssueDate = `${formatDate(issueDate)} ${weather.issue.hour}:${weather.issue.minute}:${weather.issue.second}`;

  // Map over areas to format them
  const areas = weather.areas.map((area) => {
    const { parameters, ...other } = area;
    const timeranges = parameters ? getTimeranges(parameters) : [];

    // Handle daily parameters
    const dailyParameters = parameters
      ? parameters.filter((parameter) => parameter.type === 'daily')
      : [];
    const days =
      dailyParameters.length > 0
        ? dailyParameters[0].timeranges.map((timerange) =>
            timerange.datetime.substring(6, 8),
          )
        : [];

    days.forEach((day) => {
      const dailyParam = getDailyParameters(parameters, day);
      timeranges.forEach((timerange) => {
        if (timerange.day === day) {
          timerange.parameters.push(...dailyParam);
        }
      });
    });

    return { ...other, timeranges };
  });

  // Return formatted weather data
  return {
    issue: { datetime: formattedIssueDate },
    areas,
  };
}
