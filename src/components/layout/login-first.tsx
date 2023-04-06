import React, { useEffect } from 'react'
import { CookieKeys } from "@lib/constant";
import { CookieStorage } from "@lib/cookie";
import { useTranslation } from "next-i18next";
import { useUI } from "@contexts/ui-context";

const LoginFirst = () => {
  const { t } = useTranslation("common");
  const { openModal, setModalView, isAuthorized } = useUI();
  useEffect(() => {
    // undefined
    if (!isAuthorized) {
      setModalView("LOGIN_VIEW");
      return openModal();
    }
  }, []);

  const RenderLogin = () => {
    if (!isAuthorized) {
      setModalView("LOGIN_VIEW");
      return openModal();
    }
  };
  
  return (
    <div className="w-full h-[20rem] flex-col flex justify-center items-center">
      <h1 className="text-xl lg:text-3xl font-semibold lg:font-bold capitalize">{t("common:text-please-to-login-first")}</h1>
      <button
        className="mt-[1rem] bg-[#1AA9E7]  text-white px-4 py-2 rounded-md capitalize"
        onClick={() => {
          RenderLogin();
        }}
      >
        {t("common:text-login")}
      </button>
    </div>
  )
}

export default LoginFirst