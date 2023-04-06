import { QueryOptionsType, Withdrawal } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import shuffle from "lodash/shuffle";
import { useInfiniteQuery } from "react-query";
type PaginatedWithdrawal = {
  data: Withdrawal[];
  paginatorInfo: any;
};
const fetchUserWithdrawal = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.WITHDRAWAL_HISTORY);
  return {
    data: shuffle(data.data),
    paginatorInfo: {
      nextPageUrl: "",
    },
  };
};

const useUserWithdrawalQuery = (options: QueryOptionsType) => {
  return useInfiniteQuery<PaginatedWithdrawal, Error>(
    [API_ENDPOINTS.GAMES, options],
    fetchUserWithdrawal,
    {
      getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
    }
  );
};

export { useUserWithdrawalQuery, fetchUserWithdrawal };
