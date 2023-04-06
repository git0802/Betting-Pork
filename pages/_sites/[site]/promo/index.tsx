/* eslint-disable @next/next/no-img-element */
import React, { useMemo, useState, useEffect } from "react";
import MainLayout from "@components/layout/Main";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import TitlePage from "@components/ui/title/TitlePage";
import Carousel from "@components/promo/Carousel";
import { useRouter } from "next/router";
import Image from "next/image";
import useQueryGetPromo from "@framework/promo/get-promo";
import mapValues from "lodash/mapValues";
import groupBy from "lodash/groupBy";
import omit from "lodash/omit";
import http from "@framework/utils/http-server";
import { GetStaticPaths, GetStaticProps } from "next";
import Skeleton from "@components/ui/skeleton";
import Item from "@components/promo/Item";
import IconSemua from "public/icons/header/promo.svg";
import IconSlot from "public/icons/header/slot.svg";
import IconSports from "public/icons/header/sports.svg";
import IconCasino from "public/icons/header/casino.svg";
import IconArcade from "public/icons/header/arcades.svg";
import IconPoker from "public/icons/header/poker.svg";
import IconTogel from "public/icons/header/togel.svg";
import IconMember from "public/icons/header/member.svg";
import IconEvent from "public/icons/header/event.svg";
import IconDeposit from "public/icons/header/deposit.svg";
import { DefaultPageProps } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import IconButtonPrev from "/public/icons/arrowPrev.svg";

