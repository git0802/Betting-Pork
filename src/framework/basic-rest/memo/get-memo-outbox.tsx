import { NotificationQueryOptionsType, Notification } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http-backend";
import { useInfiniteQuery } from "react-query";
type PaginatedNotification = {
  data: Notification[];
  paginatorInfo: any;
};
const fetchMemoOutbox = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.MEMO_OUTBOX);
  return {
    data: data.data,
    paginatorInfo: {
      nextPageUrl: "",
    },
  };
};

const useMemoOutboxQuery = (options: NotificationQueryOptionsType) => {
  return useInfiniteQuery<PaginatedNotification, Error>(
    [API_ENDPOINTS.MEMO_OUTBOX, options],
    fetchMemoOutbox,
    {
      getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
    }
  );
};

export { useMemoOutboxQuery, fetchMemoOutbox };
