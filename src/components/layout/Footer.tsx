/* eslint-disable @next/next/no-img-element */
import React, { useMemo } from "react";
import Image from "next/image";
import Link from "@components/ui/link";
import SwitchLanguage from "@components/ui/SwitchLanguage";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useQueryBankList } from "@framework/user/get-bank-list";
import { GoPrimitiveDot } from "react-icons/go";
import CMS from "@components/cms";
import { GetProviderByGameType } from "@framework/game/get-provider-by-game-type";
import CmsSosmed from "@components/cms/sosmed";
import { useDevice } from "@contexts/device-context";
import { theme_config } from "@themes/config";
import { useUI } from "../../contexts/ui-context";
import { ImageHover } from "@components/ui/image-hover";
import dynamic from "next/dynamic";
import IconBank from "@components/icons/bank";
import { getUnique } from "@utils/functionutil";

const Marquee = dynamic(
  () => import("react-fast-marquee"),
  {
    ssr: false,
  }
);

const Footer = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const query = router;

  const listProviders = GetProviderByGameType({ type: "image" });

  const { data: ListBankFooter, isLoading: isLoadingListBank } = useQueryBankList();

  const uniqueIds: any = [];
  const uniqueListBank = ListBankFooter?.filter((element: any) => {
    const isDuplicate = uniqueIds.includes(element.bank);
    if (!isDuplicate) {
      uniqueIds.push(element.bank);
      return true;
    }
    return false;
  });

  const FooterListBankAfterFilter = useMemo(() => {
    const uniqListBank: any = [];
    uniqListBank.push(getUnique(ListBankFooter, "bank"));
    return uniqListBank;
  }, [ListBankFooter]);

  const cookies = useMemo(() => {
    if (query.locale) {
      if (query.locale.toLowerCase() == "id") {
        return "cookies-id";
      } else {
        return "cookies-en";
      }
    }
    return "cookies-id";
  }, [query.locale]);

  const handleCheckStatus = (data: string) => {
    const DataHandle = ListBankFooter ? ListBankFooter : [];
    let statusBankOnline = 0;
    let statusBankOffline = 0;
    let statusBankDisturbance = 0;

    // count Status
    DataHandle?.map((value: any) => {
      if (value.bank == data) {
        if (value.status == "online") {
          statusBankOnline++;
        } else if (value.status == "disturbance") {
          statusBankDisturbance++;
        } else {
          statusBankOffline++;
        }
      }
    });

    return (
      <div
        className={`${
          statusBankOnline !== 0
            ? "text-success"
            : statusBankDisturbance !== 0
            ? "text-onProcess"
            : statusBankDisturbance == 0
            ? "text-failed"
            : ""
        } 
        flex space-x-[2px] items-center justify-center text-[8px] font-semibold capitalize`}
      >
        <GoPrimitiveDot className="w-[10px] h-[10px]" />
        <span>
          {statusBankOnline !== 0
            ? "Online"
            : statusBankDisturbance !== 0
            ? "gangguan"
            : "Offline"}
        </span>
      </div>
    );
  };

  const device = useDevice();
  const { template } = useUI();
  const handleConfig = theme_config(template);

  return (
    <footer className="md:mt-[100px] mb-[70px] lg:mb-0">
      <div className={`w-full bg_footer_section_1`}>
        <div className="container py-[30px] mx-auto flex flex-col space-y-3 md:space-y-0 md:flex-row items-center justify-between">
          <div className="flex flex-col justify-start md:justify-center md:w-[530px] lg:w-fit">
            <span className="text-xs md:text-sm tracking-[10%] md:tracking-normal font-light md:font-semibold text-whiteDefault-40 md:text-whiteDefault-80 text-center md:text-left uppercase md:capitalize">
              {t("common:text-payment-channel")}
            </span>
            <div className="flex flex-wrap gap-[24px] justify-center md:justify-start mt-5 text-whiteDefault-40">
              {!isLoadingListBank &&
                FooterListBankAfterFilter[0]?.map((item: any, index: number) => (
                  <div key={index} className="flex flex-col justify-center items-center">
                    <IconBank
                      name={item?.bank?.toLowerCase()}
                      style="h-[15px]"
                    />
                    {handleCheckStatus(item?.bank)}
                  </div>
                ))}
            </div>
            {/* <div className="flex md:hidden mt-10 mb-[10px] space-x-2 items-center justify-center text-xs font-semibold text-whiteDefault-80 text-center cursor-pointer">
              <Link href={`/aboutus`}>
                <span className="text-sm font-semibold text-whiteDefault-80 whitespace-nowrap uppercase md:capitalize">
                  {t("common:text-aboutus")}
                </span>
              </Link>
              <IconLink className="w-3 h-3 text-white" />
            </div> */}
          </div>
          <div className="hidden md:flex md:flex-col md:space-y-3 xl:space-y-0 xl:flex-row items-center xl:space-x-[36px]">
            {/* <div className="flex space-x-2 items-center justify-center text-xs font-semibold text-whiteDefault-80 text-center cursor-pointer">
              <Link href={`/aboutus`}>
                <span className="text-whiteDefault-80 whitespace-nowrap uppercase md:capitalize">
                  {t("common:text-aboutus")}
                </span>
              </Link>
              <IconLink className="w-3 h-3 text-white" />
            </div> */}
            {/* <div className="w-[150px]">
              <SwitchLanguage />
            </div> */}

            <div className="flex flex-wrap gap-[12px] max-w-[365px] mt-5 md:mt-0">
              <CmsSosmed />
            </div>
          </div>
        </div>
      </div>

      <div className={`hidden lg:block w-full bg_footer_section_2`}>
        <div className="container mx-auto items-center gap-6 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 px-mobile md:px-desktop py-10 ">
          {listProviders?.map((item: any, i: number) => (
            <Link
              key={i}
              className="flex items-center justify-center active:translate-y-[2px] duration-200 ease-in-out w-full h-[32px] px-5 py-0"
              href={`/provider-profile/${item?.key}`}
            >
              <ImageHover
                alt={item?.title}
                src={item?.image_url_white}
                srcOnHover={item?.image_url}
                styleContainer="w-full h-full"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className={`lg:hidden flex items-center w-full bg_footer_section_2 h-[100px]`}>
        <Marquee
          className="bg-transparent text-xs text-[rgba(255,255,255,0.5)]"
          gradient={false}
          pauseOnHover
          speed={20}
        >
          {listProviders?.map((item: any, i: number) => (
            <Link key={i} href={`/provider-profile/${item?.title}`}>
              <div className="flex item-center px-3 align-middle outline-none cursor-pointer w-[150px] h-[28px] items-center justify-center active:translate-y-[2px] duration-200 ease-in-out">
                <ImageHover
                  alt={item?.title}
                  src={item?.image_url_white}
                  srcOnHover={item?.image_url}
                />
              </div>
            </Link>
          ))}
        </Marquee>
      </div>

      <div className={`pt-5 pb-24 lg:pb-5 text-center bg_footer_section_3`}>
        <div className="container mx-auto px-mobile md:px-desktop flex flex-col md:flex-row items-center justify-between">
          <div className="text-left">
            <div className="text-center md:text-left">
              <Image
                alt=""
                src={`/images/theme/${handleConfig?.header.toString()}/logo.png`}
                width={device.isMobileDevice ? 250 : 178}
                height={device.isMobileDevice ? 50 : 44}
                quality={100}
                loading="lazy"
                objectFit="contain"
                objectPosition={device.isMobileDevice ? "center" : "left"}
              />
            </div>

            <div className="flex flex-wrap justify-center md:hidden flex-row gap-[10px] my-6">
              <CmsSosmed />
            </div>
            <span className="text-sm text-[#D3F2FFCC] font-medium">
              <CMS page_name="copyright" />
            </span>
          </div>
          <div className="w-full md:w-fit">
            {/* <div className="max-w-[650px] text-center md:text-left text-grayDefault-60 text-sm font-medium mt-5 md:mt-0">
              <CMS page_name={cookies} />
            </div> */}
            <div className="hidden md:flex w-[150px]">
              <SwitchLanguage 
                position="top"
              />
            </div>
            <div className="flex md:hidden w-full mt-7">
              <SwitchLanguage />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
