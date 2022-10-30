import { useState } from "react";
import { useRouter } from "next/router";
import Button from "../button/button";
import Link from "next/link";

// Store
import { useStoreActions, useStoreState } from "easy-peasy";

// Icon
import { FiMenu, FiX } from "react-icons/fi";

const PublicPageMobileHeader = () => {
  const router = useRouter();
  let isLoggedIn = useStoreState((state: any) => state.loggedIn);
  const [showMenu, setShowMenu] = useState(false);

  const updateAuthStatus = useStoreActions(
    (actions: any) => actions.updateUserAuthStatus
  );

  const logout = () => {
    fetch("/api/auth/logout")
      .then((res) => res.json())
      .then((result) => {
        updateAuthStatus(false);
        console.log(result);
      })
      .catch((err) => alert("Big issue"));
  };

  return (
    <div className="bg-pastel-light flex justify-between items-center py-8 px-8 relative lg:hidden">
      <div className="flex w-full justify-end">
        <FiMenu
          onClick={() => setShowMenu(true)}
          className="w-10 h-10 text-pastel-dark cursor-pointer"
        />
      </div>
      <div
        className={
          showMenu
            ? "fixed top-0 bottom-0 left-0 right-0 h-screen w-screen z-50 bg-white flex flex-col justify-center items-center px-8"
            : "hidden"
        }
      >
        <FiX
          className="w-10 h-10 text-pastel-dark absolute top-8 right-10 cursor-pointer"
          onClick={() => setShowMenu(false)}
        />
        <h1
          className="font-oswald text-blue-dimmed font-semibold text-blue-500 cursor-pointer  mb-20 text-center"
          onClick={() => router.push("/")}
        >
          EXPERT MATCHER
        </h1>
        <div className="flex flex-col items-center mb-20">
          {!isLoggedIn ? (
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
          ) : (
            <Button
              text="Logout"
              color="bg-blue-ocean"
              hover="bg-blue-800"
              textColor="text-white"
              margin="text-2xl"
              borderColor="border-blue-ocean"
              action={() => logout()}
            />
          )}
        </div>
        <div className="flex items-center">
          <ul className="flex flex-col space-y-12 items-center">
            <Link href="/">
              <li className="text-blue-dimmed font-medium text-3xl cursor-pointer hover:scale-105 transform transition-all mx-4">
                Home
              </li>
            </Link>
            <Link href="/contact">
              <li className="text-blue-dimmed font-medium text-3xl cursor-pointer hover:scale-105 transform transition-all mx-4">
                Contact
              </li>
            </Link>
            <Link href="/search">
              <li className="text-blue-dimmed font-medium text-3xl cursor-pointer hover:scale-105 transform transition-all mx-4">
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
