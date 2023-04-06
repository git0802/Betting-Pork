import http from "@framework/utils/http-backend";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchSettings = async () => {
  const { data } = await http.get(`${API_ENDPOINTS.SETTINGS}`);
  return data?.data;
};
export const useQueryGetSettings = () => {
  return useQuery([API_ENDPOINTS.SETTINGS], () =>
    fetchSettings(),
    {
      refetchOnWindowFocus: false,
    }
  );
};
