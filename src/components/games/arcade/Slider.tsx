import {
  CarouselSwiper,
  CarouselSwiperMobile,
} from "@components/carousel/swiper";
import { useDevice } from "@contexts/device-context";
import { useGamesQuery } from "@framework/game/get-all-games";

const Slider = ({ margin = true }: { margin?: boolean }) => {
  const query = { type: "arcade" };
  const {
    isFetching: isLoading,
    isFetchingNextPage: loadingMore,
    fetchNextPage,
    hasNextPage,
    data,
    error,
  } = useGamesQuery({ limit: 12, ...query });
  const handleData = data ? data?.pages[0]?.data : [];

  const device = useDevice();

  return (
    <div>
      {!device.isTabDevice ? (
        <div className="container mx-auto">
          <CarouselSwiper
            title="Arcades"
            data={handleData}
            showTotal={true}
            showRTP={false}
            isLoading={isLoading}
            type="arcade"
          />
        </div>
      ) : (
        <CarouselSwiperMobile
          title="Arcades"
          data={handleData}
          showTotal={true}
          showRTP={false}
          spaceBetween={9}
          isLoading={isLoading}
          type="arcade"
          px={margin}
          cardHeight="h-[160px] lg:h-[220px]"
        />
      )}
    </div>
  );
};

export default Slider;
