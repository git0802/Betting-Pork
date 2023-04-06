import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";
import { GameCountByProvider } from "@framework/types";

type QueryOptionsType = {
  provider?: string;
  sort?: string;
  order?: string;
};

export const fetchGameByProvider = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.GAME_COUNT_BY_PROVIDER, {
    params: _params,
  });
  return {
    data: data.data[0],
  };
};

export const useGameCountByProvider = (options: QueryOptionsType) => {
  return useQuery<{ data: GameCountByProvider }, Error>(
    [API_ENDPOINTS.GAME_TYPES, options],
    fetchGameByProvider
  );
};
