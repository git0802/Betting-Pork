import { Menu, Transition } from "@headlessui/react";
import { addDays } from "date-fns";
import { id } from "date-fns/locale";
import moment from "moment";
import IconCalendar from "public/icons/calendar.svg";
import { Fragment, useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import { AiOutlineCaretDown } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import Button from "@components/ui/button";


interface DateRangePicker {
  startDate: Date;
  endDate: Date;
  onStartDateChange: Function;
  onEndDateChange: Function;
  className?: string;
  label?: string;
  disabled?: boolean;
  position: "left" | "right" | "center";
  display: 1 | 2;
}

// const selectionColor = "#32323230";
const selectionColor = "#2D3035";

export default function DaterangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  className,
  label,
  disabled,
  position = "left",
  display = 1,
}: DateRangePicker) {
  const [Open, setOpen] = useState(false);
  const [StartDateLocal, setStartDateLocal] = useState(
    startDate ? startDate : new Date(moment().format("YYYY-MM-DD"))
  );
  const [EndDateLocal, setEndDateLocal] = useState(
    endDate ? endDate : new Date(moment().format("YYYY-MM-DD"))
  );

  useEffect(() => {
    moment.locale("id");
  }, []);

  const setPosition = (position: string) => {
    switch (position) {
      case "left":
        return "left-0 md:-ml-4";
      case "right":
        return "right-0 md:-mr-4";
      case "center":
        return "-ml-[14rem]";
      default:
        break;
    }
  };

  const onClear = () => {
  
    onStartDateChange(new Date(moment().subtract(1,"day").format("YYYY-MM-DD")));
    onEndDateChange(new Date(moment().format("YYYY-MM-DD")));
    setStartDateLocal(new Date(moment().subtract(1,"day").format("YYYY-MM-DD")));
    setEndDateLocal(new Date(moment().format("YYYY-MM-DD")));
  };
  return (
    <div
      className={`  ${disabled ? "opacity-40" : ""
        }  w-full xl:min-w-[15rem] h-full`}
    >
      <div className={`bg_select_date_range flex justify-center w-full px-[15px] rounded-[6px] items-center text-xs font-normal text-black1-100 h-11 duration-200 transition ease-in-out z-10`}>
        <Menu
          as="div"
          className={`relative inline-block w-full text-left ${className}`}
        >
          {({ open }) => (
            <>
              <div>
                <Menu.Button
                  disabled={disabled}
                  className="w-full items-center flex"
                >
                  <div className="flex w-full justify-between items-center font-semibold hover:text-[#fff] text-white">
                    <span className="flex space-x-[10px] justify-center items-center">
                      <IconCalendar className="w-5 h-[18px]" />
                      <h1 className="w-full text-[12px] font-normal text-white">
                        {moment(StartDateLocal).format("DD/MM/YYYY")} -{" "}
                        {moment(EndDateLocal).format("DD/MM/YYYY")}{" "}
                      </h1>
                    </span>

                    <span className="mr-[-4px] md:mr-[4px] text-white/20">
                      <AiOutlineCaretDown
                        className={`w-4 h-4 ${open ? "-rotate-180" : "rotate-0"
                          } transform ease-in-out duration-200`}
                      />
                    </span>
                  </div>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-80"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-80"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  className={`${setPosition(
                    position
                  )} bg_list_date_range w-full md:w-fit fixed top-0 md:absolute md:top-auto rounded-lg z-[51] md:mt-[1rem] rounded-lg `}
                >
                  <div className="px-3 shadow-lg top-0 left-0 md:top-auto md:left-auto">
                    <div className="flex flex-row justify-between items-center items-left pt-5">
                      <div className="text-left text-lg font-bold text-[#D3F2FF] pl-[1rem]">
                        Select Date
                      </div>
                      <Menu.Button className="items-center flex text-lg font-bold">
                        {/* <CloseIcon /> */}
                        <button
                          className="inline-flex items-center justify-center text-CadetGrey-100 hover:text-whiteDefault-100 transition duration-200 focus:outline-none"
                        >
                          <IoClose className="text-xl" />
                        </button>
                      </Menu.Button>{" "}
                    </div>

                    <DateRange
                      className="bg_list_date_range_picker"
                      ranges={[
                        {
                          startDate: StartDateLocal,
                          endDate: EndDateLocal,
                          key: "selection",
                          color: selectionColor,
                        },
                      ]}
                      // rangeColors={["#A36AFF", "#A36AFF", "#A36AFF"]}
                      months={display}
                      direction="horizontal"
                      maxDate={addDays(new Date(), 0)}
                      showMonthAndYearPickers={true}
                      showDateDisplay={false}
                      locale={id}
                      onChange={(e: { selection: any }) => {
                        const { selection } = e;
                        setEndDateLocal(selection.endDate as Date);
                        setStartDateLocal(selection.startDate as Date);
                      }}
                    />

                    <div className="grid grid-cols-2 gap-4 pb-5 justify-between px-4">
                      <Button
                        onClick={() => {
                          onClear();
                        }}
                        variant="cancel"
                        width="w-full"
                        className="flex flex-row h-11 font-extrabold text-sm px-5 uppercase"
                      >
                        Clear
                      </Button>
                      <Menu.Button
                        onClick={() => {
                          onStartDateChange(
                            moment(StartDateLocal)
                              .local()
                              .format("YYYY-MM-DDTHH:mm:ss.SSS")
                          );
                          onEndDateChange(
                            moment(EndDateLocal)
                              .local()
                              .format("YYYY-MM-DDTHH:mm:ss.SSS")
                          );
                        }}
                        className="btn_primary rounded-md active:translate-y-1 flex justify-center items-center uppercase cursor-pointer transition ease-in-out duration-200 focus-visible:outline-none focus:outline-none h-11 font-extrabold text-sm w-full"
                      >
                        Apply
                      </Menu.Button>{" "}
                    </div>
                  </div>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </div>
    </div>
  );
}
