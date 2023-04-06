/* eslint-disable @next/next/no-img-element */
import Button from "@components/ui/button";
import CardItemGames from "@components/ui/card-item-games-rtp";
import Link from "@components/ui/link";
import { useGamesPopularQuery } from "@framework/game/get-all-games";
import { saveSelectedGame } from "@utils/functionutil";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useState } from "react";

interface resultProps {
  game_name: string;
  image: string;
  provider: string;
  rtp: number;
}

const Detail = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const {
    query: { tab },
  } = router;

  const [currentPage, setCurrentPage] = useState(1);

  const {
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    data,
    error,
  } = useGamesPopularQuery({
    limit: 10,
  });

  return (
    <div className="mt-[30px]">
      <div className="grid grid-cols-2 gap-[18px] sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
        {data?.pages?.map((page) => {
          return page?.data?.map((item, index) => (
            <Link
              key={index}
              onClick={() => saveSelectedGame(item)}
              href={`/game/${item._id}?type=${item.type}&provider=${item.provider}`}
              className="animate-default"
            >
              <CardItemGames
                name={item?.game_name}
                image={item?.image}
                provider={item?.provider_name}
                showRTP={item?.type === "slot" ? true : false}
                valueRTP={item?.type === "slot" ? item?.rtp : 0}
              />
            </Link>
          ));
        })}
      </div>
      <div className="w-full text-center text-whiteDefault-100 mt-9">
        {isFetching ? "Loading..." : ""}
        {!data && !isFetching && (
          <label className="capitalize text-whiteDefault-100/60">
            {t("common:text-no-data")}
          </label>
        )}
      </div>
      <div className="relative w-fit mx-auto">
        <Button
          type="submit"
          className={`${
            !hasNextPage ? "hidden" : "block"
          } flex space-x-2 bg-nileBlue-100 text-sm font-semibold rounded-md px-7 py-3 mx-auto mt-9 cursor-pointer`}
          // loading={isFetchingNextPage}
          disabled={isFetchingNextPage}
          onClick={() => {
            setCurrentPage(currentPage + 1);
            fetchNextPage();
          }}
        >
          {t("common:text-load-more")}
        </Button>
      </div>
    </div>
  );
};

export default Detail;
