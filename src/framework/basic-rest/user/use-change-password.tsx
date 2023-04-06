import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http-backend";
import { AxiosResponse } from "axios";
import { useMutation } from "react-query";

export interface ChangePasswordInputType {
  old_password: string;
  password: string;
}
async function changePassword(input: ChangePasswordInputType) {
  return http.put(API_ENDPOINTS.CHANGE_PASSWORD, input);
}
export const useChangePasswordMutation = (onSuccess?: (data: AxiosResponse<any, any>, variables: ChangePasswordInputType, context: unknown) => void | Promise<unknown>, onError?: (error: unknown, variables: ChangePasswordInputType, context: unknown) => void | Promise<unknown>) => {
  return useMutation(
    (input: ChangePasswordInputType) => changePassword(input),
    {
      onSuccess: onSuccess ? onSuccess : (data) => {
        // console.log(data, "ChangePassword success response");
      },
      onError: onError ? onError : (data) => {
        // console.log(data, "ChangePassword error response");
      },
    }
  );
};
