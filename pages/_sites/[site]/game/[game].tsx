/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import MainLayout from "@components/layout/Main";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { CookieStorage } from "@lib/cookie";
import { CookieKeys } from "@lib/constant";
import {
  useGenerateGameUrlMutation,
  generateGameURL as getGameURL,
} from "@framework/game/generate-game-url";
import ProductTitle from "@components/product/ProductTitle";
import { isPlural, saveSelectedGame } from "@utils/functionutil";
import { DefaultPageProps, Game } from "@framework/types";
import { fetchUserProfile } from "@framework/user/get-user-profile";
import { AxiosResponse } from "axios";
import { useUI } from "@contexts/ui-context";
import GameByProvider from "@components/games/GameByProvider";
import dynamic from "next/dynamic";
import SliderRecentPlayed from "@components/games/recent-played/Slider";
import http from "@framework/utils/http-server";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { toast } from "react-toastify";

const PlayGame = dynamic(() => import("@components/games/PlayGame"), {
  ssr: false,
});

function GameDetail({ config }: DefaultPageProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const { query } = router;
  const pageType = query.type as string;
  const game = query.game as string;
  const queryProvider = query.provider;
  const [gamePlayed, setGamePlayed] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [gameUrl, setGameUrl] = useState("");
  const [showGameLoading, setShowGameLoading] = useState(false);
  const [generatedGameUrl, setGeneratedGameUrl] = useState("");
  const { openModal, setModalView, isAuthorized, displayModal } = useUI();

  const selectedGame = CookieStorage.get(CookieKeys.SelectedGame);

  const {
    mutate: generateGameURL,
    isLoading: generateGameLoading,
    reset: resetUrl,
  } = useGenerateGameUrlMutation(
    (response: AxiosResponse) => {
      setGeneratedGameUrl(game);
      setGamePlayed(true);
      setGameUrl(response.data.data.game_url);
    },
    (response: any) => {
      setGamePlayed(false);
      setShowGameLoading(false);
    }
  );

  const playGame = async (isMobile: boolean = false) => {
    setShowGameLoading(true);
    if (isMobile) {
      try {
        const response = await getGameURL({ game_id: query.game as string });
        const gameWindow = window.open(response.data.data.game_url, "_blank");
        if (!gameWindow) {
          toast.error(t("common:text-allow-pup-up-game") as string, {
            bodyStyle: {
              whiteSpace: "pre-wrap",
            },
            toastId: "allow-game-pop-up",
          });
        }
      } catch (error) {
        // @ts-ignore
        if (error?.response?.status === 401) {
          setModalView("LOGIN_VIEW");
          return openModal();
        }
      } finally {
        return setShowGameLoading(false);
      }
    }

    try {
      await fetchUserProfile();
      generateGameURL({ game_id: query.game as string });
    } catch (error) {
      // @ts-ignore
      if (error?.response?.status === 401) {
        setModalView("LOGIN_VIEW");
        setShowGameLoading(false);
        return openModal();
      }
      setShowGameLoading(false);
    }
  };

  const handleSelectGame = (game: Game) => {
    resetUrl();
    setGamePlayed(false);
    setGameUrl("");

    saveSelectedGame(game);
    const { _id, type, provider } = game;

    router.push({
      pathname: "/game/" + _id,
      query: {
        type: type as string,
        provider: provider as string,
      },
    });
  };

  useEffect(() => {
    if (generatedGameUrl !== game && generatedGameUrl !== "") {
      setGamePlayed(false);
      setGameUrl("");
    }
  }, [generatedGameUrl, game]);

  useEffect(() => {
    return () => {
      const html = document.querySelector("html");
      const body = document.querySelector("body");
      const mobileNavbar = document.querySelector(".mobile-navbar");
      html?.classList.remove("disable-scroll");
      body?.classList.remove("disable-scroll");
      mobileNavbar?.classList.remove("hidden");
    };
  }, []);

  useEffect(() => {
    if (displayModal === false) {
      setFullScreen(false);
      const html = document.querySelector("html");
      const body = document.querySelector("body");
      const mobileNavbar = document.querySelector(".mobile-navbar");
      html?.classList.remove("disable-scroll");
      body?.classList.remove("disable-scroll");
      mobileNavbar?.classList.remove("hidden");
    }
  }, [displayModal]);

  return (
    <div className="container mx-auto px-mobile px-desktop mt-10 pb-5">
      <PlayGame
        playGame={playGame}
        setFullScreen={setFullScreen}
        fullScreen={fullScreen}
        selectedGame={selectedGame}
        gamePlayed={gamePlayed}
        showGameLoading={showGameLoading}
        generateGameLoading={generateGameLoading}
        setShowGameLoading={setShowGameLoading}
        gameUrl={gameUrl}
        setGameUrl={setGameUrl}
        setGamePlayed={setGamePlayed}
        game={game}
      />
      <div className="flex flex-col">
        <div className="order-1 md:order-2">
          {isAuthorized && <SliderRecentPlayed margin={false} />}
        </div>
        <div className="order-2 md:order-1 mt-10">
          <ProductTitle
            pageType={pageType}
            plural={isPlural(pageType)}
            localSearch={true}
            showProviderFilter={true}
          />
        </div>
      </div>

      <GameByProvider
        handleSelectGame={handleSelectGame}
        queryProvider={queryProvider}
        pageType={pageType}
      />
    </div>
  );
}

export default GameDetail;

GameDetail.Layout = MainLayout;

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await http.get(API_ENDPOINTS.DOMAINS);
  const domains = response.data.data;

  const promises = [];
  for (let i = 0; i < domains.length; i++) {
    promises.push(
      new Promise(async (resolve, reject) => {
        try {
          const site = domains[i];
          const {
            data: { data },
          } = await http.get(API_ENDPOINTS.DOMAIN + site);
          const config = data;
          const getGamesPromises = [];
          getGamesPromises.push(
            http.get(API_ENDPOINTS.GAMELIST_FEATURED_GAME, {
              headers: {
                "x-api-key": config.api_key,
              },
            })
          );
          getGamesPromises.push(
            http.get(API_ENDPOINTS.GAMELIST_POPULAR_GAME, {
              headers: {
                "x-api-key": config.api_key,
              },
            })
          );
          getGamesPromises.push(
            http.get(API_ENDPOINTS.GAMELIST_NEW_GAME, {
              headers: {
                "x-api-key": config.api_key,
              },
            })
          );

          const datas = await Promise.all(getGamesPromises);
          const games = [
            ...datas[0].data.data,
            ...datas[1].data.data,
            ...datas[2].data.data,
          ];
          const paths = [];
          for (let j = 0; j < games.length; j++) {
            const { _id } = games[j];
            paths.push({
              params: {
                game: _id,
                site,
                config,
              },
            });
          }
          return resolve(paths);
        } catch (e) {
          return reject(e);
        }
      })
    );
  }

  const paths = await Promise.all(promises);
  let arr: Array<any> = [];
  paths.forEach((path) => {
    arr = arr.concat(path);
  });
  return {
    paths: arr,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  if (!params) throw new Error("No path parameters found");
  const site = params.site;
  let config = params.config;

  if (!config) {
    const response = await http.get(API_ENDPOINTS.DOMAIN + site);
    config = response.data.data;
  }

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
