import { Airports } from "./Airport";

type SearchError = {
  type: "config" | "timeout" | "network" | "server" | "invalid_response";
  message: string; // safe to show the user
  status?: number;
};

export type AirportSearchResult =
  | { ok: true; airports: Airports }
  | { ok: false; error: SearchError };
