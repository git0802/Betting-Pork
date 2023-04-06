import { QueryOptionsType, Game } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useInfiniteQuery } from "react-query";
import { useUI } from "@contexts/ui-context";
import { useTranslation } from "next-i18next";
type PaginatedGame = {
  data: Game[];
  paginatorInfo: any;
};
const fetchGames = async ({ pageParam = 1, queryKey }: any) => {
  const [_key, _params] = queryKey;
  // const { data } = await http.get(API_ENDPOINTS.GAMES, { params: _params});
  const { data } = await http.get(`${API_ENDPOINTS.GAMES}?page=${pageParam}`, { params: _params });
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

const useGamesQuery = (options: QueryOptionsType) => {
  return useInfiniteQuery<PaginatedGame, Error>(
    [API_ENDPOINTS.GAMES, options],
    fetchGames,
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

const fetchGamesFeatured = async ({ pageParam = 1, queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(`${API_ENDPOINTS.GAMELIST_FEATURED_GAME}?page=${pageParam}`, { params: _params });
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

const useGamesFeaturedQuery = (options: QueryOptionsType) => {
  return useInfiniteQuery<PaginatedGame, Error>(
    [API_ENDPOINTS.GAMELIST_FEATURED_GAME, options],
    fetchGamesFeatured,
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.paginatorInfo.page < lastPage.paginatorInfo.totalPage) return lastPage.paginatorInfo.page + 1;
        return false;
      },
    }
  );
};

const fetchGamesPopular = async ({ pageParam = 1, queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(`${API_ENDPOINTS.GAMELIST_POPULAR_GAME}?page=${pageParam}`, { params: _params });
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

const useGamesPopularQuery = (options: QueryOptionsType) => {
  return useInfiniteQuery<PaginatedGame, Error>(
    [API_ENDPOINTS.GAMELIST_POPULAR_GAME, options],
    fetchGamesPopular,
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.paginatorInfo.page < lastPage.paginatorInfo.totalPage) return lastPage.paginatorInfo.page + 1;
        return false;
      },
    }
  );
};

const fetchGamesNew = async ({ pageParam = 1, queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(`${API_ENDPOINTS.GAMELIST_NEW_GAME}?page=${pageParam}`, { params: _params });
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

const useGamesNewQuery = (options: QueryOptionsType) => {
  return useInfiniteQuery<PaginatedGame, Error>(
    [API_ENDPOINTS.GAMELIST_NEW_GAME, options],
    fetchGamesNew,
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.paginatorInfo.page < lastPage.paginatorInfo.totalPage) return lastPage.paginatorInfo.page + 1;
        return false;
      },
    }
  );
};

const fetchGamesRecentlyPlayed = async ({ pageParam = 1, queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(`${API_ENDPOINTS.GAMELIST_RECENTLY_PLAYED}?page=${pageParam}`, { params: _params });
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

const useGamesRecentlyPlayed = (options: QueryOptionsType) => {
  const { t } = useTranslation();
  const alertUnexpectedErrorOccurred = t("common:text-alert-unexpected-error-occurred") as string
  const { isAuthorized } = useUI();
  const { setModalView, openModal } = useUI();
  return useInfiniteQuery<PaginatedGame, Error>(
    [API_ENDPOINTS.GAMELIST_RECENTLY_PLAYED, options],
    fetchGamesRecentlyPlayed,
    {
      enabled: !!isAuthorized,
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.paginatorInfo.page < lastPage.paginatorInfo.totalPage) return lastPage.paginatorInfo.page + 1;
        return false;
      },
      // onSuccess: (data) => {
        
      // },
      // onError: (error: any) => {
      //   const errors: any = error.response?.data?.errors;
      //   console.log("res error", error)
      //   if (error?.response?.data?.error_code === 2002) {
      //     setModalView("PIN_VERIFICATION");
      //     openModal();
      //     toast.error("Silahkan masukkan PIN lagi",
      //       {
      //         bodyStyle: {
      //           whiteSpace: "pre-wrap",
      //         },
      //         toastId: "error-response",
      //       }
      //     );
      //   } else {
      //     console.log("res error", error)
      //     toast.error(
      //       error?.response?.data?.errors?._error || alertUnexpectedErrorOccurred,
      //       {
      //         bodyStyle: {
      //           whiteSpace: "pre-wrap",
      //         },
      //         toastId: "error-response",
      //       }
      //     );
      //   }
      // },
    }
  );
};

export { useGamesQuery, fetchGames, useGamesFeaturedQuery, fetchGamesFeatured, useGamesPopularQuery, fetchGamesPopular, useGamesNewQuery, fetchGamesNew, useGamesRecentlyPlayed, fetchGamesRecentlyPlayed };
