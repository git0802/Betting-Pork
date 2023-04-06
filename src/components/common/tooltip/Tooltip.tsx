import React from "react";

export const Tooltip = ({ children, value, className }: any) => {
  return (
    <div className={`group relative ${className ? className : ""} `}>
      <div className="absolute w-full mt-[1.9rem] ml-[-6.5rem] text-center  bg-primaryContent  hidden min-w-[15rem] z-50 group-hover:flex group:transition group:duration-200 group:ease-in-out px-4 py-2 rounded-md border-[1px] border-whiteDefault-10 first-letter:
      before:content-[''] before:absolute before:bottom-8  before:right-1/2  before:mb-[0.33rem] before:rotate-[90deg] before:border-8 before:border-y-transparent before:border-l-transparent before:border-bluePrimary/60
      
      ">
        <p className="text-center w-full text-white"> {value ? value : "input value tooltip "}</p>
      </div>

      <div className="group-hover:opacity-80  transition duration-200 ease-in-out">
        {children ? children : "input children"}
      </div>
    </div>
  );
};
