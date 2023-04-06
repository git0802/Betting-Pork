import { Bank } from "@framework/types";
import http from "@framework/utils/http-backend";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchBankList = async (props: any) => {
  if (props) {
    const { data } = await http.get(
      `${API_ENDPOINTS.GET_BANK}?bank_type=${props.bank_type}`
    );
    if (data) {
      return data.data;
    } else return [];
  } else {
    const { data } = await http.get(`${API_ENDPOINTS.GET_BANK}`);
    if (data) {
      return data.data;
    } else return [];
  }
};
export const useBankListQuery = (props?: any) => {
  return useQuery<Array<Bank>, Error>([API_ENDPOINTS.GET_BANK], () =>
    fetchBankList(props)
  );
};

export const getListBank = async () => {
  const { data } = await http.get(`${API_ENDPOINTS.GET_BANK}`);
  return data.data;
};
export const useQueryBankList = () => {
  return useQuery([API_ENDPOINTS.GET_BANK], () =>
    getListBank()
  );
};
