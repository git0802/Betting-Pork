import http from "@framework/utils/http-backend";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchListLuckyDraw = async () => {
  const {
    data: { data },
  } = await http.get(`${API_ENDPOINTS.LUCKY_DRAW}`);
  return data;
};

export const useGetListLuckyDraw = () => {
  return useQuery([API_ENDPOINTS.LUCKY_DRAW], fetchListLuckyDraw, {});
};

