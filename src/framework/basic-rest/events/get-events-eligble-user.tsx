import http from "@framework/utils/http";
import { useQuery } from "react-query";

export type TParamsGetEvents = {
  id: any;
  limit?: string | number;
  page?: string | number;
  status?: string | string[];
};

export const getEventsEligbleUser = (params: TParamsGetEvents) => {
  const category = params.status;
  if (params?.status == "") delete params.status;
  return http.get(`/promotions/live-events/${params.id}/users`, { params });
};

const useQueryGetEventsEligbleUser = (params: TParamsGetEvents) => {
  let eligbleUser = [];
  let hasMore = false;
  let currentPage = 0;
  const {
    isLoading,
    data: EventsEligble,
    error,
  } = useQuery(
    ["GET_EVENTS_ELIGBLE", params],
    () => params.id !== "" ? getEventsEligbleUser(params): null,
    {
      keepPreviousData: true,
    }
  );

  if (!isLoading && !error && EventsEligble?.data) {
    const {
      data: { data },
    } = EventsEligble;
    eligbleUser = data;
    hasMore = EventsEligble?.data?.has_more;
    currentPage = EventsEligble?.data?.current_page;
  }

  return {
    isLoading,
    currentPage,
    hasMore,
    eligbleUser,
    error,
  };
};

export default useQueryGetEventsEligbleUser;
