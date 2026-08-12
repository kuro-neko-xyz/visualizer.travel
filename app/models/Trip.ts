import { Flights } from "./Flight";

export interface Trip {
  flights: Flights;
  name: string;
  uuid: string;
}

export type Trips = Trip[];
