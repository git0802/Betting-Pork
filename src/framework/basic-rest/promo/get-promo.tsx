import http from "@framework/utils/http";
import { useQuery } from "react-query";

export type TParamsGetPromo = {
  // limit?: string;
  // page?: string;
  category?: string | string[];
  // category?: 'all' | 'slot' | 'casino' | 'sport' | 'arcade' | 'poker' | 'togel' | 'member' | 'event';
};

export const getPromo = (params: TParamsGetPromo) => {
  const category = params.category;
  if (params?.category == "") delete params.category;
  return http.get(`/promotions/promo`, { params });
};

const useQueryGetPromo = (params: TParamsGetPromo) => {
  let promotions = [];
  const {
    isLoading,
    data: promotionData,
    error,
  } = useQuery(["GET_PROMO", params], () => getPromo(params), {
    keepPreviousData: true,
  });

  if (!isLoading && !error && promotionData?.data) {
    const {
      data: { data },
    } = promotionData;
    promotions = data;
  }

  return {
    isLoading,
    promotions,
    error,
  };
};

export default useQueryGetPromo;
