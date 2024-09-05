export default function RGBToHex(rgb: [number, number, number]) {
  const red = rgb[0].toString(16);
  const green = rgb[1].toString(16);
  const blue = rgb[2].toString(16);
  const hex = `#${red.padStart(2, "0")}${green.padStart(2, "0")}${blue.padStart(
    2,
    "0"
  )}`;
  return hex;
}
