import { useUI } from "@contexts/ui-context";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http-backend";
import { useMutation } from "react-query";

export interface ValidationInputType {
  pin: number;
}
async function validationPin(input: ValidationInputType) {
  return http.post(API_ENDPOINTS.VALIDATION_PIN, input);
}
export const useValidationPinMutation = () => {
  const { setModalView, authorize, closeModal } = useUI();
  return useMutation((input: ValidationInputType) => validationPin(input), {
    onSuccess: (data) => {
      // console.log("data check =>", data);
      return data;
      // setModalView("PIN_VERIFICATION");
      // closeModal();
    },
    onError: (data) => {
      return data;
    },
  });
};
