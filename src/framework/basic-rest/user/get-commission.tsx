
import { getCommission, paginationParams } from "@services/user";
import { useQuery } from "react-query";

export const useQueryGetCommission = (params: paginationParams) => {
    let dataResult = [];
    let total = 0;
    let totalPage = 0;

    if (!params.q) delete params.q;

    const {
        isLoading,
        data: result,
        error,
        refetch,
    } = useQuery(["GET_COMMISSION", params], () => getCommission({ ...params }), {
        keepPreviousData: true,
    });

    if (!isLoading && !error) {
        const {
            data: { data, total_items },
        }: any = result;
        dataResult =
            (data &&
                data.map((item: any, index: number) => ({
                    ...item,
                    no: index + 1
                }))) ||
            [];
        total = total_items;
        totalPage = result?.data?.total_page;
    }

    return {
        isLoading,
        dataResult,
        total,
        totalPage,
        refetch,
        error,
    };
};