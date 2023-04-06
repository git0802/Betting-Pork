import React from "react";
import Header from "../theme/header/index";
import Image from "next/image";
import Button from "@components/ui/button";
import Router from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import MainLayout from "@components/layout/Main";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { theme_config } from "@themes/config";
import { getTemplate } from "@utils/functionutil";
import { DefaultPageProps } from "../src/framework/basic-rest/types";
import { useUI } from "../src/contexts/ui-context";

const Custom500 = ({ config }: DefaultPageProps) => {
  const { t } = useTranslation();
  const { template, title } = useUI(); 
  const handleConfig = theme_config(template);
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
        <meta
          name="viewport"
          content="width=device-width, minimum-scale=1.0, maximum-scale = 1.0, user-scalable = no"
        />
        <meta property="og:title" content={title} key="title" />
        <link rel="stylesheet" href={`/styles/globals.${template}.css`} />
      </Head>
      <Header type={handleConfig?.header} />
      <div className="flex flex-1 items-center justify-center flex-col main-bg relative p-3 md:p-0 max-w-[450px] mx-auto min-h-[calc(100vh-80px)]">
        <Image
          alt="error 500"
          src="/images/error/500.png"
          width={500}
          height={500}
        />
        <h1 className="mt-6 font-semibold text-xl leading-10 xl:text-[34px] text-transparent bg-clip-text bg-white capitalize">
          Oops, Ada Kesalahan..
        </h1>
        <p className="text-center text-base text-whiteDefault-50 mt-3">
          Kami akan segera kembali.
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

export default Custom500;

Custom500.Layout = MainLayout;

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  return {
    props: {
      locale,
      ...(await serverSideTranslations(locale as string, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
  };
};
