import { CgProfile } from "react-icons/cg";
import { BiMessageDetail } from "react-icons/bi";
import { HiOutlinePresentationChartBar } from "react-icons/hi";
import { RiPlantLine } from "react-icons/ri";
import { CgMailReply, CgMailForward } from "react-icons/cg";

const Navigation = [
  {
    icon: (isPageOpen: boolean) => <CgProfile size={20} className={`${isPageOpen ? "text-pastel-dark" : "text-black"} mr-3`} />,
    routeName: "Profile",
    routeLink: "/profile",
  },
  {
    icon: (isPageOpen: boolean) => (
      <HiOutlinePresentationChartBar size={20} className={`${isPageOpen ? "text-pastel-dark" : "text-black"} mr-3`} />
    ),

    routeName: "Dashboard",
    routeLink: "/dashboard",
  },
  {
    icon: (isPageOpen: boolean) => <BiMessageDetail size={20} className={`${isPageOpen ? "text-pastel-dark" : "text-black"} mr-3`} />,

    routeName: "Messages",
    routeLink: "/messages",
  },
  {
    icon: (isPageOpen: boolean) => <CgMailReply size={20} className={`${isPageOpen ? "text-pastel-dark" : "text-black"} mr-3`} />,

    routeName: "Applications Received",
    routeLink: "/applications-received",
  },
  {
    icon: (isPageOpen: boolean) => <CgMailForward size={20} className={`${isPageOpen ? "text-pastel-dark" : "text-black"} mr-3`} />,

    routeName: "Applications Sent",
    routeLink: "/applications-sent",
  },
  {
    icon: (isPageOpen: boolean) => <RiPlantLine size={20} className={`${isPageOpen ? "text-pastel-dark" : "text-black"} mr-3`} />,

    routeName: "Projects",
    routeLink: "/projects",
  },
];

export default Navigation;
