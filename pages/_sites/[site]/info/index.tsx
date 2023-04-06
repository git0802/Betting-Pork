/* eslint-disable @next/next/no-img-element */
import MainLayout from "@components/layout/Main";
import { useBannerQuery } from "@framework/banner/get-banner";
import { DefaultPageProps } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http-server";
import { GetStaticPaths, GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMemo } from "react";
import IconButtonPrev from "/public/icons/arrowPrev.svg";

const Info = ({ config }: DefaultPageProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const {
    query: { id, category },
  } = router;

  const {
    data,
    isLoading: loading,
    refetch,
  } = useBannerQuery(
    category
      ? {
          category: category ? "banner-" + category : "",
        }
      : {
          category: "banner",
        }
  );

  const dataDetail = useMemo(() => {
    if (id) {
      return data?.find((promotion: any) => promotion._id === id);
    } else {
      return null;
    }
  }, [id, data, category]);

  return (
    <div className="container mx-auto">
      <div className="md:mt-10 flex lg:flex-row flex-col lg:space-x-10">
        {id && dataDetail ? (
          <div
            className={`bg_content_container lg:w-full w-full flex flex-col m-0 items-start lg:mt-0 mt-5 md:rounded-[10px] p-4 lg:py-[] lg:p-10 break-all`}
          >
            <div
              onClick={() => router.back()}
              className="flex flex-row mb-[33px] items-center gap-[11px] capitalize  active:translate-y-1 transition ease-in-out duration-200 cursor-pointer"
            >
              <button className="w-[30px] h-[30px] rounded-full bg-white/10 flex items-center justify-center">
                <IconButtonPrev className="text-white/50 w-5 h-5" />
              </button>
              <span className="text-white text-sm font-normal">
                {t("common:text-back")}
              </span>
            </div>

            <Image
              alt={dataDetail?.name}
              src={dataDetail?.url}
              loading="lazy"
              width={356}
              height={200}
              layout="intrinsic"
              objectFit="contain"
              objectPosition="left"
            />
            <div className="text-white mt-4">
              <p className="text-[22px] font-bold">Detail Informasi</p>
            </div>
            <div className="text-white mt-4">
              <div
                className="normal-case break-normal"
                dangerouslySetInnerHTML={{ __html: dataDetail.value }}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Info;

Info.Layout = MainLayout;

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
