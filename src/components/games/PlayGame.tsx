import cn from "classnames";
import { BsPlayCircleFill } from "react-icons/bs";
import { BiFullscreen } from "react-icons/bi";
import { CgMinimize } from "react-icons/cg";
import { Game } from "@framework/types";
import Button from "@components/ui/button";
import { useLayoutEffect } from "react";
import { useTranslation } from "next-i18next";

const LoadingComponent = () => (
  <>
    <svg
      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    Loading...
  </>
);

type GameType = Game & {
  game_name?: string;
  provider_name?: string;
};

type PlayGame = {
  playGame: (isMobile: boolean) => void;
  setFullScreen: (state: boolean) => void;
  fullScreen: boolean;
  selectedGame: GameType;
  gamePlayed: boolean;
  showGameLoading: boolean;
  generateGameLoading: boolean;
  setShowGameLoading: (state: boolean) => void;
  gameUrl: string;
  game: string;
  setGameUrl: (state: string) => void;
  setGamePlayed: (state: boolean) => void;
};

export default function PlayGame({
  playGame,
  setFullScreen,
  fullScreen,
  selectedGame,
  gamePlayed,
  showGameLoading,
  generateGameLoading,
  setShowGameLoading,
  gameUrl,
  game,
  setGameUrl,
  setGamePlayed,
}: PlayGame) {
  const isMobile = () => {
    if (!window) return false;
    if (window.innerHeight < 768 || window.innerWidth < 768) return true;
    return false;
  };

  useLayoutEffect(() => {}, [window]);

  const { t } = useTranslation();

  const handleFullScreen = (action = "") => {
    window.scrollTo(0, 0);
    const html = document.querySelector("html");
    const body = document.querySelector("body");
    const mobileNavbar = document.querySelector(".mobile-navbar");
    if (fullScreen) {
      html?.classList.remove("disable-scroll");
      body?.classList.remove("disable-scroll");
      isMobile() && mobileNavbar?.classList.remove("hidden");
    } else {
      html?.classList.add("disable-scroll");
      body?.classList.add("disable-scroll");
      mobileNavbar?.classList.add("hidden");
    }
    // @ts-ignore
    setFullScreen((state) => !state);
    if (action === "exit-mobile" && gamePlayed && isMobile()) {
      setGamePlayed(false);
      setGameUrl("");
    }
  };

  const handlePlayGame = async () => {
    let interval: any = null;
    try {
      await playGame(isMobile());
    } catch (error) {
      clearInterval(interval);
      console.log({ error });
    }
  };

  return (
    <>
      <div
        className={cn(
          isMobile() && gamePlayed && fullScreen
            ? "bg_game"
            : `bg_game px-3 md:px-6 pt-3 md:pt-6 pb-1 md:pb-2 rounded-[5px] `,
          {
            "absolute z-20 top-0 left-0 right-0 h-screen": fullScreen,
            relative: !fullScreen,
          }
        )}
      >
        <style jsx>{`
          .bg-image {
            background-image: url(${selectedGame?.image});
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
          }
        `}</style>
        <div
          className={cn(
            "w-full justify-center z-0 flex relative",
            {
              "h-[200px] md:h-[600px]": !fullScreen,
              "md:h-[90%]": fullScreen && !isMobile(),
            },
            { "h-[100vh]": gamePlayed && isMobile() },
            { "bg-image": !showGameLoading }
          )}
        >
          {gamePlayed && isMobile() && fullScreen && (
            <div className="float-left bg-black flex items-center">
              <button
                className="bg-black px-1 py-2 rounded-full h-[50px]"
                onClick={() => handleFullScreen("exit-mobile")}
              >
                <CgMinimize className="w-5 h-5 text-white animate-pulse" />
                <span className="text-xs">Exit</span>
              </button>
            </div>
          )}
          {!generateGameLoading && gamePlayed && (
            <iframe
              key={game}
              id="play-game-iframe"
              height="100%"
              width="100%"
              src={gameUrl}
              allowFullScreen={true}
              onLoad={() => {
                setShowGameLoading(false);
              }}
              onError={() => {
                setShowGameLoading(false);
              }}
            ></iframe>
          )}

          {/* full screen not played */}
          {fullScreen && !gamePlayed && (
            <div
              className={cn(
                "w-full rounded-[5px] justify-center z-0 flex relative",
                "h-[200px] w-[100%]"
              )}
            ></div>
          )}

          <div
            className={cn("h-full w-full flex justify-center", {
              hidden: gamePlayed,
            })}
          >
            <div
              className={`bg_game absolute top-0 left-0 right-0 bottom-0 z-1 opacity-[90%]`}
            ></div>
            <div className="z-2 absolute top-[50%] flex flex-col items-center gap-y-4 md:flex">
              <div
                className={cn(
                  "items-center justify-center w-full z-20 flex",
                  showGameLoading ? "" : "hidden"
                )}
              >
                <LoadingComponent />
              </div>
              <div
                className={cn(
                  "flex space-x-3",
                  showGameLoading ? " hidden" : ""
                  // { hidden: fullScreen && !gamePlayed }
                )}
              >
                <Button
                  type="button"
                  variant="primary"
                  onClick={handlePlayGame}
                  className={cn(
                    "w-fit text-sm active:translate-y-1 px-4 h-[44px] font-extrabold gap-2 md:flex capitalize"
                  )}
                >
                  <BsPlayCircleFill className="w-5 h-5" />
                  <span>{t("common:text-button-play")}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between py-4">
          <div>
            <h2 className="text-whiteDefault-100 font-bold text-base md:text-xl">
              {selectedGame?.game_name}
            </h2>
            <p className="text-whiteDefault-60 text-sm md:text-base capitalize">
              {selectedGame?.provider_name}
            </p>
          </div>

          <button
            // @ts-ignore
            onClick={handleFullScreen}
            className="flex space-x-2 items-center"
          >
            {fullScreen ? (
              <>
                <CgMinimize className="w-6 h-6 text-whiteDefault-60" />
                <span className="text-whiteDefault-60 capitalize">
                  {t("common:text-exit-full-screen")}
                </span>
              </>
            ) : (
              <>
                <BiFullscreen className="w-6 h-6 text-whiteDefault-60" />
                <span className="text-whiteDefault-60 capitalize">
                  {t("common:text-full-screen")}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
