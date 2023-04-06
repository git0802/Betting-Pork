/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import MainLayout from "@components/layout/Main";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CardItemGames from "@components/ui/card-item-games-rtp";
import { useGamesQuery } from "@framework/game/get-all-games";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { CookieKeys } from "@lib/constant";
import { CookieStorage } from "@lib/cookie";
import { DefaultPageProps, Game } from "@framework/types";
import { useGameCountByProvider } from "@framework/game/get-all-games-provider";
import upperFirst from "lodash/upperFirst";
import { useUI } from "@contexts/ui-context";
import { GoTriangleDown } from "react-icons/go";
import Button from "@components/ui/button";
import Image from "next/image";
import http from "@framework/utils/http-server";
import { getProvidersByType } from "@utils/functionutil";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { theme_config } from "@themes/config";
import { useGameTypeOptionQuery } from "@framework/game/get-all-games-type";
import humanizeString from "@utils/humanize-string";

const GameCategory: React.FC<{
  className: string;
  data: Array<string>;
  totalGame?: number;
  provider?: string;
}> = ({ className, data, totalGame, provider }) => {
  return (
    <div className={className}>
      <span className="text-sm font-medium text-whiteDefault-50 mt-6 hidden">
        Kategori Game
      </span>
      <div className="text-sm font-medium text-whiteDefault-50 md:mt-6 md:hidden text-center">
        <div className="text-white font-bold text-xl mb-1">
          {provider?.toUpperCase()}
        </div>
        <div className="mb-5 text-sm font-normal">
          {totalGame} Games Available
        </div>
      </div>
      <div className="flex flex-row space-x-[10px] mt-1 justify-center flex-wrap">
        {data.map((type) => (
          <div
            key={type}
            className={`bg_content_container text-sm font-normal text-whiteDefault-50 rounded-[5px] px-[15px] py-[10px] mb-3`}
          >
            {upperFirst(type)}
          </div>
        ))}
      </div>
    </div>
  );
};

