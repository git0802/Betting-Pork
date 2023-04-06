import { NotificationQueryOptionsType, Notification } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http-backend";
import { useInfiniteQuery } from "react-query";
type PaginatedNotification = {
  data: Notification[];
  paginatorInfo: any;
};
const fetchMemoInbox = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.MEMO_INBOX);
  return {
    data: data.data,
    paginatorInfo: {
      nextPageUrl: "",
    },
  };
};

const updateReadMemoInbox = async (id: string) => {
  const { data } = await http.put(`${API_ENDPOINTS.MEMO_SENT}/${id}/read`);
  return data;
};

const useMemoInboxQuery = (options: NotificationQueryOptionsType) => {
  return useInfiniteQuery<PaginatedNotification, Error>(
    [API_ENDPOINTS.MEMO_INBOX, options],
    fetchMemoInbox,
    {
      getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
    }
  );
};

export { useMemoInboxQuery, fetchMemoInbox, updateReadMemoInbox };
