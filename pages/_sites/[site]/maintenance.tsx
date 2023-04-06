import React from "react";
import Header from "../../../theme/header/index";
import Image from "next/image";
import Head from "next/head";
import Button from "@components/ui/button";
import Router from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import http from "@framework/utils/http-server";
import { GetStaticPaths, GetStaticProps } from "next";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { theme_config } from "@themes/config";
import { getTemplate } from "@utils/functionutil";
import { DefaultPageProps } from "../../../src/framework/basic-rest/types";
import { useUI } from "../../../src/contexts/ui-context";

const Maintenance = ({ config }: DefaultPageProps) => {
  const { t } = useTranslation();
  const { template, title } = useUI();
  const handleConfig = theme_config(template);
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
        <link
          rel="icon"
          href={"/images/theme/" + getTemplate() + "/favicon.ico"}
        />
      </Head>
      <Header type={handleConfig?.header} />
      <div className="flex flex-1 items-center justify-center flex-col main-bg relative p-3 md:p-0 max-w-[450px] mx-auto min-h-[calc(100vh-80px)] text-center">
        <Image
          alt="maintenance"
          src="/images/error/maintenance.png"
          width={500}
          height={558}
        />
        <h1 className="mt-6 font-semibold text-xl leading-10 xl:text-[34px] text-transparent bg-clip-text bg-white capitalize max-w-[340px]">
          Pemeliharaan Sedang Dilakukan
        </h1>
        <p className="text-center text-base text-whiteDefault-50 mt-3 max-w-[340px]">
          Untuk melayani anda lebih baik lagi. Kami akan segera kembali.
        </p>
        <Button
          type="submit"
          variant="primary"
          onClick={() => Router.push("/")}
          className="flex flex-row h-11 font-extrabold w-[120px] mx-auto mt-8"
        >
          {t("common:text-go-back")}
        </Button>
      </div>
    </>
  );
};

export default Maintenance;

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
