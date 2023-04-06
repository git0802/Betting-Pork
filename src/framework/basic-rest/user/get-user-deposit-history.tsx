import { Deposit, QueryOptionsType } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useQuery } from "react-query";
type PaginatedDeposit = {
  data: Deposit[];
};

const fetchUserDepositHistory = async (params: QueryOptionsType) => {
  const { data } = await http.get(`${API_ENDPOINTS.DEPOSIT_HISTORY}`, {
    params,
  });
  return {
    data: data,
  };
};

const useQueryGetDeposit = (params: QueryOptionsType) => {
  let DataHistory = [];
  let DataMore;
  let CurrentPage = 0
  const {
    isLoading,
    isSuccess,
    data: HistoryData,
    error,
  } = useQuery(
    ["GET_DEPOIST_HISTORY_LIST", params],
    () => fetchUserDepositHistory(params),
    {
      keepPreviousData: true,
    }
  );

  if (!isLoading && !error && HistoryData?.data) {
    const {
      data: { data, has_more , current_page },
    } = HistoryData;
    DataHistory = data;
    CurrentPage =  current_page
    DataMore = has_more;
  }

  return {
    isSuccess,
    isLoading,
    DataHistory,
    DataMore,
    CurrentPage,
    error,
  };
};

export { fetchUserDepositHistory, useQueryGetDeposit };
