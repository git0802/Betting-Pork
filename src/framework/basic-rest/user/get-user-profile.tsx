import { User } from "@framework/types";
import http from "@framework/utils/http-backend";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";
import { CookieStorage } from "@lib/cookie";
import { CookieKeys } from "@lib/constant";
import Router from "next/router";
import { useUI } from "@contexts/ui-context";

export const fetchUserProfile = async () => {
  const { data } = await http.get(`${API_ENDPOINTS.USER_PROFILE}`);
  return data.data;
};
export const useUserQuery = () => {
  const { setHasPin, isAuthorized, unauthorize, closeModal } = useUI();
  return useQuery<User, Error>(
    [API_ENDPOINTS.USER_PROFILE],
    () => fetchUserProfile(),
    {
      enabled: isAuthorized == true,
      refetchOnWindowFocus: true,
      onSuccess: (data) => {
        setHasPin(data?.has_pin);
        CookieStorage.set(CookieKeys.hasPin, data?.has_pin);
      },
      onError: (error: any) => {
        closeModal();
        unauthorize();
        // setPinVerified(false);
        CookieStorage.remove(CookieKeys.AuthToken);
        CookieStorage.remove(CookieKeys.AuthPin);
        CookieStorage.remove(CookieKeys.User);
        CookieStorage.remove(CookieKeys.SelectedGame);
        Router.push("/");
      },
    }
  );
};

export const useSingleUserQuery = () => {
  return useQuery<User, Error>(
    [API_ENDPOINTS.USER_PROFILE],
    () => fetchUserProfile(),
    {
      refetchOnWindowFocus: false,
    }
  );
};
