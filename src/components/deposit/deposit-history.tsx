import Text from "@components/ui/text";
import Link from "@components/ui/link";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useUserDepositQuery } from "@framework/user/get-user-deposit";
import { Deposit } from "@framework/types";
import GameFeedLoader from "@components/ui/loaders/game-grid-feed-loader";
import { IoIosArrowForward } from "react-icons/io";
import { VscFileSymlinkFile } from "react-icons/vsc";
import { formatMoney } from "@framework/user/use-currency";
import moment from "moment";
import "moment/locale/id";

const DepositHistory = () => {
  const { query } = useRouter();
  const {
    isFetching: isLoading,
    isFetchingNextPage: loadingMore,
    fetchNextPage,
    hasNextPage,
    data,
    error,
  } = useUserDepositQuery({ limit: 20, ...query });
  const { t } = useTranslation("deposit");
  return (
    <>
      <Text
        variant="pageHeading"
        className="pb-1 mb-4 capitalize inline-flex mx-4 lg:mx-0"
      >
        {t("deposit:text-deposit-history-header")}
      </Text>
      <div className="mx-4 lg:hidden">
        {isLoading && !data?.pages?.length ? (
          // <TableListFeedLoader limit={12} uniqueKey="table-list-grid" />
          <GameFeedLoader limit={12} uniqueKey="game-grid" />
        ) : (
          data?.pages?.map((page) => {
            return page?.data?.map((item: Deposit, index: number) => (
              <div
                key={index}
                className="bg-white px-4 py-5 sm:px-6 my-2 rounded-md"
              >
                <div className="">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900">
                      <a
                        href="#"
                        className="hover:underline uppercase flex flex-col"
                      >
                        <div className="flex justify-between">
                          <span>{item.bank}</span>
                          <span className="block text-sm font-semibold flex items-center">
                            {formatMoney({
                              amount: item.amount,
                              currencyCode: "IDR",
                              locale: "id-ID",
                            })}
                            <IoIosArrowForward className="w-4 h-4 ml-2" />
                          </span>
                        </div>
                        <span className="font-normal block mt-2">
                          {item.bank}#{item._id}
                        </span>
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 border-t-4 border-dotted border-gray-300">
                      <a href="#" className="hover:underline block mt-4">
                        <span className="px-4 py-2 text-sm font-bold bg-gray-300 rounded-2xl">
                          {item.status}
                        </span>
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            ));
          })
        )}
      </div>

      <table className="hidden lg:table w-full">
        <tbody className="text-sm lg:text-base">
          {isLoading && !data?.pages?.length ? (
            // <TableListFeedLoader limit={12} uniqueKey="table-list-grid" />
            <GameFeedLoader limit={12} uniqueKey="game-grid" />
          ) : (
            data?.pages?.map((page) => {
              return page?.data?.map((item: Deposit) => (
                <tr
                  key={item._id}
                  className="bg-white border-b-8 border-gray-200 rounded-sm"
                >
                  <td className="px-4 py-5 text-start">
                    <Link
                      href="#"
                      className="no-underline hover:underline text-body"
                    >
                      <span className="font-semibold">{item.bank}</span>
                      <span className="block text-sm">{item._id}</span>
                    </Link>
                  </td>
                  <td className="px-4 py-5 text-start lg:text-center text-heading">
                    <span className="text-sm">Tanggal:</span>
                    <span className="block text-sm font-semibold">
                      {moment(new Date(item.created_at)).format(
                        "dddd, DD MMMM YYYY"
                      )}
                    </span>
                  </td>
                  <td className="px-4 py-5 text-start lg:text-center text-heading">
                    <span className="text-sm">Jumlah:</span>
                    <span className="block text-sm font-semibold">
                      {formatMoney({
                        amount: item.amount,
                        currencyCode: "IDR",
                        locale: "id-ID",
                      })}
                    </span>
                  </td>
                  <td className="px-4 py-5 text-start lg:text-center text-heading">
                    <span className="px-4 py-2 text-sm font-bold bg-gray-300 rounded-2xl">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-5 text-end text-heading">
                    <Link
                      href="#"
                      className="text-sm leading-4 inline-block rounded-md text-blue-800"
                    >
                      <VscFileSymlinkFile className="w-6 h-6" />
                    </Link>
                  </td>
                </tr>
              ));
            })
          )}
        </tbody>
      </table>
    </>
  );
};

export default DepositHistory;
