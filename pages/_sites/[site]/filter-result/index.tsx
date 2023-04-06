import React, { useMemo } from "react";
import MainLayout from "@components/layout/Main";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Image from "next/image";
import { AiFillCloseCircle } from "react-icons/ai";
import { useGameFilterQuery } from "@framework/game/get-game";
import humanizeString from "@utils/humanize-string";
import Skeleton from "@components/ui/skeleton";
import http from "@framework/utils/http-server";
import { GetStaticPaths, GetStaticProps } from "next";
import { DefaultPageProps, Game } from "@framework/types";
import { getProvidersByType, saveSelectedGame } from "@utils/functionutil";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useGameTypeOptionQuery } from "@framework/game/get-all-games-type";
import { CarouselSwiperBanner } from "@components/carousel/swiper";
import { useBannerQuery } from "@framework/banner/get-banner";
import CardItemGames from "@components/ui/card-item-games-rtp";
import { theme_config } from "@themes/config";
import { useUI } from "@contexts/ui-context";

const FilterResult = ({ config }: DefaultPageProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { template } = useUI();
  const handleConfig = theme_config(template);
  const {
    query: { games: gameSelected, providers: providerSelected, page },
  } = router;

  const {
    isLoading,
    isFetchingNextPage: loadingMore,
    fetchNextPage,
    hasNextPage,
    data,
    error,
  } = useGameFilterQuery({
    limit: 24,
    page: 1,
    type: gameSelected,
    provider: providerSelected,
  });

  const { data: dataBanner, isLoading: isLoadingBanner } = useBannerQuery(
    {
      category: Array.isArray(gameSelected)
        ? gameSelected
        : "banner-" + gameSelected,
    },
    Boolean(gameSelected)
  );

  const { data: dataGameType } = useGameTypeOptionQuery();

  const providerData = dataGameType?.gametype?.data
    ? getProvidersByType(dataGameType?.gametype?.data, true)
    : [];

  const game: any[] = useMemo(() => {
    if (gameSelected && typeof gameSelected === "string") {
      return [{ name: gameSelected }];
    } else if (gameSelected && gameSelected.length > 0) {
      return gameSelected.map((item: string) => ({
        name: item,
      }));
    }
    return [];
  }, [gameSelected]);

  const providers: any[] = useMemo(() => {
    if (providerSelected && typeof providerSelected === "string") {
      return [
        {
          key: providerSelected,
          title: humanizeString(providerSelected),
          image_url: `/images/provider/icon/${providerSelected}.png`,
        },
      ];
    }
    if (providerSelected && providerSelected.length > 0) {
      return providerSelected.map((provider: string) => ({
        key: provider,
        title: humanizeString(provider),
        image_url: `/images/provider/icon/${provider}.png`,
      }));
    }
    return [];
  }, [providerSelected]);

  const handleDeleteType = (type: string) => {
    router.push(
      {
        pathname: `/filter-result`,
        query: {
          providers: providerSelected,
          games: game
            .filter((item) => item.name !== type.toLowerCase())
            .map((item) => item.name),
        },
      },
      "",
      { shallow: true }
    );
  };

  const handleDeleteProvider = (type: string) => {
    router.push(
      {
        pathname: `/filter-result`,
        query: {
          providers: providers
            .filter((item) => item.key !== type)
            .map((item) => item.key),
          games: gameSelected,
        },
      },
      "",
      { shallow: true, scroll: false }
    );
  };

  const handleDeleteFilter = () => {
    router.push(
      {
        pathname: `/filter-result`,
        query: {
          providers: "",
          games: "",
        },
      },
      "",
      { shallow: true, scroll: false }
    );
  };

  const gameResult = useMemo(() => {
    const games: any[] = [];
    if (data?.pages) {
      data.pages.forEach((page: any) => {
        page.data.forEach((item: any) => {
          games.push(item);
        });
      });
    }
    return games;
  }, [data]);

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
    <div className="container mx-auto px-mobile px-desktop justify-start">
      <CarouselSwiperBanner
        page={Array.isArray(gameSelected) ? "all" : gameSelected}
        data={dataBanner}
      />
      <div className="flex justify-between items-center mt-[30px]">
        <h5 className="text-lg font-light">{t("common:text-result-filter")}</h5>
        {game || (providers && providers.length > 0) ? (
          <button
            onClick={() => handleDeleteFilter()}
            className="flex md:hidden space-x-2 items-center rounded bg-transparent mt-2"
          >
            <span className="text-white text-sm">Hapus Filter</span>
            <AiFillCloseCircle className="text-[#D3F2FF]/50" />
          </button>
        ) : null}
      </div>
      <div className="flex mt-[7px] md:mt-[10px] flex-wrap flex-1">
        {game &&
          game.length > 0 &&
          game.map((item, index) => (
            <div
              key={index}
              className="flex space-x-2 items-center px-[13px] py-[10px] rounded bg-[#D3F2FF]/20 mt-2 mr-2 sm:ml-0"
            >
              <span className="text-white text-sm capitalize">{item.name}</span>
              <AiFillCloseCircle
                onClick={() => handleDeleteType(item.name)}
                className="text-[#D3F2FF]/50 cursor-pointer"
              />
            </div>
          ))}
        {providers &&
          providers.length > 0 &&
          providers.map((provider) => (
            <div
              key={provider.key}
              className="flex space-x-2 items-center px-[13px] py-[10px] rounded bg-[#D3F2FF]/20 mt-2 mr-2 sm:ml-0"
            >
              <div className="mr-2 h-4">
                <Image
                  src={provider.image_url}
                  className="h-4 object-contain"
                  alt={provider.title}
                  width={16}
                  height={16}
                />
              </div>
              <span className="text-white text-sm">
                {providerData?.find((i) => i.provider === provider.key)?.name ||
                  provider.title}
              </span>
              <AiFillCloseCircle
                onClick={() => handleDeleteProvider(provider.key)}
                className="text-[#D3F2FF]/50 cursor-pointer"
              />
            </div>
          ))}
        {(game && game.length > 0) || (providers && providers.length > 0) ? (
          <button
            onClick={() => handleDeleteFilter()}
            className="space-x-2 items-center px-4 py-2 rounded bg-transparent mt-2 hidden sm:flex"
          >
            <span className="text-white text-sm">Hapus Filter</span>
            <AiFillCloseCircle className="text-[#D3F2FF]/50" />
          </button>
        ) : null}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-[18px] md:grid-cols-4 lg:grid-cols-6 md:gap-4 mt-[30px] sm:mt-10 sm:mx-auto">
        {isLoading
          ? [0, 1, 2, 3, 4, 5].map((item, index) => (
              <Skeleton key={index} width="100%" height="168" />
            ))
          : gameResult.map(
              (
                item: {
                  _id: React.Key | null | undefined;
                  game_name: string;
                  image: string;
                  provider_name: string | undefined;
                },
                index: number
              ) => (
                <div
                  key={index}
                  onClick={() => handleSelectGame(item)}
                  className="cursor-pointer relative hover:-translate-y-[10px] transition duration-200 will-change-transform"
                >
                  <CardItemGames
                    name={
                      item?.game_name ? (item?.game_name as string) : "unknown"
                    }
                    image={item?.image}
                    provider={
                      item?.provider_name
                        ? (item?.provider_name as string)
                        : "unknown"
                    }
                    showRTP={false}
                    valueRTP={0}
                    type={handleConfig?.card_item_game_type}
                  />
                </div>
              )
            )}
        {gameResult.length < 1 && (
          <div className="text-whiteDefault-50">No Data</div>
        )}
      </div>
      {hasNextPage ? (
        <button
          disabled={loadingMore}
          onClick={() => fetchNextPage()}
          className="block bg-nileBlue-100 text-sm font-semibold rounded-md px-7 py-3 mx-auto mt-9"
        >
          {loadingMore ? "Loading..." : t("common:text-load-more")}
        </button>
      ) : null}
    </div>
  );
};

export default FilterResult;

FilterResult.Layout = MainLayout;

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
