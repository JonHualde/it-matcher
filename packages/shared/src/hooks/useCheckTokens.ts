import { useState, useEffect } from "react";

// Function that checks the window object to see if the access_token and the refresh_token are present in the cookies and returns a boolean value
export default function useCheckTokens() {
  const [isTokenPresent, setIsTokenPresent] = useState<boolean>(false);

  useEffect(() => {
    // Check if the access_token and the refresh_token are present in the cookies
    const isTokenPresent = window.document.cookie.includes("access_token") && window.document.cookie.includes("refresh_token");

    // Update the state with the response from the endpoint
    setIsTokenPresent(isTokenPresent);
  }, []);

  return isTokenPresent;
}
