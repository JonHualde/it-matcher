import { useState } from "react";
import { useRouter } from "next/router";
import Button from "../button/button";
import Link from "next/link";
// Store
import { useStoreActions, useStoreState } from "easy-peasy";
// Icon
import { FiMenu, FiX } from "react-icons/fi";
// Utils
import { fetchJSON } from "@shared-utils";

const PublicPageMobileHeader = () => {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  let isLoggedIn: boolean = useStoreState((state: any) => state.loggedIn);
  const resetAuthAndUserData = useStoreActions((actions: any) => actions.resetAuthAndUserData);
  const updateAuthStatus = useStoreActions((actions: any) => actions.updateUserAuthStatus);

  const logout = () => {
    fetchJSON("auth/logout", "GET")
      .then((res: any): any => {
        updateAuthStatus(false);
        resetAuthAndUserData();
        router.push("/");
      })
      .catch((err) => alert("We could not log you out, please try again later."));
  };

  return (
    <div className="relative flex items-center justify-between bg-pastel-light py-8 px-8 lg:hidden">
      <div className="flex w-full justify-end">
        <FiMenu onClick={() => setShowMenu(true)} className="h-10 w-10 cursor-pointer text-pastel-dark" />
      </div>
      <div
        className={
          showMenu
            ? "fixed top-0 bottom-0 left-0 right-0 z-50 flex h-screen w-screen flex-col items-center justify-center bg-white px-8"
            : "hidden"
        }
      >
        <FiX className="absolute top-8 right-10 h-10 w-10 cursor-pointer text-pastel-dark" onClick={() => setShowMenu(false)} />
        <h1
          className="text-blue-500 mb-20 cursor-pointer text-center font-oswald  font-semibold text-blue-dimmed"
          onClick={() => router.push("/")}
        >
          EXPERT MATCHER
        </h1>
        <div className="mb-20 flex flex-col items-center">
          {!isLoggedIn && (
            <>
              <Button
                text="Log in"
                color="bg-transparent"
                textColor="text-blue-ocean"
                hover="text-blue-800"
                margin="text-2xl"
                borderColor="border-blue-ocean"
                action={() => router.push("/login")}
              />
              <Button
                text="Sign up free"
                color="bg-blue-ocean"
                hover="bg-blue-800"
                textColor="text-white"
                margin="mt-8 text-2xl"
                borderColor="border-blue-ocean"
                action={() => router.push("/signup")}
              />
            </>
          )}

          <Button
            text="Logout"
            color="bg-blue-ocean"
            hover="bg-blue-800"
            textColor="text-white"
            margin="text-2xl"
            borderColor="border-blue-ocean"
            action={() => logout()}
          />
        </div>
        <div className="flex items-center">
          <ul className="flex flex-col items-center space-y-12">
            <Link href="/">
              <li className="mx-4 transform cursor-pointer text-3xl font-medium text-blue-dimmed transition-all hover:scale-105">Home</li>
            </Link>
            <Link href="/contact">
              <li className="mx-4 transform cursor-pointer text-3xl font-medium text-blue-dimmed transition-all hover:scale-105">
                Contact
              </li>
            </Link>
            <Link href="/search">
              <li className="mx-4 transform cursor-pointer text-3xl font-medium text-blue-dimmed transition-all hover:scale-105">
                Find A Project
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PublicPageMobileHeader;
