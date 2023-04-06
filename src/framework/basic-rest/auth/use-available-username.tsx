import http from "@framework/utils/http-backend";
import { useQuery } from "react-query";

export const availableUsername = (username: string) => {
  return http.get(`/users/admin/members/${username}`);
};

const useAvailableUsername = (username: string) => {
  let result = [];
  const {
    isLoading,
    data: resultData,
    error,
  } = useQuery(
    ["GET_AVAILABLE_USERNAME", username],
    () => availableUsername(username),
    {
      keepPreviousData: true,
    }
  );

  if (!isLoading && !error && resultData?.data) {
    const {
      data: { data },
    } = resultData;
    result = data;
  }

  return {
    isLoading,
    result,
    error,
  };
};

export default useAvailableUsername;
