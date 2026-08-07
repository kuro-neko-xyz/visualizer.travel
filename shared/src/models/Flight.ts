interface Point {
  airportCode: string;
  dateTime: string; // ISO date string
  timeZone: string;
}

export interface Flight {
  id: string;
  origin: Point;
  destination: Point;
}

export type Flights = Flight[];
