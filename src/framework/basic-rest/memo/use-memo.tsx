import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http-backend";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

export interface MemoInputType {
  message: string;
  type: string;
}
async function memo(input: MemoInputType) {
  return http.post(API_ENDPOINTS.MEMO_SENT, input);
}
export const useMemoMutation = () => {
  return useMutation((input: MemoInputType) => memo(input), {
    onSuccess: (data) => {
      // console.log(data, "memo success response");
    },
    onError: (error: any) => {
      const errors: any = error.response?.data?.errors;
      let messageError: string = '';
      if (errors) {
        Object.keys(errors).map((key, index) => {
          if (errors?.[key] && typeof errors[key] === 'string') {
            if (index === 0)
              messageError = errors[key]
            else
              messageError = `${messageError}\n${errors[key]}`
          } else {
            if (index === 0)
              messageError = errors?.[key]?.[0]
            else
              messageError = `${messageError}\n${errors?.[key]?.[0]}`
          }
        })
        if (messageError) {
          toast.error(messageError, {
            bodyStyle: {
              whiteSpace: 'pre-wrap'
            }
          });
        }
      }
    },
  });
};
