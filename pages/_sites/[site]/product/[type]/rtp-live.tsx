/* eslint-disable @next/next/no-img-element */
import MainLayout from "@components/layout/Main";
import ProductTitle from "@components/product/ProductTitleRtp";
import Button from "@components/ui/button";
import CardItemGames from "@components/ui/card-item-games-rtp";
import { useUI } from "@contexts/ui-context";
import { useGameTypeOptionQuery } from "@framework/game/get-all-games-type";
import { useRTPGamesQuery } from "@framework/game/get-game-rtp";
import { DefaultPageProps, Game } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http-server";
import {
  getAllProductPaths,
  getProvidersByType,
  isPlural,
  saveSelectedGame,
} from "@utils/functionutil";
import isEmpty from "lodash/isEmpty";
import { GetStaticPaths, GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { PRODUCT_TYPES } from "@lib/constant";
import { theme_config } from "@themes/config";
import IconArcade from "public/icons/header/arcades.svg";
import IconCasino from "public/icons/header/casino.svg";
import IconPoker from "public/icons/header/poker.svg";
import IconProvider from "public/icons/header/provider.svg";
import IconRecentlyPlay from "public/icons/header/recentlyplay.svg";
import IconRecommend from "public/icons/header/recommend.svg";
import IconSlot from "public/icons/header/slot.svg";
import IconSports from "public/icons/header/sports.svg";
import IconTogel from "public/icons/header/togel.svg";
import IconGames from "public/icons/navbar/games-stick.svg";
import { ParsedUrlQuery } from "querystring";
import { AiFillCloseCircle } from "react-icons/ai";

const IconTypeGame = (name: string) => {
  switch (name) {
    case "recently played":
      return <IconRecentlyPlay className="w-[20px] h-[20px] text-white/80" />;
    case "provider":
      return <IconProvider className="w-[20px] h-[20px] text-white/80" />;
    case "recommend":
      return <IconRecommend className="w-[20px] h-[20px] text-white/80" />;
    case "slot":
      return <IconSlot className="w-[20px] h-[20px] text-white/80" />;
    case "casino":
      return <IconCasino className="w-[20px] h-[20px] text-white/80" />;
    case "sports":
      return <IconSports className="w-[20px] h-[20px] text-white/80" />;
    case "arcade":
      return <IconArcade className="w-[20px] h-[20px] text-white/80" />;
    case "arcades":
      return <IconArcade className="w-[20px] h-[20px] text-white/80" />;
    case "poker":
      return <IconPoker className="w-[20px] h-[20px] text-white/80" />;
    case "togel":
      return <IconTogel className="w-[20px] h-[20px] text-white/80" />;
    case "games":
      return <IconGames className="w-[20px] h-[20px] text-white/80" />;
    default:
      break;
  }
};

const Product = ({ config }: DefaultPageProps) => {
  const { t } = useTranslation();
  const { isAuthorized, template, setLocalFilterQuery, localFilterQuery } =
    useUI();
  const router = useRouter();
  const { query } = router;
  const pageType = query.type as string;
  const handleConfig = theme_config(template);

  const selectedProviders =
    typeof query.providers === "string" ? [query.providers] : query.providers;

  const gameQuery: ParsedUrlQuery = useMemo(() => {
    if (isEmpty(localFilterQuery)) {
      return {
        order: "desc",
        limit: 24,
        provider: selectedProviders ?? [],
        // type: query.type,
      };
    } else {
      return { ...localFilterQuery, order: "desc" };
    }
  }, [localFilterQuery, query]);

  const {
    isFetching: isLoading,
    isFetchingNextPage: loadingMore,
    fetchNextPage,
    hasNextPage,
    data,
    error,
  } = useRTPGamesQuery(gameQuery);

  const { data: dataGameType, isLoading: isLoading_game_type } =
    useGameTypeOptionQuery();
  const gameCountByType = dataGameType?.gametype?.data.filter(
    (item: any) => item?.type == query.type
  );

  const getProviderLogos = () => {
    const providers = gameCountByType?.[0]?.providers || [];
    let listProviders: string[] = [];
    providers.forEach((element: any) => {
      listProviders.push(element.provider);
    });
    const uniqueProviders = [...listProviders]; //Before: [...new Set(listProviders)]
    return uniqueProviders;
  };

  const providerData = useMemo(() => {
    if (!isEmpty(localFilterQuery?.provider) && localFilterQuery?.provider) {
      const providers = getProvidersByType(dataGameType?.gametype?.data, true);
      return providers.map((provider) => ({
        provider: provider.provider,
        name: provider.name,
        image_url: `/images/provider/icon/${provider.provider}.png`,
      }));
    }
    return [];
  }, [dataGameType, localFilterQuery]);

  const handleSelectGame = (game: Game) => {
    const { _id, type, provider } = game;
    saveSelectedGame(game);
    router.push(
      {
        pathname: "/game/" + _id,
        query: {
          type: type as string,
          provider: provider as string,
        },
      },
      undefined,
      { shallow: false }
    );
  };

  return (
    <div className="container mx-auto px-mobile px-desktop container-rtp-live">
      <div className="flex flex-col">
        <div className="order-2 md:order-3 pb-0">
          <ProductTitle
            pageType={"live rtp"}
            plural={isPlural("live rtp")}
            localSearch={true}
          />
        </div>
      </div>

      {/* Provider */}
      {isEmpty(localFilterQuery?.provider) &&
        PRODUCT_TYPES.find((item) => item === pageType) && (
          <section className="mt-[30px]">
            <span className="carousel-title">
              {IconTypeGame("provider")}
              {"provider"}
              {isPlural(pageType) ? "s" : ""}
            </span>
            <div className="">
              <div className="md:flex xl:flex-row">
                <div className="md:flex-1">
                  <div className="hidden md:flex md:flex-wrap md:gap-[10px] relative pt-4 max-h-[276px] overflow-y-auto scrollbar">
                    {getProviderLogos()?.map((provider: string, i: number) => {
                      return (
                        <div
                          key={i}
                          className={`${
                            provider === query.providers
                              ? `card_provider_active`
                              : "border-transparent"
                          } card_provider border-2 hover:transition-all rounded-[5px] md:w-[151px] md:h-[60px] px-5 py-[6px] flex items-center justify-center cursor-pointer transition duration-200 relative hover:z-10 hover:-translate-y-[5px] will-change-auto`}
                          onClick={() => {
                            setLocalFilterQuery({});
                            const param: ParsedUrlQuery = {
                              games: query.type,
                            };
                            if (provider !== query.providers) {
                              param.providers = provider as string;
                            }
                            router.push(
                              {
                                pathname:
                                  "/product/" + query.type + "/rtp-live",
                                query: param,
                              },
                              "",
                              { shallow: false, scroll: false }
                            );
                          }}
                        >
                          {provider.toLowerCase() === "joker" && (
                            <div className="absolute z-[1] right-0 -top-[15px]">
                              <Image
                                alt=""
                                src="/images/provider/joker/hot.png"
                                width={40}
                                height={40}
                                quality={100}
                                objectFit="contain"
                              />
                            </div>
                          )}
                          <Image
                            src={`/images/provider/logo/${provider.toLowerCase()}-4x.png`}
                            alt={provider}
                            width={100}
                            height={48}
                            quality={100}
                            objectFit="contain"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="space-x-2 w-full flex md:hidden overflow-x-scroll scrollbar py-[10px]">
              {getProviderLogos()?.map((provider: string, i: number) => {
                return (
                  <div
                    key={i}
                    className={`${
                      provider === query.providers
                        ? `card_provider_active`
                        : "border-transparent"
                    } card_provider border-2 hover:transition-all rounded-[5px] w-[151px] h-[60px] flex items-center shrink-0 justify-center relative`}
                    onClick={() => {
                      setLocalFilterQuery({});
                      const param: ParsedUrlQuery = {
                        games: query.type,
                      };
                      if (provider !== query.providers) {
                        param.providers = provider as string;
                      }
                      router.push(
                        {
                          pathname: "/product/" + query.type + "/rtp-live",
                          query: param,
                        },
                        "",
                        { shallow: false, scroll: false }
                      );
                    }}
                  >
                    {provider.toLowerCase() === "joker" && (
                      <div className="absolute z-[1] -right-[10px] -top-[15px]">
                        <Image
                          alt=""
                          src="/images/provider/joker/hot.png"
                          width={40}
                          height={40}
                          quality={100}
                          objectFit="contain"
                        />
                      </div>
                    )}
                    <Image
                      src={`/images/provider/logo/${provider.toLowerCase()}-4x.png`}
                      alt={provider}
                      width={100}
                      height={48}
                      quality={100}
                      objectFit="contain"
                    />
                  </div>
                );
              })}
            </div>
          </section>
        )}
      <section className="pb-4">
        <div className="flex items-center">
          <span className="carousel-title">
            {IconTypeGame("games")}
            {t("common:text-games")}
          </span>
          <div className={`block carousel-subTitle px-4`}>
            <span className="slider_label_total">
              {data?.pages?.length
                ? data?.pages?.[0]?.paginatorInfo?.totalItems
                : 0}
            </span>
          </div>
        </div>

        {/* local filter */}
        <div className="flex mt-[7px] md:mt-[10px] flex-wrap flex-1">
          {localFilterQuery?.provider?.length > 0 &&
            localFilterQuery?.provider?.map((provider: string, i: number) => {
              const data = providerData.find((p) => p.provider === provider);
              return (
                <div
                  key={i}
                  className="flex space-x-2 items-center px-[13px] py-[10px] rounded bg-[#D3F2FF]/20 mt-2 mr-2 sm:ml-0"
                >
                  <div className="mr-2 h-4">
                    <Image
                      src={data?.image_url || ""}
                      className="h-4 object-contain"
                      alt={data?.name}
                      width={16}
                      height={16}
                    />
                  </div>
                  <span className="text-white text-sm">{data?.name}</span>
                  <AiFillCloseCircle
                    onClick={() => {
                      const providers = localFilterQuery.provider.filter(
                        (i: string) => i !== provider
                      );
                      setLocalFilterQuery({ provider: providers });
                    }}
                    className="text-[#D3F2FF]/50 cursor-pointer"
                  />
                </div>
              );
            })}
          {localFilterQuery?.provider &&
          localFilterQuery?.provider?.length > 0 ? (
            <button
              onClick={() => setLocalFilterQuery({})}
              className="space-x-2 items-center px-4 py-2 rounded bg-transparent mt-2 flex"
            >
              <span className="text-white text-sm">Hapus Filter</span>
              <AiFillCloseCircle className="text-[#D3F2FF]/50" />
            </button>
          ) : null}
        </div>
        {/* local filter */}

        <div>
          <div className="grid grid-cols-2 gap-[10px] md:gap-[18px] md:grid-cols-4 lg:grid-col-4 xl:grid-cols-6 mt-5">
            {isLoading && !data?.pages?.length ? (
              <div className="text-whiteDefault-50 text-center w-full flex items-center">
                Loading...
              </div>
            ) : (
              data?.pages?.map((page) => {
                return page?.data?.map((item: Game, i) => {
                  return (
                    <div
                      key={i}
                      onClick={() => handleSelectGame(item)}
                      className="cursor-pointer relative hover:-translate-y-[10px] transition duration-200 will-change-transform"
                    >
                      <CardItemGames
                        name={
                          item?.game_name
                            ? (item?.game_name as string)
                            : "unknown"
                        }
                        image={item?.image}
                        provider={
                          item?.provider_name
                            ? (item?.provider_name as string)
                            : "unknown"
                        }
                        showRTP={pageType === "slot" ? true : false}
                        valueRTP={pageType === "slot" ? item?.rtp : 0}
                        type={handleConfig?.card_item_game_type}
                      />
                    </div>
                  );
                });
              })
            )}
          </div>
          {hasNextPage && (
            <div className="w-full flex justify-center">
              <Button
                type="button"
                variant="loadmore"
                disabled={loadingMore}
                onClick={() => fetchNextPage()}
                className="w-fit h-11 mx-auto mt-10 px-5 md:mt-[60px]"
              >
                {loadingMore ? "Loading..." : t("common:text-load-more")}
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Product;

Product.Layout = MainLayout;

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await http.get(API_ENDPOINTS.DOMAINS);
  const domains = response.data.data;
  return {
    paths: getAllProductPaths(domains),
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
