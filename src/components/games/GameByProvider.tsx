/* eslint-disable @next/next/no-img-element */
import Button from "@components/ui/button";
import CardItemGames from "@components/ui/card-item-games-rtp";
import { useUI } from "@contexts/ui-context";
import { useGamesQuery } from "@framework/game/get-all-games";
import {
  useGameTypeOptionQuery,
  useGameTypeQuery,
} from "@framework/game/get-all-games-type";
import { Game } from "@framework/types";
import { theme_config } from "@themes/config";
import { getProvidersByType } from "@utils/functionutil";
import isEmpty from "lodash/isEmpty";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import IconProvider from "public/icons/header/provider.svg";
import IconRecommend from "public/icons/header/recommend.svg";
import IconGames from "public/icons/navbar/games-stick.svg";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useMemo, useRef, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import IconButtonNext from "/public/icons/arrowNext.svg";
import IconButtonPrev from "/public/icons/arrowPrev.svg";

const IconTypeGame = (name: string) => {
  switch (name) {
    case "provider":
      return <IconProvider className="w-[20px] h-[20px] text-white/80" />;
    case "recommend":
      return <IconRecommend className="w-[20px] h-[20px] text-white/80" />;
    case "games":
      return <IconGames className="w-[20px] h-[20px] text-white/80" />;
    default:
      break;
  }
};

export default function GameByProvider({
  handleSelectGame,
  pageType,
  queryProvider,
}: {
  handleSelectGame: (game: Game) => void;
  pageType: string;
  queryProvider?: string | string[];
}) {
  const { t } = useTranslation();
  const router = useRouter();
  const { query } = router;
  const { template, setLocalFilterQuery, localFilterQuery } = useUI();
  const [selectedProvider, setSelectedProvider] = useState(queryProvider);

  const gameQuery: ParsedUrlQuery = useMemo(() => {
    if (isEmpty(localFilterQuery)) {
      return {
        limit: 24,
        ...{ ...query, provider: selectedProvider ?? queryProvider },
      };
    }
    return localFilterQuery;
  }, [localFilterQuery, query]);

  const {
    isFetching: isLoading,
    isFetchingNextPage: loadingMore,
    fetchNextPage,
    hasNextPage,
    data,
    error,
  } = useGamesQuery(gameQuery);

  const { data: dataGameType, isLoading: isLoading_game_type } =
    useGameTypeOptionQuery();
  const handleConfig = theme_config(template);

  const { isLoading: gameCountLoading, data: gameCountByType } =
    useGameTypeQuery({
      type: pageType,
    });

  const [btnPrevNext, setBtnPrevNext] = useState({
    prev: false,
    next: true,
  });

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

  const swiperRef = useRef<SwiperCore>();
  const previous = () => {
    swiperRef?.current?.slidePrev();
    setBtnPrevNext({
      prev: swiperRef?.current?.isBeginning ? false : true,
      next: swiperRef?.current?.isEnd ? false : true,
    });
  };
  const next = () => {
    swiperRef?.current?.slideNext();
    setBtnPrevNext({
      prev: swiperRef?.current?.isBeginning ? false : true,
      next: swiperRef?.current?.isEnd ? false : true,
    });
  };

  const handleChangeProvider = (provider: string) => {
    setSelectedProvider(provider);
    router.push(
      {
        pathname: "/game/" + query.game,
        query: {
          type: query.type,
          provider: provider,
        },
      },
      undefined,
      { shallow: false, scroll: false }
    );
  };

  useEffect(() => {
    if (queryProvider) {
      setSelectedProvider(queryProvider);
    }
  }, [queryProvider]);

  return (
    <>
      {isEmpty(localFilterQuery?.provider) && (
        <section className="flex flex-col">
          <div className="flex justify-between">
            <div className="carousel-title">
              {IconTypeGame("provider")}
              <label>providers</label>
            </div>
            <div className="flex flex-row float-right gap-prev-next">
              <button
                onClick={previous}
                className={`${
                  !btnPrevNext.prev
                    ? "btn-prev-carousel-disable bg_btn_prev_carousel_disable"
                    : "btn-prevNext-carousel bg_btn_prev_carousel"
                } btn_slider_prev`}
              >
                <IconButtonPrev className={`w-5 h-5`} />
              </button>
              <button
                onClick={next}
                className={`${
                  !btnPrevNext.next
                    ? "btn-prev-carousel-disable bg_btn_prev_carousel_disable"
                    : "btn-prevNext-carousel bg_btn_prev_carousel"
                } btn_slider_next`}
              >
                <IconButtonNext className={`w-5 h-5 `} />
              </button>
            </div>
          </div>
          {gameCountLoading && (
            <div className="text-whiteDefault-50 text-center w-full flex items-center mt-6">
              Loading...
            </div>
          )}
          <div className="mt-[14px]">
            <Swiper
              spaceBetween={10}
              slidesPerView={"auto"}
              lazy={true}
              className="mySwiper"
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
            >
              {gameCountByType?.data &&
                gameCountByType?.data?.map((item: any, i: number) => {
                  return (
                    <SwiperSlide
                      key={i}
                      className="cursor-pointer w-[151px] h-[60px] hover:lg:-translate-y-[10px] ease-in-out transition duration-[200] hover:drop-shadow-md my-[10px]"
                      onClick={() => {
                        setLocalFilterQuery({});
                        if (item?.provider === queryProvider) {
                          return handleChangeProvider("");
                        }
                        handleChangeProvider(item?.provider);
                      }}
                    >
                      <div
                        className={`${
                          isEmpty(localFilterQuery) &&
                          selectedProvider === item?.provider
                            ? "card_provider_active"
                            : "border-transparent"
                        } card_provider border-2 flex justify-center h-full items-center rounded-[5px]`}
                      >
                        <Image
                          src={`/images/provider/logo/${item?.provider}-4x.png`}
                          alt={item?.name}
                          width={100}
                          height={45}
                          objectFit="contain"
                        />
                      </div>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </div>
        </section>
      )}

      <section className="">
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
                      src={data?.image_url}
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
          <div className="grid grid-cols-2 gap-[18px] md:grid-cols-4 lg:grid-col-4 xl:grid-cols-6 mt-5">
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
                      className="cursor-pointer animate-default"
                      onClick={() => handleSelectGame(item)}
                    >
                      <CardItemGames
                        key={i}
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
                width="w-fit"
                disabled={loadingMore}
                onClick={() => fetchNextPage()}
                className="mx-auto mt-10 px-5 py-3 md:mt-[60px]"
              >
                {loadingMore ? "Loading..." : t("common:text-load-more")}
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
