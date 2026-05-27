interface Airport {
  city: string;
  country: string;
  elevation: number;
  iata?: string;
  icao: string;
  lat: number;
  lon: number;
  name: string;
  state?: string;
  tz: string;
}

type Airports = Airport[];

export type { Airport, Airports };
