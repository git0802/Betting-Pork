/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { IconSearch, IconFilter3 } from "@components/icons";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { Combobox, Menu, Transition } from "@headlessui/react";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import { useDebounce } from "use-debounce";
import { useGameSearchQuery } from "@framework/game/get-game";
import { useGameTypeOptionQuery } from "@framework/game/get-all-games-type";
import { useTranslation } from "next-i18next";
import { GetProviderByGameType } from "@framework/game/get-provider-by-game-type";
import Button from "@components/ui/button";
import cn from "classnames";
import { useUI } from "@contexts/ui-context";
import { isEmpty } from "lodash";
import { saveSelectedGame } from "@utils/functionutil";

type SearchGameProps = {
  placeholder?: string;
  localSearch?: boolean;
  showProviderFilter?: boolean;
  inputWidth?: string;
  inputBackground?: string;
  inputBorder?: string;
  searchPosition?: string;
  filterPosition?: string;
  game_type?: string;
  showFilterText?: boolean;
  showFilter?: boolean;
  showSearch?: boolean;
  alignItem?: string;
  position?: "header" | "pages" | null;
  px?: boolean;
  rounded?: string;
};

const SearchGame = ({
  placeholder = "Search Game",
  localSearch = false,
  showProviderFilter = true,
  inputWidth = "w-[330px]",
  inputBackground = "bg-white/5",
  inputBorder = "border border-transparent hover:border-[#6CE5FF] focus-within:border-[#6CE5FF]",
  searchPosition = "left-0",
  filterPosition = "right-0",
  game_type = "",
  showFilterText = true,
  showSearch = true,
  showFilter = true,
  alignItem = "justify-start",
  position = null,
  px = false,
  rounded = "rounded-[5px]",
}: SearchGameProps) => {
  const { t } = useTranslation();
  const { setLocalFilterQuery, localFilterQuery } = useUI();
  const router = useRouter();
  const { query: urlQuery } = router;
  const { data: dataGameType } = useGameTypeOptionQuery();
  const [query, setQuery] = useState("");
  const searchButtonDropdown = useRef<HTMLButtonElement>(null);
  const filterButtonMenu = useRef<HTMLButtonElement>(null);
  const [search, setSearch] = useState<string>("");
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [selectedGame, setSelectedGame] = useState<string[]>([]);
  const [value] = useDebounce(search, 300);

  const { games } = useGameSearchQuery({
    limit: 5,
    q: value,
  });

  useEffect(() => {
    if (localSearch) {
      if (isEmpty(localFilterQuery)) {
        return setSelectedProviders([]);
      }
      if (localFilterQuery?.provider) {
        return setSelectedProviders(localFilterQuery?.provider);
      }
      if (urlQuery?.providers) {
        if (typeof urlQuery?.providers === "string") {
          setSelectedProviders([urlQuery?.providers]);
        } else {
          setSelectedProviders(urlQuery?.providers);
        }
      }
    }
  }, [localSearch, urlQuery, localFilterQuery]);

  const ListGameType = useMemo(() => {
    if (dataGameType?.gametype?.data) return dataGameType.gametype.data;
    return [];
  }, [dataGameType]);

  const listProviders = GetProviderByGameType({
    type: "icon",
    game_type: game_type,
  });

  const filteredGame =
    query === ""
      ? games
      : games.filter((game: any) =>
          game.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSelectGame = (gameType: string) => {
    // setSelectedGame(gameType);
    const isExistGameType = selectedGame.find((item) => item === gameType);
    if (isExistGameType) {
      setSelectedGame(selectedGame.filter((item) => item !== gameType));
    } else {
      setSelectedGame([...selectedGame, gameType]);
    }
  };

  const handleSelectProvider = (gameType: string) => {
    const isExistProviderType = selectedProviders.find(
      (item) => item === gameType
    );
    if (isExistProviderType) {
      setSelectedProviders(
        selectedProviders.filter((item) => item !== gameType)
      );
    } else {
      setSelectedProviders([...selectedProviders, gameType]);
    }
  };

  const handlePlayGame = (game: any) => {
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

  const isSelectedGame = (gameType: string) => {
    const isExistGameType = selectedGame?.find((item) => item === gameType);
    return !!isExistGameType;
  };

  const isSelectedProvider = (gameType: string) => {
    const isExistProviderType = selectedProviders?.find(
      (item) => item === gameType
    );
    return !!isExistProviderType;
  };

  const handleApplyFilter = () => {
    if (localSearch) {
      let pushParams = {};
      const isProductPage = router.pathname.search("/product") > -1;
      const isGamePage = router.pathname.search("/game") > -1;
      if (isProductPage) {
        pushParams = {
          pathname: "/product/" + urlQuery?.type + "/rtp-live",
        };
      }

      if (isGamePage) {
        pushParams = {
          pathname: "/game/" + urlQuery?.game,
          query: {
            type: urlQuery?.type,
            provider: urlQuery?.provider,
          },
        };
      }
      setLocalFilterQuery({ provider: selectedProviders, type: urlQuery.type });
      router.push(pushParams, undefined, { shallow: false, scroll: false });

      return filterButtonMenu.current?.click();
    }

    router.push(
      {
        pathname: "/filter-result",
        query: {
          games: selectedGame,
          providers: selectedProviders,
        },
      },
      undefined,
      { shallow: false }
    );
    filterButtonMenu.current?.click();
  };

  return (
    <div
      className={cn("relative w-full", {
        "px-mobile": px,
      })}
    >
      <div className={`flex ${alignItem} items-center w-full space-x-[10px]`}>
        {showSearch ? (
          <Combobox>
            <div className="">
              <form
                autoComplete="off"
                className={cn(
                  "flex flex-1 relative items-center transition duration-200",
                  {
                    input_search_game_header: position == "header",
                    input_search_game_pages: position == "pages",
                  }
                )}
              >
                <div className="flex items-center justify-center h-[18px] mx-3 my-[13px] ">
                  <IconSearch />
                </div>
                <Combobox.Input
                  className="bg-transparent outline-none w-full h-[18px] capitalize focus:placeholder:text-transparent"
                  placeholder={placeholder}
                  onChange={handleSearchChange}
                  autoComplete="off"
                  role="presentation"
                  type="text"
                />
                <div className="absolute top-0">
                  <Combobox.Button
                    ref={searchButtonDropdown}
                    className="w-full h-12"
                  >
                    &nbsp;
                  </Combobox.Button>
                </div>
              </form>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery("")}
              >
                <Combobox.Options
                  className={`bg_search_game absolute z-10 ${searchPosition} px-5 py-4 mt-5 max-h-96 overflow-auto scrollbar text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm w-full sm:w-[425px] rounded-[10px]`}
                >
                  <div className="flex justify-between mb-4">
                    <div className="flex space-x-3">
                      <h1 className="text-lg text-[#D3F2FF] font-bold capitalize">
                        {t("common:text-search-result")}
                      </h1>
                      <div className="bg-white/10 rounded-md px-2 py-1 text-sm font-bold">
                        {filteredGame.length}
                      </div>
                    </div>
                    <button
                      onClick={() => searchButtonDropdown.current?.click()}
                    >
                      <IoMdClose className="text-[#D3F2FF]/80 w-5 h-5" />
                    </button>
                  </div>
                  {games.length === 0 && query !== "" ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-[#D3F2FF]/70 capitalize">
                      {t("common:text-nothing-found")}
                    </div>
                  ) : (
                    games.map((game: any) => (
                      <Combobox.Option
                        key={game._id}
                        className={({ active }) =>
                          `relative cursor-default select-none list-none`
                        }
                        value={game}
                      >
                        {({ selected, active }) => (
                          <div
                            className={`bg_search_game_item flex justify-between items-center w-full mb-1 p-[10px]`}
                          >
                            <div className="flex space-x-2 items-center">
                              <Image
                                alt={game.game_name}
                                src={game.image}
                                width={68}
                                height={50}
                                quality={100}
                                loading="lazy"
                                objectFit="contain"
                              />
                              <div className="flex flex-col space-y-1">
                                <span className="text-sm text-[#D3F2FF]">
                                  {game.game_name}
                                </span>
                                <span className="text-xs text-[#D3F2FF]/70">
                                  {game.type_name}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => handlePlayGame(game)}
                              className={`bg_search_game_item_play h-[36px] w-[91px] rounded-[5px] font-bold text-sm capitalize leading-[14px] active:translate-y-1 transition-all duration-200 ease-in-out`}
                            >
                              {t("common:text-play-now")}
                            </button>
                          </div>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        ) : null}
        {showFilter ? (
          <Menu as="div">
            <Menu.Button
              ref={filterButtonMenu}
              className={cn(
                `flex space-x-[5px] items-center justify-center rounded-[5px] h-11 py-[10px] px-[12px] text-sm active:translate-y-1 transition duration-200 ease-in-out`,
                {
                  bg_btn_filter_header: position == "header",
                  bg_btn_filter_pages: position == "pages",
                }
              )}
            >
              <IconFilter3 className="cursor-pointer" />
              {showFilterText ? (
                <span className="text-sm font-semibold capitalize">
                  {t("common:text-filter")}
                </span>
              ) : null}
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                className={`bg_search_game absolute z-50 ${filterPosition} px-5 py-4 mt-5 overflow-auto text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm w-full lg:w-[435px] rounded-[10px]`}
              >
                <div className="flex justify-between mb-4">
                  <div className="flex space-x-3">
                    <h1 className="text-lg text-[#D3F2FF] font-bold capitalize">
                      {t("common:text-search-filter")}
                    </h1>
                  </div>
                  <button onClick={() => filterButtonMenu.current?.click()}>
                    <IoMdClose className="text-[#D3F2FF]/80 w-5 h-5" />
                  </button>
                </div>
                {!localSearch && (
                  <div className="flex flex-col space-y-[10px]">
                    <span className="text-xs font-bold text-[#D3F2FF]/60 capitalize">
                      {t("common:text-game-category")}
                    </span>
                    <div className="flex flex-wrap flex-row">
                      {ListGameType.map((item: any, index) => (
                        <button
                          key={index}
                          className={`flex h-10 mb-2 mr-2 flex-row items-center uppercase justify-center py-3 px-3 rounded-md ${
                            isSelectedGame(item.type)
                              ? "bg_filter_item_active"
                              : "bg_filter_item"
                          } text-sm text-center cursor-pointer active:translate-y-1 transition-all duration-200 ease-in-out`}
                          onClick={() => {
                            handleSelectGame(item.type);
                          }}
                        >
                          {item.type_name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {showProviderFilter &&
                  listProviders &&
                  listProviders?.length > 0 && (
                    <div className="flex flex-col space-y-[10px] mt-[15px]">
                      <span className="text-xs font-bold text-[#D3F2FF]/60">
                        Providers
                      </span>
                      <div className="flex flex-wrap gap-2 flex-row items-start justify-start overflow-y-scroll scrollbar max-h-40">
                        {listProviders.map(
                          (
                            item: {
                              title: string;
                              image_url: string;
                              key: string;
                              name: string;
                            },
                            index: number
                          ) => (
                            <button
                              key={index}
                              className={`flex space-x-1 h-10 flex-row uppercase items-center justify-center py-3 px-3 rounded-md ${
                                isSelectedProvider(item.key)
                                  ? "bg_filter_item_active"
                                  : "bg_filter_item"
                              } text-sm text-center cursor-pointer  active:translate-y-1 transition-all duration-200 ease-in-out`}
                              onClick={() => {
                                handleSelectProvider(item.key);
                              }}
                            >
                              <div className="mr-2 h-4">
                                <Image
                                  src={item.image_url}
                                  className="h-4 object-contain"
                                  alt={item.title}
                                  width={16}
                                  height={16}
                                />
                              </div>
                              <span>{item.name}</span>
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  )}

                <div className="flex md:justify-end items-center space-x-4 mt-4">
                  <Button
                    type="button"
                    variant="cancel"
                    onClick={() => {
                      setSelectedGame([]);
                      setSelectedProviders([]);
                    }}
                    className="flex flex-row h-11 font-extrabold text-sm px-5 w-fit"
                  >
                    {t("common:text-clear")}
                  </Button>
                  <Button
                    type="button"
                    variant="primary"
                    onClick={handleApplyFilter}
                    className="flex flex-row h-11 font-extrabold text-sm px-5 w-fit"
                  >
                    {t("common:text-apply-filter")}
                  </Button>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        ) : null}
      </div>
    </div>
  );
};

export default SearchGame;
