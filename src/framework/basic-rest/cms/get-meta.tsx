import http from "@framework/utils/http-backend";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchMeta = async () => {
  const { data } = await http.get(`${API_ENDPOINTS.META}`);
  return data?.data;
};
export const useMetaQuery = () => {
  return useQuery([API_ENDPOINTS.META], () =>
    fetchMeta(),
    {
      refetchOnWindowFocus: false,
    }
  );
};