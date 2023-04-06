import React, { useState } from "react";
import MainLayout from "@components/layout/Main";
import Input from "@components/ui/input";
import PasswordInput from "@components/ui/password-input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { useUI } from "@contexts/ui-context";
import { useSignUpMutation, SignUpInputType } from "@framework/auth/use-signup";
import { useTranslation } from "next-i18next";
import { useEffect, useMemo } from "react";
import FormSelect from "@components/form/select";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import TitlePage from "@components/ui/title/TitlePage";
import http from "@framework/utils/http-server";
import { GetStaticPaths, GetStaticProps } from "next";
import { useDevice } from "@contexts/device-context";
import { Bank, BankOptions, DefaultPageProps } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQueryBankList } from "@framework/user/get-bank-list";

const Register = ({ config }: DefaultPageProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { query } = router;
  const { ref } = query;
  const { setModalView, openModal, setModalData, isAuthorized } = useUI();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<SignUpInputType>();

  const watchUsername = watch("username");
  const watchPassword = watch("password");
  const { mutate: signUp, isLoading } = useSignUpMutation({
    username: watchUsername?.toLowerCase(),
    password: watchPassword,
  });

  function onSubmit({
    username,
    email,
    password,
    password_confirmation,
    referred_by,
    phone_number,
    bank_name,
    bank_account_name,
    bank_account_number,
  }: SignUpInputType) {
    const params = {
      username: username.toLowerCase(),
      password: password,
      password_confirmation: password_confirmation,
      email: email.toLowerCase(),
      referred_by: referred_by?.toLowerCase(),
      phone_number,
      bank_name: bank_name,
      bank_account_name: bank_account_name.toLowerCase(),
      bank_account_number,
    };
    signUp({ ...params });
  }

  const watchBankName = watch("bank_name");

  const { data: dataBank } = useQueryBankList();
  const listPayment2 = useMemo(() => {
    if (!dataBank) return [];
    const banks: BankOptions = [];
    dataBank.forEach((item: Bank) => {
      if (!banks.find((i) => item.bank === i.value)) {
        // @ts-ignore
        banks.push({
          label: item.bank,
          value: item.bank,
          type: item.type,
        });
      }
    });
    return banks;
  }, [dataBank]);

  const labelPaymentNumber = useMemo(() => {
    const paymentType = listPayment2.find(
      (item) => item.value === watchBankName
    )?.type;
    if (paymentType === "bank") return "Nomor Rekening";
    else if (paymentType === "e_wallet") return "Nomor Handphone";
    return "Nomor Rekening / Handphone";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchBankName]);

  const device = useDevice();

  useEffect(() => {
    if (!device.isTabDevice && ref !== undefined) {
      router.push({
        pathname: "/",
        query: {
          ref: ref,
        },
      });
      setModalView("SIGN_UP_VIEW");
      return openModal();
    } else {
      if (ref !== null || ref !== undefined) setValue("referred_by", ref);
    }
  }, [ref]);

  useMemo(() => {
    if (ref !== null || ref !== undefined) {
      setValue("referred_by", ref);
    }
  }, [ref]);

  return (
    <div className="container mx-auto lg:hidden">
      <div className="lg:hidden">
        <TitlePage title={t("common:text-register")} />
      </div>
      <div className="w-full mt-5 md:px-mobile pt-4 mx-auto flex flex-col h-full scrollbar overflow-y-custome">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`bg_modal flex flex-col justify-center p-5 md:p-4 lg:bg-transparent md:rounded-[10px]`}
          noValidate
        >
          <div className="flex flex-col space-y-4">
            <h5 className="text-white text-lg font-bold">
              {t("forms:label-personal-information")}
            </h5>
            <Input
              labelKey="forms:label-username"
              type="text"
              variant="solid"
              tabIndex={1}
              placeholderKey="forms:placeholder-username"
              {...register("username", {
                required: "forms:username-required",
                onChange: (e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(
                    /[^a-zA-Z0-9]/,
                    ""
                  );
                  e.currentTarget.value = e.currentTarget.value.substring(
                    0,
                    25
                  );
                  e.currentTarget.value = e.currentTarget.value.toLowerCase();
                },
              })}
              errorKey={errors.username?.message}
            />
            <PasswordInput
              labelKey="forms:label-password"
              tabIndex={2}
              placeholderKey="forms:placeholder-password"
              {...register("password", {
                required: `${t("forms:password-required")}`,
                onChange: (e) => {
                  e.currentTarget.value = e.currentTarget.value.substring(
                    0,
                    25
                  );
                },
              })}
              errorKey={errors.password?.message}
            />
            <PasswordInput
              labelKey="forms:label-retype-new-password"
              tabIndex={3}
              placeholderKey="forms:placeholder-retype-new-password"
              {...register("password_confirmation", {
                required: `${t("forms:retype-new-password-required")}`,
                validate: (value) =>
                  value === watchPassword ||
                  t("forms:password-not-match-error"),
                onChange: (e) => {
                  e.currentTarget.value = e.currentTarget.value.substring(
                    0,
                    25
                  );
                },
              })}
              errorKey={errors.password_confirmation?.message}
            />
            <Input
              labelKey="forms:label-email"
              type="email"
              variant="solid"
              tabIndex={4}
              placeholderKey="forms:placeholder-email"
              {...register("email", {
                required: `${t("forms:email-required")}`,
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: t("forms:email-error"),
                },
                onChange: (e) => {
                  e.currentTarget.value = e.currentTarget.value.substring(
                    0,
                    50
                  );
                },
              })}
              errorKey={errors.email?.message}
            />
            <Input
              labelKey="forms:label-nohp"
              type="text"
              variant="solid"
              tabIndex={5}
              placeholderKey="forms:placeholder-nohp"
              {...register("phone_number", {
                required: `${t("forms:phone-required")}`,
                pattern: {
                  value: /^[0-9]+$/,
                  message: t("forms:nohp-error"),
                },
                onChange: (e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(
                    /\D+/g,
                    ""
                  );
                  e.currentTarget.value = e.currentTarget.value.substring(
                    0,
                    15
                  );
                },
              })}
              errorKey={errors.phone_number?.message}
            />
            <h5 className="text-white text-lg font-bold mt-16">
              {t("forms:label-payment-information")}
            </h5>
            <div
              className={`bg_cont_bank rounded-[10px] px-6 py-[18px] flex flex-col gap-[15px]`}
            >
              <div>
                <label className="block text-CadetGrey-100 font-semibold text-sm leading-none mb-3 capitalize">
                  {t("forms:label-payment-method")}
                </label>
                <FormSelect
                  control={control}
                  options={listPayment2}
                  tabIndex={6}
                  placeholder="Pilih Rekening Bank"
                  {...register("bank_name", {
                    required: "Rekening Bank harus diisi",
                  })}
                  errorKey={errors.bank_name?.message}
                />
              </div>
              <Input
                labelKey="Nama Rekening"
                type="text"
                variant="solid"
                tabIndex={7}
                {...register("bank_account_name", {
                  required: "Nama lengkap harus diisi",
                  onChange: (e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /[^a-zA-Z ]/,
                      ""
                    );
                    e.currentTarget.value = e.currentTarget.value.substring(
                      0,
                      30
                    );
                    e.currentTarget.value = e.currentTarget.value.toLowerCase();
                  },
                })}
                errorKey={errors.bank_account_name?.message}
                placeholder="Masukkan Nama Rekening"
              />
              <Input
                labelKey={labelPaymentNumber}
                type="text"
                variant="solid"
                tabIndex={8}
                {...register("bank_account_number", {
                  required: `${labelPaymentNumber} harus diisi`,
                  pattern: {
                    value: /^[0-9]+$/,
                    message: t("forms:bank-account-number-error"),
                  },
                  onChange: (e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /\D+/g,
                      ""
                    );
                    e.currentTarget.value = e.currentTarget.value.substring(
                      0,
                      20
                    );
                  },
                })}
                errorKey={errors.bank_account_number?.message}
                placeholder={`${labelPaymentNumber} Rekening`}
              />
            </div>
            <Input
              labelKey="forms:label-codeReferral"
              type="text"
              variant="solid"
              tabIndex={9}
              disabled={ref ? true : false}
              placeholderKey="forms:placeholder-codeReferral"
              {...register("referred_by", {
                onChange: (e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(
                    /[^a-z0-9]+/g,
                    ""
                  );
                  e.currentTarget.value = e.currentTarget.value.substring(
                    0,
                    25
                  );
                },
              })}
            />
            <div className="relative">
              <Button
                type="submit"
                variant="primary"
                loading={isLoading}
                disabled={isLoading}
                tabIndex={10}
                className="flex flex-row w-full h-11 font-extrabold text-sm px-5"
              >
                {t("common:text-register")}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

Register.Layout = MainLayout;

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await http.get(API_ENDPOINTS.DOMAINS);
  const domains = response.data.data;
  return {
    paths: domains.map((path: string) => ({
      params: {
        site: path,
      },
    })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  if (!params) throw new Error("No path parameters found");
  const { site } = params;
  const {
    data: { data: config },
  } = await http.get(API_ENDPOINTS.DOMAIN + site);
  if (!config) return { notFound: true, revalidate: 10 };
  return {
    props: {
      locale,
      ...(await serverSideTranslations(locale as string, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
      config,
    },
    revalidate: 3600,
  };
};
