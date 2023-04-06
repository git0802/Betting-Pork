import { GameQueryOptionsType, Game } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useInfiniteQuery, useQuery } from "react-query";
export const fetchGame = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(
    API_ENDPOINTS.GET_GAMES +
      "?provider=" +
      _params.provider +
      "&type=" +
      _params.type
  );
  return {
    data: data.data,
    total_items: data.total_items,
    total_page: data.total_page,
  };
};
export const useGameQuery = (options: GameQueryOptionsType) => {
  return useQuery<Game[], Error>(
    [
      API_ENDPOINTS.GET_GAMES +
        "?provider=" +
        options.provider +
        "&type=" +
        options.type,
      options,
    ],
    fetchGame
  );
};


type TGameFilterParams = {
  limit?: number;
  page?: number;
  provider?: string | string[];
  type?: string | string[];
  q?: string;
}

type TGameFilterSourceParams = {
  order?: 'asc' | 'desc';
  page?: number;
  provider?: string | string[];
  type?: string | string[];
  q?: string;
}

export const getGameSearch = (params: TGameFilterParams) => {
  if (!params?.provider) delete params.provider;
  if (!params?.type) delete params.type;

  return http.get(`games`, {
    params,
  });
};

export const getGameFilter = async (param: any) => {
  const [_key, _params] = param.queryKey;
  if (!_params?.provider) delete _params.provider;
  if (!_params?.type) delete _params.type;

  const { data } = await http.get(`games`, {
    params: {..._params, page: param.pageParam || 1},
  });

  return {
    data: data.data,
    paginatorInfo: {
      nextPageUrl: "",
      totalPage: data.total_page,
      totalItems: data.total_items,
    },
  };
};

export const useGameSearchQuery = (params: TGameFilterParams) => {

  let games = [];
  let total = 0;
  let totalPage = 0;

  const {
    isLoading,
    data: gameData,
    error,
  } = useQuery(
    ["GET_GAMES_SEARCH", params],
    () => getGameSearch(params),
    {
      keepPreviousData: true,
      enabled: !!params.q
    }
  );

  if (!isLoading && !error && gameData?.data) {
      const {
        data: { data, total_items },
      } = gameData;
      games = data;
      total = total_items;
      totalPage = gameData?.data?.total_page;
  }

  return {
    isLoading,
    games,
    total,
    totalPage,
    error,
  };
};

export const useGameFilterQuery = (params: TGameFilterParams) => {
  return useInfiniteQuery(
    ["GET_GAMES_FILTER", params],
    getGameFilter,
    {
      keepPreviousData: true,
      getNextPageParam: (lastPage, pages) => {
        if (pages.length >= lastPage.paginatorInfo.totalPage) return undefined;
        return pages.length + 1;
      }
    }
  );
};

