import { QueryOptionsType, Deposit } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import shuffle from "lodash/shuffle";
import { useInfiniteQuery } from "react-query";
type PaginatedDeposit = {
	data: Deposit[];
	paginatorInfo: any;
};
const fetchUserDeposit = async ({ queryKey }: any) => {
	const [_key, _params] = queryKey;
	const { data } = await http.get(API_ENDPOINTS.DEPOSIT_HISTORY);
	return {
		data: shuffle(data.data),
		paginatorInfo: {
			nextPageUrl: "",
		},
	};
};

const useUserDepositQuery = (options: QueryOptionsType) => {
	return useInfiniteQuery<PaginatedDeposit, Error>(
		[API_ENDPOINTS.GAMES, options],
		fetchUserDeposit,
		{
			getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
		}
	);
};

export { useUserDepositQuery, fetchUserDeposit };