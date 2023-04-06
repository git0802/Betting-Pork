import { QueryOptionsType, Commission } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import shuffle from "lodash/shuffle";
import { useInfiniteQuery } from "react-query";
type PaginatedCommission = {
  data: Commission[];
  paginatorInfo: any;
};
const fetchUserCommission = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.GET_USER_COMMISSION);
  return {
    data: shuffle(data.data),
    paginatorInfo: {
      nextPageUrl: "",
    },
  };
};

const useUserCommissionQuery = (options: QueryOptionsType) => {
  return useInfiniteQuery<PaginatedCommission, Error>(
    [API_ENDPOINTS.GAMES, options],
    fetchUserCommission,
    {
      getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
    }
  );
};

export { useUserCommissionQuery, fetchUserCommission };
