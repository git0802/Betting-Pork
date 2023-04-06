import http from "@framework/utils/http";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

export type ParamMemberTransaction = {
  limit: any;
  page: any;
  start_date: any;
  end_date: any;
  sort?: string;
  provider?: string[] | string;
  type?: string[] | string;
  username?: string;
  period?: string;
  game_type?: string;
  market?: string;
};

export const GetMemberTransaksi = (
  params: ParamMemberTransaction,
  Username: string
) => {
  return http.get(
    `/transactions/v2/members/game-transactions?username=${Username}`,
    {
      params,
    }
  );
};

const useQueryMemberTransaksi = (
  params: ParamMemberTransaction,
  ID: string
) => {
  let members = [];
  let total = 0;
  let totalPage = 0;
  let dataMore;
  const router = useRouter();
  const { query } = router;
  const memberid = ID;
  const {
    isLoading,
    isFetching,
    data: memberData,
    error,
  } = useQuery(
    ["GET_MEMBER_TRANSAKSI", params],
    () => GetMemberTransaksi(params, memberid),
    {
      enabled: !!memberid,
      keepPreviousData: true,
    }
  );
  if (!isLoading) {
    if (memberData) {
      const {
        data: { data, total_items, has_more },
      } = memberData;
      members =
        (data &&
          data?.map((item, index) => ({
            ...item,
          }))) ||
        [];
      total = total_items;
      totalPage = memberData?.data?.total_page;
      dataMore = has_more;
    }
  }

  return {
    isFetching,
    isLoading,
    members,
    total,
    dataMore,
    totalPage,
    error,
  };
};

export default useQueryMemberTransaksi;
