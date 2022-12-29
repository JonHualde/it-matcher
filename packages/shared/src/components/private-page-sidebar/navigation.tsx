import { CgProfile } from "react-icons/cg";
import { AiOutlinePullRequest } from "react-icons/ai";
import { BiMessageDetail } from "react-icons/bi";
import { HiOutlinePresentationChartBar } from "react-icons/hi";
import { RiMailSendLine, RiPlantLine } from "react-icons/ri";

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
    icon: (isPageOpen: boolean) => <RiMailSendLine size={20} className={`${isPageOpen ? "text-pastel-dark" : "text-black"} mr-3`} />,

    routeName: "Messages",
    routeLink: "/messages",
  },
  {
    icon: (isPageOpen: boolean) => <AiOutlinePullRequest size={20} className={`${isPageOpen ? "text-pastel-dark" : "text-black"} mr-3`} />,

    routeName: "Applications Received",
    routeLink: "/applications",
  },
  {
    icon: (isPageOpen: boolean) => <BiMessageDetail size={20} className={`${isPageOpen ? "text-pastel-dark" : "text-black"} mr-3`} />,

    routeName: "Requests Sent",
    routeLink: "/requests",
  },
  {
    icon: (isPageOpen: boolean) => <RiPlantLine size={20} className={`${isPageOpen ? "text-pastel-dark" : "text-black"} mr-3`} />,

    routeName: "Projects",
    routeLink: "/projects",
  },
];

export default Navigation;
