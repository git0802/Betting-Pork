/* eslint-disable @next/next/no-html-link-for-pages */
import React, { Fragment, useState } from "react";
import { useLogoutMutation } from "@framework/auth/use-logout";
import {
  IconUser,
  IconReferral,
  IconLogout,
  IconNavbarDeposit,
  IconHeaderTransaction
} from "@components/icons";
import { AiOutlineCaretDown } from "react-icons/ai";
import InitialAvatar from "@components/ui/InitialAvatar";
import { CookieStorage } from "@lib/cookie";
import { CookieKeys } from "@lib/constant";
import { Menu, Transition } from "@headlessui/react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useUI } from "../../contexts/ui-context";
import { useDevice } from "@contexts/device-context";

const HeaderUserMenu = () => {
  const { t } = useTranslation();
  const [profile, setProfile] = useState(false);
  const router = useRouter();
  const { query } = router;
  const { mutate: logout } = useLogoutMutation();
  const { isAuthorized, isPinVerified, setModalView, hasPin, openModal } = useUI();
  const handleLogout = () => logout();

  const userName = CookieStorage.get(CookieKeys.User);

  const device = useDevice();

  const handleActiveMenu = (name: string) => {
    const path = router?.asPath as string;
    const checkPath = path.includes(name);
    if (checkPath) return "cont_user_menu_active";
  };

  const handleActiveMenuItem = (name: string) => {
    const path = router?.asPath as string;
    const checkPath = path.includes(name);
    if (checkPath) return "user-menu-name active";
    else return "user-menu-name";
  };

  return (
    <div
      className="flex items-center relative"
      onClick={() => setProfile(!profile)}
    >
      <div className="">
        <Menu>
          {({ open }) => (
            <>
              <Menu.Button className="flex items-center space-x-1">
                <InitialAvatar
                  border="bg-[rgba(0,0,0,0.2)] rounded-full w-10 h-10 p-1"
                  style="w-[32px] h-[32px]"
                />
                <div className="hidden xl:flex items-center justify-center rounded cursor-pointer text-white w-[18px] h-[18px]">
                  <AiOutlineCaretDown
                    className={`w-3 h-3 ${open ? "-rotate-180" : "rotate-0"
                      } transition-all ease-in-out duration-200`}
                  />
                </div>
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease duration-0"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Menu.Items className={`bg-user-menu bg_user_menu divide-y divide-white/10`}>
                  <Menu.Item>
                    <div className="flex flex-row justify-between items-center px-5 lg:px-6 py-[18px]">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium leading-[18px] mb-[5px] capitalize">
                          {t("common:text-hello")}👋,
                        </span>
                        <span className="text-sm font-normal leading-[18px]">
                          {userName ? userName : ""}
                        </span>
                      </div>
                    </div>
                  </Menu.Item>
                  <Menu.Item>
                    <a
                      className={`${handleActiveMenu("/userinformation")} cont-user-menu cont_user_menu group`}
                      href="/userinformation"
                    >
                      <IconUser className="user-menu-icon text-inherit" />
                      <span
                        className={`${handleActiveMenuItem("/userinformation")}`}
                      >
                        {t("common:text-user-profile")}
                      </span>
                    </a>
                  </Menu.Item>
                  {device.isMobileDevice ? (
                    <>
                      {isAuthorized && (isPinVerified === true) && (
                        <Menu.Item>
                          <a
                            className={`${handleActiveMenu("/transaction")} cont-user-menu cont_user_menu group`}
                            href="/transaction"
                          >
                            <IconHeaderTransaction className="user-menu-icon text-inherit" />
                            <span
                              className={`${handleActiveMenuItem("/transaction")}`}
                            >
                              {t("common:text-transaction")}
                            </span>
                          </a>
                        </Menu.Item>
                      )}
                      {isAuthorized && (isPinVerified === false) && (
                        <Menu.Item>
                          <button
                            onClick={() => {
                              if (hasPin === true) setModalView("PIN_VERIFICATION");
                              else if (hasPin === false) setModalView("NEW_PIN");
                              openModal();
                            }}
                            className={`${handleActiveMenu("/transaction")} cont-user-menu cont_user_menu group`}
                          >
                            <IconHeaderTransaction className="user-menu-icon text-inherit" />
                            <span
                              className={`${handleActiveMenuItem("/transaction")}`}
                            >
                              {t("common:text-transaction")}
                            </span>
                          </button>
                        </Menu.Item>
                      )}
                    </>
                  ) : (
                    <>
                      {isAuthorized && (isPinVerified === true) && (
                        <Menu.Item>
                          <a
                            className={`${handleActiveMenu("/wallet")} cont-user-menu cont_user_menu group`}
                            href="/wallet"
                          >
                            <IconNavbarDeposit className="user-menu-icon text-inherit" />
                            <span
                              className={`${handleActiveMenuItem("/wallet")}`}
                            >
                              {t("common:text-wallet")}
                            </span>
                          </a>
                        </Menu.Item>
                      )}
                      {isAuthorized && (isPinVerified === false) && (
                        <Menu.Item>
                          <a
                            className={`${handleActiveMenu("/wallet")} cont-user-menu cont_user_menu group`}
                            onClick={() => {
                              if (hasPin === true) setModalView("PIN_VERIFICATION");
                              else if (hasPin === false) setModalView("NEW_PIN");
                              openModal();
                            }}
                          >
                            <IconNavbarDeposit className="user-menu-icon text-inherit" />
                            <span
                              className={`${handleActiveMenuItem("/wallet")}`}
                            >
                              {t("common:text-wallet")}
                            </span>
                          </a>
                        </Menu.Item>
                      )}
                    </>
                  )}
                  {isAuthorized && (isPinVerified === true) && (
                    <Menu.Item>
                      <a
                        className={`${handleActiveMenu("/referral")} cont-user-menu cont_user_menu group`}
                        href="/referral"
                      >
                        <IconReferral className="user-menu-icon text-inherit" />
                        <span
                          className={`${handleActiveMenuItem("/referral")}`}
                        >
                          {t("common:text-referral")}
                        </span>
                      </a>
                    </Menu.Item>
                  )}
                  {isAuthorized && (isPinVerified === false) && (
                    <Menu.Item>
                      <a
                        className={`${handleActiveMenu("/referral")} cont-user-menu cont_user_menu group`}
                        onClick={() => {
                          if (hasPin === true) setModalView("PIN_VERIFICATION");
                          else if (hasPin === false) setModalView("NEW_PIN");
                          openModal();
                        }}
                      >
                        <IconReferral className="user-menu-icon text-inherit" />
                        <span
                          className={`${handleActiveMenuItem("/referral")}`}
                        >
                          {t("common:text-referral")}
                        </span>
                      </a>
                    </Menu.Item>
                  )}
                  <Menu.Item>
                    <a
                      className={`cont-user-menu cont_user_menu group`}
                      onClick={handleLogout}
                    >
                      <IconLogout className="user-menu-icon text-inherit" />
                      <span className="user-menu-name">
                        {t("common:text-logout")}
                      </span>
                    </a>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </div>
    </div>
  );
};

export default HeaderUserMenu;
