
export async function getActiveEventsCount() {
    const response = await fetch('http://localhost:8080/analitic/active-count');
    const data = await response.json();
    return data.count;
  }
  export async function getFinishedCount() {
    const response = await fetch('http://localhost:8080/analitic/thisyear');
    const data = await response.json();
    return data.count;
  }