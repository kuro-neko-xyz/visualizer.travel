export interface Accommodation {
  id: string;
  airportCode: string;
  checkIn: string;
  checkOut: string;
  timeZone: string;
}

export type Accommodations = Accommodation[];
