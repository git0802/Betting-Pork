import { GameTypeQueryOptionsType, GameType } from "@framework/types";
import http from "@framework/utils/http-backend";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchGameMarket = async () => {
  const {
    data: { data },
  } = await http.get(API_ENDPOINTS.GAMES_ALL_MARKET);
  return { market: { data: data as GameType[] } };
};
export const useGameMarketQuery = () => {
  return useQuery<{ market: { data: GameType[] } }, Error>(
    [API_ENDPOINTS.GAMES_ALL_MARKET],
    fetchGameMarket
  );
};
