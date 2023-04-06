import { getBalanceCommission, paginationParams } from "@services/user";
import { useQuery } from "react-query";

interface Props {
  user: string;
}

export const useQueryGetBalanceCommission = (params: Props) => {
  let dataResult = [];
  let total = 0;
  let totalPage = 0;

  if (!params.q) delete params.q;

  const {
    isLoading,
    data: result,
    error,
    refetch,
  } = useQuery(
    ["GET_BALANCE_COMMISSION", params],
    () => getBalanceCommission(),
    {
      keepPreviousData: true,
    }
  );

  if (!isLoading && !error) {
    const {
      data: { data, total_items, has_more },
    }: any = result;
    dataResult =
      (data &&
        data.map((item: any, index: number) => ({
          ...item,
          no: index + 1,
        }))) ||
      [];
    total = total_items;
    totalPage = result?.data?.total_page;
  }

  return {
    isLoading,
    dataResult,
    total,
    totalPage,
    refetch,
    error,
  };
};
