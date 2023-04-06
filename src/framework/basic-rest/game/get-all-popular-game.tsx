import { QueryOptionsType, Game } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchPopularGames = async ({ queryKey }: any) => {
    const [_key, _params] = queryKey;
    const { data } = await http.get(API_ENDPOINTS.POPULAR_GAMES);
    return data;
};
export const usePopularGamesQuery = (
  options: QueryOptionsType,
  disabled?: boolean
) => {
    return useQuery<Game[], Error>(
        [API_ENDPOINTS.POPULAR_GAMES, options],
        fetchPopularGames,
    {
      enabled: !disabled,
    }
    );
};
