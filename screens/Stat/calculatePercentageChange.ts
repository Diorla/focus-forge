export default function calculatePercentageChange(previousValue, currentValue) {
  const change = currentValue - previousValue;
  const percentageChange = previousValue
    ? Math.abs(change / previousValue) * 100
    : 0;

  return {
    percentageChange: percentageChange.toFixed(2),
    direction: change >= 0 ? "up" : "down",
  };
}
