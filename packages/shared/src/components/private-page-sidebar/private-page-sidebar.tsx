import Link from "next/link";
import Navigation from "./navigation";
import { useRouter } from "next/router";
import { FiLogOut } from "react-icons/fi";
// Store
import { useStoreActions } from "easy-peasy";
// Utils
import { fetchJSON } from "@shared-utils";

const PrivatePageSidebar = ({ pathname }: any) => {
  const router = useRouter();
  const resetAuthAndUserData = useStoreActions((actions: any) => actions.resetAuthAndUserData);

  const logout = () => {
    fetchJSON("auth/logout", "GET")
      .then((res: any): any => {
        resetAuthAndUserData();
        router.asPath === "/" ? router.reload() : router.push("/");
      })
      .catch((err) => alert("We could not log you out, please try again later."));
  };

  return (
    <div className="privatePageSidebar relative flex flex-col border-r border-pastel px-5">
      <ul className="mt-10">
        {Navigation.map((item) => (
          <Link key={item.routeName} href={item.routeLink}>
            <li
              className={`text-md mb-10 flex cursor-pointer items-center ${
                pathname === item.routeLink.toLowerCase() ? "text-pastel-dark" : ""
              }`}
            >
              {item.icon(pathname === item.routeLink.toLowerCase())} {item.routeName}
            </li>
          </Link>
        ))}
      </ul>
      <div onClick={logout} className="absolute bottom-8 flex cursor-pointer items-center text-lg hover:text-pastel-dark">
        <FiLogOut size={20} className="mr-3 text-black" />
        Logout
      </div>
    </div>
  );
};

export default PrivatePageSidebar;
