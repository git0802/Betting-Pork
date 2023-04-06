import { QueryOptionsType, Game, FeaturedGame } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useInfiniteQuery, useQuery } from "react-query";
type PaginatedGame = {
    data: Game[];
    paginatorInfo: any;
};
type FeaturedType = {
    data: FeaturedGame[];
    total_items:number;
    total_page:number;
};
const fetchGamesList = async ({ queryKey }:any) => {
    const [_key, _params] = queryKey;
    // const { data } = await http.get(`API_ENDPOINTS.GAMELIST_FEATURED_GAME?_limit=${limit}&_page=${page}`);
    const { data } = await http.get(API_ENDPOINTS.GAMELIST_FEATURED_GAME, { params: _params });
    return {
        data: data.data,
        paginatorInfo: {
            nextPageUrl: "",
            
        },
    };
};

const useGamesListQuery = (options: QueryOptionsType) => {
    return useInfiniteQuery<PaginatedGame, Error>(
        [API_ENDPOINTS.GAMELIST_FEATURED_GAME, options],
        fetchGamesList,
        {
            getNextPageParam: ({ paginatorInfo }) =>  paginatorInfo.nextPageUrl,
            // getNextPageParam: (lastPage, allPages) => {
            //     const nextPage = allPages.length + 1
            //     return nextPage
            // }
        }
    );
};

// const fetchList = async (page:number, limit:number) => {
//     // const [_key, _params] = queryKey;
//     const { data } = await http.get(`${API_ENDPOINTS.GAMELIST_FEATURED_GAME}?_limit=${limit}&_page=${page}`);
//     return {
//         data: data.data,
//     };
// };

const fetchFeaturedSlider = async ({ queryKey }:any) => {
    const [_key, _params] = queryKey;
    const { data } = await http.get(API_ENDPOINTS.GAMELIST_FEATURED_GAME, { params: _params });
    return {
        data: data.data,
        total_items: data.total_items,
        total_page: data.total_page,
    };
};

const useGamesFeaturedSlider = (options: QueryOptionsType) => {
    return useQuery(
        [API_ENDPOINTS.GAMELIST_FEATURED_GAME],
        fetchFeaturedSlider,
        {
            keepPreviousData:true
        }
    );
};

const fetchPopularSlider = async ({ queryKey }:any) => {
    const [_key, _params] = queryKey;
    const { data } = await http.get(API_ENDPOINTS.GAMELIST_POPULAR_GAME, { params: _params });
    return {
        data: data.data,
        total_items: data.total_items,
        total_page: data.total_page,
    };
};

const useGamesPopularSlider = (options: QueryOptionsType) => {
    return useQuery<FeaturedType, Error>(
        [API_ENDPOINTS.GAMELIST_POPULAR_GAME],
        fetchPopularSlider,
        {
            keepPreviousData:true
        }
    );
};

const fetchNewSlider = async ({ queryKey }:any) => {
    const [_key, _params] = queryKey;
    const { data } = await http.get(API_ENDPOINTS.GAMELIST_NEW_GAME, { params: _params });
    return {
        data: data.data,
        total_items: data.total_items,
        total_page: data.total_page,
    };
};

const useGamesNewSlider = (options: QueryOptionsType) => {
    return useQuery<FeaturedType, Error>(
        [API_ENDPOINTS.GAMELIST_NEW_GAME],
        fetchNewSlider,
        {
            keepPreviousData:true
        }
    );
};

export { useGamesListQuery, fetchGamesList, useGamesFeaturedSlider, fetchFeaturedSlider, useGamesPopularSlider, fetchPopularSlider, useGamesNewSlider, fetchNewSlider };
