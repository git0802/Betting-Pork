import dynamic from "next/dynamic";
import React from "react";

const MobileNavbar1 = dynamic(() => import("./1/index"), {
  ssr: false,
});
const MobileNavbar2 = dynamic(() => import("./2/index"), {
  ssr: false,
});
const MobileNavbar3 = dynamic(() => import("./3/index"), {
  ssr: false,
});

const MobileNavbar = ({type}: {type:number | undefined}) => {
  switch (type) {
    case 1:
      return <MobileNavbar1 />
    case 2:
      return <MobileNavbar2 />
    case 3:
      return <MobileNavbar3 />
    default:
      return <MobileNavbar1 />
  }
};

export default MobileNavbar;
