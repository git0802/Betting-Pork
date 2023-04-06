import http from "@framework/utils/http-backend";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchInvoiceBet = async (props: any) => {
  const { data } = await http.get(
    `${API_ENDPOINTS.INVOICE_BET}/${props.Id}?game=${props.Game} `
  );
  if (data) {
    return data.data;
  } else return [];
};
export const useInvoiceBetTransaction = (props: any) => {
  return useQuery([API_ENDPOINTS.INVOICE_BET], () => fetchInvoiceBet(props));
};
