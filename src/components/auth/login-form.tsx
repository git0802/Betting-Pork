import Input from "@components/ui/input";
import PasswordInput from "@components/ui/password-input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { useLoginMutation, LoginInputType } from "@framework/auth/use-login";
import { useUI } from "@contexts/ui-context";
import { useTranslation } from "next-i18next";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import { useDevice } from "@contexts/device-context";
import { theme_config } from "@themes/config";

const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const { setModalView, openModal, closeModal, template } = useUI();
  const { mutate: login, isLoading } = useLoginMutation();

  const device = useDevice();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputType>();

  function onSubmit({ username, password, remember_me }: LoginInputType) {
    const params = {
      username: username.toLowerCase(),
      password: password,
      remember_me
    }
    login({ ...params });
  }
  function handleSignUp() {
    closeModal;
    setModalView("SIGN_UP_VIEW");
    return openModal();
  }

  function handleForgotPassword() {
    closeModal;
    setModalView("FORGET_PASSWORD");
    return openModal();
  }
  const handleConfig = theme_config(template);

  return (
    <>
      {!device.isMobileDevice ? (
        <div className="bg_modal w-full h-full mx-auto overflow-hidden rounded-lg pb-5 md:pb-0 sm:w-96 lg:w-[694px]">
          <div className="grid md:grid-cols-2 h-full">
            <div className="flex flex-col items-center justify-start text-center pl-[35px] pr-[10px] py-[30px] space-y-5 relative min-h-[320px]">
              <div className="flex flex-col items-center justify-end w-[304px] h-[356px] bg-contain bg-no-repeat bg-[url('/images/banner/login-banner.png')]">
                <button
                  onClick={closeModal}
                  aria-label="Close panel"
                  className="absolute right-3 top-0 z-10 md:hidden items-center justify-center text-CadetGrey-100 hover:text-whiteDefault-100 transition duration-200 focus:outline-none"
                >
                  <IoClose className="text-xl" />
                </button>
                <div className="text-2xl leading-6 w-[250px] font-black relative z-[2] bg-clip-text bg-gradient-to-b from-[#E4F2FF] to-[#678199] text-transparent mb-5">
                  SELAMAT DATANG DAN SEGERA BERMAIN
                </div>
                <div className="mb-[26px]">
                  <Image
                    alt=""
                    src={`/images/theme/${handleConfig?.theme}/logo.png`}
                    priority
                    width={250}
                    height={50}
                    quality={100}
                    objectFit="contain"
                    objectPosition="center"
                  />
                  {/* <LogoApp/> */}

                </div>
              </div>
            </div>
            <div className="flex flex-col pl-5 pr-[35px] py-[30px]">
              <div className="flex justify-between">
                <span className="uppercase">{t("common:text-login")}</span>
                <button
                  onClick={closeModal}
                  aria-label="Close panel"
                  className="hidden md:inline-flex items-center justify-center text-CadetGrey-100 hover:text-whiteDefault-100 transition duration-200 focus:outline-none"
                >
                  <IoClose className="text-xl" />
                </button>
              </div>
              <div className="flex items-center text-sm font-bold space-x-2 mb-7 md:my-[15px]">
                <span className="text-whiteDefault-40">Belum punya akun?</span>
                <span
                  className="text-whiteDefault-100 cursor-pointer"
                  onClick={handleSignUp}
                >
                  Daftar di sini
                </span>
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col space-y-[15px] justify-center"
                noValidate
              >
                <Input
                  labelKey="forms:label-username"
                  type="text"
                  variant="solid"
                  tabIndex={1}
                  autoFocus
                  placeholderKey="forms:placeholder-username"
                  {...register("username", {
                    required: `${t("forms:username-required")}`,
                    onChange: (e) => {
                      e.currentTarget.value = e.currentTarget.value.substring(0, 25);
                      e.currentTarget.value = e.currentTarget.value.toLowerCase();
                    }
                  })}
                  errorKey={errors.username?.message}
                />
                <PasswordInput
                  labelKey="forms:label-mypassword"
                  // forgotPassword="forms:label-forgotPassword"
                  errorKey={errors.password?.message}
                  tabIndex={2}
                  placeholderKey="forms:placeholder-password"
                  {...register("password", {
                    required: `${t("forms:password-required")}`,
                    onChange: (e) => {
                      e.currentTarget.value = e.currentTarget.value.substring(0, 25);
                    },
                  })}
                />
                <div className="relative flex justify-end">
                  <Button
                    type="submit"
                    variant="primary"
                    loading={isLoading}
                    disabled={isLoading}
                    tabIndex={3}
                    className="flex flex-row md:w-fit h-11 font-extrabold text-sm px-5"
                  >
                    {t("common:text-login")}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className={`bg_modal_mobile w-full h-full mx-auto overflow-hidden pb-5 md:pb-0 sm:w-96 lg:w-[694px]`}>
          <div className="flex flex-col p-5 w-full h-full">
            <div className="flex flex-col items-center justify-end text-center h-5 mb-5 relative">
              <button
                onClick={closeModal}
                aria-label="Close panel"
                className="absolute right-3 top-0 z-10 items-center justify-center text-CadetGrey-100 hover:text-whiteDefault-100 transition duration-200 focus:outline-none"
              >
                <IoClose className="text-xl" />
              </button>
            </div>
            <div className="text-center mb-7">
              <Image
                alt=""
                src={`/images/theme/${handleConfig?.theme}/logo.png`}
                priority
                width={250}
                height={50}
                quality={100}
                objectFit="contain"
                objectPosition="center"
              />
              {/* <LogoApp positionMobile="center" /> */}
            </div>
            <div className="flex flex-col h-full overflow-y-auto overflow-hidden">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col space-y-6 justify-center mb-9"
                noValidate
              >
                <Input
                  labelKey="forms:label-username"
                  type="text"
                  variant="solid"
                  tabIndex={1}
                  autoFocus
                  placeholderKey="forms:placeholder-username"
                  {...register("username", {
                    required: `${t("forms:username-required")}`,
                    onChange: (e) => {
                      e.currentTarget.value = e.currentTarget.value.substring(0, 25);
                      e.currentTarget.value = e.currentTarget.value.toLowerCase();
                    }
                  })}
                  errorKey={errors.username?.message}
                />
                <PasswordInput
                  labelKey="forms:label-mypassword"
                  errorKey={errors.password?.message}
                  tabIndex={2}
                  placeholderKey="forms:placeholder-password"
                  {...register("password", {
                    required: `${t("forms:password-required")}`,
                  })}
                />
                <Button
                  type="submit"
                  variant="primary"
                  loading={isLoading}
                  disabled={isLoading}
                  tabIndex={3}
                  className="flex flex-row h-11 font-extrabold text-sm px-5"
                >
                  {t("common:text-login")}
                </Button>
              </form>
              {/* <label
                className="block text-white text-center hover:text-whiteDefault-100 font-semibold text-sm leading-none mb-3 cursor-pointer"
                onClick={handleForgotPassword}
              >
                {t("forms:label-forgotPassword")}
              </label> */}
              <div className="flex flex-col mt-auto items-center">
                <span className="text-xs font-medium text-whiteDefault-40">
                  Belum punya akun?
                </span>
                <span
                  className="text-xs font-medium text-whiteDefault-100 cursor-pointer"
                  onClick={handleSignUp}
                >
                  Daftar di sini
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginForm;
