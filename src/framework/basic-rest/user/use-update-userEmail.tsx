import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http-backend";
import { AxiosResponse } from "axios";
import { useMutation } from "react-query";

export interface UpdateUserType {
  email: string;
}
async function updateUserEmail(input: UpdateUserType) {
  return http.patch(API_ENDPOINTS.UPDATE_EMAIL, input);
}

export const useUpdateUserEmailMutation = (onSuccess?: (data: AxiosResponse<any, any>, variables: UpdateUserType, context: unknown) => void | Promise<unknown>, onError?: (error: unknown, variables: UpdateUserType, context: unknown) => void | Promise<unknown>) => {
  return useMutation((input: UpdateUserType) => updateUserEmail(input), {
    onSuccess: onSuccess ? onSuccess : (data) => {
      // console.log(data, "Update User Email success response");
    },
    onError: onError ? onError : (data) => {
      // console.log(data, "Update User Email error response");
    },
  });
};
