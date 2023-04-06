import { Listbox, Transition } from "@headlessui/react";
import IconArrowDown from "public/icons/arrowDown.svg";
import { Fragment, useEffect, useState } from "react";

interface DropdownCustomType {
  data: any;
  onChange: any;
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

interface IValueSelect {
  value: string;
  name: string;
}

export const DropdownDefault = (props: DropdownCustomType) => {
  const [Open, setOpen] = useState(false);
  const [Title, setTitle] = useState("");
  const [Value, setValue] = useState("");

  const [DatabankHandle, setDatabankHandle] = useState([]);

  useEffect(() => {
    setFristBank();
  }, []);

  const setFristBank = () => {
    const dataHandle = props.data ? props.data : [];
    if (dataHandle) {
      setTitle(dataHandle[0].name);
      setValue(dataHandle[0].value);
    }
  };

  const handleOnChange = (e: any) => {
    setTitle(e.name);
    setValue(e.value);
    props.onChange(e);
  };

  return (
    <Listbox value={Title} onChange={handleOnChange}>
      {({ open }) => (
        <>
          <div
            className={`${props.className ? props.className : ""} relative ${props.width ? props.width : "w-full min-w-[10rem]"
              } bg_input_primary text-xs input-border-yellow font-normal rounded-md text-black1-100 h-11 border-[1px] mb-[3px] md:mb-0 border-transparent active:outline-none
    `}
          >
            <Listbox.Button
              tabIndex={props.tabIndex}
              className={`${props.className ? props.className : ""
                } h-11  rounded-md relative px-4 md:px-5 w-full text-left capitalize`}
            >
              {props.placeholder && !props.value ? (
                <span className="truncate text-whiteDefault-40 text-sm">
                  {props.placeholder}
                </span>
              ) : null}
              {Title ? <span className="truncate">{Title}</span> : null}
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <IconArrowDown
                  className={`h-4 w-4 text-gray-400 ${open ? "-rotate-180" : "rotate-0"} transform ease-in-out duration-200`}
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
                className={`${props.positionDropdown === "top" ? "bottom-full" : ""
                  } bg_select absolute mt-[2px] pl-0 z-20 max-h-40 w-full overflow-y-auto scrollbar rounded-none text-xs text-white font-normal shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm divide-y divide-whiteDefault-10 py-0`}
              >
                {props.data.map((option: any, personIdx: number) => (
                  <Listbox.Option
                    key={personIdx}
                    className={({ active }) =>
                      `relative text-xs font-normal cursor-default select-none active capitalize
                }`
                    }
                    value={option}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`flex items-center truncate px-4 md:px-5 text-xs h-[44px] ${selected
                            ? "bg_select_list_item_active"
                            : "bg_select_list_item"
                            }  hover:cursor-pointer`}
                        >
                          {option.name}
                        </span>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};
