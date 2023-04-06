import { GameTypeQueryOptionsType, GameType } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchPromotions = async (category: string) => {
  const {
    data: { data },
  } = await http.get(API_ENDPOINTS.DEALER_PROMOTIONS + category);
  return { data };
};

export const usePromotionsQuery = (options: {
  enabled?: boolean;
  category: string;
}) => {
  const { enabled = true, category } = options;
  return useQuery<{ data: any[] }, Error>(
    [API_ENDPOINTS.DEALER_PROMOTIONS + category],
    () => fetchPromotions(category),
    {
      enabled: enabled,
    }
  );
};
