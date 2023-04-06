import { useUI } from "@contexts/ui-context";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { CookieStorage } from "@lib/cookie";
import { CookieKeys } from "@lib/constant";
import Router, { useRouter } from "next/router";
import http from "@framework/utils/http-backend";

export interface PinCodeInput {
  pin: string;
}

async function pinAuth(input: PinCodeInput) {
  return http.post(API_ENDPOINTS.PIN_AUTH, input);
}

export const usePinAuthMutation = () => {
  const router = useRouter();
  const { authorize, unauthorize, closeModal, setModalView, openModal, setPinVerified } = useUI();
  const token = CookieStorage.get(CookieKeys.AuthToken);
  return useMutation((input: PinCodeInput) => pinAuth(input), {
    onSuccess: (data) => {
      if (data?.status === 200) {
        setPinVerified(true);
        authorize();
        closeModal();
        CookieStorage.set(CookieKeys.AuthToken, token);
        CookieStorage.set(CookieKeys.AuthPin, true);
        CookieStorage.set(
          CookieKeys.User,
          JSON.stringify(data.data.data.username)
        );
      }
      if (window?.location?.pathname?.search("/game") === -1) {
        Router.push("/home");
      }
    },
    onError: (error: any) => {
      const errors: any = error.response?.data?.errors;
      let messageError: string = "pin auth error response";
      closeModal();
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
            toastId: "",
          });
        }

        setModalView("PIN_VERIFICATION");
        openModal();
      }
    },
  });
};
