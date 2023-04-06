import { GameTypeQueryOptionsType, GameType } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

type QueryOptionsType = {
  type?: string;
};

export const fetchGameType = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.GAME_TYPES, { params: _params });
  return {
    data: data.data[0].providers
  }
};

export const useGameTypeQuery = (options: QueryOptionsType) => {
  return useQuery(
    [API_ENDPOINTS.GAME_TYPES, options],
    fetchGameType
  );
};

export const fetchCountGameType = async (type: string) => {
  const {
    data: { data },
  } = await http.get(API_ENDPOINTS.GAME_COUNT_BY_TYPE, {
    params: {
      sort: "provider_display",
      order: "asc",
      type,
    },
  });
  return { data };
};

export const useCountGameTypeQuery = ({
  type,
  enabled = true,
}: {
  type: string;
  enabled?: boolean;
}) => {
  return useQuery<{ data: any[] }, Error>(
    [API_ENDPOINTS.GAME_COUNT_BY_TYPE + type],
    () => fetchCountGameType(type),
    {
      enabled,
    }
  );
};


export const fetchGameTypeOption = async () => {
  const {
    data: { data },
  } = await http.get(API_ENDPOINTS.GAME_TYPES);
  return { gametype: { data: data } };
};

export const useGameTypeOptionQuery = () => {
  return useQuery(
    [API_ENDPOINTS.GAME_TYPES],
    fetchGameTypeOption
  );
};
