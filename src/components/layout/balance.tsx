import { useUserQuery } from "@framework/user/get-user-profile";
import Router, { useRouter } from "next/router";
import { ROUTES } from "@utils/routes";
import useMoney from "@framework/user/use-currency";
import { AiOutlineCaretDown, AiOutlinePlus } from "react-icons/ai";
import { BiRefresh } from "react-icons/bi";
import { useTranslation } from "next-i18next";
import { Fragment, useEffect, useRef, useState } from "react";
import { useUI } from "@contexts/ui-context";
import { Popover, Transition } from "@headlessui/react";
import { useDevice } from "@contexts/device-context";

const UserBalance = () => {
  const { t } = useTranslation();
  const { openModal, setModalView, isAuthorized, isPinVerified, hasPin } = useUI();
  const { isFetching, data, refetch, isRefetching } = useUserQuery();

  const router = useRouter();

  const [effect, setEffect] = useState(false);

  const setTotalAmount = useRef<number>(0);
  const setSaldoUtama = useRef<number>(0);
  const setSaldoBonus = useRef<number>(0);

  if (data) {
    if (data?.active_wallet_provider === "") {
      setSaldoUtama.current = data?.balance ? data?.balance : 0
      setSaldoBonus.current = data?.promotion_balance ? data?.promotion_balance : 0
      setTotalAmount.current = setSaldoUtama.current + setSaldoBonus.current
    } else {
      setSaldoUtama.current = data?.active_wallet_balance ? data?.active_wallet_balance : 0
      setSaldoBonus.current = data?.promotion_balance ? data?.promotion_balance : 0
      setTotalAmount.current = setSaldoUtama.current + setSaldoBonus.current
    }
  }

  const { money: moneyTotal } = useMoney({
    amount: Math.trunc(setTotalAmount.current),
    currencyCode: "IDR",
  });
  const { money: moneyUtama } = useMoney({
    amount: Math.trunc(setSaldoUtama.current),
    currencyCode: "IDR",
  });
  const { money: moneyBonus } = useMoney({
    amount: Math.trunc(setSaldoBonus.current),
    currencyCode: "IDR",
  });

  function navigateToDeposit() {
    Router.push(ROUTES.DEPOSIT);
  }

  const showPin = (haspin: boolean) => {
    if (hasPin === false) setModalView("NEW_PIN");
    else if (hasPin === true) setModalView("PIN_VERIFICATION");
    openModal();
  };

  useEffect(() => {
    if (!isAuthorized) {
      refetch();
      showPin(hasPin);
    }
  }, [data]);

  const device = useDevice();

  return (
    <div className="flex flex-row relative items-center rounded-md h-10">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button className="flex flex-row relative items-center rounded-md h-10 outline-none">
              <div className="flex flex-col text-right mr-4">
                <div className="balance_text flex flex-row items-center justify-end space-x-1 text-[rgba(234,245,255,1)] leading-[14px]">
                  <span>
                    {t("common:text-my-balance")}
                  </span>
                </div>
                <div className="balance_amount flex space-x-1 items-center text-white leading-[18px]">
                  <span>
                    {moneyTotal}
                  </span>
                  <AiOutlineCaretDown
                    className={`w-3 h-3 ${open ? "-rotate-180" : "rotate-0"
                      } transition-all ease-in-out duration-200`}
                  />
                </div>
              </div>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease duration-0"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition ease duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Popover.Panel className={`${device.isTabDevice ? "mx-[18px] w-screen max-w-[330px] transform -translate-x-1/2 left-1/2" : "left-0 min-w-[206px] max-w-[330px]"} absolute z-10 mt-5  drop-shadow-lg`}>
                <div className="flex flex-col rounded-[10px] bg-[#191B28] divide-y-[1px] divide-[#474B57]">
                  <div className="px-[21px] py-[18px]">
                    <div className="flex flex-col gap-[14px]">
                      <label className="text-whiteDefault-60 text-xs font-normal">
                        Total Saldo
                      </label>
                      <div className="flex items-center gap-1">
                        <label className="text-lg font-bold text-white">
                          {moneyTotal}
                        </label>
                        <BiRefresh
                          className={`${isFetching ? "animate-spin" : ""
                            } cursor-pointer text-2xl`}
                          onClick={() => refetch()}
                        />
                        {/* <button
                          className={`${effect && "animate-wiggle"
                            } bg-blue-500 p-1 text-white rounded hover:bg-blue-700 hover:shadow-xl`}
                          onClick={() => {
                            setEffect(true);
                          }}
                          onAnimationEnd={() => setEffect(false)}
                        >rotate</button> */}
                      </div>
                    </div>
                  </div>
                  <div className="px-[21px] py-[18px] flex flex-col gap-[14px]">
                    <div className="flex flex-col justify-center gap-[3px]">
                      <label className="text-whiteDefault-60 text-xs font-normal capitalize">
                        {t("common:text-main-balance")}
                      </label>
                      <div className="flex items-center gap-1">
                        <label className="text-sm font-bold text-yellowPrimary">
                          {moneyUtama}
                        </label>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center gap-[3px]">
                      <div className="flex flex-row items-center gap-[5px]">
                        <label className="text-whiteDefault-60 text-xs font-normal capitalize">
                          {t("common:text-bonus-balance")}
                        </label>
                        {/* <button data-tooltip-target="tooltip-click" data-tooltip-trigger="click" type="button">
                          <IconInformation className="w-[14px] h-[14px] text-white animate-pulse" />
                        </button>
                        <div id="tooltip-click" role="tooltip" className="absolute z-20 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                          Saldo Tidak bisa ditarik
                          <div className="tooltip-arrow" data-popper-arrow></div>
                        </div> */}

                      </div>
                      <div className="flex items-center gap-1">
                        <label className="text-sm font-bold text-yellowPrimary">
                          {moneyBonus}
                        </label>
                      </div>
                    </div>
                    <Popover.Button
                      type="button"
                      onClick={() => router.push("/wallet")}
                      className="lg:hidden mt-[14px] h-11 md:h-12 font-extrabold rounded-[5px] uppercase bg-white/10 hover:lg:bg-white/20 active:translate-y-1 transition-all duration-200 ease-in-out"
                    >
                      {t("common:text-wallet")}
                    </Popover.Button>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>

      <button
        onClick={() => {
          if (isPinVerified === true) {
            navigateToDeposit()
          } else if (!isAuthorized && isPinVerified === true) {
            setModalView("LOGIN_VIEW");
            openModal();
          } else if (isAuthorized && isPinVerified === false) {
            if (hasPin === true) setModalView("PIN_VERIFICATION");
            else if (hasPin === false) setModalView("NEW_PIN");
            openModal();
          }
        }}
        className="btn_deposit hidden md:inline-flex active:translate-y-1 transition-all duration-200 ease-in-out items-center justify-center rounded w-[96px] h-[44px] text-base font-semibold uppercase"
      >
        {t("common:text-deposit")}
      </button>
      <button
        onClick={() => {
          if (isPinVerified === true) {
            navigateToDeposit()
          } else if (!isAuthorized && isPinVerified === true) {
            setModalView("LOGIN_VIEW");
            openModal();
          } else if (isAuthorized && isPinVerified === false) {
            if (hasPin === true) setModalView("PIN_VERIFICATION");
            else if (hasPin === false) setModalView("NEW_PIN");
            openModal();
          }
        }}
        className="btn_deposit inline-flex md:hidden active:translate-y-1 transition-all duration-200 ease-in-out items-center justify-center rounded h-[34px] w-[34px] text-xs font-extrabold shadow-sm"
      >
        <AiOutlinePlus className="w-[18px] h-[18px]" />
      </button>
    </div >
  );
};

export default UserBalance;
