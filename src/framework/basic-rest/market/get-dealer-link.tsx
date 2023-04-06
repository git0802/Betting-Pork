import http from "@framework/utils/http-backend";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";
import { CookieStorage } from "@lib/cookie";
import { CookieKeys } from "@lib/constant";

export const fetchDealer = async () => {
  const getApiKey = () => CookieStorage.get(CookieKeys.API_KEY);
  const {
    data: { data },
  } = await http.get(
    API_ENDPOINTS.GAMES_GET_DEALER + "/" + getApiKey() + "?field=api_key"
  );
  return data;
};
export const useGetDealerQuery = () => {
  const token = CookieStorage.get(CookieKeys.AuthToken);
  return useQuery([API_ENDPOINTS.GAMES_GET_DEALER], fetchDealer, {
    enabled: !!token,
  });
};
