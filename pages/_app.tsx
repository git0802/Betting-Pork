import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { AnimatePresence } from "framer-motion";
import { PropsChildren } from "additional";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  type DehydratedState,
} from "react-query";
import { ManagedUIContext } from "@contexts/ui-context";
import "@fontsource/outfit";
import "@fontsource/outfit/300.css";
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/500.css";
import "@fontsource/outfit/600.css";
import "@fontsource/outfit/700.css";
import "@fontsource/outfit/800.css";
import "@fontsource/outfit/900.css";
// import "../styles/globals.scss";
import "../styles/scrollbar.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/grid";
import "swiper/css/scrollbar";
import { FC, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { getDirection } from "@utils/get-direction";
import dynamic from "next/dynamic";

// external
import "react-toastify/dist/ReactToastify.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { CookieStorage } from "@lib/cookie";
import { CookieKeys } from "@lib/constant";
import React from "react";
import { DeviceProvider } from "@contexts/device-context";
import ManagedModal from "@components/common/modal/managed-modal"

function handleExitComplete() {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0 });
  }
}

const Noop = ({ children }: PropsChildren) => <>{children}</>;

const ToastContainer = dynamic(() => import("react-toastify").then((mod=>mod.ToastContainer)),{
  loading: () => <></>,
  ssr:false
});

const CustomApp = ({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>) => {
  const queryClientRef = useRef<any>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          refetchOnWindowFocus: false,
        },
      },
    });
  }

  const router = useRouter();
  const dir = getDirection(router.locale);

  useEffect(() => {
    const token = CookieStorage.get(CookieKeys.AuthToken);
    if (!token || token === "undefined") {
      if (router.asPath === "/home") router.replace("/");
    } else {
      if (router.asPath === "/") router.replace("/home");
    }
  }, []);

  useEffect(() => {
    document.documentElement.dir = dir;
  }, [dir]);

  const Layout = (Component as any).Layout || Noop;

  return (
    <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <ManagedUIContext pageProps={pageProps}>
            <DeviceProvider>
              <Layout pageProps={pageProps}>
                <Component {...pageProps} />
                <ToastContainer />
              </Layout>
              <ManagedModal />
            </DeviceProvider>
          </ManagedUIContext>
        </Hydrate>
      </QueryClientProvider>
    </AnimatePresence>
  );
};

export default appWithTranslation(CustomApp as FC);
