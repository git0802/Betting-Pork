import { useUI } from "@contexts/ui-context";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http-backend";
import { useMutation } from "react-query";
import { CookieStorage } from "@lib/cookie";
import { CookieKeys } from "@lib/constant";
import Router, { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useUserQuery } from "@framework/user/get-user-profile";
import { useTranslation } from "next-i18next";
export interface LoginInputType {
  username: string;
  password: string;
  remember_me: boolean;
}
async function login(input: LoginInputType) {
  return http.post(API_ENDPOINTS.LOGIN, input);
}

export const useLoginMutation = () => {
  const { t } = useTranslation();
  const {
    setModalView,
    setModalData,
    closeModal,
    openModal,
    setPinVerified,
    hasPin,
    authorize
  } = useUI();
  const { data: getMe } = useUserQuery();

  return useMutation((input: LoginInputType) => login(input), {
    onSuccess: (data) => {
      const token = data?.data?.data?.token;
      CookieStorage.set(CookieKeys.AuthToken, data.data.data.token);
      CookieStorage.set(CookieKeys.User, JSON.stringify(getMe?.username));
      setModalData({ data: { token: token } });
      authorize();
      setPinVerified(false);
      closeModal();
      if (window?.location?.pathname?.search("/game") === -1) {
        Router.push("/home");
      }
    },
    onError: (error: any) => {
      const errors: any = error.response?.data?.errors;
      let messageError: string = t("common:text-alert-login-failed");
      if (errors) {
        Object.keys(errors).map((key, index) => {
          if (errors?.[key] && typeof errors[key] === "string") {
            if (index === 0) messageError = errors[key];
            else messageError = `${messageError}\n${errors[key]}`;
          } else {
            if (index === 0) messageError = errors?.[key]?.[0];
            else messageError = `${messageError}\n${errors?.[key]?.[0]}`;
          }
        });
        if (messageError === "Maaf, akun anda telah diblokir") {
          setModalView("HUBUNGI_CS");
          openModal();
        } else {
          toast.error(messageError, {
            bodyStyle: {
              whiteSpace: "pre-wrap",
            },
            toastId: "error-login",
          });
        }
      }
    },
  });
};
export const useLoginMutationWoPin = ({ username }: { username: string }) => {
  const { setModalView, setModalData, authorize, openModal, closeModal } =
    useUI();
  const router = useRouter();
  return useMutation((input: LoginInputType) => login(input), {
    onSuccess: (data) => {
      CookieStorage.set(CookieKeys.AuthToken, data.data.data.token);
      CookieStorage.set(CookieKeys.User, JSON.stringify(username));
      // if(authorize){
      //     authorize();
      //     closeModal();
      //     if(window?.location?.pathname?.search('/game') === -1){
      //         Router.push('/home');
      //     }
      // }
      setModalData(data.data.data.token);
      setModalView("NEW_PIN");
      openModal();
    },
    onError: (error: any) => {
      const errors: any = error.response?.data?.errors;
      let messageError: string = "Login error";
      if (errors) {
        Object.keys(errors).map((key, index) => {
          if (errors?.[key] && typeof errors[key] === "string") {
            if (index === 0) messageError = errors[key];
            else messageError = `${messageError}\n${errors[key]}`;
          } else {
            if (index === 0) messageError = errors?.[key]?.[0];
            else messageError = `${messageError}\n${errors?.[key]?.[0]}`;
          }
        });
        if (messageError) {
          toast.error(messageError, {
            bodyStyle: {
              whiteSpace: "pre-wrap",
            },
            toastId: "error-login",
          });
        }
      }
    },
  });
};
