import Input from "@components/ui/input";
import PasswordInput from "@components/ui/password-input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { useUI } from "@contexts/ui-context";
import { useSignUpMutation, SignUpInputType } from "@framework/auth/use-signup";
import { useTranslation } from "next-i18next";
import { IoClose } from "react-icons/io5";
import { useEffect, useMemo } from "react";
import FormSelect from "@components/form/select";
import { useRouter } from "next/router";
import LogoApp from "@components/common/LogoApp/LogoApp";
import { useQueryBankList } from "@framework/user/get-bank-list";
import { Bank, BankOptions } from "@framework/types";
import { useDevice } from "@contexts/device-context";
import CMS from "@components/cms";

const SignUpForm: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { query } = router;
  const q_router = router;

  const {
    setModalView,
    openModal,
    closeModal,
    // modalData: { data },
  } = useUI();

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

  if (query?.ref !== null || query?.ref !== undefined)
    setValue("referred_by", query?.ref);

  const { mutate: signUp, isLoading } = useSignUpMutation({
    username: watchUsername?.toLowerCase(),
    password: watchPassword,
  });

  function handleSignIn() {
    closeModal;
    setModalView("LOGIN_VIEW");
    return openModal();
  }

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
    if (device.isTabDevice) {
      closeModal();
      router.push("/register");
    }
  }, [device]);

  const cmdRegister = useMemo(() => {
    if (q_router.locale) {
      if (q_router.locale.toLowerCase() == "id") {
        return "register-id";
      } else {
        return "register-en";
      }
    }
    return "register-id";
  }, [query.locale]);

  return (
    <>
      {!device.isTabDevice ? (
        <>
          <div className="bg_modal flex flex-row rounded-lg">
            <div className="hidden xl:flex flex-col w-[325px] items-center justify-start text-center space-y-5 relative">
              <div className="hidden xl:flex flex-col items-center justify-end w-[325px] h-full bg-cover bg-left-top bg-no-repeat bg-[url('/images/banner/register-banner.png')]"></div>
              <div
                className={`bg_register_banner_blur absolute w-full h-full bottom-0 left-0`}
              >
                {" "}
              </div>
              <div className="absolute z-10 bottom-0 left-0 flex flex-col gap-[5px] items-center justify-center px-10 pb-[55px]">
                <CMS page_name={cmdRegister} />
              </div>
            </div>
            <div className="py-10 pl-[50px] overflow-x-hidden overflow-y-auto scrollbar relative">
              <div className="w-full h-full">
                <div className="w-full pr-[50px] max-h-[600px]">
                  <div className="flex justify-between">
                    <span className="uppercase text-[22px] text-white font-bold">
                      {t("forms:label-register")}
                    </span>
                    <button
                      onClick={closeModal}
                      aria-label="Close panel"
                      className="sticky z-[52] top-0 right-0 items-center justify-center text-CadetGrey-100 hover:text-whiteDefault-100 transition duration-200 focus:outline-none overflow-hidden"
                    >
                      <IoClose className="text-xl" />
                    </button>
                  </div>
                  <div className="flex items-center text-sm font-bold space-x-2 mb-[30px] md:my-[15px]">
                    <span className="text-whiteDefault-40">
                      Sudah punya akun?
                    </span>
                    <span
                      className="text-whiteDefault-100 cursor-pointer"
                      onClick={handleSignIn}
                    >
                      Login di sini
                    </span>
                  </div>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col"
                    noValidate
                  >
                    <div className="flex flex-row gap-10 justify-center">
                      <div className="flex flex-col space-y-[15px] w-[360px]">
                        <h5 className="text-white text-lg font-bold">
                          {t("forms:label-personal-information")}
                        </h5>
                        <Input
                          labelKey="forms:label-username"
                          type="text"
                          variant="solid"
                          tabIndex={1}
                          autoFocus
                          placeholderKey="forms:placeholder-username"
                          {...register("username", {
                            required: "forms:username-required",
                            onChange: (e) => {
                              e.currentTarget.value =
                                e.currentTarget.value.replace(
                                  /[^a-zA-Z0-9]/,
                                  ""
                                );
                              e.currentTarget.value =
                                e.currentTarget.value.substring(0, 25);
                              e.currentTarget.value =
                                e.currentTarget.value.toLowerCase();
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
                              e.currentTarget.value =
                                e.currentTarget.value.substring(0, 25);
                            },
                          })}
                          errorKey={errors.password?.message}
                        />
                        <PasswordInput
                          labelKey="forms:label-retype-new-password"
                          tabIndex={3}
                          placeholderKey="forms:placeholder-retype-new-password"
                          {...register("password_confirmation", {
                            required: `${t(
                              "forms:retype-new-password-required"
                            )}`,
                            validate: (value) =>
                              value === watchPassword ||
                              t("forms:password-not-match-error"),
                            onChange: (e) => {
                              e.currentTarget.value =
                                e.currentTarget.value.substring(0, 25);
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
                              e.currentTarget.value =
                                e.currentTarget.value.substring(0, 50);
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
                            maxLength: 15,
                            pattern: {
                              value: /^[0-9]+$/,
                              message: t("forms:phone-error"),
                            },
                            onChange: (e) => {
                              e.currentTarget.value =
                                e.currentTarget.value.replace(/\D+/g, "");
                              e.currentTarget.value =
                                e.currentTarget.value.substring(0, 15);
                            },
                          })}
                          errorKey={errors.phone_number?.message}
                        />
                      </div>
                      <div className="flex flex-col gap-[17px] w-[360px]">
                        <h5 className="text-white text-lg font-bold">
                          {t("forms:label-payment-information")}
                        </h5>
                        <div
                          className={`bg_cont_bank rounded-[10px] p-[18px] flex flex-col gap-[15px]`}
                        >
                          <div>
                            <label className="block text-CadetGrey-100 font-semibold text-sm leading-none mb-[10px] capitalize">
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
                              required: "Nama Rekening harus diisi",
                              onChange: (e) => {
                                e.currentTarget.value =
                                  e.currentTarget.value.replace(
                                    /[^a-zA-Z ]/,
                                    ""
                                  );
                                e.currentTarget.value =
                                  e.currentTarget.value.substring(0, 30);
                                e.currentTarget.value =
                                  e.currentTarget.value.toLowerCase();
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
                                e.currentTarget.value =
                                  e.currentTarget.value.replace(/\D+/g, "");
                                e.currentTarget.value =
                                  e.currentTarget.value.substring(0, 20);
                              },
                            })}
                            errorKey={errors.bank_account_number?.message}
                            placeholder={`${labelPaymentNumber}`}
                          />
                        </div>
                        <div>
                          <Input
                            labelKey="forms:label-codeReferral"
                            type="text"
                            variant="solid"
                            tabIndex={9}
                            disabled={query?.ref ? true : false}
                            placeholderKey="forms:placeholder-codeReferral"
                            {...register("referred_by", {
                              onChange: (e) => {
                                e.currentTarget.value =
                                  e.currentTarget.value.replace(
                                    /[^a-z0-9]+/g,
                                    ""
                                  );
                                e.currentTarget.value =
                                  e.currentTarget.value.substring(0, 25);
                              },
                            })}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row justify-end items-center mt-[23px]">
                      {/* <div className="text-whiteDefault-60 text-sm font-normal">Dengan mendaftar, anda setuju untuk mengikuti <span className="text-white">Syarat</span> & <span className="text-white">Ketentuan</span> kami</div> */}
                      <div className="relative text-right">
                        <Button
                          type="submit"
                          variant="primary"
                          loading={isLoading}
                          disabled={isLoading}
                          tabIndex={10}
                          className="md:w-fit md:px-5 h-11 font-extrabold capitalize"
                        >
                          {t("common:text-register")}
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="modal-cont-mobile w-full mx-auto overflow-auto scrollbar border border-blueDefault-45 rounded-lg pb-5 md:pb-0 h-full sm:w-96 lg:w-[694px]">
          <div className="flex flex-col md:p-5 w-full h-full scrollbar overflow-y-custome">
            <div className="flex flex-col items-center justify-end text-center h-5 mb-5 relative">
              <button
                onClick={closeModal}
                aria-label="Close panel"
                className="absolute right-3 top-3 z-10 items-center justify-center text-CadetGrey-100 hover:text-whiteDefault-100 transition duration-200 focus:outline-none"
              >
                <IoClose className="text-xl" />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center text-center mb-7">
              <div className="mb-7 max-h-[34px] max-w-[178px]">
                <LogoApp />
              </div>
              <span className="uppercase text-[22px] text-white font-bold">
                {t("forms:label-register")}
              </span>
              <div className="flex items-center px-5 space-x-2">
                <span className="text-xs font-medium text-whiteDefault-40">
                  Sudah punya akun?
                </span>
                <span
                  className="text-xs font-medium text-whiteDefault-100 cursor-pointer"
                  onClick={() => {
                    closeModal;
                    setModalView("LOGIN_VIEW");
                  }}
                >
                  Login di sini
                </span>
              </div>
            </div>
            <div className="flex flex-col h-full">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col justify-center px-5"
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
                          /[^a-z0-9]/,
                          ""
                        );
                        e.currentTarget.value = e.currentTarget.value.substring(
                          0,
                          25
                        );
                        e.currentTarget.value =
                          e.currentTarget.value.toLowerCase();
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
                    errorKey={errors.password?.message}
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
                  <div className="bg-[#103C5C] rounded-[10px] p-[18px] flex flex-col gap-[15px]">
                    <div>
                      <label className="block text-CadetGrey-100 font-semibold text-sm leading-none mb-3">
                        Pilih Channel Pembayaran
                      </label>
                      <FormSelect
                        control={control}
                        options={listPayment2}
                        tabIndex={6}
                        placeholder="Pilih Channel Pembayaran"
                        {...register("bank_name", {
                          required: "Channel pembayaran harus diisi",
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
                            /[^a-zA-Z]/,
                            ""
                          );
                          e.currentTarget.value =
                            e.currentTarget.value.substring(0, 15);
                          e.currentTarget.value =
                            e.currentTarget.value.toLowerCase();
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
                          e.currentTarget.value =
                            e.currentTarget.value.substring(0, 20);
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
                    disabled={query?.ref ? true : false}
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
                      className="mt-2 h-11 md:h-12 font-extrabold capitalize"
                    >
                      {t("common:text-register")}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUpForm;
