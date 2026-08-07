import { getTimeZones } from "@vvo/tzdb";

interface ParseDateStringParams {
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

  const year = dummyDate.getFullYear();
  const month = String(dummyDate.getMonth() + 1).padStart(2, "0");
  const date = String(dummyDate.getDate()).padStart(2, "0");
  const hours = String(overrideHours ?? dummyDate.getHours()).padStart(2, "0");
  const minutes = String(overrideMinutes ?? dummyDate.getMinutes()).padStart(
    2,
    "0",
  );
  const extendedTimeZone = timeZones.find(
    (tz) => timeZone === tz.name || tz.group.includes(timeZone),
  );

  return {
    dateString: `${year}-${month}-${date}T${hours}:${minutes}:00${extendedTimeZone?.currentTimeFormat.substring(0, 6)}`,
    timeZone: extendedTimeZone?.name || "",
  };
};

export default parseDateString;
