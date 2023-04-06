import http from "@framework/utils/http-backend";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchInvoiceGame = async (Id: string) => {
  const { data } = await http.get(`${API_ENDPOINTS.INVOICE_GAME}/${Id}/game `);
  if (data) {
    return data.data;
  } else return [];
};
export const useInvoiceGameTransaction = (Id: string) => {
  return useQuery([API_ENDPOINTS.INVOICE_GAME], () => fetchInvoiceGame(Id));
};
