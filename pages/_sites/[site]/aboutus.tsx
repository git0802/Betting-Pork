/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import MainLayout from "@components/layout/Main";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import http from "@framework/utils/http-server";
import { GetStaticPaths, GetStaticProps } from "next";
import { DefaultPageProps } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";

const AboutUs = ({ config }: DefaultPageProps) => {
  const { t } = useTranslation();

  const textLeft =
    "text-right w-[100px] inline-block text-base md:text-[20px] font-semibold text-[#FFA900] mr-5";
  const textRight =
    "text-left text-base md:text-[20px] font-semibold text-white";

  return (
    <div className="container mx-auto mt-10">
      <div>
        <h3 className="text-[32px] font-light text-white capitalize text-center md:text-left mb-3">
          {t("text-aboutus")}
        </h3>
        <h3 className="text-sm font-normal text-[#D3F2FF80] capitalize text-center md:text-left mb-[50px] md:mb-0">
          lebih dekat dengan kami
        </h3>
      </div>
      <div className="grid md:grid-cols-2">
        <div className="order-2 -mt-[100px] md:order-1 md:mt-0 xl:mt-[86px]">
          <div className="text-[34px] text-center md:text-left xl:text-[64px] font-semibold">
            We bridge you with Fun &{" "}
            <span className="text-[#FFA900]">Opportunities.</span>
          </div>
          <div className="mt-[30px]">
            <div className="flex items-center">
              <span className={textLeft}>17+</span>
              <span className={textRight}>Years Industry Experience.</span>
            </div>
            <div className="flex items-center">
              <span className={textLeft}>291,023</span>
              <span className={textRight}>Total Users.</span>
            </div>
            <div className="flex items-center">
              <span className={textLeft}>102</span>
              <span className={textRight}>Products.</span>
            </div>
            <div className="flex items-center">
              <span className={textLeft}>23</span>
              <span className={textRight}>Networks.</span>
            </div>
            <div className="flex items-center">
              <span className={textLeft}>23B+</span>
              <span className={textRight}>Total Turnover.</span>
            </div>
          </div>
          <div className="mt-[38px] text-[20px] font-semibold text-white text-center md:text-left">
            Can’t be wrong.
          </div>
        </div>
        <div className="order-1 md:order-2">
          <Image
            alt=""
            src={"/images/aboutus/hero.png"}
            width={912}
            height={817}
            className="w-full"
            layout="responsive"
          />
        </div>
      </div>
      <div className="flex flex-col w-fit mt-10 xl:mt-0 md:flex-row border border-[#D3F2FF33] rounded-[10px] bg-[#FFFFFF0D] px-[35px] py-[30px]">
        <div className="w-full xl:w-[510px] flex flex-col lg:flex-row space-x-3">
          <div className="w-full text-center lg:w-[50px]">
            <Image
              alt=""
              src="/images/aboutus/icon1.png"
              width={50}
              height={50}
              layout="fixed"
            />
          </div>
          <div className="flex flex-col space-y-3">
            <span className="text-[20px] font-semibold text-white text-center md:text-left">
              Military grade infrastructure & skilled resources.
            </span>
            <span className="text-base font-light text-white text-left">
              We give the best available in the market when it comes to
              security. we make sure everything is safe.
            </span>
          </div>
        </div>
        <div className="w-full mt-10 md:mt-0 xl:w-[510px] flex flex-col lg:flex-row space-x-3">
          <div className="w-full text-center lg:w-[50px]">
            <Image
              alt=""
              src="/images/aboutus/icon2.png"
              className="w-[50px]"
              width={50}
              height={50}
              layout="fixed"
            />
          </div>
          <div className="flex flex-col space-y-3">
            <span className="text-[20px] font-semibold text-white text-center md:text-left">
              We strive to provide you with the best value & service.
            </span>
            <span className="text-base font-light text-white text-left">
              Generous sign up bonuses to new members and numerous rebate offers
              to existing customer is always on the table.
            </span>
          </div>
        </div>
      </div>
      <div className="w-fit mx-auto mt-[68px]">
        <h5 className="text-center mb-8">
          POWERED BY BIGGEST NAMES IN THE INDUSTRY
        </h5>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="relative w-full h-[130px]">
            <Image
              alt=""
              src="/images/aboutus/gc.png"
              quality={100}
              loading="lazy"
            />
          </div>
          <div className="relative w-full h-[130px]">
            <Image
              alt=""
              src="/images/aboutus/playtech.png"
              quality={100}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

AboutUs.Layout = MainLayout;

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await http.get(API_ENDPOINTS.DOMAINS);
  const domains = response.data.data;
  return {
    paths: domains.map((path: string) => ({
      params: {
        site: path,
      },
    })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  if (!params) throw new Error("No path parameters found");
  const { site } = params;
  const {
    data: { data: config },
  } = await http.get(API_ENDPOINTS.DOMAIN + site);
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
