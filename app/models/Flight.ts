interface Point {
  airportCode: string;
  dateTime: string; // ISO date string
}

export interface Flight {
  id: string;
  origin: Point;
  destination: Point;
}

export type Flights = Flight[];
