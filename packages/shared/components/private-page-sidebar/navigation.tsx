const Navigation = [
  {
    icon: (isPageOpen: boolean) => (
      <img
        src={` ${
          isPageOpen ? "/images/profile-purple.svg" : "/images/profile.svg"
        }`}
        className="w-6 h-6 mr-3"
      />
    ),
    routeName: "Profile",
    routeLink: "/profile",
  },
  {
    icon: (isPageOpen: boolean) => (
      <img
        src={` ${
          isPageOpen
            ? "/images/dashboard-purple.svg"
            : "/images/dashboard-icon.svg"
        }`}
        className="w-6 h-6 mr-3"
      />
    ),
    routeName: "Dashboard",
    routeLink: "/dashboard",
  },
  {
    icon: (isPageOpen: boolean) => (
      <img
        src={` ${
          isPageOpen
            ? "/images/messages-purple.svg"
            : "/images/message-icon.svg"
        }`}
        className="w-6 h-6 mr-3"
      />
    ),
    routeName: "Messages",
    routeLink: "/messages",
  },
  {
    icon: (isPageOpen: boolean) => (
      <img
        src={` ${
          isPageOpen
            ? "/images/applications-purple.svg"
            : "/images/applications.svg"
        }`}
        className="w-6 h-6 mr-3"
      />
    ),
    routeName: "Applications Received",
    routeLink: "/applications",
  },
  {
    icon: (isPageOpen: boolean) => (
      <img
        src={` ${
          isPageOpen ? "/images/request-purple.svg" : "/images/request.svg"
        }`}
        className="w-6 h-6 mr-3"
      />
    ),
    routeName: "Requests Sent",
    routeLink: "/requests",
  },
  {
    icon: (isPageOpen: boolean) => (
      <img
        src={` ${
          isPageOpen ? "/images/projects-purple.svg" : "/images/projects.svg"
        }`}
        className="w-5 h-5 mr-3"
      />
    ),
    routeName: "Projects",
    routeLink: "/projects",
  },
];

export default Navigation;
