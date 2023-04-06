import Image from "next/image";
import React from "react";
import Logo from "public/images/logo.png";
import Router from "next/router";

interface ILogoConfig {
  style?: string;
  position?: "center" | "left" | "right";
  positionMobile?: "center" | "left" | "right";
  link?: string
 
}

const LogoApp = (props: ILogoConfig) => {

  
  const renderPositionMobile = () => {
    if (props.positionMobile) {
      if (props.positionMobile == "left") {
        return "justify-start";
      } else if (props.positionMobile == "right") {
        return "justify-end";
      } else if (props.positionMobile == "center") {
        return "justify-center";
      }
    }else {
      {return null}}
  };

  
  const renderPositionDextop = () => {
    if (props.position) {
      if (props.position == "left") {
        return "md:justify-start";
      } else if (props.position == "right") {
        return "md:justify-end";
      } else if (props.position == "center") {
        return "md:justify-center";
      }
    } else 
    {return null}
  };

  return (
    <div  
      className={`w-full flex 

    ${renderPositionMobile()}
    ${renderPositionDextop()}
    ${props.link ? "cursor-pointer":"" }
    ${props.style ? props.style : ""}`}


    onClick={()=>{props.link ?  Router.replace(props.link) : "" }}
    >
      <div className={`max-h-[36px]  max-w-[178px] relative overflow-hidden`}>
        {/* <div className=" animateLogo">.</div> */}
        <Image
          alt=""
          src={Logo}
          priority
          objectFit="contain"
          className="max-h-[36px]  max-w-[118px]  w-[178px]  h-[34px]  text-center relative z-[2] mt-[-2rem]"
        />
      </div>
    </div>
  );
};

export default LogoApp;
