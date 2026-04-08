import { Flights } from "@/models/Flight";
import { useState } from "react";
import { storage } from "@/app/_layout";

const useFlights = () => {
  const [flights, setFlights] = useState<Flights>(() => {
    const stored = storage.getString("flights");
    return stored ? JSON.parse(stored) : [];
  });

  const storeFlights = (
    args: Flights | ((prevFlights: Flights) => Flights),
  ) => {
    if (typeof args === "function") {
      setFlights((prevFlights) => {
        const newFlights = args(prevFlights);
        storage.set("flights", JSON.stringify(newFlights));
        return newFlights;
      });
    } else {
      setFlights(args);
      storage.set("flights", JSON.stringify(args));
    }
  };

  return [flights, storeFlights] as [
    Flights,
    (args: Flights | ((flights: Flights) => Flights)) => void,
  ];
};

export default useFlights;