const ProviderProfile = ({ config }: DefaultPageProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { openModal, setModalView, setModalData } = useUI();
  const { query } = router;
  const provider = query?.provider as string;
  const {
    isFetching: isLoading,
    isFetchingNextPage: loadingMore,
    fetchNextPage,
    hasNextPage,
    data,
    error,
  } = useGamesQuery({ limit: 24, ...query });

  const { template } = useUI();
  const handleConfig = theme_config(template);

  const { data: providerCount } = useGameCountByProvider({
    provider: provider,
  });

  const { data: dataGameType } = useGameTypeOptionQuery();

  const handleSelectGame = (game: Game) => {
    const { _id, type, provider, image, game_name, provider_name } = game;
    const gameData = {
      _id,
      type,
      provider,
      image,
      game_name,
      provider_name,
    };
    CookieStorage.set(CookieKeys.SelectedGame, gameData);
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

  const handleProviderSelectorShow = () => {
    setModalView("PROVIDER_PROFILE_SELECTOR");
    return openModal();
  };

  useEffect(() => {
    const hdlp: any = [];
    if (dataGameType?.gametype?.data) {
      dataGameType?.gametype?.data.forEach((element: any) => {
        element?.providers.forEach((subElement: any) => {
          hdlp.push(subElement.provider.toLowerCase());
        });
      });
    }

    const uniqueProviders = [...new Set(hdlp)];

    const handleUniqProviders: any = [];
    uniqueProviders.forEach((item) => {
      const image = `/images/provider/icon/${item}.png`;
      handleUniqProviders.push({
        key: item,
        title: humanizeString(item).toLowerCase(),
        image_url: image,
      });
    });

    setModalData({
      data: { providers: handleUniqProviders, selected: provider },
    });
  }, [dataGameType]);

  return (
    <div className="container mx-auto md:px-mobile md:px-desktop mt-[49px]">
      <h1 className="text-[32px] font-light mb-5 md:mb-9 text-whiteDefault-100 text-center md:text-left">
        PENYEDIA
      </h1>

      {/* mobile */}
      <div className="md:hidden px-mobile px-desktop">
        <button
          onClick={handleProviderSelectorShow}
          className={`bg_content_container w-full h-[60px] p-5 rounded-[10px] flex justify-between items-center py-2`}
        >
          <div className="flex gap-3 items-center">
            <Image
              alt=""
              src={`/images/provider/icon/${provider}.png`}
              width={40}
              height={20}
              quality={100}
              objectFit="contain"
            />
            <div className="text-base font-normal text-white">
              {provider?.toUpperCase()}
            </div>
            {provider && provider.toLowerCase() === "joker" && (
              <div className="">
                <Image
                  alt=""
                  src="/images/provider/joker/hot.png"
                  width={25}
                  height={25}
                  quality={100}
                  objectFit="contain"
                />
              </div>
            )}
          </div>
          <GoTriangleDown className="w-4 h-4" />
        </button>
      </div>

      {/* desktop */}
      <div className="flex flex-row">
        <div
          className={`bg_content_container hidden md:flex px-12 py-4 md:px-3 md:py-3 items-center justify-center rounded-[10px] w-[250px] h-[116px] relative`}
        >
          {provider && provider.toLowerCase() === "joker" && (
            <div className="absolute z-10 -right-[15px] -top-[25px]">
              <Image
                alt=""
                src="/images/provider/joker/hot.png"
                width={60}
                height={60}
                quality={100}
                objectFit="contain"
              />
            </div>
          )}
          <Image
            alt=""
            src={`/images/provider/logo/${provider}-4x.png`}
            width={220}
            height={80}
            quality={100}
            objectFit="contain"
          />
        </div>
        <div className="flex ml-[30px] items-center md:flex-col md:items-start">
          <div>
            <h3 className="text-[22px] leading-[28px] text-white font-bold hidden md:block mb-[6px]">
              {provider?.toUpperCase()}
            </h3>
            <div className="hidden md:block text-sm font-normal leading-[18px]">
              <span className="text-whiteDefault-60">Total Games : </span>
              <span className="text-whiteDefault-100">
                {providerCount?.data?.count || 0}
              </span>
            </div>
          </div>
          <GameCategory
            data={providerCount?.data?.type || []}
            className="hidden md:block mt-5"
          />
        </div>
      </div>

      <div
        className={`bg_content_container_mobile mt-[30px] md:mt-0 md:bg-transparent px-mobile px-desktop md:px-0 py-[23px] md:py-0 `}
      >
        <GameCategory
          data={providerCount?.data?.type || []}
          totalGame={providerCount?.data?.count || 0}
          provider={provider}
          className="md:hidden flex justify-center flex-col"
        />
        <div className="mt-[18px] md:mt-0">
          <div>
            <div className="grid grid-cols-2 gap-[10px] md:gap-[18px] md:grid-cols-4 lg:grid-col-4 xl:grid-cols-6 md:mt-9">
              {isLoading && !data?.pages?.length ? (
                <div className="text-whiteDefault-50 text-center w-full flex items-center">
                  Loading...
                </div>
              ) : (
                data?.pages?.map((page) => {
                  return page?.data?.map((item: Game) => {
                    return (
                      <div
                        key={item.id}
                        className="cursor-pointer animate-default"
                        onClick={() => handleSelectGame(item)}
                      >
                        <CardItemGames
                          name={item?.game_name ? item?.game_name : "unknown"}
                          image={item?.image}
                          provider={
                            item?.provider_name
                              ? item?.provider_name
                              : "unknown"
                          }
                          showRTP={false}
                          valueRTP={item?.rtp ? item?.rtp : 0}
                          type={handleConfig?.card_item_game_type}
                        />
                      </div>
                    );
                  });
                })
              )}
            </div>
            {hasNextPage && (
              <div className="flex justify-center">
                <Button
                  type="button"
                  variant="loadmore"
                  disabled={loadingMore}
                  onClick={() => fetchNextPage()}
                  className="w-fit mx-auto mt-10 px-5 py-3 md:mt-[60px]"
                >
                  {loadingMore ? "Loading..." : t("common:text-load-more")}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderProfile;

ProviderProfile.Layout = MainLayout;

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await http.get(API_ENDPOINTS.DOMAINS);
  const domains = response.data.data;

  // populate paths
  const paths = [];
  for (let i = 0; i < domains.length; i++) {
    // get config
    let config = null;
    const site = domains[i];
    try {
      const {
        data: { data },
      } = await http.get(API_ENDPOINTS.DOMAIN + site);
      config = data;
    } catch (error) {
      continue;
    }

    // get gameTypes
    const {
      data: { data: gameTypes },
    } = await http.get(API_ENDPOINTS.GAME_TYPES, {
      headers: {
        "x-api-key": config.api_key,
      },
    });

    // generate paths
    const providers = getProvidersByType(gameTypes);
    for (let j = 0; j < providers.length; j++) {
      const provider = providers[j];
      paths.push({
        params: {
          provider,
          site,
        },
      });
    }
  }

  return {
    paths,
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
