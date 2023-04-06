import React from "react";
import { useUserQuery } from "@framework/user/get-user-profile";
import { useTranslation } from "next-i18next";
import Input from "@components/ui/input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { useChangePinMutation } from "@framework/user/use-change-pin";
import { toast } from "react-toastify";
import toastErrorMessage from "@utils/toastErrorMessage";
import PasswordInput from "@components/ui/password-input";

const CodePin = () => {
  const { t } = useTranslation("common");

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const { mutate: changePin, isLoading } = useChangePinMutation(() => {
    toast.success("PIN update has been successful.");
    reset();
  }, toastErrorMessage);

  function onSubmit(data: any) {
    changePin(data);
  }

  const contInput = "md:grid md:grid-cols-3 md:gap-3";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`bg_content_user_container lg:w-full lg:mx-auto md:rounded-[10px] lg:text-white lg:py-6 lg:mb-4 space-y-4 px-mobile py-4 lg:p-6`}
    >
      <div className="flex flex-col space-y-1">
        <span className="text-md font-semibold text-whiteDefault-100">
          Ganti Pin
        </span>
        <span className="text-xs font-medium text-whiteDefault-40">
          Ganti pin untuk keamanan akun anda.
        </span>
      </div>
      <div className={contInput}>
        <PasswordInput
          labelKey="Pin"
          tabIndex={1}
          placeholderKey="forms:placeholder-codePin"
          {...register("old_pin", {
            required: `${t("forms:pin-required")}`,
            onChange: (e) => {
              e.currentTarget.value = e.currentTarget.value.replace(/\D+/g, "");
              e.currentTarget.value = e.currentTarget.value.substring(0, 6);
            }
          })}
          errorKey={errors.old_pin?.message}
        />
      </div>
      <div className={contInput}>
        <PasswordInput
          labelKey="Pin Baru"
          tabIndex={2}
          placeholderKey="forms:placeholder-new-codePin"
          {...register("pin", {
            required: `${t("forms:pin-new-required")}`,
            onChange: (e) => {
              e.currentTarget.value = e.currentTarget.value.replace(/\D+/g, "");
              e.currentTarget.value = e.currentTarget.value.substring(0, 6);
            }
          })}
          errorKey={errors.pin?.message}
        />
        <PasswordInput
          className="mt-4 md:mt-0"
          labelKey="Ulangi Pin Baru"
          tabIndex={3}
          placeholderKey="forms:placeholder-retype-new-codePin"
          {...register("re_pin", {
            required: `${t("forms:pin-confirm-required")}`,
            validate: {
              matchesPreviousPin: (value: any) => {
                const { pin } = getValues();
                return pin === value || "forms:pinConfirm-error";
              },
            },
            onChange: (e) => {
              e.currentTarget.value = e.currentTarget.value.replace(/\D+/g, "");
              e.currentTarget.value = e.currentTarget.value.substring(0, 6);
            }
          })}
          errorKey={errors.re_pin?.message}
        />
        <Button
          type="submit"
          variant="primary"
          loading={isLoading}
          disabled={isLoading}
          width="w-full"
          className="flex flex-row h-11 font-extrabold uppercase mt-4 md:mt-0 md:w-fit px-3 md:self-end md:ml-auto"
        >
          {t("common:text-submit")}
        </Button>
      </div>
    </form>
  );
};

export default CodePin;
