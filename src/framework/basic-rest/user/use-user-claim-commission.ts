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

export interface claimType {
  amount: number;
}
async function claim_commission(input: claimType) {
  return http.post(API_ENDPOINTS.CLAIM_COMMISSION, input);
}

export const useClaimCommissionMutation = () => {
  const { t } = useTranslation();
  const { setModalView, setModalData, closeModal, openModal } = useUI();
  return useMutation((input: claimType) => claim_commission(input), {
    onSuccess: (data) => {
      closeModal();
      setModalView("NOTIFICATION_CLAIM_BONUS");
      openModal();
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
        closeModal();
        toast.error(messageError, {
          bodyStyle: {
            whiteSpace: "pre-wrap",
          },
          toastId: "error-login",
        });
      }
    },
  });
};
