import axios from "axios";
import { getToken } from "./get-token";
import { CookieStorage } from "@lib/cookie";
import { CookieKeys } from "@lib/constant";
import { toast } from "react-toastify";
import { useTranslation } from "next-i18next";
import { getApiKey, getApiEndpoint } from "@utils/functionutil";

const http = axios.create({
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
// Change request data/error here
http.interceptors.request.use(
  (config) => {
    const token = getToken();
    config.baseURL = getApiEndpoint();
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token ? token : ""}`,
      "x-api-key": getApiKey(),
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    return {
      ...response,
      // data: humps.camelizeKeys(response.data, function (key: any, convert: any) {
      //   return /^(\w+)-(\w)([\w-]*)/gm.test(key) ? key : convert(key);
      // }),
    };
  },
  (error) => {
    if (
      error.response.data.errors &&
      Array.isArray(error.response.data.errors)
    ) {
      error.response.data.errorsObject = error.response.data.errors.reduce(
        (errorObject: any, item: any) => {
          errorObject[item.field] = item;
          return errorObject;
        },
        {}
      );
    }
    if (error?.response?.status === 400) {
      location.pathname = "/";
      toast.error("Bad Request", {
        bodyStyle: {
          whiteSpace: "pre-wrap",
        },
        toastId: "error-response",
      });
    } else if (error?.response?.status === 401) {
      CookieStorage.remove(CookieKeys.AuthToken);
      location.pathname = "/";
      toast.error("Silahkan untuk login terlebih dahulu!", {
        bodyStyle: {
          whiteSpace: "pre-wrap",
        },
        toastId: "error-response",
      });
    } else if (error?.response?.status === 503) {
      location.pathname = "/";
      toast.error("Layanan tidak tersedia", {
        bodyStyle: {
          whiteSpace: "pre-wrap",
        },
        toastId: "error-response",
      });
    }
    toast.error(error?.response?.data?.errors?._error || "Terjadi kesalahan", {
      bodyStyle: {
        whiteSpace: "pre-wrap",
      },
      toastId: "error-response",
    });
    return Promise.reject(error.response);
  }
);
export default http;
