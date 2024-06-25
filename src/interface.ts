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
