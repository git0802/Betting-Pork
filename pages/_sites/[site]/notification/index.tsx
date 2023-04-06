import React, { useEffect } from "react";
import MainLayout from "@components/layout/Main";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import NotificationRow from "@components/notification/row";
import Pagination from "@components/common/datatable/pagination";
import { useUserNotificationQuery } from "src/framework/basic-rest/notification/get-user-notification";
import TitlePage from "@components/ui/title/TitlePage";
import http from "@framework/utils/http-server";
import { GetStaticPaths, GetStaticProps } from "next";
import { DefaultPageProps } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";

const Notification = ({ config }: DefaultPageProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const {
    query: { limit, page },
  } = router;
  const [pageSize, setPageSize] = React.useState<number>(Number(limit) || 10);
  const [currentPage, setCurrentPage] = React.useState<number>(
    Number(page) || 1
  );

  const { data, refetch, isLoading } = useUserNotificationQuery({
    page: currentPage,
    limit: pageSize,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(
      {
        pathname: "/notification",
        query: {
          page: page,
          limit: pageSize,
        },
      },
      "",
      { shallow: true }
    );
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCurrentPage(1);
    setPageSize(Number(event.target.value));
    router.push(
      {
        pathname: "/notification",
        query: {
          page: 1,
          limit: Number(event.target.value),
        },
      },
      "",
      { shallow: false }
    );
  };

  return (
    <div className="container mx-auto mt-10 px-mobile px-desktop">
      <TitlePage
        page="notification"
        title={t("common:text-header-notification")}
      />
      {data?.data.length > 0 ? (
        <div className={`bg_content_container mt-[34px] lg:mt-10 mb-10 lg:mb-0 flex flex-col rounded-[10px] py-[15px]`}>
          <NotificationRow data={data?.data} refetch={refetch} />
          <div className="py-5 border-t border-[#DCECFF24] px-6 ">
            <div className="flex flex-col xl:flex-row items-center justify-between text-xs">
              <div className="flex w-full items-start xl:items-center">
                <div className="text-sm font-normal text-[#D3F2FF]">
                  Items per page
                </div>
                <select
                  className=" ml-4 bg_row_per_page p-1 rounded font-normal"
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
              <div className="flex w-full items-center justify-between mt-6 xl:mt-0 xl:justify-end">
                <div className="xl:mx-4 text-sm font-normal text-[#D3F2FF80]">
                  Total{" "}
                  <span className="text-[#D3F2FF]">
                    {data ? data?.total_items : 0}
                  </span>{" "}
                  Notification
                </div>
                <div className="flex flex-wrap items-center justify-start children-x-2 pagination">
                  <Pagination
                    pageSize={pageSize}
                    totalCount={data ? data?.total_items : 0}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="capitalize text-whiteDefault-100/60">
          {!isLoading && t("common:text-no-data")}
        </div>
      )}
    </div>
  );
};

export default Notification;

Notification.Layout = MainLayout;

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
