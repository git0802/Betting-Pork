import cn from "classnames";
import moment from "moment";
import React, { forwardRef, ButtonHTMLAttributes, useState } from "react";
// import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// const MediaQuery = dynamic(() => import("react-responsive"), { ssr: false });

import { subDays, addDays } from "date-fns";
import dynamic from "next/dynamic";
export interface DateRangeProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "flat" | "slim" | "smoke" | "button";
  active?: boolean;
  type?: "submit" | "reset" | "button";
  loading?: boolean;
  disabled?: boolean;
  setTotalBet: (value: number) => void;
}

interface GamesTogelColokBebasWapProps {
  onRemoveBet?: () => void;
  setStartDay: (value: any) => void;
  setEndDay: (value: any) => void;

  setLoad: (value: any) => void;

  parentStartDate?: string;
  parentEndDate?: string;
  mobileClassName?: string;
}

type GamesTogelColokBebasWap = {
  setStartDay: (e: any) => void;
  setEndDay: (e: any) => void;
  setLoad: (value: any) => void;
};

const DateRange = forwardRef(
  (
    {
      setStartDay,
      setEndDay,
      parentStartDate,
      parentEndDate,
      setLoad,
      mobileClassName,
    }: GamesTogelColokBebasWapProps,
    ref
  ) => {
    const [Modal, setModal] = useState(false);
    const [startDate, setStartDate] = useState(
      parentStartDate! ? new Date(parentStartDate) : new Date()
    );
    const [endDate, setEndDate] = useState(
      parentEndDate! ? new Date(parentEndDate!) : new Date()
    );
    let DateNowStart: any =
      parentStartDate ?? moment(startDate).format("YYYY-MMM-DD").toString();
    let DateNowEnd: any =
      parentEndDate ?? moment(endDate).format("YYYY-MMM-DD").toString();

    const onChangeModal = () => {
      setModal(!Modal);
    };

    return Modal ? (
      <div className="backgroundMaterial flex flex-col justify-center items-center min-h-[15rem] min-w-[23rem] z-50  border-2 rounded-md mr-2">
        <div className="flex space-x-1 text-center">
          <div>
            <h1 className="mb-2">Start Date</h1>
            <DatePicker
              selected={startDate}
              onChange={(date, e) => {
                setStartDate(date),
                  setStartDay(moment(date).format("YYYY-MM-DD")),
                  setLoad(false),
                  (DateNowStart = moment(date).format("YYYY-MM-DD"));
              }}
              selectsStart
              dateFormat="MMMM d, yyyy"
              startDate={startDate}
              endDate={endDate}
              maxDate={addDays(new Date(), 0)}
              monthsShown={2}
              className={
                "text-secondary-50 p-2 mb-3 w-full text-center text-sm"
              }
            />
          </div>

          <div>
            <h1 className="mb-2">End Date</h1>
            <DatePicker
              selected={endDate}
              onChange={(date, e) => {
                setEndDate(date),
                  setEndDay(moment(date).format("YYYY-MM-DD")),
                  setLoad(false),
                  (DateNowEnd = moment(date).format("YYYY-MM-DD"));
              }}
              selectsEnd
              dateFormat="MMMM d, yyyy"
              monthsShown={2}
              startDate={startDate}
              endDate={endDate}
              maxDate={addDays(new Date(), 0)}
              // minDate={startDate}
              className={
                "text-secondary-50 p-2 mb-3 w-full text-center text-sm"
              }
            />
          </div>
        </div>

        <div className="w-full p-2 flex justify-center">
          <button
            onClick={() => {
              onChangeModal();
            }}
            className="border-2 border-[#FFB26B] text-transparent bg-clip-text bg-gradient-to-br from-[#FCEFC9] to-[#FFB26B] py-2 w-[90%] rounded-md mt-3 ml-2"
          >
            Close
          </button>
        </div>
      </div>
    ) : (
      <button
        onClick={() => {
          onChangeModal();
        }}
        className=" backgroundMaterial w-full h-full  flex justify-between items-center p-4 "
      >
        <span className="text-xs w-max font-sm">
          {moment(DateNowStart).format("DD/MM/YYYY")} -{" "}
          {moment(DateNowEnd).format("DD/MM/YYYY")}{" "}
        </span>
        <span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 21.0037H5.99747C4.33992 21.0037 2.99622 19.66 2.99622 18.0025V5.99747C2.99622 4.33992 4.33992 2.99622 5.99747 2.99622H18.0025C19.66 2.99622 21.0037 4.33992 21.0037 5.99747V12"
              stroke="#B5B5B5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21.0038 21.0038L19.14 19.14"
              stroke="#B5B5B5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17.0021 14.0009C18.6596 14.0009 20.0034 15.3446 20.0034 17.0021C20.0034 18.6596 18.6596 20.0034 17.0021 20.0034C15.3446 20.0034 14.0009 18.6596 14.0009 17.0021C14.0009 15.3446 15.3446 14.0009 17.0021 14.0009"
              stroke="#B5B5B5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21.0037 7.99838H2.99622"
              stroke="#B5B5B5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.7497 11.4497C13.7226 11.4497 13.7007 11.4717 13.7007 11.4987C13.7007 11.5258 13.7226 11.5478 13.7497 11.5478C13.7768 11.5478 13.7987 11.5258 13.7987 11.4987C13.7987 11.4717 13.7768 11.4497 13.7497 11.4497"
              stroke="#B5B5B5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.2482 11.4497C10.2353 11.4497 10.223 11.4549 10.2139 11.4641C10.2049 11.4734 10.1999 11.4858 10.2002 11.4987C10.2002 11.5187 10.2123 11.5366 10.2307 11.5441C10.2492 11.5517 10.2703 11.5473 10.2843 11.533C10.2982 11.5188 10.3021 11.4976 10.2942 11.4793C10.2863 11.461 10.2681 11.4493 10.2482 11.4497"
              stroke="#B5B5B5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.74681 11.4497C6.73355 11.4494 6.72076 11.4546 6.71147 11.4641C6.70219 11.4736 6.69723 11.4865 6.69779 11.4997C6.69779 11.5197 6.70985 11.5376 6.72829 11.5451C6.74673 11.5526 6.76789 11.5483 6.78183 11.534C6.79577 11.5198 6.79971 11.4986 6.79181 11.4803C6.7839 11.462 6.76572 11.4503 6.74581 11.4507"
              stroke="#B5B5B5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.2482 14.4511C10.2353 14.4511 10.223 14.4563 10.2139 14.4655C10.2049 14.4747 10.1999 14.4872 10.2002 14.5001C10.2002 14.52 10.2123 14.5379 10.2307 14.5455C10.2492 14.553 10.2703 14.5486 10.2843 14.5344C10.2982 14.5202 10.3021 14.4989 10.2942 14.4806C10.2863 14.4624 10.2681 14.4507 10.2482 14.4511"
              stroke="#B5B5B5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.74681 14.4511C6.73355 14.4508 6.72076 14.456 6.71147 14.4655C6.70219 14.4749 6.69723 14.4878 6.69779 14.5011C6.69779 14.521 6.70985 14.5389 6.72829 14.5465C6.74673 14.554 6.76789 14.5496 6.78183 14.5354C6.79577 14.5212 6.79971 14.4999 6.79181 14.4816C6.7839 14.4633 6.76572 14.4517 6.74581 14.4521"
              stroke="#B5B5B5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.2482 17.4533C10.2353 17.4533 10.223 17.4585 10.2139 17.4677C10.2049 17.4769 10.1999 17.4894 10.2002 17.5023C10.2002 17.5222 10.2123 17.5401 10.2307 17.5477C10.2492 17.5552 10.2703 17.5508 10.2843 17.5366C10.2982 17.5224 10.3021 17.5011 10.2942 17.4828C10.2863 17.4645 10.2681 17.4529 10.2482 17.4533"
              stroke="#B5B5B5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.74679 17.4533C6.73371 17.453 6.72108 17.4581 6.71183 17.4673C6.70258 17.4766 6.6975 17.4892 6.69777 17.5023C6.69778 17.5222 6.70983 17.5401 6.72827 17.5477C6.74671 17.5552 6.76788 17.5508 6.78181 17.5366C6.79575 17.5224 6.79969 17.5011 6.79179 17.4828C6.78389 17.4645 6.76571 17.4529 6.74579 17.4533"
              stroke="#B5B5B5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
    );
  }
);

export default DateRange;
