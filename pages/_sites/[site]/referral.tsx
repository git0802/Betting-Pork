/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo } from "react";
import MainLayout from "@components/layout/Main";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { IconCopy } from "@components/icons";
import Datatable from "@components/common/datatable";
import DatatableReferral from "@components/common/datatable/referral";
import { Column } from "react-table";
import moment from "moment";
import DaterangePicker from "@components/common/daterangepicker";
import CurrencyFormat from "react-currency-format";
import { toast } from "react-toastify";
import { useQueryGetCommission } from "@framework/user/get-commission";
import { useQuery } from "react-query";
import { getReferral } from "@services/user";
import Pagination from "@components/common/datatable/pagination";
import { useUserQuery } from "@framework/user/get-user-profile";
import { useUI } from "@contexts/ui-context";
import TitlePage from "@components/ui/title/TitlePage";
import { CookieKeys } from "@lib/constant";
import { CookieStorage } from "@lib/cookie";
import copy from "copy-to-clipboard";
import Button from "@components/ui/button";
import { useQueryGetBalanceCommission } from "@framework/user/get-balance-commission";
import http from "@framework/utils/http-server";
import { GetStaticPaths, GetStaticProps } from "next";
import { DefaultPageProps } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { ChevronRight, ChevronLeft } from "react-feather";

interface resultType {
  updated_at: Date;
  referrer: string;
  market: string;
  credit: number;
}

