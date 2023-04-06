import {
  CarouselSwiper,
  CarouselSwiperMobile,
} from "@components/carousel/swiper";
import { useDevice } from "@contexts/device-context";
import { useUI } from "@contexts/ui-context";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http-backend";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { useQuery } from "react-query";

const Slider = ({ margin = true }: { margin?: boolean }) => {
  const { t } = useTranslation();
  const { isPinVerified, setPinVerified, isAuthorized } = useUI();

  const device = useDevice();

  const { data, refetch } = useQuery(
    [API_ENDPOINTS.GAMELIST_RECENTLY_PLAYED],
    () =>
      http.get(API_ENDPOINTS.GAMELIST_RECENTLY_PLAYED, {
        params: {
          limit: 12,
        },
      }),
    {
      enabled: isAuthorized === true,
      refetchOnWindowFocus: false,
      select: ({ data }) => {
        return data.data;
      },
      onError: (error: any) => {
        if (error?.response?.data?.error_code === 2002) {
          setPinVerified(false);
        }
      },
    }
  );

  useEffect(() => {
    if (isPinVerified) refetch();
  }, [isPinVerified]);

  return (
    <div className={`${data ? "" : "hidden"}`}>
      {!device.isMobileDevice ? (
        <CarouselSwiper
          title={t("common:text-recently-played")}
          data={data ?? []}
          showAllButton={false}
          showTotal={false}
          showRTP={false}
          px={margin}
        />
      ) : (
        <CarouselSwiperMobile
          title={t("common:text-recently-played")}
          data={data ?? []}
          showTotal={false}
          showRTP={false}
          spaceBetween={10}
          showAllButton={false}
          px={margin}
        />
      )}
    </div>
  );
};

export default Slider;
