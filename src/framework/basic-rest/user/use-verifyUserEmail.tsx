import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http-backend";
import { useMutation } from "react-query";

async function verifyUserEmail() {
  return http.post(API_ENDPOINTS.EMAIL_VERIFICATION);
}

export const useVerifyUserEmailMutation = () => {
  return useMutation(() => verifyUserEmail(), {
    onSuccess: (data) => {
      // console.log(data, "Update User Email success response");
    },
    onError: (data) => {
      // console.log(data, "Update User Email error response");
    },
  });
};
