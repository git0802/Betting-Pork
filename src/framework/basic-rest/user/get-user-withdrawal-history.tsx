import { QueryOptionsType, Withdrawal } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import shuffle from "lodash/shuffle";
import { useInfiniteQuery, useQuery } from "react-query";
type PaginatedHistoryWithdrawal = {
  data: Withdrawal[];
};

const fetchUserWithdrawalHistory = async (params: QueryOptionsType) => {
  const category = params.category;
  delete params.category;

  const { data } = await http.get(`${API_ENDPOINTS.WITHDRAWAL_HISTORY}`, {
    params,
  });
  return {
    data: data,
  };
};

const useQueryGetWithdrawalHistory = (params: QueryOptionsType) => {
  let DataHistory = [];
  let DataMore;
  let CurrentPage = 0

  const {
    isLoading,
    isSuccess,
    data: HistoryData,
    error,
  } = useQuery(
    ["GET_WITHDRAW_HISTORY_LIST", params],
    () => fetchUserWithdrawalHistory(params),
    {
      keepPreviousData: true,
    }
  );

  if (!isLoading && !error && HistoryData?.data) {
    const {
      data: { data, has_more  , current_page},
    } = HistoryData;
    DataHistory = data;
    DataMore = has_more;
    CurrentPage =  current_page

  }
  return {
    isLoading,
    DataHistory,
    DataMore,
    CurrentPage,
    error,
  };
};

export { fetchUserWithdrawalHistory, useQueryGetWithdrawalHistory };
