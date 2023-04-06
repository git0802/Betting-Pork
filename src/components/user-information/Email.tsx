import React from "react";
import { useUserQuery } from "@framework/user/get-user-profile";
import { useTranslation } from "next-i18next";
import Input from "@components/ui/input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import {
  UpdateUserType,
  useUpdateUserEmailMutation,
} from "@framework/user/use-update-userEmail";
import { toast } from "react-toastify";
import toastErrorMessage from "@utils/toastErrorMessage";

const defaultValues = {};

const Email = () => {
  const { t } = useTranslation("common");
  const { data, refetch } = useUserQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<UpdateUserType>({
    defaultValues,
  });

  const { mutate: updateUserEmail, isLoading } = useUpdateUserEmailMutation(
    () => {
      toast.success("Email update has been successful.");
      refetch();
      reset();
    },
    toastErrorMessage
  );

  function onSubmit(input: UpdateUserType) {
    updateUserEmail(input);
  }

  const contInput = "md:grid md:grid-cols-3 md:gap-3";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`bg_content_user_container lg:w-full lg:mx-auto md:rounded-[10px] lg:text-white lg:py-6 lg:mb-4 space-y-4 px-mobile py-4 lg:p-6`}
    >
      <div className="flex flex-col space-y-1">
        <span className="text-md font-semibold text-whiteDefault-100">
          Ganti Email
        </span>
        <span className="text-xs font-medium text-whiteDefault-40">
          Ganti email untuk keamanan akun anda.
        </span>
      </div>
      <div className={contInput}>
        <Input
          labelKey="Email Anda"
          type="email"
          variant="solid"
          value={data?.email}
          disabled
          name="current_email"
          onChange={() => { }}
        />
      </div>
      <div className={contInput}>
        <Input
          labelKey="Email Baru"
          type="email"
          variant="solid"
          placeholderKey="forms:placeholder-new-email"
          {...register("email", {
            required: "forms:email-required",
            pattern: {
              value:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "forms:email-error",
            },
          })}
          errorKey={errors.email?.message}
        />
        <Input
          labelKey="Ulangi Email Baru"
          className="mt-4 md:mt-0"
          type="email"
          variant="solid"
          placeholderKey="forms:placeholder-retype-new-email"
          {...register("emailConfirm", {
            required: "forms:emailConfirm-required",
            validate: {
              matchesPreviousEmail: (value: any) => {
                const { email } = getValues();
                return email === value || "forms:emailConfirm-error";
              },
            },
          })}
          errorKey={errors.emailConfirm?.message}
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

export default Email;
