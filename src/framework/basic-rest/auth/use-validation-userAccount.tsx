import { useUI } from "@contexts/ui-context";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http-backend";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

export interface ValidationInputType {
  username: string;
  password: string;
  email: string;
  phone_number: number;
}
async function validationAccount(input: ValidationInputType) {
  const dataHandle  =  await http.post(API_ENDPOINTS.VALIDATION_PROFILE, input)
  return dataHandle;

}


export const  useValidationMutation = () => {
  const queryClient = useQueryClient()


  return useMutation((input: ValidationInputType) => (validationAccount(input))  , {

    onError: (data) => {
      const err = data?.response?.data
      // return console.log(err.errors._error) 
      return err.errors._error
    }
    // onSuccess: (data, variables, context) => {
    //   return console.log(data ,"dattttt 2" , variables , context)
    // },
    // onError: (data, error, variables, context) => {
    //   console.log(data , "ini data")  
    
    // },
  });
};
