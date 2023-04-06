import { QueryOptionsType, Game } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchNewGames = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.GAMELIST_NEW_GAME);
  return data;
};
export const useNewGamesQuery = (
  options: QueryOptionsType,
  disabled?: boolean
) => {
  return useQuery<Game[], Error>(
    [API_ENDPOINTS.GAMELIST_NEW_GAME, options],
    fetchNewGames,
    { enabled: !disabled }
  );
};
