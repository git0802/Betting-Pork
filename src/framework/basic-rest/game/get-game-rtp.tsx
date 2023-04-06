import { QueryOptionsType, Game } from "@framework/types";
import http from "@framework/utils/http-backend";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";
import { getApiKey } from "@utils/functionutil";
import { useInfiniteQuery } from "react-query";

type PaginatedGame = {
  data: Game[];
  paginatorInfo: any;
};

export const fetchGameRTP = async () => {
  const {
    data: { data },
  } = await http.get(`${API_ENDPOINTS.GAMELIST_RTP}?api_key=${getApiKey()}`);
  return data;
};

export const useGetGameRTP = () => {
  return useQuery([API_ENDPOINTS.GAMELIST_RTP], fetchGameRTP, {});
};

export const newFetchGamesRtp = async ({ pageParam = 1, queryKey }: any) => {
  const [_key, _params] = queryKey;

  const { data } = await http.get(`${API_ENDPOINTS.GAMELIST_RTP}?page=${pageParam}`, { params: _params });
  return {
    data: data.data,
    paginatorInfo: {
      nextPageUrl: "",
      totalPage: data.total_page,
      totalItems: data.total_items,
      page: pageParam
    },
  };
};

export const useRTPGamesQuery = (options: QueryOptionsType) => {
  return useInfiniteQuery<PaginatedGame, Error>(
    [API_ENDPOINTS.GAMES, options],
    newFetchGamesRtp,
    {
      getNextPageParam: (lastPage, pages) => {
        // if (pages.length >= lastPage.paginatorInfo.totalPage) return undefined;
        // return pages.length;
        if (lastPage.paginatorInfo.page < lastPage.paginatorInfo.totalPage) return lastPage.paginatorInfo.page + 1;
        return false;
      },
    }
  );
};