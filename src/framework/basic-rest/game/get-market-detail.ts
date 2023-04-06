import { GameTypeQueryOptionsType, GameType } from "@framework/types";
import http from "@framework/utils/http-backend";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchMarketDetail = async () => {
  const {
    data: { data },
  } = await http.get(API_ENDPOINTS.MARKET_DETAIL);
  return { market: { data: data as GameType[] } };
};
export const useMarketDetailQuery = () => {
  return useQuery<{ market: { data: GameType[] } }, Error>(
    [API_ENDPOINTS.MARKET_DETAIL],
    fetchMarketDetail
  );
};
