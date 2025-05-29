export async function getActiveEventsCount() {
  const response = await fetch('/api/analitic/active-count');
  const data = await response.json();
  return data.count;
}

export async function getFinishedCount() {
  const response = await fetch('/api/analitic/thisyear');
  const data = await response.json();
  return data.count;
}