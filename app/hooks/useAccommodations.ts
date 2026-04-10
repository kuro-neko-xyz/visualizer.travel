import { Accommodations } from "@/models/Accommodations";
import { useState } from "react";
import { storage } from "@/app/_layout";

const useAccommodations = () => {
  const [accommodations, setAccommodations] = useState<Accommodations>(() => {
    const stored = storage.getString("accommodations");
    return stored ? JSON.parse(stored) : [];
  });

  const storeAccommodations = (
    args:
      | Accommodations
      | ((prevAccommodations: Accommodations) => Accommodations),
  ) => {
    if (typeof args === "function") {
      setAccommodations((prevAccommodations) => {
        const newAccommodations = args(prevAccommodations);
        storage.set("accommodations", JSON.stringify(newAccommodations));
        return newAccommodations;
      });
    } else {
      setAccommodations(args);
      storage.set("accommodations", JSON.stringify(args));
    }
  };

  return [accommodations, storeAccommodations] as [
    Accommodations,
    (
      args:
        | Accommodations
        | ((accommodations: Accommodations) => Accommodations),
    ) => void,
  ];
};

export default useAccommodations;
