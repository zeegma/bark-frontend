export function getQueryParameter(key: string): string | null {
  const hashParams = new URLSearchParams(window.location.hash.split("?")[1]);
  return hashParams.get(key);
}