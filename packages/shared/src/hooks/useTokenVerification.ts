import { useState, useEffect } from "react";
// Utils
import { fetchJSON } from "@shared-utils";

export default function useTokenVerification() {
  const [isTokenValid, setIsTokenValid] = useState<null | boolean>(null);

  useEffect(() => {
    async function verifyToken() {
      // Make a request to the "auth/verify-token" endpoint to check the validity of the access token
      const isTokenValid = await fetchJSON("auth/verify-token", "GET")
        .then((): boolean => true)
        .catch(() => false);

      // Update the state with the response from the endpoint
      setIsTokenValid(isTokenValid);
    }

    verifyToken();
  }, []);

  return isTokenValid;
}
