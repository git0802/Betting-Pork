import { Listbox, Transition } from "@headlessui/react";
import { BankIcon } from "@utils/functionutil/Function";
import IconArrowDown from "public/icons/arrowDown.svg";
import { Fragment, useEffect, useState } from "react";
import { FaLessThan } from "react-icons/fa";

interface DropdownCustomType {
  data?: any;
  dataUser?: any;
  bankData: any;
  setBankValueData?: any;

  setBankChoiceUserBankAccount?: any;
  setBankChoiceUserBankName?: any;
  setBankChoiceUserBankAccountName?: any;

  onChange?: any;
  useTititle?: boolean;
  title?: string;
  value?: string;
  labelKey?: string;
  tabIndex?: number;
  selected?: string;
  placeholder?: string;

  rules?: any;
  className?: string;
  positionDropdown?: "bottom" | "top";
  errorKey?: string;
  width?: string;
}

export const DropdownCustom = (props: DropdownCustomType) => {
  const renderDatabank = () => {
    const dataBank: any = props ? props.data : [];
    return dataBank?.map(
      (
        value: {
          _id: string;
          bank: string | number;
          account_number: string | number;
          name: string;
        },
        i: number
      ) => {
        return (
          <Listbox.Option
            key={i}
            className={({ active }) =>
              `relative text-xs font-normal cursor-default select-none active capitalize
          }`
            }
            value={value}
          >
            {({ selected }) => (
              <>
                <span
                  className={`flex items-center truncate md:px-4 md:px-5 text-xs h-[44px] ${
                    selected
                      ? "bg_select_list_item_active"
                      : "bg_select_list_item"
                  } hover:bg-bluePrimary visited:bg-bluePrimary hover:text-black1-100 hover:cursor-pointer`}
                >
                  <span className="min-w-[5rem] md:min-w-[4rem] "> {BankIcon(value.bank, 1.3)}</span>

                  <span className="uppercase text-[14px] md:text-[16px] text-[#D3F2FF]/80 font-medium">
                    {value.account_number} - {value.name}
                  </span>
                </span>
              </>
            )}
          </Listbox.Option>
        );
      }
    );
  };

  const handleNotSelected = () => {
    const selectedBank = props.bankData ? props.bankData : null;
    const dataBank:any = props.data ? props.data : [];

    let accountNumber = dataBank?.length > 0 ? dataBank[0].account_number : "";
    let accountName = dataBank?.length > 0 ? dataBank[0].name : "";
    let bankName = dataBank?.length > 0 ? dataBank[0].bank : "";
    
    for (let i = 0; i < dataBank.length; i++) {
      if (dataBank[i]._id == selectedBank?._id) {
        accountNumber = dataBank[i].account_number;
        accountName = dataBank[i].name;
        bankName = dataBank[i].bank;
        break;
      }
    }

    if (selectedBank) {
      return (
        <div className="items-center justify-center flex truncate">
          <div className="mr-[0.8rem] min-w-[3rem] mb-[-3px] items-center justify-center flex">
            <span> {BankIcon(bankName , 1.3)}</span>
          </div>
          {accountNumber ? <span className="uppercase mt-[-1px] text-[14px] md:text-[16px] font-medium text-[#D3F2FF]/80 truncate">{accountNumber + " - " + accountName}</span>: <span className="ml-[-3.8rem] text-whiteDefault-80">Pilih Bank</span>}
        </div>
      );
    } else {
      return null;
    }
  };

  const handleChange = (e: any) => {
    props.setBankValueData(e)
  };

  return  (
    <Listbox value={"t"} onChange={handleChange}>
      <div
        className={`${props.className ? props.className : ""} relative ${
            props.width ? props.width : "w-full min-w-[10rem]"
          } bg_input_primary md:bg-black1-3 text-xs input-border-2 h-[48px] md:h-[52px] font-normal rounded-md text-black1-100 border-[1px] mb-[3px] md:mb-0 border-transparent
      `}>
        <Listbox.Button
          tabIndex={props.tabIndex}
          className={`${
            props.className ? props.className : ""
          } h-[48px] md:h-[52px]  rounded-md relative px-4 md:px-5 w-full text-left capitalize`}
        >
          {props.placeholder && !props.value ? (
            <span className="truncate text-whiteDefault-40 text-sm">
              {props.placeholder}
            </span>
          ) : null}
          <div className="font-extralight w-full flex ">
            {handleNotSelected()}
          </div>
          {/* {Title ? <span className="truncate">{Title}</span> : null} */}
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <IconArrowDown
              className="h-4 w-4 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            className={`${
              props.positionDropdown === "top" ? "bottom-full" : ""
            } bg_input_primary absolute mt-[2px]   pl-0 z-20 max-h-40 w-full overflow-y-auto scrollbar rounded-none text-xs text-white font-normal shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm divide-y divide-whiteDefault-10 py-0`}
          >
            {renderDatabank()}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>);
  
};
