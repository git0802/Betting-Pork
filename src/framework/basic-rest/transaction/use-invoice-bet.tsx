import http from "@framework/utils/http";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";

export type ParamInvoiceBet = {
  game: string;
  limit: string | number;
  page: string | number;
};

export const GetInvoiceBet = (params: ParamInvoiceBet, Id: string) => {
  return http.get(`/bets/invoices/transactions/${Id}`, {
    params,
  });
};

const useQueryInvoiceBet = (params: ParamInvoiceBet, ID: string) => {
  let members = [];
  let total = 0;
  let totalPage = 0;

  const router = useRouter();
  const { query } = router;
  const memberid = ID;
  const {
    isLoading,
    data: memberData,
    error,
  } = useQuery(
    ["GET_INVOCE_BET", params],
    () => GetInvoiceBet(params, memberid),
    {
      enabled: !!memberid,
      keepPreviousData: true,
    }
  );

  if (!isLoading) {
    if (memberData) {
      const {
        data: { data, total_items },
      } = memberData;
      members =
        (data &&
          data?.map((item: object | string[], index: number) => ({
            ...item,
          }))) ||
        [];
      total = total_items;
      totalPage = memberData?.data?.total_page;
    }
  }

  return {
    isLoading,
    members,
    total,
    totalPage,
    error,
  };
};

export default useQueryInvoiceBet;
