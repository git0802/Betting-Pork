import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http-backend";
import { AxiosResponse } from "axios";
import { useMutation } from "react-query";

export interface depositType {
  amount: number;
  bank_id: number | string;
  player_bank_name: string | number;
  player_bank_account_name: string | number;
  player_bank_account_number: string | number;
  bank_type: any;
  promotion_id : string
}
async function deposit(input: depositType) {
  return http.post(API_ENDPOINTS.CREATE_DEPOSIT, input);
}
export const useDepositMutation = (onSuccess?: (data: AxiosResponse<any, any>, variables: depositType, context: unknown) => void | Promise<unknown>, onError?: (error: unknown, variables: depositType, context: unknown) => void | Promise<unknown>) => {
  return useMutation((input: depositType) => deposit(input), {
    onSuccess: onSuccess ? onSuccess : (data) => {
      // console.log(data, "Update User Email success response");
    },
    onError: onError ? onError : (data) => {
      // console.log(data, "Update User Email error response");
    },

  });
};
