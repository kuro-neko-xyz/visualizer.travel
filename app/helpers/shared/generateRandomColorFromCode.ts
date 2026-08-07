import { PLANE_CODE } from "@/constants/lanes";

export const COLOR_SATURATION = 70;
export const COLOR_LIGHTNESS = 90;

const generateRandomColorFromCode = (code: string): string => {
  if (code === PLANE_CODE) {
    return "lightgrey";
  }

  let hash = 5381;
  for (let i = 0; i < code.length; i++) {
    hash = (hash << 5) + hash + code.charCodeAt(i); // hash * 33 + c
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, ${COLOR_SATURATION}%, ${COLOR_LIGHTNESS}%)`;
};

export default generateRandomColorFromCode;
