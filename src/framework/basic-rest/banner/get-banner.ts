import http from "@framework/utils/http-backend";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";
import isArray from "lodash/isArray";

interface Props {
  category?: string | string[];
}

export const fetchBanner = async (params: Props) => {
  if (isArray(params?.category)) {
    try {
      const promises = [];
      for (let i = 0; i < params?.category.length; i++) {
        const item = params?.category[i];
        promises.push(
          http.get(`${API_ENDPOINTS.SETTINGS}?category=banner-${item}`)
        );
      }
      const results = await Promise.allSettled(promises);
      let totalSuccess = 0;
      const response = [];
      for (let i = 0; i < results.length; i++) {
        const { status, value } = results[i];
        if (status) {
          totalSuccess++;
          response.push(...value.data.data);
        }
      }
      return response;
    } catch (error) {
      return [];
    }
  }
  const { data } = await http.get(
    `${API_ENDPOINTS.SETTINGS}?category=` + params.category
  );
  return data.data;
};
export const useBannerQuery = (params: Props, enabled: boolean = true) => {
  return useQuery([API_ENDPOINTS.SETTINGS, params], () => fetchBanner(params), {
    keepPreviousData: true,
    enabled,
  });
};
