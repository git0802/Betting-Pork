import { ProvidersQueryOptionsType, Provider } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchProviders = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const {
    data: { data },
  } = await http.get(API_ENDPOINTS.PROVIDERS);
  return { providers: { data: data as Provider[] } };
};

export const useProvidersQuery = (options: ProvidersQueryOptionsType) => {
  return useQuery<{ providers: { data: Provider[] } }, Error>(
    [API_ENDPOINTS.PROVIDERS, options],
    fetchProviders
  );
};

// ?start_date=2022-11-07 03:00:00
export const fetchSportEvent = async (start_date: string) => {
  const {
    data: { data },
  } = await http.get(API_ENDPOINTS.SPORTS_EVENT, {
    params: {
      start_date,
    },
  });
  return { data };
};

export const useSportEventQuery = ({
  start_date,
  enabled = true,
}: {
  start_date: string;
  enabled?: boolean;
}) => {
  return useQuery<{ data: any[] }, Error>(
    [API_ENDPOINTS.SPORTS_EVENT + start_date],
    () => fetchSportEvent(start_date),
    {
      enabled,
    }
  );
};
