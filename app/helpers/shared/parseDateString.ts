import { getTimeZones } from "@vvo/tzdb";

interface ParseDateStringParams {
  addOffset?: boolean;
  dummyDate: Date;
  timeZone: string;
  overrideHours?: number;
  overrideMinutes?: number;
}

const parseDateString = ({
  dummyDate,
  timeZone,
  overrideHours,
  overrideMinutes,
}: ParseDateStringParams) => {
  const timeZones = getTimeZones();

  const extendedTimeZone = timeZones.find(
    (tz) => timeZone === tz.name || tz.group.includes(timeZone),
  );

  const offset = extendedTimeZone?.currentTimeFormat.substring(0, 6);

  const newDate = new Date(
    dummyDate.getTime() + parseInt(offset ?? "0", 10) * 60 * 60 * 1000,
  );

  const year = newDate.getUTCFullYear();
  const month = String(newDate.getUTCMonth() + 1).padStart(2, "0");
  const date = String(newDate.getUTCDate()).padStart(2, "0");
  const hours = String(overrideHours ?? newDate.getUTCHours()).padStart(2, "0");
  const minutes = String(overrideMinutes ?? newDate.getUTCMinutes()).padStart(
    2,
    "0",
  );

  return {
    dateString: `${year}-${month}-${date}T${hours}:${minutes}:00${offset}`,
    timeZone: extendedTimeZone?.name || "",
  };
};

export default parseDateString;
