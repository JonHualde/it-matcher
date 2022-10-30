import Link from "next/link";
import Navigation from "./navigation";
import { useRouter } from "next/router";

// Store
import { useStoreActions } from "easy-peasy";

const PrivatePageSidebar = ({ pathname }: any) => {
  const router = useRouter();

  const logUserOut = useStoreActions(
    (actions: any) => actions.resetAuthAndUserData
  );

  const logout = () => {
    logUserOut();
    router.push("/login");
  };

  return (
    <div className="privatePageSidebar border-r border-pastel flex flex-col px-8 relative">
      <ul className="space-y-10 mt-12">
        {Navigation.map((item) => (
          <Link key={item.routeName} href={item.routeLink}>
            <li
              className={`flex text-lg items-center cursor-pointer ${
                pathname === item.routeLink.toLowerCase()
                  ? "text-pastel-dark"
                  : ""
              }`}
            >
              {item.icon(pathname === item.routeLink.toLowerCase())}{" "}
              {item.routeName}
            </li>
          </Link>
        ))}
      </ul>
      <div
        onClick={logout}
        className="flex items-center text-lg absolute bottom-8 cursor-pointer hover:text-pastel-dark"
      >
        <img src="/images/logout.svg" className="w-6 h-6 mr-3" />
        Logout
      </div>
    </div>
  );
};

export default PrivatePageSidebar;
