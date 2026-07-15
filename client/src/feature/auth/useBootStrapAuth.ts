/**
 * This code checks if the user is authenticated or not in every refresh
 *
 */

import { useEffect } from "react";
import { useAuthStore } from "../../store/auth.store";
import { checkAuth } from "./api";

export function useBootStrapAuth() {
  const { cleanAuth, setError, setLoading, setUser } = useAuthStore();

  useEffect(() => {
    const bootStrap = async () => {
      try {
        setLoading();

        const data = await checkAuth();

        setUser(data.user);
      } catch (error) {
        const errMessage =
          error instanceof Error ? error.message : "Something went wrong";
        setError(errMessage);
        cleanAuth();
      }
    };

    void bootStrap();
  }, [cleanAuth, setError, setError, setLoading]);
}
