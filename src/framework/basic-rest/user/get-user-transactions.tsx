import { QueryOptionsType, Transaction } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import httpBackend from "@framework/utils/http-backend";
import { useInfiniteQuery } from "react-query";
type PaginatedTransaction = {
  data: Transaction[];
  paginatorInfo: any;
};

interface QueryOptionsTransactionType extends QueryOptionsType {
  start_date?: string;
  end_date?: string;
}

interface QueryOptionsTransactionDetailType extends QueryOptionsType {
  transaction_id?: string | string[];
  market?: string | string[];
  period?: string | string[];
}

const fetchUserTransaction = async ({ pageParam, queryKey }: any) => {
  const [_key, _params] = queryKey;
  const params = pageParam ?? _params;
  const { data } = await http.get(API_ENDPOINTS.TRANSACTIONS, {
    params,
  });
  return {
    data: data.data,
    paginatorInfo: {
      total_items: data.total_items,
      start_date: params.start_date,
      end_date: params.end_date,
      limit: params.limit,
      page: params.page + 1,
    },
  };
};

const fetchUserTransactionDetail = async ({ pageParam, queryKey }: any) => {
  const [_key, _params] = queryKey;
  const params = pageParam ?? _params;
  const { data } = await httpBackend.get(
    `${API_ENDPOINTS.TRANSACTIONS_DETAIL}/${params.market}`,
    {
      params: {
        period: params.period,
        transaction_id: params.transaction_id,
      },
    }
  );
  return {
    data: data.data,
    paginatorInfo: {
      total_items: data.total_items,
      period: params.period,
      transaction_id: params.transaction_id,
      limit: params.limit,
      page: params.page + 1,
    },
  };
};

const useUserTransactionQuery = (options: QueryOptionsTransactionType) => {
  return useInfiniteQuery<PaginatedTransaction, Error>(
    [API_ENDPOINTS.TRANSACTIONS, options],
    fetchUserTransaction,
    {
      getNextPageParam: ({ paginatorInfo }) => {
        delete paginatorInfo.total_items;
        return paginatorInfo;
      },
    }
  );
};

const useUserTransactionDetailQuery = (
  options: QueryOptionsTransactionDetailType
) => {
  return useInfiniteQuery<PaginatedTransaction, Error>(
    [`${API_ENDPOINTS.TRANSACTIONS_DETAIL}/${options.market}`, options],
    fetchUserTransactionDetail,
    {
      getNextPageParam: ({ paginatorInfo }) => paginatorInfo,
    }
  );
};

export {
  useUserTransactionQuery,
  useUserTransactionDetailQuery,
  fetchUserTransaction,
  fetchUserTransactionDetail,
};
