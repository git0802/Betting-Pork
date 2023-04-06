import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http-backend";
import { useMutation } from "react-query";

export interface UpdateUserType {
  allow_email_invoice: boolean;
}
async function updateUserInvoiceEmail(input: UpdateUserType) {
  return http.patch(API_ENDPOINTS.UPDATE_EMAIL, input);
}

export const useUpdateUserInvoiceEmailMutation = () => {
  return useMutation((input: UpdateUserType) => updateUserInvoiceEmail(input), {
    onSuccess: (data) => {
      // console.log(data, "Update User Email success response");
    },
    onError: (data) => {
      // console.log(data, "Update User Email error response");
    },
  });
};
