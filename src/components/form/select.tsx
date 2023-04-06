import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import IconArrowDown from "public/icons/arrowDown.svg"
import { Controller } from "react-hook-form";
import classNames from "classnames";

export interface PropsFormSelect {
  labelKey?: string;
  tabIndex?: number;
  selected?: string;
  onChange?: any;
  placeholder?: string;
  name: string;
  rules?: any;
  control?: any;
  options: {
    value: string;
    label: string;
  }[];
  className?: string;
  positionDropdown?: "bottom" | "top";
  errorKey?: string;
  width?: string;
}

const FormSelect = ({
  labelKey,
  tabIndex,
  options,
  placeholder,
  name,
  control,
  rules,
  className,
  positionDropdown,
  errorKey,
  width
}: PropsFormSelect) => {
  const getLabel = (value: string) => {
    return options.find((option) => option.value === value)?.label;
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => {
        return (
          <div className="w-full">
            {labelKey && (
              <label htmlFor={name} className="cp-form-label">
                {labelKey}
              </label>
            )}
            <Listbox value={field.value} onChange={field.onChange}>
              {({ open }) => (
                <>
                  <div
                    className={`${className ? className : ""} relative ${width ? width : "w-full"} input_primary text-xs font-normal mt-1 rounded-md text-black1-100 h-11 p-[1px] group
                `}
                  >
                    <Listbox.Button
                      tabIndex={tabIndex}
                      className={`${className ? className : ""} h-[42px] rounded-md relative px-4 md:px-5 w-full text-left capitalize`}
                    >
                      {placeholder && !field.value ? (
                        <span className="truncate text-whiteDefault-40 text-sm">{placeholder}</span>
                      ) : null}
                      {field.value ? (
                        <span className="truncate">{getLabel(field.value)}</span>
                      ) : null}
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <IconArrowDown
                          className={`h-4 w-4 ${open ? "-rotate-180" : "rotate-0"
                            } transition-all ease-in-out duration-200 text-gray-400 group-hover:text-borderHover-100`}
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
                        className={`${positionDropdown === "top" ? "bottom-full" : ""
                          } bg_listbox absolute mt-[2px] pl-0 z-20 md:max-h-40 w-full overflow-y-auto scrollbar rounded-none text-xs text-white font-normal shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm divide-y divide-whiteDefault-10 py-0`}
                      >
                        {options.map((option, personIdx) => (
                          <Listbox.Option
                            key={personIdx}
                            className={({ active }) =>
                              classNames(
                                active 
                                  ? "bg_switch_lang_list_item_active" 
                                  : "bg_switch_lang_list_item",
                                ""
                              )
                            }
                            value={option.value}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`flex items-center truncate px-4 md:px-5 text-xs h-[44px] ${selected
                                    ? "bg_switch_lang_list_item_active"
                                    : null
                                    } `}
                                >
                                  {option.label}
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
            {errorKey && (
              <p className="my-2 text-xs text-red-500">{errorKey}</p>
            )}
          </div>
        );
      }}
    />
  );
};

export default FormSelect;
