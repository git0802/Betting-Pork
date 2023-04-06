import { GameTypeQueryOptionsType, MarketType } from "@framework/types";
import http from "@framework/utils/http-backend";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchRealMarket = async () => {
  const {
    data: { data },
  } = await http.get(
    API_ENDPOINTS.GAMES_RESULT_REAL_MARKET
  );
  return { 
    market : {
      data: data as MarketType[],
      total_items: data.total_items,
      total_page: data.total_page,
    }
  };
};
export const useRealMarketQuery = () => {
  return useQuery<{ market: { data: MarketType[] } }, Error>(
    [
      API_ENDPOINTS.GAMES_RESULT_REAL_MARKET
    ],
    fetchRealMarket
  );
};