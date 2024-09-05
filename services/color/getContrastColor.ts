/**
 * This code uses the algorithm from https://www.w3.org/TR/AERT/#color-contrast
 * and https://stackoverflow.com/a/3943023/112731
 * @param hex the hex color, starting with "#" e.g. #ade01a
 */
export default function getContrastColor(hex: string): string {
  let newHex = hex.replaceAll("#", "");
  if (newHex.length === 3) {
    newHex =
      newHex[0] + newHex[0] + newHex[1] + newHex[1] + newHex[2] + newHex[2];
  }

  const r = parseInt(newHex.slice(0, 2), 16);
  const g = parseInt(newHex.slice(2, 4), 16);
  const b = parseInt(newHex.slice(4, 6), 16);

  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000000" : "#FFFFFF";
}
