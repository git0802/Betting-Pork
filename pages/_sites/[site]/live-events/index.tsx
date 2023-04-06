/* eslint-disable @next/next/no-img-element */
import Pagination from "@components/common/datatableType2/pagination";
import Carousel from "@components/events/Carousel";
import Item from "@components/events/Item";
import MainLayout from "@components/layout/Main";
import SearchGameDefault from "@components/layout/SearchGameDefault";
import SearchGameMobileDefault from "@components/layout/SearchGameMobileDefault";
import Button from "@components/ui/button";
import Skeleton from "@components/ui/skeleton";
import TitlePage from "@components/ui/title/TitlePage";
import { useDevice } from "@contexts/device-context";
import useQueryGetEvents from "@framework/events/get-events";
import useQueryGetEventsEligbleUser from "@framework/events/get-events-eligble-user";
import { DefaultPageProps } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http-server";
import groupBy from "lodash/groupBy";
import mapValues from "lodash/mapValues";
import omit from "lodash/omit";
import { GetStaticPaths, GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import IconEvent from "public/icons/header/event.svg";
import IconPersonal from "public/icons/header/personal.svg";
import IconRecentlyPlay from "public/icons/header/recentlyplay.svg";
import { useMemo, useState } from "react";
import IconButtonPrev from "/public/icons/arrowPrev.svg";
import HistoryTabs from "/public/icons/header/history.svg";

const Events = ({ config }: DefaultPageProps) => {
  const { t } = useTranslation();
  const [playVidio, setPlayVidio] = useState(false);
  const [search, setSearch] = useState("");
  const device = useDevice();
  const router = useRouter();
  const {
    query: { id, category },
  } = router;
  const [limit, setLimit] = useState(60);
  const [limitData, setlimitData] = useState(12);
  const [OnOpenSearch, setOnOpenSearch] = useState(true);
  // pagination
  const [page, setPage] = useState(1);
  const [paginationStatus, setpaginationStatus] = useState(true);
  const {
    isLoading,
    events,
    hasMore: hasmoreEvents,
  } = useQueryGetEvents({
    status: category ? (category == "all" ? "" : category) : "",
    limit: category == "all" ? 100 : limitData,
    page: page,
  });

  const {
    isLoading: isLoa,
    eligbleUser,
    hasMore,
  } = useQueryGetEventsEligbleUser({
    id: id ? id : "",
    limit: limit ? limit : 60,
  });

  const dataDetail = useMemo(() => {
    if (id) {
      return events?.find((events: any) => events._id === id);
    }
    return null;
  }, [id, events]);

  const groupedEvents: any = useMemo(() => {
    const grouped: any = mapValues(groupBy(events, "status"), (plist) =>
      plist.map((events) => omit(events, "status"))
    );
    let arrData: any[] = [];
    if (grouped?.ongoing) {
      arrData = grouped?.ongoing?.concat(grouped.drawing);
    } else {
      arrData = arrData?.concat(grouped.drawing);
    }

    let dataHandle;
    if (grouped?.completed) {
      if (grouped?.ongoing) {
        dataHandle = {
          ongoing: arrData,
          completed: grouped?.completed,
        };
      } else if (grouped?.drawing && grouped?.completed) {
        dataHandle = {
          ongoing: arrData,
          completed: grouped?.completed,
        };
      } else if (grouped?.drawing && !grouped?.completed || grouped?.ongoing && !grouped?.completed) {
        dataHandle = {
          ongoing: arrData,
        };
      } else {
        dataHandle = {
          completed: grouped?.completed,
        };
      }
    } else {
      dataHandle = {
        ongoing: arrData,
      };
    }

    return dataHandle;
  }, [events]);

  const listType = ["ongoing", "completed"];

  const typeIcon = (name: string, device: string) => {
    switch (name) {
      case "ongoing":
        return (
          <IconRecentlyPlay
            className={`${
              device === "mobile" ? "w-[28px] h-[28px]" : "w-5 h-5"
            }`}
          />
        );
      case "completed":
        return (
          <HistoryTabs
            className={`${
              device === "mobile" ? "w-[28px] h-[28px]" : "w-5 h-5"
            }`}
          />
        );
      default:
        break;
    }
  };
  const typeAvailable = listType.filter((item) => item);
  const [btnAll, setBtnAll] = useState(false);

  useMemo(() => {
    const check = typeAvailable.filter((item) => item == category);
    const handleCheck = check ? check[0] : "all";

    if (handleCheck === "all") setBtnAll(true);
    else if (handleCheck !== "all") setBtnAll(false);
  }, [category]);

  const renderContentCategory = (categoryId: string) => {
    return (
      <div className="grid-cols-1 sm:grid-cols-3 grid gap-4">
        {groupedEvents?.[categoryId] ? (
          groupedEvents?.[categoryId].map((item: any) => (
            <Item
              key={item?._id}
              banner={item?.banner}
              name={item?.name}
              onSelect={() => {
                router.push(
                  {
                    pathname: `/promo`,
                    query: {
                      id: item._id,
                      category,
                      limit: limit,
                    },
                  },
                  undefined,
                  { shallow: true }
                );
              }}
            />
          ))
        ) : (
          <span className="text-[#d3f2ff80] font-bold capitalize">
            {t("common:text-no-data")}
          </span>
        )}
      </div>
    );
  };

  const paginationRender = () => {
    return (
      <div className="w-full text-xs flex flex-row sm:flex-row items-center justify-between md:justify-end">
        {paginationStatus == false ? null : (
          <div className="flex flex-row items-center justify-start sm:justify-end md:m-0  sm:mt-0 sm:m-4">
            <div className="flex items-center text-sm font-normal">
              <div>Items per page</div>
              <select
                className="bg_select ml-4 px-1 rounded h-5"
                value={limitData}
                onChange={(e) => {
                  setlimitData(+e.target.value);
                }}
              >
                {[12, 24, 48, 60, 100].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
        {paginationStatus == false ? null : (
          <div className="flex flex-row items-center justify-start sm:justify-end my-[30px] md:ml-4">
            <div className="flex flex-wrap items-center justify-start children-x-2 pagination">
              <Pagination
                pageSize={limitData}
                currentPage={page}
                onPageChange={setPage}
                hasMore={hasmoreEvents}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderPemainEligble = (type?: number, dataWinner?: any) => {
    const datatype = type ? type : 0;
    let data;
    if (datatype == 0) {
      data = eligbleUser !== null ? eligbleUser : [];
    } else {
      data = dataWinner !== null ? dataWinner[0] : [];
    }
    return data?.map((value: any, index: number) => {
      if (search.length !== 0 && search && datatype == 0) {
        if (value.toUpperCase().includes(search.toUpperCase())) {
          return (
            <div
              className="w-6/12 md:w-[20%] text-[14px] md:text-[16px] items-center flex"
              key={index}
            >
              <span className="w-[30px]">
                {" "}
                <IconPersonal className={`w-[18px] md:w-[20px]`} />{" "}
              </span>{" "}
              <span className="uppercase">{value}</span>
            </div>
          );
        }
      } else {
        return (
          <div
            className="w-6/12 md:w-[20%] text-[14px] md:text-[16px] items-center flex"
            key={index}
          >
            <span className="w-[30px]">
              {" "}
              <IconPersonal className={`w-[18px] md:w-[20px]`} />{" "}
            </span>{" "}
            <span className="uppercase">{value}</span>
          </div>
        );
      }
    });
  };

  const renderContent = useMemo(() => {
    if (typeof category == "object") {
      return (
        <>
          {renderContentCategory("ongoing")}
          {paginationRender()}
        </>
      );
    } else if (category == "completed") {
      return (
        <>
          {renderContentCategory("completed")}
          {paginationRender()}
        </>
      );
    } else {
      return Object.keys(groupedEvents).map((key) => (
        <Carousel
          key={key}
          title={key}
          data={groupedEvents[key]}
          showTotal={true}
          onSeeAll={(id: string) => {
            if (id == "ongoing") {
              router.push(
                {
                  pathname: `/live-events`,
                  query: "category=ongoing&category=drawing",
                },
                undefined,
                { shallow: true }
              );
            } else {
              router.push(
                {
                  pathname: `/live-events`,
                  query: {
                    category: id,
                    limit: limit,
                  },
                },
                undefined,
                { shallow: true }
              );
            }
          }}
          onSelect={(item: any) => {
            router.push(
              {
                pathname: `/live-events`,
                query: {
                  id: item._id,
                  category,
                  limit: limit,
                },
              },
              undefined,
              { shallow: true }
            );
          }}
        />
      ));
    }
  }, [groupedEvents, category]);

  const handleClickCategory = (category: string | string[]) => (e: any) => {
    e.preventDefault();
    router.push(
      {
        pathname: `/live-events`,
        query: {
          category: category,
          limit: limit,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <div className="container mx-auto">
      <TitlePage
        page="events"
        title={t("common:text-events")}
        subtitle={t("common:text-subtitle-events")}
      />
      <div className="md:mt-10 flex lg:flex-row flex-col lg:space-x-10">
        {/* Desktop */}
        <div
          className={`bg_content_container hidden lg:flex lg:flex-col lg:p-[25px] p-2 lg:space-y-[10px] space-x-4 lg:space-x-0 md:w-[300px] lg:rounded-[10px] lg:overflow-x-hidden overflow-x-auto lg:relative absolute left-0 right-0 scrollbar-hide h-min`}
        >
          <button
            onClick={handleClickCategory("all")}
            className={`${
              !category || category === "all" || btnAll
                ? "bg_tab_active"
                : "bg_tab"
            } tabDesktop`}
          >
            <IconEvent className="w-5 h-5" />
            <label className="capitalize">{t("common:text-all")}</label>
          </button>
          {typeAvailable &&
            typeAvailable.map((type) => (
              <button
                key={type}
                onClick={handleClickCategory(
                  type == "completed"
                    ? "completed"
                    : type == "ongoing"
                    ? ["ongoing", "drawing"]
                    : type
                )}
                className={`
                ${
                  category === "completed" && type == "completed"
                    ? "bg_tab_active"
                    : "bg_tab"
                } 
                ${
                  category?.length == 2 &&
                  category[0] == "ongoing" &&
                  type == "ongoing"
                    ? "bg_tab_active"
                    : "bg_tab"
                } 

                ${
                  category?.length == 7 &&
                  category == "drawing" &&
                  type == "ongoing"
                    ? "bg_tab_active"
                    : "bg_tab"
                } 
                tabDesktop`}
              >
                {typeIcon(type, "desktop")}
                <label className="capitalize">{type}</label>
              </button>
            ))}
        </div>
        {/* Mobile */}
        <div className="flex flex-row lg:hidden px-mobile px-desktop mt-[19px] py-[6px] space-x-4 overflow-x-auto justify-center scrollbar-hide h-min">
          <button
            onClick={handleClickCategory("all")}
            className={`${
              !category || category === "all"
                ? "bg_tab_active"
                : "bg_tab_mobile"
            } tabMobile`}
          >
            <div className="tabItemsTop">
              <IconEvent className="w-[28px] h-[28px]" />
            </div>
            <div className="tabItemsBottom capitalize">
              <span className="capitalize">{t("common:text-all")}</span>
            </div>
          </button>
          {typeAvailable &&
            typeAvailable.map((type) => (
              <button
                key={type}
                onClick={handleClickCategory(
                  type == "completed"
                    ? "completed"
                    : type == "ongoing"
                    ? ["ongoing", "drawing"]
                    : type
                )}
                className={`
                ${
                  category === "completed" && type == "completed"
                    ? "bg_tab_active"
                    : "bg_tab_mobile"
                } 
                ${
                  category?.length == 2 &&
                  category[0] == "ongoing" &&
                  type == "ongoing"
                    ? "bg_tab_active"
                    : "bg_tab_mobile"
                } 

                ${
                  category?.length == 7 &&
                  category == "drawing" &&
                  type == "ongoing"
                    ? "bg_tab_active"
                    : "bg_tab_mobile"
                } 
                tabMobile`}
              >
                <div className="tabItemsTop">{typeIcon(type, "mobile")}</div>
                <div className="tabItemsBottom capitalize">
                  <span className="capitalize">{type}</span>
                </div>
              </button>
            ))}
        </div>
        {/* open detail web  */}
        {id && dataDetail ? (
          <div
            className={`bg_content_container lg:w-[70%] w-full flex flex-col items-start lg:mt-0 mt-5 md:rounded-[10px] p-4 lg:py-[] lg:p-10 break-all`}
          >
            <div
              onClick={() => {
                router.back(), setPlayVidio(false), setSearch("");
              }}
              className="flex flex-row items-center gap-[11px] capitalize mb-4   active:translate-y-1 transition ease-in-out duration-200 cursor-pointer"
            >
              <button className="w-[30px] h-[30px] rounded-full bg-white/10 flex items-center justify-center">
                <IconButtonPrev className="text-white/50 w-5 h-5" />
              </button>
              <span className="text-white text-sm font-normal">
                {t("common:text-back")}
              </span>
            </div>

            <div className="mb-[1rem] relative bg_game  w-full p-[1rem] md:p-[2rem] flex justify-center items-center rounded-[10px]">
              <iframe
                allowFullScreen
                className="rounded-[10px]  md:min-h-[503px]"
                width="843"
                src={`${dataDetail.live_url}${
                  playVidio ? "?autoplay=1&disablekb=1" : "?autoplay=0"
                }`}
                title="Live Streaming Shanghai Pools Today, 18 February 2023  11.00 AM"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            </div>

            <div>
              <h1 className="text-[16px] md:text-[22px] font-bold uppercase">
                {dataDetail.name}
              </h1>
            </div>

            <div className="text-white mt-4">
              <div
                className="normal-case break-normal uppercase  text-[14px] md:text-[16px]"
                dangerouslySetInnerHTML={{ __html: dataDetail.description }}
              />
            </div>

            {dataDetail.status == "completed" ? (
              <div className="w-full">
                <div className=" mt-[17px] flex items-center w-full justify-between">
                  <h1 className="text-[22px] w-full hidden md:flex font-bold">
                    Pemenang
                  </h1>
                  <h1 className="text-[16px] w-full  flex md:hidden font-bold">
                    Pemenang
                  </h1>
                </div>

                <div className="flex space-y-1 items-center  flex-wrap w-full mt-[7px]">
                  {renderPemainEligble(1, dataDetail.winner)}
                </div>

                <hr className="mt-[1rem] border-white/5" />
              </div>
            ) : null}

            <div className="mt-[1.5rem] flex items-center relative w-full justify-between">
              <h2
                className={`${
                  !OnOpenSearch ? "opacity-0" : ""
                } text-[16px] md:text-[22px] font-semibold md:font-bold bg-clip-text whitespace-nowrap text-white flex items-center gap-3 uppercase`}
              >
                Pemain yang memenuhi syarat{" "}
              </h2>

              {!device.isMobileDevice ? (
                <SearchGameDefault
                  placeholder={`${t("search")} `}
                  inputWidth="w-[205px]"
                  position="pages"
                  alignItem="justify-end"
                  search={setSearch}
                />
              ) : (
                <div className="absolute z-10 right-0 bottom-[-0.7rem]">
                  <SearchGameMobileDefault
                    search={setSearch}
                    openSearch={setOnOpenSearch}
                  />
                </div>
              )}
            </div>

            <div className="flex space-y-1 items-center  flex-wrap w-full mt-[1.3rem]">
              {renderPemainEligble()}
            </div>
            {eligbleUser !== null && eligbleUser.length > 0 ? (
              hasMore ? (
                <Button
                  type="button"
                  variant="loadmore"
                  onClick={() => setLimit(limit + 60)}
                  className="w-fit h-11 mx-auto mt-10 px-5 md:mt-[60px]"
                >
                  Load More
                </Button>
              ) : null
            ) : (
              <span>Tidak ada data</span>
            )}
          </div>
        ) : (
          <div
            className={`bg_content_container w-full lg:w-[calc(1024px-372px)] xl:w-[calc(1280px-372px)] 2xl:w-[calc(1440px-372px)] px-mobile px-desktop lg:px-0 flex flex-col lg:mt-0 mt-[30px] p-4 md:pt-0 md:bg-transparent`}
          >
            {isLoading && groupedEvents ? (
              <div className="flex space-x-4">
                {[0, 2, 3].map((item) => (
                  <Skeleton key={item} width="352" height="200" />
                ))}
              </div>
            ) : (
              renderContent
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;

Events.Layout = MainLayout;

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
