export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(":").map(Number);
  if (isNaN(hours) || isNaN(minutes)) {
    return "Invalid Time";
  }
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${String(minutes).padStart(2, "0")} ${period}`;
};