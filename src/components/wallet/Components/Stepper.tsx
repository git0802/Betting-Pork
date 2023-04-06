import Image from "next/image";
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import CheckList from "../../../../public/icons/checkStepper.svg";

interface IStepper {
  stepOne :  number
  stepTwo : number
  stepThree : number

}
export const Stepper = (props:IStepper) => {
  const [Open, setOpen] = useState(true);



  const renderButton = (data: number) => {
    if (data == 0) {
      return (
        <div className="px-[7px] py-[5px] bg-[#D3F2FF]/5 text-[#D3F2FF] text-[12px] font-medium rounded-[4px]">
          Tertunda
        </div>
      );
    } else if (data == 1) {
      return (
        <div className="px-[7px] py-[5px] bg-[#FFC700]/10 text-[#FFC700] text-[12px] font-medium rounded-[4px]">
        Memproses
      </div>
     
        
      );
    } else {
      return (
        <div className="px-[7px] py-[5px] bg-[#21D980]/10 text-[#21D980] text-[12px] font-medium rounded-[4px]"  >
        Berhasil
      </div>
       
      );
    }
  };

  const renderButtonStrip = (data: number) => {
    if (data == 0) {
      return (
        <div className="absolute w-[77px]  md:w-[140px] h-[3px] bg-[#D3F2FF]/20 mt-[-5.7rem] md:mt-[-4.5rem] ml-[8rem] md:ml-[11.8rem] rounded-[3px]"></div>

      );
    } else if (data == 1) {
      return (
        <div className="absolute  w-[77px]  md:w-[140px] h-[3px] bg-[#FFC700] mt-[-5.7rem] md:mt-[-4.5rem] ml-[8rem] md:ml-[11.8rem] rounded-[3px]"></div>
      );
    } else {
      return (
        <div className="absolute   w-[77px]  md:w-[140px] h-[3px] bg-[#21D980] mt-[-5.7rem] md:mt-[-4.5rem] ml-[8rem] md:ml-[11.8rem] rounded-[3px]"></div>

      );
    }
  };

  const renderCheklist = (data: number) => {
    if (data == 0) {
      return (
        <div className="mb-[12px] text-[#D3F2FF] ">
          <CheckList />
        </div>
      );
    } else if (data == 1) {
      return (
        <div className="mb-[12px]  text-[#FFC700] ">
          <CheckList />
        </div>
      );
    } else {
      return (
        <div className="mb-[12px] text-[#21D980]">
          <CheckList />
        </div>
      );
    }
  };

  return (
    <div className={`flex w-full justify-center ${props.stepTwo == 1 || props.stepThree == 1 ? "mt-[3rem]" : "mt-[15px]"}  md:mt-[42px] mb-[33px] md:mb-[20px]`}>
      <div className="flex w-full lg:w-6/12 justify-around relative">
        <div className="flex flex-col justify-center items-center w-4/12">
          {renderCheklist(props.stepOne)}
          <div className={`${props.stepOne == 3 ? "text-white" : "text-[#D3F2FF]/60"} text-[14px] font-medium`}>Informasi <br className=" md:hidden"/> Pembayaran</div>
          <div className="mt-[10px]">{renderButton(props.stepOne)}</div>
          {renderButtonStrip(props.stepOne)}
          {/* <div className="absolute mt-[-4.5rem] w-[140px] h-[3px] bg-[#D3F2FF]/60 ml-[11.8rem]"></div> */}
        </div>
        <div className="flex flex-col justify-center items-center w-4/12">
          {renderCheklist(props.stepTwo)}

          <div className={`${props.stepTwo == 3 ? "text-white" : "text-[#D3F2FF]/60"} text-[14px] font-medium`}>Detail <br className=" md:hidden"/> Pembayaran</div>
          <div className="mt-[10px]">{renderButton(props.stepTwo)}</div>
          {renderButtonStrip(props.stepTwo)}
        </div>
        <div className="flex flex-col justify-center items-center w-4/12">
          {renderCheklist(props.stepThree)}
          <div className={`${props.stepThree == 3 ? "text-white" : "text-[#D3F2FF]/60"} text-[14px]  font-medium`}>Proses <br className=" md:hidden"/> Pembayaran</div>
          <div className="mt-[10px]">{renderButton(props.stepThree)}</div>
        </div>
      </div>
    </div>
  );
};
