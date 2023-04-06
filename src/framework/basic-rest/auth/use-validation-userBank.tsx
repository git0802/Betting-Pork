import { useUI } from "@contexts/ui-context";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http-backend";
import { useMutation } from "react-query";

export interface ValidationInputType {
  bank_name: string;
  bank_account_number: string;
  bank_account_name: string;
}
async function validationBank(input: ValidationInputType) {
  return http.post(API_ENDPOINTS.VALIDATION_BANK, input);
}
export const useValidationBankMutation = () => {
  const { setModalView, authorize, closeModal } = useUI();
  return useMutation((input: ValidationInputType) => validationBank(input), {
    onSuccess: (data) => {
      
      return data;
      // setModalView("PIN_VERIFICATION");
      // closeModal();
    },
    onError: (data) => {
      return data;

    },
  });
};
