import React from "react";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";

const SidebarData = [
  {
    title: "Home",
    path: "home",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Categories",
    path: "calendar",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "My Profile", // Profile does not navigate
    icon: <FaIcons.FaUser />,
    cName: "nav-text",
  },
  {
    title: "Log Out",
    path: "/signin",
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: "nav-text",
  },
];

export default SidebarData;
