import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http-backend";
import { AxiosResponse } from "axios";
import { useMutation } from "react-query";

export interface ChangePinInputType {
  old_pin: number;
  pin: number;
}
async function changePin(input: ChangePinInputType) {
  return http.put(API_ENDPOINTS.CHANGE_PIN, input);
}
export const useChangePinMutation = (onSuccess?: (data: AxiosResponse<any, any>, variables: ChangePinInputType, context: unknown) => void | Promise<unknown>, onError?: (error: unknown, variables: ChangePinInputType, context: unknown) => void | Promise<unknown>) => {
  return useMutation((input: ChangePinInputType) => changePin(input), {
    onSuccess: onSuccess ? onSuccess : (data) => {
      // console.log(data, "ChangePIN success response");
    },
    onError: onError ? onError : (data) => {
      // console.log(data, "ChangePIN error response");
    },
  });
};
