import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import request from "@framework/utils/http-backend";
import game from "@framework/utils/http";

export type paginationParams = {
  limit: number;
  page: number;
  q?: string;
  start_date: Date | null;
  end_date: Date | null;
};

export const getReferral = () =>
  request.get(API_ENDPOINTS.GET_USER_REFERRAL);

export const getCommission = (params?: {
  q?: string;
  page: number;
  limit: number;
}) => game.get(API_ENDPOINTS.GET_USER_COMMISSION, { params });

export const getBalanceCommission = (params?: {
  q?: string;
  page: number;
  limit: number;
}) => game.get(API_ENDPOINTS.CLAIM_COMMISSION, { params });
