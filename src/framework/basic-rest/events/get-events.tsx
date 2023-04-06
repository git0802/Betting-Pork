import http from "@framework/utils/http";
import { useQuery } from "react-query";

export type TParamsGetEvents = {
  limit?: string |number;
  page?: string |number;
  status?: string | string[];
  // category?: 'all' | 'slot' | 'casino' | 'sport' | 'arcade' | 'poker' | 'togel' | 'member' | 'event';
};

export const getEvents = (params: TParamsGetEvents) => {
  const category = params.status;
  if (params?.status == "") delete params.status;
  return http.get(`/promotions/live-events`, { params });
};

const useQueryGetEvents = (params: TParamsGetEvents) => {
  let events = [];
  let hasMore = false;
  let currentPage = 0;
  const {
    isLoading,
    data: EventsData,
    error,
  } = useQuery(["GET_EVENTS", params], () => getEvents(params), {
    keepPreviousData: true,
  });

  if (!isLoading && !error && EventsData?.data) {
    const {
      data: { data },
    } =EventsData;
    events = data;
    hasMore = EventsData?.data?.has_more;
    currentPage = EventsData?.data?.current_page;
  }

  return {
    isLoading,
    events,
    currentPage,
    hasMore,
    error,
  };
};

export default useQueryGetEvents;
