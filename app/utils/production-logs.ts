// A log's number is its filename prefix (`content/production-logs/1.who-am-i.md` is 01). Oldest is 1, so numbers
// and the accent colors picked from them never change as new logs are added.
export function getLogNumber(stem: string) {
  return Number.parseInt(stem.split("/").pop() ?? "", 10) || 0;
}

export function formatLogNumber(number: number) {
  return String(number).padStart(2, "0");
}

export function getLogAccent(number: number) {
  return COLORS[(Math.max(number, 1) - 1) % COLORS.length] ?? "#5956e9";
}

export function formatLogDate(value: string) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
