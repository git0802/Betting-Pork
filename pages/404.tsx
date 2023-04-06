import React from "react";
// import Header from "../../../theme/header/index";
import Header from "../theme/header/index";
import Image from "next/image";
import Button from "@components/ui/button";
import Router from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { GetStaticProps } from "next";
import { theme_config } from "@themes/config";
import { getTemplate } from "@utils/functionutil";
import { DefaultPageProps } from "../src/framework/basic-rest/types";
import { useUI } from "../src/contexts/ui-context";

const Custom404 = ({ config }: DefaultPageProps) => {
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
      <div className="flex flex-1 items-center justify-center flex-col main-bg relative p-3 md:p-0 max-w-[450px] mx-auto h-[calc(100vh-135px)]">
        <Image
          alt="error 404"
          src="/images/error/404.png"
          width={500}
          height={500}
        />
        <h1 className="mt-6 font-semibold text-xl leading-10 xl:text-[34px] text-transparent bg-clip-text bg-white text-center capitalize">
          Halaman Tidak Ditemukan.
        </h1>
        <p className="text-center text-base text-whiteDefault-50 mt-3">
          Halaman ini tidak tersedia atau telah dihapus.
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

export default Custom404;

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
