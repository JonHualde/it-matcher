// Reusable function that fetch JSON data from the server and handles errors and status codes
import { HttpResponse } from "@shared-types";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function fetchJSON(url: string, method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE", body?: object): Promise<any> {
  const res = await fetch(`${BASE_URL}/${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
  });

  const json = await res.json();

  console.log("jsonapi", json, res.ok);

  if (res.ok) return json;

  return Promise.reject(json ? json : res.status);
}
