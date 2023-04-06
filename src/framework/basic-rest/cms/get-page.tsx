import http from "@framework/utils/http-backend";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchPage = async () => {
  const { data } = await http.get(`${API_ENDPOINTS.PAGES}`);
  return data?.data;
};
export const usePageQuery = () => {
  return useQuery([API_ENDPOINTS.PAGES], () =>
    fetchPage(),
    {
      refetchOnWindowFocus: false,
    }
  );
};
