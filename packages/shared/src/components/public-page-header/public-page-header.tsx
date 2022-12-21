import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "../button/button";
import PublicPageNavigation from "../public-page-navigation/public-page-navigation";
// Store
import { useStoreActions, useStoreState } from "easy-peasy";
// Utils
import { fetchJSON } from "@shared-utils";

const PublicPageHeader = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const router = useRouter();
  const resetAuthAndUserData = useStoreActions((actions: any) => actions.resetAuthAndUserData);
  let isLoggedIn = useStoreState((state: any) => state.user.isLoggedIn);

  useEffect(() => {
    setIsUserLoggedIn(isLoggedIn);
  }, [isLoggedIn]);

  const logout = () => {
    fetchJSON("auth/logout", "GET")
      .then((res: any): any => {
        resetAuthAndUserData();
        router.asPath === "/" ? router.reload() : router.push("/");
      })
      .catch((err) => alert("We could not log you out, please try again later."));
  };

  return (
    <div className="relative hidden items-center justify-between bg-pastel-light py-8 px-8 lg:flex">
      <PublicPageNavigation />
      <h3
        className="text-blue-500 absolute left-1/2 -translate-x-1/2 cursor-pointer font-oswald font-semibold text-blue-dimmed"
        onClick={() => router.push("/")}
      >
        EXPERT MATCHER
      </h3>
      <div className="flex items-center">
        {!isUserLoggedIn ? (
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
            <p className="mr-6 cursor-pointer transition-all hover:scale-105" onClick={() => router.push("/profile")}>
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
