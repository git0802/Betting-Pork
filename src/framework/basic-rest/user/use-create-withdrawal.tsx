import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http-backend";
import { AxiosResponse } from "axios";
import { useMutation } from "react-query";


export interface withdrawalType {
  amount: number;
  player_bank_name: string | number;
  player_bank_account_name: string;
  player_bank_account_number: string | number;
  bank_type: any;
}
async function withdrawal(input: withdrawalType) {
  return http.post(API_ENDPOINTS.CREATE_WITHDRAWAL, input);
}
export const useWithdrawalMutation = (onSuccess?: (data: AxiosResponse<any, any>, variables: withdrawalType, context: unknown) => void | Promise<unknown>, onError?: (error: unknown, variables: withdrawalType, context: unknown) => void | Promise<unknown>) => {
  return useMutation((input: withdrawalType) => withdrawal(input), {
    onSuccess: onSuccess ? onSuccess : (data) => {
      // console.log(data, "Update User Email success response");
    },
    onError: onError ? onError : (data) => {
      // console.log(data, "Update User Email error response");
    },

  });
};
