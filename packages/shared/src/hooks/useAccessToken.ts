import { useState, useEffect } from "react";

// Function that checks the window object to see if the access_token and the refresh_token are present in the cookies and returns a boolean value
export default function useAccessToken() {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const token: string | null = getCookie("access_token") ?? null;
    setAccessToken(token);
  }, []);

  return accessToken;
}

function getCookie(name: string | null) {
  if (!name) return null;

  const value = `; ${document.cookie}`;
  const parts: any = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
