import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http-backend";
import { AxiosResponse } from "axios";
import { useMutation } from "react-query";

export interface ChangePasswordInputType {
  type: string;
  bank_name: string;
  bank_account_name: string;
  bank_account_number: string;
}
async function createBank(input: ChangePasswordInputType) {
  return http.put(API_ENDPOINTS.CREATE_BANK, input);
}
export const useCreateBankMutation = (onSuccess?: (data: AxiosResponse<any, any>, variables: ChangePasswordInputType, context: unknown) => void | Promise<unknown>, onError?: (error: unknown, variables: ChangePasswordInputType, context: unknown) => void | Promise<unknown>) => {
  return useMutation(
    (input: ChangePasswordInputType) => createBank(input),
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
