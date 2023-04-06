import { useUI } from "@contexts/ui-context";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http-backend";
import { useMutation } from "react-query";

export interface ValidationInputType {
  security_question: any;
  security_answer: string;
}
async function validationSecurity(input: ValidationInputType) {
  return http.post(API_ENDPOINTS.VALIDATION_SECURITY, input);
}
export const useValidationSecurityMutation = () => {
  const { setModalView, authorize, closeModal } = useUI();
  return useMutation(
    (input: ValidationInputType) => validationSecurity(input),
    {
      onSuccess: (data) => {
       
        return data;
        // setModalView("PIN_VERIFICATION");
        // closeModal();
      },
      onError: (data) => {
        return data;

      },
    }
  );
};
