import { useState, Fragment, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { HiOutlineSelector } from "react-icons/hi";
import { FaCheck } from "react-icons/fa";
import Text from "@components/ui/text";
import Button from "@components/ui/button";
import { useUI } from "@contexts/ui-context";
import { useTranslation } from "next-i18next";
import { useBankListQuery } from "@framework/user/get-bank-list";
import { formatMoney } from "@framework/user/use-currency";
import { Bank } from "@framework/types";
import { BiArrowBack } from "react-icons/bi";
import Link from "@components/ui/link";
import { AiOutlineArrowDown } from "react-icons/ai";
import { BsExclamationCircle } from "react-icons/bs";
import isEmpty from "lodash/isEmpty";
import CurrencyInput from "react-currency-input-field";
import { useUserQuery } from "@framework/user/get-user-profile";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const MINIMUM_DEPOSIT = 10000;

const DepositBox = () => {
  const { openModal, setModalView, setModalData } = useUI();
  const [depositAmount, setAmount] = useState(0);
  const [selected, setSelected] = useState([]);
  const { isFetching: isLoading, Da, error } = useBankListQuery();
  const { t } = useTranslation("deposit");
  const { data: user } = useUserQuery();
  function handleDeposit() {
    setModalData({
      data: { amount: generateUniqueNumber(depositAmount), bank: selected },
    });
    setModalView("DEPOSIT_CONFIRMATION_VIEW");
    return openModal();
  }
  function generateUniqueNumber(value: number) {
    return value + Math.floor(Math.random() * 1000);
  }

  useEffect(() => {
    if (isEmpty(selected) && !isEmpty(data) && !isEmpty(user)) {
      const bank = data?.find((i) => i.bank === user?.bank_name);
      setSelected(bank);
    }
  }, [selected, data]);
  return (
    <div className="pb-8 text-blackDefault-100">
      <Text
        variant="pageHeading"
        className="flex items-center pb-1 text-whiteDefault-100 mb-4 capitalize lg:inline-flex"
      >
        <Link href="/" className="mr-3">
          <BiArrowBack className="w-6 h-6 hover:text-blue-600" />
        </Link>
        {t("deposit:text-deposit-header")}
      </Text>
      <div className="lg:flex gap-8 mb-6 -mx-4 lg:mx-0">
        <div className="relative lg:flex-initial lg:w-1/2 pb-24 p-8 lg:pb-8 bg-gray-300 lg:bg-gray-200 rounded-lg lg:rounded-md z-0">
          <label
            htmlFor="deposit"
            className="block text-sm font-medium text-gray-700"
          >
            JUMLAH TRANSFER
          </label>
          <div className="flex w-full items-center lg:my-2">
            <CurrencyInput
              id="input-example"
              name="input-name"
              placeholder="Please enter a number"
              defaultValue={0}
              decimalSeparator=","
              groupSeparator="."
              onValueChange={(value) => setAmount(value)}
              value={depositAmount}
              className="block w-full lg:w-[90%] px-3 py-2 lg:py-4 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <div className="w-[32px] h-[32px] bg-gray-400 rounded-full mx-4 hidden lg:block"></div>
            <div className="font-semibold hidden lg:block">RP. </div>
          </div>
          <div className="mt-4 hidden lg:block">
            <a
              onClick={() => setAmount(500000)}
              className={`px-4 py-1 mr-2 font-semibold bg-white border-2 rounded-2xl border-gray-350 cursor-pointer ${
                depositAmount === 500000 ? "border-indigo-500" : ""
              }`}
            >
              500.000
            </a>
            <a
              onClick={() => setAmount(1000000)}
              className={`px-4 py-1 mr-2 font-semibold bg-white border-2 rounded-2xl border-gray-350 cursor-pointer ${
                depositAmount === 1000000 ? "border-indigo-500" : ""
              }`}
            >
              1.000.000
            </a>
            <a
              onClick={() => setAmount(1500000)}
              className={`px-4 py-1 mr-2 font-semibold bg-white border-2 rounded-2xl border-gray-350 cursor-pointer ${
                depositAmount === 1500000 ? "border-indigo-500" : ""
              }`}
            >
              1.500.000
            </a>
            <a
              onClick={() => setAmount(2000000)}
              className={`px-4 py-1 mr-2 font-semibold bg-white border-2 rounded-2xl border-gray-350 cursor-pointer ${
                depositAmount === 2000000 ? "border-indigo-500" : ""
              }`}
            >
              2.000.000
            </a>
          </div>
        </div>
        <div className="lg:flex-initial lg:w-1/2 p-8 bg-gray-200 rounded-md mx-8 lg:mx-0  -mt-16 lg:mt-0 relative z-10">
          <div className="absolute p-2 -top-8 text-sm rounded-full bg-white left-[50%] -ml-8 lg:-ml-0 border-8 border-gray-300 lg:hidden">
            <AiOutlineArrowDown className="lg:h-8 h-6 lg:w-8 w-6" />
          </div>
          <label
            htmlFor="deposit"
            className="block text-sm font-medium text-gray-700"
          >
            TUJUAN TRANSFER
          </label>

          <div className="lg:flex lg:items-center lg:gap-5 lg:py-6">
            <Listbox value={selected} onChange={setSelected}>
              {({ open }) => (
                <>
                  <div className="mt-1 relative lg:w-[60%]">
                    <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-4 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-14">
                      <span className="flex items-center">
                        <span className="ml-3 block truncate">
                          {selected.account_number}
                        </span>
                      </span>
                      <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <HiOutlineSelector
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                        {/* <Listbox.Option
                          key={0}
                          value={0}
                          className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white"
                        >
                          <div className="flex items-center justify-between">
                            <span className="ml-3 block truncate">
                              XXX XXX XXX
                            </span>
                            <span className="flex items-center space-x-3">
                              <span className="w-4 h-4 bg-gray-400 rounded-full"></span>
                              <span>---</span>
                            </span>
                          </div>
                        </Listbox.Option> */}
                        {data &&
                          data?.map((item: Bank) => (
                            <Listbox.Option
                              key={item._id}
                              className={({ active }) =>
                                classNames(
                                  active
                                    ? "text-white bg-indigo-600"
                                    : "text-gray-900",
                                  "cursor-default select-none relative py-2 pl-3 pr-9"
                                )
                              }
                              value={item}
                            >
                              {({ selected, active }) => (
                                <>
                                  <div className="flex items-center justify-between">
                                    <span
                                      className={classNames(
                                        selected
                                          ? "font-semibold"
                                          : "font-normal",
                                        "ml-3 block truncate"
                                      )}
                                    >
                                      {item.account_number}
                                    </span>
                                    <span className="flex items-center space-x-3">
                                      <span className="w-4 h-4 bg-gray-400 rounded-full"></span>
                                      <span>{item.bank}</span>
                                    </span>
                                  </div>

                                  {selected ? (
                                    <span
                                      className={classNames(
                                        active
                                          ? "text-white"
                                          : "text-indigo-600",
                                        "absolute inset-y-0 right-0 flex items-center pl-4 pr-4"
                                      )}
                                    >
                                      <FaCheck
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
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
            <Button
              onClick={() => handleDeposit()}
              disabled={depositAmount < MINIMUM_DEPOSIT}
              className="inline-block px-4 py-4 text-sm font-semibold leading-4 text-white bg-purple-600 rounded-md hover:text-white hover:bg-gray-600 mt-4 w-full lg:w-auto lg:mt-0"
            >
              {t("button-deposit")}
            </Button>
          </div>
          <p className="mt-2 text-sm text-gray-500 uppercase">
            {selected.name}
          </p>
        </div>
      </div>
      <div className="rounded-md bg-gray-300 p-4 mx-4 lg:mx-0">
        <div className="flex">
          <div className="flex-shrink-0">
            <BsExclamationCircle
              className="h-5 w-5 text-gray-600"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3 lg:flex lg:space-x-3">
            <h3 className="text-sm font-medium">Deposit Minimum:</h3>
            <div className="text-sm font-semibold">
              <p>
                {formatMoney({
                  amount: MINIMUM_DEPOSIT,
                  currencyCode: "IDR",
                  locale: "id-ID",
                })}
              </p>
            </div>
            {/* <h3 className="text-sm font-medium mt-4 lg:mt-0 lg:ml-8">
              Penarikan Dana Maksimal:
            </h3>
            <div className="text-sm font-semibold">
              <p>RP.50,000.00</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositBox;