const Referral = ({ config }: DefaultPageProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { openModal, setModalView, setModalData, isAuthorized, isReady } =
    useUI();
  const {
    query: { limit, page, q, online },
  } = router;
  const [pageSize, setPageSize] = React.useState<number>(Number(limit) || 10);
  const [currentPage, setCurrentPage] = React.useState<number>(
    Number(page) || 1
  );
  const [showTable, setShowTable] = React.useState<string>(
    String("registration-list")
  );

  useEffect(() => {
    if (isReady && !isAuthorized) {
      setModalView("LOGIN_VIEW");
      return openModal();
    }
  }, [isReady, isAuthorized]);

  const [startDate, setStartDate] = React.useState<Date | null>(
    new Date(moment().subtract(1, "day").format("YYYY-MM-DD"))
  );
  const [endDate, setEndDate] = React.useState<Date | null>(
    new Date(moment().add(1, "day").format("YYYY-MM-DD"))
  );
  const userName = CookieStorage.get(CookieKeys.User);

  const linkCopy = useMemo(() => {
    if (typeof window !== "undefined")
      return window?.origin + "/register?ref=" + userName;
  }, []);

  const { data: dataUser } = useUserQuery();

  const {
    isLoading: isLoadingCommission,
    dataResult,
    total,
    totalPage,
  } = useQueryGetCommission({
    page: currentPage,
    limit: pageSize,
    start_date: startDate,
    end_date: endDate,
  });

  const {
    isLoading: isLoadingBalanceCommission,
    dataResult: dataBalanceCommission,
  } = useQueryGetBalanceCommission({
    user: userName,
  });

  const dataCommission = useMemo(() => {
    if (dataBalanceCommission) {
      return dataBalanceCommission?.[0];
    }
  }, [dataBalanceCommission]);

  const {
    isLoading: isLoadingReferral,
    data: resultReferral,
    error,
    refetch,
  } = useQuery(["GET_REFERRAL"], () => getReferral(), {
    keepPreviousData: true,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(
      {
        pathname: "/referral",
        query: {
          page: page,
          limit: pageSize,
        },
      },
      "",
      { shallow: false }
    );
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCurrentPage(1);
    setPageSize(Number(event.target.value));
    router.push(
      {
        pathname: "/referral",
        query: {
          page: 1,
          limit: Number(event.target.value),
          // start_date: moment(startDate).subtract(30, 'days').format('YYYY-MM-DD'),
          // end_date: moment(endDate).format('YYYY-MM-DD'),
        },
      },
      "",
      { shallow: false }
    );
  };

  const columns: Array<Column<object>> = [
    {
      Header: () => (
        <div className="w-full justify-center flex whitespace-nowrap">No</div>
      ),
      accessor: "no",
      Cell: ({
        row: {
          values: { no },
        },
      }) => {
        return (
          <div className="flex items-center justify-center whitespace-nowrap">
            <span className="">{no}</span>
          </div>
        );
      },
    },
    {
      Header: () => (
        <div className="w-full justify-center flex whitespace-nowrap capitalize">
          {t("common:text-date")}
        </div>
      ),
      accessor: "updated_at",
      Cell: ({
        row: {
          values: { updated_at },
        },
      }) => {
        return (
          <div className="flex items-center justify-center whitespace-nowrap">
            <span className="">{moment(updated_at).format("DD-MM-YYYY")}</span>
          </div>
        );
      },
    },
    {
      Header: () => (
        <div className="w-full justify-start flex whitespace-nowrap">
          Referral ID
        </div>
      ),
      accessor: "referrer",
      Cell: ({
        row: {
          values: { referrer },
        },
      }) => {
        return (
          <span className="text-whiteDefault-100 capitalize whitespace-nowrap">
            {referrer}
          </span>
        );
      },
    },
    {
      Header: () => (
        <div className="w-full justify-end flex capitalize">
          {t("common:text-amount")}
        </div>
      ),
      accessor: "credit",
      Cell: ({
        row: {
          values: { credit },
        },
      }) => {
        return (
          <div className="flex items-center justify-end">
            <span className="text-whiteDefault-100">
              Rp
              <CurrencyFormat
                value={credit}
                thousandSeparator={true}
                displayType={"text"}
              />
            </span>
          </div>
        );
      },
    },
    {
      Header: () => (
        <div className="w-full justify-end flex capitalize">
          {t("common:text-source")}
        </div>
      ),
      accessor: "market",
      Cell: ({
        row: {
          values: { market },
        },
      }) => {
        return (
          <div className="flex items-center justify-start">
            <span className="text-whiteDefault-100 capitalize whitespace-nowrap">
              {market}
            </span>
          </div>
        );
      },
    },
  ];

  const columnsReferral: Array<Column<object>> = [
    {
      Header: () => (
        <div className="w-full justify-center flex whitespace-nowrap font-normal text-sm font-semibold">
          No
        </div>
      ),
      accessor: "no",
      Cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center whitespace-nowrap font-normal">
            <span className="">{row.index + 1}</span>
          </div>
        );
      },
    },
    {
      Header: () => (
        <div className="w-full justify-center flex whitespace-nowrap capitalize font-normal text-sm font-semibold">
          {t("common:text-date")}
        </div>
      ),
      accessor: "created_at",
      Cell: ({
        row: {
          values: { created_at },
        },
      }) => {
        return (
          <div className="flex items-center justify-center whitespace-nowrap font-normal">
            <span className="">{moment(created_at).format("DD-MM-YYYY")}</span>
          </div>
        );
      },
    },
    {
      Header: () => (
        <div className="w-full justify-start flex whitespace-nowrap font-normal text-sm font-semibold">
          Nama
        </div>
      ),
      accessor: "username",
      Cell: ({
        row: {
          values: { username },
        },
      }) => {
        return (
          <span className="text-whiteDefault-100 capitalize whitespace-nowrap font-normal">
            {username}
          </span>
        );
      },
    },
  ];

  const handleSetRange = (event: any) => {
    setStartDate(event);
  };
  const handleSetRange2 = (event: any) => {
    setEndDate(event);
  };

  const copyToClipboard = (text: string, code: string) => {
    const message = <label>{t("common:text-copied")}</label>;
    copy(text.toString());
    toast.success(message, {
      bodyStyle: {
        whiteSpace: "pre-wrap",
      },
      toastId: code,
    });
  };

  function handleClaim(amount: number) {
    setModalData({ data: { amount: Math.floor(amount) } });
    setModalView("CLAIM_BONUS");
    return openModal();
  }

  const PendapatanReferral = 0;
  const TotalReferral = resultReferral?.data.data.length;
  const listReferral = resultReferral?.data.data;
  const TotalBonus = 0;

  const claimError =
    dataCommission?.status == "pending"
      ? "Saldo referral anda sedang diproses"
      : Math.floor(Number(dataUser?.balance_commission)) <= 0
      ? "Saldo referral tidak mencukupi"
      : null;

  return (
    <div className="container mx-auto mt-10 px-mobile px-desktop">
      <>
        <TitlePage
          page="referral"
          title="Referral"
          subtitle="Bagikan referensi anda kepada siapapun untuk mulai mendapatkan bonus."
        />
        <div className="mt-10 flex flex-col space-y-[30px] space-x-0 lg:flex-row lg:space-x-10 lg:space-y-0">
          {/* left */}
          <div className="flex flex-col md:flex-row md:w-full md:space-x-3 md:justify-between lg:justify-start lg:flex-col lg:space-x-0 lg:w-[300px]">
            <div
              className={`bg_referral_left_top md:w-full px-[25px] py-5 rounded-t-[10px] md:rounded-[10px] lg:rounded-t-[10px] lg:rounded-b-[0px]`}
            >
              <label className="text-xs font-normal leading-[14px] uppercase text-whiteDefault-100/60">
                Kode & URL Referral Anda
              </label>
              <div className="grid grid-rows-2 gap-[2px] mt-[10px]">
                <div
                  className={`bg_referral_code_link px-[15px] h-11 flex items-center justify-between text-white text-xl font-extrabold rounded-t-[5px]`}
                >
                  <label>{isReady ? userName : null}</label>
                  <IconCopy
                    onClick={() => {
                      copyToClipboard(userName as string, "code");
                    }}
                    className="cursor-pointer text-white/30 hover:text-white/80"
                  />
                </div>
                <div
                  className={`bg_referral_code_link px-[15px] h-11 flex items-center justify-between text-white text-sm font-semibold rounded-b-[5px]`}
                >
                  <label className="lowercase text-ellipsis overflow-hidden">
                    {isReady ? linkCopy?.substring(0, 25) + ".." : ""}
                  </label>
                  <IconCopy
                    onClick={() => {
                      linkCopy && copyToClipboard(linkCopy, "link");
                    }}
                    className="w-[21px] cursor-pointer text-white/30 hover:text-white/80"
                  />
                </div>
              </div>
            </div>
            <div
              className={`bg_referral_left_bottom md:w-full px-6 py-5 rounded-b-[10px] md:rounded-[10px] lg:rounded-b-[10px] lg:rounded-t-[0px]`}
            >
              <div className="flex flex-row items-start justify-between md:h-[150px] md:flex-col md:justify-between">
                <div className="flex flex-col">
                  <label className="text-xs font-normal text-whiteDefault-70 uppercase">
                    Pendapatan Referral Tersedia
                  </label>
                  <label className="text-[20px] font-bold text-success">
                    Rp
                    <CurrencyFormat
                      value={Math.floor(
                        dataUser?.balance_commission
                          ? dataUser?.balance_commission
                          : 0
                      )}
                      thousandSeparator={true}
                      displayType={"text"}
                    />
                  </label>
                </div>
                {
                  <Button
                    type="button"
                    variant="primary"
                    className={`w-fit text-sm px-5 h-11 font-extrabold uppercase ${
                      claimError ? "opacity-50" : "opacity-100"
                    }`}
                    onClick={() => {
                      if (claimError) {
                        toast.error(claimError);
                      } else {
                        handleClaim(
                          dataUser?.balance_commission
                            ? dataUser?.balance_commission
                            : 0
                        );
                      }
                    }}
                  >
                    {t("common:text-claim")}
                  </Button>
                }
              </div>
              <div className="mt-5 flex items-center justify-between text-base font-normal md:border-t md:border-[#DCECFF24] pt-3">
                <div className="flex flex-col items-start bg-whiteDefault-10 py-2 px-4 rounded">
                  <label className="text-xs font-normal text-whiteDefault-60 uppercase">
                    Referral
                  </label>
                  <label
                    className="text-sm font-normal text-whiteDefault-100 flex flex-row"
                    onClick={() => setShowTable("referral")}
                  >
                    <CurrencyFormat
                      value={TotalReferral}
                      thousandSeparator={true}
                      displayType={"text"}
                    />
                    <div className="ml-4 flex items-center underline hover:cursor-pointer">
                      {t("common:text-show")}{" "}
                      <ChevronRight style={{ height: "20px", width: "16px" }} />
                    </div>
                  </label>
                </div>
                <div className="flex flex-col items-end">
                  <label className="text-xs font-normal text-whiteDefault-60 uppercase">
                    Total Bonus
                  </label>
                  <label className="text-sm font-normal text-whiteDefault-100">
                    Rp
                    <CurrencyFormat
                      value={TotalBonus}
                      thousandSeparator={true}
                      displayType={"text"}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* right */}
          {/* Registration List */}
          {showTable === "registration-list" && (
            <div
              className={`bg_referral_right w-full md:flex-1 rounded-[10px]`}
            >
              <div className="md:px-10 md:py-5 md:h-[162px]">
                <h3 className="text-lg md:text-[22px] font-semibold text-white mb-[10px] md:mb-3">
                  Ringkasan Pendaftaran
                </h3>
                <div>
                  <label className="hidden md:block text-base text-whiteDefault-60 font-normal">
                    Pilih Periode
                  </label>
                  <div className="flex items-center justify-between md:mt-3">
                    <div className="w-full md:w-fit">
                      <DaterangePicker
                        startDate={startDate as Date}
                        endDate={endDate as Date}
                        onStartDateChange={(e: any) => handleSetRange(e)}
                        onEndDateChange={(e: any) => handleSetRange2(e)}
                        position="left"
                        display={1}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden md:block py-5 border-t border-[#DCECFF24]">
                <Datatable
                  data={dataResult}
                  columns={columns}
                  totalItems={total}
                  pageSize={pageSize}
                  totalPage={totalPage}
                  isLoading={isLoadingCommission}
                  currentPage={currentPage}
                  onPageSizeChange={handlePageSizeChange}
                  onPageChange={handlePageChange}
                  tableClassName="w-full"
                  pagination={true}
                />
              </div>
              <div className="block md:hidden py-5 md:border-t md:border-[#DCECFF24] divide-y divide-[#DCECFF24] px-6 ">
                {dataResult
                  ? dataResult.map((item: resultType, index: number) => (
                      <div
                        key={index}
                        className="flex flex-row items-center justify-between py-[15px]"
                      >
                        <div className="flex flex-col">
                          <span className="text-whiteDefault-60">
                            {item?.updated_at
                              ? moment(item?.updated_at).format("DD-MM-YYYY")
                              : "-"}
                          </span>
                          <span className="text-white">
                            {item?.referrer ? item?.referrer : "-"}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-whiteDefault-60 text-right">
                            {item?.market ? item?.market : "-"}
                          </span>
                          <span className="text-white text-right">
                            Rp
                            <CurrencyFormat
                              value={item?.credit}
                              thousandSeparator={true}
                              displayType={"text"}
                            />
                          </span>
                        </div>
                      </div>
                    ))
                  : ""}

                <div className="flex flex-row items-center justify-between text-xs py-4">
                  <div className="flex items-center">
                    <div>Items per page</div>
                    <select
                      className={`bg_select ml-4 p-1 rounded`}
                      value={pageSize}
                      onChange={handlePageSizeChange}
                    >
                      {[10, 25, 50, 100].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                          {pageSize}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center justify-center">
                    {/* <div className="mx-4">
                      {currentPage} of {totalPage}
                    </div> */}
                    <div className="flex flex-wrap items-center justify-start children-x-2 pagination">
                      <Pagination
                        pageSize={pageSize}
                        totalCount={total}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Referral Data */}
          {showTable === "referral" && (
            <div className={`bg_modal w-full md:flex-1 rounded-[10px]`}>
              <div className="md:px-10 md:py-5">
                <div
                  className="flex flex-row items-center mb-4 ml-4 sm:ml-0 mt-4 sm:mt-0 hover:underline hover:cursor-pointer"
                  onClick={() => setShowTable("registration-list")}
                >
                  <div className="rounded-full bg-nileBlue-100 flex items-center justify-center mr-2 h-4 w-4">
                    <ChevronLeft style={{ height: "10px", width: "10px" }} />
                  </div>
                  <div>Kembali</div>
                </div>
                <h3 className="text-lg md:text-[22px] font-semibold text-white mb-[10px] md:mb-3 ml-4 sm:ml-0">
                  Anggota Refferal
                </h3>
              </div>

              <div className="block">
                <DatatableReferral
                  data={listReferral}
                  columns={columnsReferral}
                  totalItems={TotalReferral}
                  pageSize={pageSize}
                  totalPage={totalPage}
                  isLoading={isLoadingReferral}
                  currentPage={currentPage}
                  onPageSizeChange={handlePageSizeChange}
                  onPageChange={handlePageChange}
                  tableClassName="w-full"
                  pagination={false}
                />
              </div>
            </div>
          )}
        </div>
      </>
    </div>
  );
};

export default Referral;

Referral.Layout = MainLayout;

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await http.get(API_ENDPOINTS.DOMAINS);
  const domains = response.data.data;
  return {
    paths: domains.map((path: string) => ({
      params: {
        site: path,
      },
    })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  if (!params) throw new Error("No path parameters found");
  const { site } = params;
  const {
    data: { data: config },
  } = await http.get(API_ENDPOINTS.DOMAIN + site);
  if (!config) return { notFound: true, revalidate: 10 };
  return {
    props: {
      locale,
      ...(await serverSideTranslations(locale as string, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
      config,
    },
    revalidate: 3600,
  };
};
