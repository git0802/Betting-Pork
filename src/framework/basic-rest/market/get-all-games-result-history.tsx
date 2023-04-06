import { GameTypeQueryOptionsType, GameType } from "@framework/types";
import http from "@framework/utils/http-backend";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchGameResultMarket = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const {
    data: { data },
  } = await http.get(
    API_ENDPOINTS.GAMES_RESULT_ALL_MARKET + "?market=" + _params.market
  );
  return { market: { data: data as GameType[] } };
};
export const useGameResultMarketQuery = (options: GameTypeQueryOptionsType) => {
  return useQuery<{ market: { data: GameType[] } }, Error>(
    [
      API_ENDPOINTS.GAMES_RESULT_ALL_MARKET + "?market=" + options.market,
      options,
    ],
    fetchGameResultMarket
  );
};
