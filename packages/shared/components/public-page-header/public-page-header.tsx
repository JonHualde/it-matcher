import { useEffect } from "react";
import { useRouter } from "next/router";
import Button from "../button/button";
import PublicPageNavigation from "../public-page-navigation/public-page-navigation";

// Store
import { useStoreActions, useStoreState } from "easy-peasy";

const PublicPageHeader = () => {
  const router = useRouter();
  let isLoggedIn = useStoreState((state: any) => state.loggedIn);

  const updateAuthStatus = useStoreActions(
    (actions: any) => actions.updateUserAuthStatus
  );

  const resetAuthAndUserData = useStoreActions(
    (actions: any) => actions.resetAuthAndUserData
  )

  const logout = () => {
    fetch("/api/auth/logout")
      .then((res) => res.json())
      .then((result) => {
        updateAuthStatus(false);
        resetAuthAndUserData()
        console.log(result);
      })
      .catch((err) => alert("Big issue"));
  };

  useEffect(() => {
    const getUserAuth = async () => {
      try {
        let res = await fetch("/api/auth/getToken");
        let { user } = await res.json();

        console.log("user", user);

        if (user === undefined || user.error) {
          updateAuthStatus(false);
          resetAuthAndUserData()
        } else {
          updateAuthStatus(true);
        }
      } catch (error) {
        console.error("Could not decipher token data.");
      }
    };

    getUserAuth();
  }, []);

  return (
    <div className="bg-pastel-light hidden lg:flex justify-between items-center py-8 px-8 relative">
      <PublicPageNavigation />
      <h3
        className="absolute left-1/2 -translate-x-1/2 font-oswald text-blue-dimmed font-semibold text-blue-500 cursor-pointer"
        onClick={() => router.push("/")}
      >
        EXPERT MATCHER
      </h3>
      <div className="flex items-center">
        {!isLoggedIn ? (
          <>
            <Button
              text="Log in"
              color="bg-transparent"
              textColor="text-blue-ocean"
              hover="text-blue-800"
              borderColor="border-blue-ocean"
              action={() => router.push("/login")}
            />
            <Button
              text="Sign up free"
              color="bg-blue-ocean"
              hover="bg-blue-800"
              textColor="text-white"
              margin="ml-4 "
              borderColor="border-blue-ocean"
              action={() => router.push("/signup")}
            />
          </>
        ) : (
          <>
            <p
              className="mr-6 cursor-pointer hover:scale-105 transition-all"
              onClick={() => router.push("/profile")}
            >
              My Profile
            </p>
            <Button
              text="Logout"
              color="bg-blue-ocean"
              hover="bg-blue-800"
              textColor="text-white"
              borderColor="border-blue-ocean"
              action={() => logout()}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default PublicPageHeader;
