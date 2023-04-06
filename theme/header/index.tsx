import dynamic from "next/dynamic";
import React from "react";

const Header1 = dynamic(() => import("./1/index"), {
  loading: () => <></>,
});

const Header2 = dynamic(() => import("./2/index"), {
  loading: () => <></>,
});

const Header3 = dynamic(() => import("./3/index"), {
  loading: () => <></>,
});

const Header4 = dynamic(() => import("./4/index"), {
  loading: () => <></>,
});

const index = ({type}: {type:number | undefined}) => {
  switch (type) {
    case 1:
      return <Header1 />
    case 2:
      return <Header2 />
    case 3:
      return <Header3 />
    case 4:
      return <Header4 />
    default:
      return <Header1 />
  }
};

export default index;
