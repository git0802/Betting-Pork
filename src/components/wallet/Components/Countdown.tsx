import { getCountDownToCloseHour } from '@utils/functionutil'
import React, { useState } from 'react'

export const Countdown = (props : any) => {
    const [first, setfirst] = useState(0)

    setTimeout(() => {
       const data = first +1
        setfirst(data)
        
      }, 1000);


  return (
    <div>  <div className="flex mt-[20px] w-full justify-center space-x-2">
    {/* {console.log(dataDeposit[0]?.created_at , "dataDeposit[0]")} */}

    <div className="flex justify-center flex-col">
      <div className="p-[1rem] bg-[#001625]/60 rounded-[4px] flex justify-center  text-white text-[16px] font-medium">
        {getCountDownToCloseHour(props.data?.created_at, 0)}
      </div>
      <span className="text-center  text-[12px] md:text-[14px] mt-[10px]">Jam</span>
    </div>
    <div className="flex justify-center items-center">
      <span className="text-[#D3F2FF] items-start flex justify-center mt-[-2rem] text-[24px]">
        :
      </span>
    </div>
    <div className="flex justify-center flex-col">
      <div className="p-[1rem] bg-[#001625]/60 rounded-[4px] flex justify-center  text-white text-[16px] font-medium">
        {getCountDownToCloseHour(props.data?.created_at, 1)}
      </div>
      <span className="text-center text-[12px] md:text-[14px]  mt-[10px]">Menit</span>
    </div>
    <div className="flex justify-center items-center">
      {" "}
      <span className="text-[#D3F2FF]  items-start flex justify-center mt-[-2rem] text-[24px]">
        :
      </span>
    </div>

    <div className="flex justify-center flex-col">
      <div className="p-[1rem] bg-[#001625]/60 rounded-[4px] flex justify-center  text-white text-[16px] font-medium">
        {getCountDownToCloseHour(props.data?.created_at, 2)}
      </div>
      <span className="text-center text-[12px] md:text-[14px] mt-[10px]">Detik</span>
    </div> 
  </div></div>
  )
}
