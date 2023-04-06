import http from "@framework/utils/http-backend";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchSosmed = async () => {
  const { data } = await http.get(`${API_ENDPOINTS.SOSMED}`);
  return data?.data;
};
export const useQueryGetSosmed = () => {
  return useQuery([API_ENDPOINTS.SOSMED], () =>
    fetchSosmed(),
    {
      refetchOnWindowFocus: false,
    }
  );
};
