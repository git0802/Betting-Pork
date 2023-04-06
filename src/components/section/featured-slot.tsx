import SliderSlot from "@components/games/slot/Slider";
import ListGroupingCategory from "@components/layout/listGroupingCategory";
import { useDevice } from "@contexts/device-context";
import { useUI } from "@contexts/ui-context";
import dynamic from "next/dynamic";
import Image from "next/image";

const SliderRecentPlayed = dynamic(
  () => import("@components/games/recent-played/Slider"),
  {
    ssr: false,
  }
);

const SectionFeaturedSlot = () => {
  const { template, isPinVerified, isAuthorized } = useUI();
  const device = useDevice();

  return (
    <>
      {isAuthorized && (
        <div className="container mx-auto">
          <SliderRecentPlayed margin={device.isMobileDevice ? true : false} />
        </div>
      )}
      <div
        className={`background_panel pt-[45px] md:pt-[76px] md:pb-[88px] mt-[30px] md:mt-[65px] w-full h-full bg-center bg-cover bg-no-repeat relative z-[0]`}
        // style={{ background: `url(/images/theme/${template}/bg-featured.png)` }}
      >
        <Image
          src={`/images/theme/${template}/bg-featured.png`}
          layout="fill"
          quality={100}
          loading="eager"
          objectPosition="top"
          objectFit="cover"
        />
        <div className="container mx-auto w-full">
          <ListGroupingCategory />
          <SliderSlot />
          {/* <SliderWithBanner /> */}
        </div>
      </div>
    </>
  );
};

export default SectionFeaturedSlot;
