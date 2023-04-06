import { useUI } from "@contexts/ui-context";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http-backend";
import { CookieStorage } from "@lib/cookie";
import { CookieKeys } from "@lib/constant";
import Router from "next/router";
import { useMutation } from "react-query";
import { toast } from 'react-toastify';
import { useTranslation } from "next-i18next";

export interface LoginInputType {
    email: string;
    password: string;
    remember_me: boolean;
}
async function logout() {
    return http.delete(API_ENDPOINTS.LOGIN);
}
export const useLogoutMutation = () => {
    const { t } = useTranslation("common");
    const { unauthorize, setPinVerified, setHasPin } = useUI();
    return useMutation(() => logout(), {
        onSuccess: (_data) => {
            Router.push("/");
            CookieStorage.remove(CookieKeys.AuthToken);
            CookieStorage.remove(CookieKeys.AuthPin);
            CookieStorage.remove(CookieKeys.User);
            CookieStorage.remove(CookieKeys.SelectedGame);
            CookieStorage.remove(CookieKeys.hasPin);
            setPinVerified(false);
            setHasPin(false);
            unauthorize();
        },
        onError: (error: any) => {
            Router.push("/");
            CookieStorage.remove(CookieKeys.AuthToken);
            CookieStorage.remove(CookieKeys.AuthPin);
            CookieStorage.remove(CookieKeys.User);
            CookieStorage.remove(CookieKeys.SelectedGame);
            CookieStorage.remove(CookieKeys.hasPin);
            setPinVerified(false);
            setHasPin(false);
            unauthorize();
            const message =
                error?.response?.data?.errors?._error;
            toast.error(message, {
                bodyStyle: {
                    whiteSpace: "pre-wrap",
                },
                toastId: 'logout'
            });
        },
    });
};
