import cn from "classnames";
import React, { InputHTMLAttributes, useState } from "react";
import { Eye } from "@components/icons/eye-icon";
import { EyeOff } from "@components/icons/eye-off-icon";
import { useTranslation } from "next-i18next";
import { useUI } from "@contexts/ui-context";
import Input from "./input";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
  labelKey: string;
  placeholderKey?: string;
  forgotPassword?: string;
  name: string;
  shadow?: boolean;
  errorKey: string | undefined;
}
const classes = {
  root:
    "inputDefault pl-5 pr-9 focus:outline-none focus:border-heading h-11 md:h-12 text-xs lg:text-sm focus:placeholder:text-transparent",
};

// eslint-disable-next-line react/display-name
const PasswordInput = React.forwardRef<HTMLInputElement, Props>(

  (
    {
      className = "block",
      inputClassName,
      labelKey,
      placeholderKey = '',
      forgotPassword,
      name,
      errorKey,
      shadow = false,
      ...rest
    },
    ref
  ) => {
    const { openSidebar, setDrawerView, openModal, setModalView, closeModal, isAuthorized } =
      useUI();
    const [show, setShow] = useState(false);
    let [ssOpenModalForgotPassword, setIsOpenModalForgotPassword] = useState(false)
    function handleForgotPassword() {
      closeModal()
      setModalView("FORGET_PASSWORD");
      return openModal();
    }
    const rootClassName = cn(classes.root, inputClassName);
    const { t } = useTranslation();
    return (
      <div className={className}>
        <div className="flex flex-row justify-between items-center">
          {labelKey && (
            <label
              // htmlFor={name}
              className="block text-whiteDefault-60 font-normal text-sm leading-none mb-[10px]"
            >
              {t(labelKey)}
            </label>
          )}
          {forgotPassword && (
            <label
              // htmlFor={name}
              className="block text-whiteDefault-60 hover:text-whiteDefault-100 font-normal text-sm leading-none mb-[10px] cursor-pointer"
              onClick={handleForgotPassword}
            >
              {t(forgotPassword)}
            </label>
          )}
        </div>
        <div className="relative rounded-[6px] p-[1px]">
          <input
            id={name}
            name={name}
            type={show ? "text" : "password"}
            ref={ref}
            className={`input_primary py-2 px-4 md:px-5 text-xs lg:text-sm focus:placeholder:text-transparent`}
            placeholder={t(placeholderKey)}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
            {...rest}
          />
          <label
            htmlFor={name}
            className="absolute right-2 top-[18px] -mt-2 text-CadetGrey-100 hover:text-whiteDefault-100 cursor-pointer"
            onClick={() => setShow((prev) => !prev)}
          >
            {show ? (
              <Eye className="w-6 h-6" />
            ) : (
              <EyeOff className="w-6 h-6" />
            )}
          </label>
        </div>
        {errorKey && <p className="my-2 text-xs text-red-500">{t(errorKey)}</p>}
      </div>
    );
  }
);

export default PasswordInput;
