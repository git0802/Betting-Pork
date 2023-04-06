import http from "@framework/utils/http-backend";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

type dataNotification = {
  message: string;
  created_at: string;
  type: string;
  status: string;
};
type Notification = {
  total_items: number;
  total_page: number;
  data: dataNotification[];
};
type filter = {
  limit:number;
  page:number;
}
export const fetchUserNotification = async ({ queryKey }:any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(`${API_ENDPOINTS.MEMO_INBOX}`,{params:_params});
  return data;
};
export const useUserNotificationQuery = (options:filter) => {
  return useQuery(
    [API_ENDPOINTS.MEMO_INBOX,options],
    fetchUserNotification,
    {
      refetchOnWindowFocus:true,
    }
  );
};
