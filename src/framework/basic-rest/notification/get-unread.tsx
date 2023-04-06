import http from "@framework/utils/http-backend";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";
import { useUI } from "@contexts/ui-context";
import { CookieStorage } from "@lib/cookie";
import { CookieKeys } from "@lib/constant";

type Notification = {
  total_items: number;
  total_page: number;
  data: { total_unread: number };
};
type filter = {
  limit: number;
  page: number;
}
export const fetchUnreadNotification = async () => {
  // const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.MEMO_UNREAD);
  return data;
};
export const useUnreadNotificationQuery = () => {
  const token = CookieStorage.get(CookieKeys.AuthToken);
  return useQuery<Notification, Error>(
    [API_ENDPOINTS.MEMO_UNREAD],
    fetchUnreadNotification,
    {
      enabled: !!token,
      refetchOnWindowFocus: true,
    }
  );
};
