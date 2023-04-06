import { useUI } from "@contexts/ui-context";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http-backend";
import { useMutation } from "react-query";
import { toast } from 'react-toastify';
import { useTranslation } from "next-i18next";
import { useLoginMutation } from "@framework/auth/use-login";
export interface SignUpInputType {
    username: string;
    password: string;
    password_confirmation: string;
    email: string;
    referred_by?: string;
    phone_number: string;
    bank_name: string;
    bank_account_name: string;
    bank_account_number: string;
}
type loginType = {
    username: string;
    password: string;
};
async function signUp(input: SignUpInputType) {
    return http.post(API_ENDPOINTS.REGISTER, input);
}
export const useSignUpMutation = (options:loginType) => {
    
    const { t } = useTranslation();
    const { mutate: login } = useLoginMutation();
    const { closeModal } = useUI();
    return useMutation((input: SignUpInputType) => signUp(input), {
        onSuccess: (data) => {
            closeModal();
            login({
                username: options?.username,
                password: options?.password,
                remember_me: true,
            })
            toast.success(t("common:text-alert-register-success") as string);
        },
        onError: (error: any) => {
            const errors: any = error.response?.data?.errors || t("Gagal Mendaftar, Silahkan dicoba lagi dengan menggunakan VPN.");
            let messageError: string = t("common:text-alert-register-failed");
            if (errors) {
                Object.keys(errors).map((key, index) => {
                    if (errors?.[key] && typeof errors[key] === "string") {
                        if (index === 0) messageError = errors[key];
                        else messageError = `${messageError}${errors[key]}`;
                    } else {
                        if (index === 0) messageError = errors?.[key]?.[0];
                        else messageError = `${messageError}\n${errors?.[key]?.[0]}`;
                    }
                });
                if (messageError) {
                    toast.error(messageError, {
                        bodyStyle: {
                            whiteSpace: "pre-wrap",
                        },
                        toastId: 'signUp',
                    });
                }
            }
        },
    });
};
