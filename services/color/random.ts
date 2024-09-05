export default function random() {
  return (
    "#" +
    (Math.random() * 10e15)
      .toString(16)
      .slice(-6)
      .replaceAll(".", "")
      .padEnd(6, "0")
  );
}
