import { Accommodations } from "./Accommodation";
import { Flights } from "./Flight";

export interface Trip {
  accommodations: Accommodations;
  flights: Flights;
  isHidden?: boolean;
  name: string;
  uuid: string;
}

export type Trips = Trip[];
