// Fetching data from the API.
import { API_BLOG_URL } from "./constants.mjs";

export async function fetchData() {
  const response = await fetch(API_BLOG_URL);
  const data = await response.json();
  console.log(data);
  return data;
}

fetchData();
