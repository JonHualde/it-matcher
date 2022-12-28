// Reusable function that fetch JSON data from the server and handles errors and status codes
import { HttpResponse } from "@shared-types";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const boundary = `----WebKitFormBoundary${Date.now()}`;

export default async function fetchFormData(
  url: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  formData: FormData
): Promise<any> {
  const res = await fetch(`${BASE_URL}/${url}`, {
    method,
    // headers: {
    //   "Content-Type": `multipart/form-data; boundary=${boundary}`,
    // },
    credentials: "include",
    body: formData,
  });

  const json = await res.json();
  if (res.ok) return json;

  return Promise.reject(json ? json : res.status);
}
