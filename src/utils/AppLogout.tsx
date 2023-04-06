import React, { useEffect } from "react";
import { CookieStorage } from "@lib/cookie";
import { CookieKeys } from "@lib/constant";
import { useUI } from "@contexts/ui-context";
import { useRouter } from "next/router";
import { useLogoutMutation } from "@framework/auth/use-logout";

const events = [
  "load",
  "mousemove",
  "mousedown",
  "click",
  "scroll",
  "keypress",
];

const AppLogout = ({ children }: {children: React.ReactNode}) => {
  let timer: string | number | NodeJS.Timeout | undefined;
  const { isAuthorized } = useUI();
  const { mutate: logout } = useLogoutMutation();

  useEffect(() => {
    if (isAuthorized) {
      Object.values(events).forEach((item) => {
        window.addEventListener(item, () => {
          resetTimer();
          handleTimer();
        });
      });
    }
  }, [isAuthorized]);

  const resetTimer = () => {
    if (timer) clearTimeout(timer);
  };

  const handleTimer = () => {
    timer = setTimeout(() => {
      resetTimer();
      Object.values(events).forEach((item) => {
        window.removeEventListener(item, resetTimer);
      });
      logoutAction();
    }, 3600000);
  };

  const logoutAction = () => {
    logout();
  };

  return (
    <>
      {children}
    </>
  );
};

export default AppLogout;
