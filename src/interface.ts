export interface NewestEarthquake {
  tanggal: string;
  jam: string;
  lintang: string;
  bujur: string;
  magnitude: string;
  kedalaman: string;
  wilayah: string;
  potensi: string;
  dirasakan: string;
  shakemap: string;
}

export interface EarthquakeData {
  tanggal: string;
  jam: string;
  coordinates: string[];
  lintang: string;
  bujur: string;
  magnitude: string;
  kedalaman: string;
  wilayah: string;
  potensi?: string;
  dirasakan?: string;
}

// weather
interface Value {
  unit: string;
  value: string;
}

export interface Timerange {
  type: string;
  datetime: string;
  hour: string | null;
  minute: string | null;
  values: Value[];
}

export interface Parameter {
  id: string;
  description: string;
  type: string;
  timeranges: Timerange[];
}

export interface Issue {
  timestamp: string;
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
  second: string;
}

export interface Area {
  id: string;
  name: string;
  latitude: string;
  longitude: string;
  description: string;
  domain: string;
  type: string;
  parameters: Parameter[];
}

export interface WeatherData {
  issue: Issue;
  areas: Area[];
}
