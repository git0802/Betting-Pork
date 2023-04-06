import { useUI } from "@contexts/ui-context";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useMutation } from "react-query";
import http from "@framework/utils/http-backend";
import { toast } from "react-toastify";
import { usePinAuthMutation } from "./use-pinAuth";
import { useTranslation } from "next-i18next";

export interface PinCodeInput {
  pin: string;
  pin_confirmation: string;
}

async function NewPin(input: PinCodeInput) {
  return http.post(API_ENDPOINTS.CHANGE_PIN, input);
}
export const useNewPin = ({ pin }: { pin: string }) => {
  const { t } = useTranslation();
  const { mutate: pinAuth } = usePinAuthMutation();
  const { setModalView, openModal } = useUI();
  return useMutation((input: PinCodeInput) => NewPin(input), {
    onSuccess: (data) => {
      pinAuth({
        pin,
      });
      toast.success(t("common:text-alert-pin-created") as string);
    },
    onError: (error: any) => {
      const errors: any = error.response?.data?.errors;
      let messageError: string = t("common:text-alert-pin-created-error");
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
            toastId: "error-pin",
          });
        }
        setModalView("NEW_PIN");
        openModal();
      }
    },
  });
};
