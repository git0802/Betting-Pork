// main
import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import Router from "next/router";

// lib
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// component
import Button from "@components/ui/button";
import { useUI } from "@contexts/ui-context";
import { theme_config } from "@themes/config";
import Header from "../theme/header/index";

interface Props {
  statusCode?: number;
}

const Error: NextPage<Props> = ({ statusCode }) => {
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
        <link rel="icon" href={`/images/theme/${template}/favicon.ico`} />
        <link rel="stylesheet" href={`/styles/globals.${template}.css`} />
      </Head>
      <Header type={handleConfig?.header} />
      <div className="w-full h-[calc(100vh-135px)] flex flex-col gap-3 items-center justify-center">
        <div>
          {statusCode
            ? `An error ${statusCode} occurred on server`
            : "An error occurred on client"}
        </div>
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

export default Error;

export const getStaticProps = async ({ res, err, locale }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return {
    props: {
      locale,
      ...(await serverSideTranslations(locale as string, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
      statusCode,
    },
  };
};
