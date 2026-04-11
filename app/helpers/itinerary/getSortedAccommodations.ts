import { Accommodations } from "@/models/Accommodation";

const getSortedAccommodations = (
  accommodations: Accommodations,
): Accommodations => {
  return accommodations.sort((a, b) => {
    const aCheckIn = new Date(a.checkIn);
    const bCheckIn = new Date(b.checkIn);

    return aCheckIn.getTime() - bCheckIn.getTime();
  });
};

export default getSortedAccommodations;