const Promo = ({ config }: DefaultPageProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const {
    query: { id, category },
  } = router;

  const { isLoading, promotions } = useQueryGetPromo({
    category: "",
    // category: category !== "all" ? category : "",
  });

  const dataDetail = useMemo(() => {
    if (id) {
      return promotions?.find((promotion: any) => promotion._id === id);
    }
    return null;
  }, [id, promotions]);

  const groupedPromotions = useMemo(() => {
    const grouped = mapValues(groupBy(promotions, "category"), (plist) =>
      plist.map((promotion) => omit(promotion, "category"))
    );
    return grouped;
  }, [promotions]);

  const listGroupType = Object.keys(groupedPromotions);

  const listType = [
    "slot",
    "casino",
    "sports",
    "arcade",
    "poker",
    "togel",
    "member",
    "event",
    "deposit",
  ];

  const typeIcon = (name: string, device: string) => {
    switch (name) {
      case "slot":
        return (
          <IconSlot
            className={`${device === "mobile" ? "w-[28px] h-[28px]" : "w-5 h-5"
              }`}
          />
        );
      case "casino":
        return (
          <IconCasino
            className={`${device === "mobile" ? "w-[28px] h-[28px]" : "w-5 h-5"
              }`}
          />
        );
      case "sports":
        return (
          <IconSports
            className={`${device === "mobile" ? "w-[28px] h-[28px]" : "w-5 h-5"
              }`}
          />
        );
      case "arcade":
        return (
          <IconArcade
            className={`${device === "mobile" ? "w-[28px] h-[28px]" : "w-5 h-5"
              }`}
          />
        );
      case "poker":
        return (
          <IconPoker
            className={`${device === "mobile" ? "w-[28px] h-[28px]" : "w-5 h-5"
              }`}
          />
        );
      case "togel":
        return (
          <IconTogel
            className={`${device === "mobile" ? "w-[28px] h-[28px]" : "w-5 h-5"
              }`}
          />
        );
      case "member":
        return (
          <IconMember
            className={`${device === "mobile" ? "w-[28px] h-[28px]" : "w-5 h-5"
              }`}
          />
        );
      case "event":
        return (
          <IconEvent
            className={`${device === "mobile" ? "w-[28px] h-[28px]" : "w-5 h-5"
              }`}
          />
        );
      case "deposit":
        return (
          <IconDeposit
            className={`${device === "mobile" ? "w-[28px] h-[28px]" : "w-5 h-5"
              }`}
          />
        );

      default:
        break;
    }
  };

  const typeAvailable = listType.filter((item) => listGroupType.includes(item));

  const renderContentCategory = (categoryId: string) => {
    return (
      <div className="grid-cols-1 sm:grid-cols-3 grid gap-4">
        {groupedPromotions?.[categoryId] ? (
          groupedPromotions?.[categoryId].map((item) => (
            <Item
              key={item._id}
              banner={item?.banner}
              name={item?.name}
              onSelect={() => {
                router.push(
                  {
                    pathname: `/promo`,
                    query: {
                      id: item._id,
                      category,
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

  const [btnAll, setBtnAll] = useState(false);

  useMemo(() => {
    const check = typeAvailable.filter((item) => item == category);
    const handleCheck = check ? check[0] : "all";

    if (handleCheck === "all") setBtnAll(true);
    else if (handleCheck !== "all") setBtnAll(false);
  }, [category]);

  const renderContent = useMemo(() => {
    const check = typeAvailable.filter((item) => item == category);
    const handleCheck = check ? check[0] : "all";

    switch (handleCheck) {
      case "event":
        return renderContentCategory("event");
      case "member":
        return renderContentCategory("member");
      case "slot":
        return renderContentCategory("slot");
      case "casino":
        return renderContentCategory("casino");
      case "sports":
        return renderContentCategory("sports");
      case "arcade":
        return renderContentCategory("arcade");
      case "poker":
        return renderContentCategory("poker");
      case "togel":
        return renderContentCategory("togel");
      case "deposit":
        return renderContentCategory("deposit");
      default:
        return Object.keys(groupedPromotions).map((key) => (
          <Carousel
            key={key}
            title={key}
            data={groupedPromotions[key]}
            showTotal={true}
            showRTP={false}
            onSeeAll={(id: string) => {
              router.push(
                {
                  pathname: `/promo`,
                  query: {
                    category: id,
                  },
                },
                undefined,
                { shallow: true }
              );
            }}
            onSelect={(item: any) => {
              router.push(
                {
                  pathname: `/promo`,
                  query: {
                    id: item._id,
                    category,
                  },
                },
                undefined,
                { shallow: true }
              );
            }}
          />
        ));
    }
  }, [groupedPromotions, category]);

  const handleClickCategory = (category: string) => (e: any) => {
    e.preventDefault();
    router.push(
      {
        pathname: `/promo`,
        query: {
          category: category,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <div className="container mx-auto">
      <TitlePage
        page="promo"
        title={t("common:text-promo")}
        subtitle={t("common:text-subtitle-promo")}
      />
      <div className="md:mt-10 flex lg:flex-row flex-col lg:space-x-10">
        {/* Desktop */}
        <div className={`bg_content_container hidden lg:flex lg:flex-col lg:p-[25px] p-2 lg:space-y-[10px] space-x-4 lg:space-x-0 md:w-[300px] lg:rounded-[10px] lg:overflow-x-hidden overflow-x-auto lg:relative absolute left-0 right-0 scrollbar-hide h-min`}>
          <button
            onClick={handleClickCategory("all")}
            className={`${!category || category === "all" || btnAll
              ? "bg_tab_active"
              : "bg_tab"
              } tabDesktop`}
          >
            <IconSemua className="w-5 h-5" />
            <label className="capitalize">{t("common:text-all")}</label>
          </button>
          {typeAvailable &&
            typeAvailable.map((type) => (
              <button
                key={type}
                onClick={handleClickCategory(type)}
                className={`${category === type
                  ? "bg_tab_active"
                  : "bg_tab"
                  } tabDesktop`}
              >
                {typeIcon(type, "desktop")}
                <label className="capitalize">{type}</label>
              </button>
            ))}
        </div>
        {/* Mobile */}
        <div className="flex flex-row lg:hidden px-mobile px-desktop mt-[19px] py-[6px] space-x-4 overflow-x-auto left-0 right-0 scrollbar-hide h-min">
          <button
            onClick={handleClickCategory("all")}
            className={`${!category || category === "all" ? "bg_tab_active" : "bg_tab_mobile"
              } tabMobile`}
          >
            <div className="tabItemsTop">
              <IconSemua className="w-[28px] h-[28px]" />
            </div>
            <div className="tabItemsBottom capitalize">
              <span className="capitalize">{t("common:text-all")}</span>
            </div>
          </button>
          {typeAvailable &&
            typeAvailable.map((type) => (
              <button
                key={type}
                onClick={handleClickCategory(type)}
                className={`${category === type ? "bg_tab_active" : "bg_tab_mobile"
                  } tabMobile`}
              >
                <div className="tabItemsTop">{typeIcon(type, "mobile")}</div>
                <div className="tabItemsBottom capitalize">
                  <span className="capitalize">{type}</span>
                </div>
              </button>
            ))}
        </div>
        {id && dataDetail ? (
          <div className={`bg_content_container lg:w-[70%] w-full flex flex-col items-start lg:mt-0 mt-5 md:rounded-[10px] p-4 lg:py-[] lg:p-10 break-all`}>
            <div
              onClick={() => router.back()}
              className="flex flex-row items-center gap-[11px] capitalize mb-3  active:translate-y-1 transition ease-in-out duration-200 cursor-pointer"
            >
              <button
                className="w-[30px] h-[30px] rounded-full bg-white/10 flex items-center justify-center"
              >
                <IconButtonPrev
                  className="text-white/50 w-5 h-5"
                />
              </button>
              <span className="text-white text-sm font-normal">{t("common:text-back")}</span>
            </div>
            <h3 className="text-white font-bold text-2xl mb-4 break-normal">
              {dataDetail?.name}
            </h3>
            <Image
              alt={dataDetail?.name}
              src={dataDetail?.banner}
              loading="lazy"
              width={356}
              height={200}
              layout="intrinsic"
              objectFit="contain"
              objectPosition="left"
            />
            <div className="text-white mt-4">
              <div
                className="normal-case break-normal"
                dangerouslySetInnerHTML={{ __html: dataDetail.value }}
              />
            </div>
          </div>
        ) : (
          <div className={`bg_content_container w-full lg:w-[calc(1024px-372px)] xl:w-[calc(1280px-372px)] 2xl:w-[calc(1440px-372px)] px-mobile px-desktop lg:px-0 flex flex-col lg:mt-0 mt-[30px] p-4 md:pt-0 md:bg-transparent`}>
            {isLoading && groupedPromotions ? (
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

export default Promo;

Promo.Layout = MainLayout;

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
