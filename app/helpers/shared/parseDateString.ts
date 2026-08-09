import { getTimeZones } from "@vvo/tzdb";

interface ParseDateStringParams {
  addOffset?: boolean;
  dummyDate: Date;
  timeZone: string;
  overrideHours?: number;
  overrideMinutes?: number;
}

const parseDateString = ({
  addOffset,
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

  const newDate = addOffset
    ? new Date(
        dummyDate.getTime() + parseInt(offset ?? "0", 10) * 60 * 60 * 1000,
      )
    : new Date(dummyDate);

  const year = newDate.getFullYear();
  const month = String(newDate.getMonth() + 1).padStart(2, "0");
  const date = String(newDate.getDate()).padStart(2, "0");
  const hours = String(overrideHours ?? newDate.getHours()).padStart(2, "0");
  const minutes = String(overrideMinutes ?? newDate.getMinutes()).padStart(
    2,
    "0",
  );

  return {
    dateString: `${year}-${month}-${date}T${hours}:${minutes}:00${offset}`,
    timeZone: extendedTimeZone?.name || "",
  };
};

export default parseDateString;
