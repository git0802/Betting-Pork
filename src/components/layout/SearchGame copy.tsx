/* eslint-disable @next/next/no-img-element */
import { useUserQuery } from "@framework/user/get-user-profile";
import Router from "next/router";
import { ROUTES } from "@utils/routes";
import useMoney from "@framework/user/use-currency";
import { IconSearch, IconFilter } from "@components/icons";
import { useMemo, useState } from "react";
import Image from "next/image";

type SearchGameProps = {
  placeholder?: string;
}

const SearchGame = ({ placeholder = 'Search Game' }: SearchGameProps) => {
  const { isFetching: isLoading, data, error } = useUserQuery();
  const { money } = useMoney({
    amount: data ? data.balance : 0,
    currencyCode: "IDR",
  });

  const [openFilterMenu, setOpenFilterMenu] = useState(false);
  function navigateToDeposit() {
    Router.push(ROUTES.DEPOSIT);
  }
  const filterMenu = useMemo(
    () => [
      { name: "slot", icon: "" },
      { name: "live casino", icon: "" },
      { name: "Arcade game", icon: "" },
      { name: "poker", icon: "" },
      { name: "sport", icon: "" },
      { name: "togel", icon: "" },
    ],
    []
  );
  const listProvider = useMemo(
    () => [
      {
        title: "hkb gaming",
        total_all_games: 1688,
        total_games_category: 8,
        id: "",
        image_url: "/images/provider/hkb.png",
      },
      {
        title: "habanero",
        total_all_games: 68,
        total_games_category: 2,
        id: "",
        image_url: "/images/provider/habanero.png",
      },
      {
        title: "pragmatic",
        total_all_games: 3658,
        total_games_category: 3,
        id: "",
        image_url: "/images/provider/pragmatic.png",
      },
      {
        title: "micro gaming",
        total_all_games: 254,
        total_games_category: 9,
        id: "",
        image_url: "/images/provider/microgaming.png",
      },
      {
        title: "hkb gaming",
        total_all_games: 1688,
        total_games_category: 8,
        id: "",
        image_url: "/images/provider/hkb.png",
      },
      {
        title: "habanero",
        total_all_games: 68,
        total_games_category: 2,
        id: "",
        image_url: "/images/provider/habanero.png",
      },
      {
        title: "pragmatic",
        total_all_games: 3658,
        total_games_category: 3,
        id: "",
        image_url: "/images/provider/pragmatic.png",
      },
      {
        title: "micro gaming",
        total_all_games: 254,
        total_games_category: 9,
        id: "",
        image_url: "/images/provider/microgaming.png",
      },
      {
        title: "hkb gaming",
        total_all_games: 1688,
        total_games_category: 8,
        id: "",
        image_url: "/images/provider/hkb.png",
      },
      {
        title: "habanero",
        total_all_games: 68,
        total_games_category: 2,
        id: "",
        image_url: "/images/provider/habanero.png",
      },
      {
        title: "pragmatic",
        total_all_games: 3658,
        total_games_category: 3,
        id: "",
        image_url: "/images/provider/pragmatic.png",
      },
      {
        title: "micro gaming",
        total_all_games: 254,
        total_games_category: 9,
        id: "",
        image_url: "/images/provider/microgaming.png",
      },
    ],
    []
  );

  return (
    <div className="relative w-full">
      <div className="flex items-center justify-center w-full space-x-3">
        <div className="flex flex-1 relative items-center border border-[#DCECFF33] bg-[#001625] rounded-md h-11 px-10 py-3">
          <IconSearch className="absolute left-4" />
          <input
            className="bg-transparent outline-none w-full"
            placeholder={placeholder}
          />
        </div>
        <button
          className={`${openFilterMenu ? " " : ""
            } bg-[#001625] text-white flex space-x-3 items-center justify-center rounded-md w-[110px] h-11 px-5`}
          onClick={() => setOpenFilterMenu(!openFilterMenu)}
        >
          <IconFilter className="cursor-pointer" />
          <span className="text-sm font-semibold">Filter</span>
        </button>
      </div>
      {openFilterMenu ? (
        <div className="flex flex-col space-y-3 w-full absolute z-[2] mt-2 right-0 bg-[#2B2C34] border border-[#DCECFF33] rounded-lg p-3">
          <h5 className="capitalize text-[#D3F2FF99]">Game Category</h5>
          <div className="grid grid-cols-3 gap-3">
            {filterMenu.map((item, index) => (
              <div
                key={index}
                className="flex flex-row items-center justify-center py-3 uppercase w-full rounded-md bg-gray-900 text-white hover:bg-black hover:text-white text-sm text-center font-semibold cursor-pointer"
              >
                {item.name}
              </div>
            ))}
          </div>
          <h5 className="capitalize text-[#D3F2FF99] mt-2">Provider</h5>
          <div className="grid grid-cols-3 gap-3 h-[105px] overflow-y-auto scrollbar pr-2">
            {listProvider.map((item, index) => (
              <div
                key={index}
                className="flex flex-row items-center justify-center py-3 uppercase w-full rounded-md bg-gray-900 text-white hover:bg-black hover:text-white text-sm font-semibold cursor-pointer"
              >
                <Image
                  alt=""
                  src={item?.image_url}
                  width={16}
                  height={16}
                  quality={100}
                  loading="lazy"
                  objectFit="contain"
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3 py-5">
            <button className="bg-[#2C516A] text-white h-[50px] rounded border border-[#D3F2FF1A]">
              Clear
            </button>
            <button className="bg-[#1AA9E7] text-white h-[50px] rounded">
              Apply
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SearchGame;
