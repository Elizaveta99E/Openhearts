
export async function getActiveEventsCount() {
    const response = await fetch('http://localhost:8080/api/events/active-count');
    const data = await response.json();
    return data.count;
  }
  