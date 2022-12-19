// Reusable function that fetch JSON data from the server and handles errors and status codes
import { HttpResponse } from "@shared-types";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function fetchJSON(url: string, method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE", body?: object): Promise<any> {
  const res = await fetch(`${BASE_URL}/${url}`, {
    method,
    headers: {
      "Content-Type": "Application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  let isJson = res.headers.get("Content-Type")?.indexOf("application/json") !== -1;
  const json = isJson ? await res.json() : undefined;

  if (res.ok) return json;

  return Promise.reject(json ? json : res.status);
}

// Examples of usage
async function getData() {
  const data = await fetchJSON("https://example.com/data.json", "GET");
  console.log(data);
}

async function updateData() {
  const data = { id: 123, name: "John Smith" };
  const result = await fetchJSON("https://example.com/data.json", "PUT", data);
  console.log(result);
}

async function deleteData() {
  const result = await fetchJSON("https://example.com/data.json", "DELETE");
  console.log(result);
}

async function postData() {
  const data = { name: "John Smith" };
  const result = await fetchJSON("https://example.com/data.json", "POST", data);
  console.log(result);
}
