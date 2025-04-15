export function formatTime(time: string | null | undefined): string {
  if (!time) return "";

  const [hours, minutes] = time.split(":").map(Number);
  const ampm = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;
  return `${hour12}:${minutes.toString().padStart(2, "0")} ${ampm}`;
}

export function formatDate(date: string | Date): string {
  // Ensure date is a valid Date object
  const d = new Date(date);

  // Check if the date is invalid
  if (isNaN(d.getTime())) {
    console.error("Invalid date:", date); // For debugging invalid date
    return "";
  }

  // Format the date as "Apr 25, 2025"
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short", // Abbreviated month (e.g., "Apr")
    day: "numeric", // Numeric day (e.g., "25")
  };

  // Format the date and return
  return d.toLocaleDateString("en-US", options);
}
