import mapKeys from "lodash/mapKeys";
import camelCase from "lodash/camelCase";
import snakeCase from "lodash/snakeCase";
import padStart from "lodash/padStart";
import { SPORTSBOOKS_PROVIDERS } from "@lib/constant";
import sample from "lodash/sample";
import { Game } from "@framework/types";
import { CookieStorage } from "@lib/cookie";
import { CookieKeys } from "@lib/constant";
import { DefaultPageProps } from "@framework/types";
import moment from "moment";
import { IncomingMessage, ServerResponse } from "http";
import { setCookie } from "cookies-next";
import { PRODUCT_TYPES } from "@lib/constant";
import { useUI } from "@contexts/ui-context";

export function pickRandom(items: any[]) {
  const keys = Object.keys(items);
  const min = 0;
  const max = keys.length;
  const index = Math.floor(Math.random() * (max - min)) + min;
  return items[index];
}

export const convertSnackCaseToCamelCase = (errorsConvert: object) =>
  mapKeys(errorsConvert, (value, key) => camelCase(key));

export const convertCamelCaseToSnackCase = (errorsConvert: object) =>
  mapKeys(errorsConvert, (value, key) => snakeCase(key));

export const convertFormatErrors = (errors) => {
  const errorsConvert = Object.keys(errors).reduce((obj, item) => {
    obj[item] = errors[item].join();
    return obj;
  }, {});
  return convertSnackCaseToCamelCase(errorsConvert);
};

export const securityQuestionFormat = (num: string | number) => {
  if (num == 1) {
    return "Nama Hewan Peliharaan";
  } else if (num == 2) {
    return "Nama Sekolah SMA";
  } else if (num == 3) {
    return "Nama Pacar Pertama";
  } else {
    return "-";
  }
};

export const GetDataBetween = (date1?: any, date2?: any) => {
  var start = moment(date1, "YYYY-MM-DD");
  var end = moment(date2, "YYYY-MM-DD");
  const dateResult = moment.duration(start.diff(end)).asDays();
  return Math.floor(dateResult);
};

export const currencyFormat = (num: string | number) => {
  let number = +num;
  return number.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
};

export const numberFormat = (value: any) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "idr",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(value);

export const dateFormat = (value: any) => {
  const dataValue = value ? value : "";
  const NewData = moment(dataValue).format("DD-MM-YYYY HH:MM:SS");

  return NewData;
};

export const dateFormatShow = (value: any) => {
  const dataValue = value ? value : "";
  const NewData = moment(dataValue).local().format("dddd, D mm HH:MM");

  return NewData;
};

export const exportRekening = (value: any) => {
  const dataValue = value ? value : "";
  const hasil = dataValue.replace(/ /g, "#").toUpperCase();
  return hasil;
};

export const ListBank = [
  {
    name: "BCA",
    value: "BCA",
  },
  {
    name: "BNI",
    value: "BNI",
  },
  {
    name: "BRI",
    value: "BRI",
  },
  {
    name: "MANDIRI",
    value: "MANDIRI",
  },
  {
    name: "CIMB",
    value: "CIMB",
  },
  {
    name: "DANAMON",
    value: "DANAMON",
  },
];

type RandomBanner =
  | "arcade"
  | "poker"
  | "casino"
  | "arcade"
  | "sport"
  | "togel";

export function GetRandomBanner(type: RandomBanner) {
  const { template } = useUI();
  const SPORTSBOOKS_IMAGES = [
    {
      alt: "sportsbook",
      width: 468,
      height: 271,
      src: `/images/theme/${template}/sports/sportsbook1.png`,
    },
    {
      alt: "sportsbook",
      width: 468,
      height: 271,
      src: `/images/theme/${template}/sports/sportsbook2.png`,
    },
    {
      alt: "sportsbook",
      width: 468,
      height: 271,
      src: `/images/theme/${template}/sports/sportsbook3.png`,
    },
  ];
  if (type === "sport") {
    return sample(SPORTSBOOKS_IMAGES);
  }
}

export function getSportsProvider(provider: string) {
  return SPORTSBOOKS_PROVIDERS.find((i) => i.provider === provider);
}

export function isPlural(word: string) {
  return ["slot", "casino", "sport", "arcade", "poker"].includes(word);
}

export const saveSelectedGame = (game: Game) => {
  const {
    _id,
    type,
    provider,
    image,
    game_name,
    provider_display,
    provider_name,
  } = game;
  const gameData = {
    _id,
    type,
    provider,
    image,
    game_name,
    provider_display,
    provider_name,
  };
  CookieStorage.set(CookieKeys.SelectedGame, gameData);
};

export const handleTruncate = (data: string) => {
  if (data) {
    const dataLength = data ? data.length : 0;
    const dataTotal = dataLength - 5;
    const dataHasil = ".." + data.slice(dataTotal, dataLength);

    return dataHasil;
  }
};

export const saveConfigToCookie = (config: DefaultPageProps["config"]) => {
  CookieStorage.set(CookieKeys.API_ENDPOINT, config?.api_endpoint);
  CookieStorage.set(CookieKeys.API_KEY, config?.api_key);
  CookieStorage.set(CookieKeys.LOBBY_URL, config?.lobby_url);
  CookieStorage.set(CookieKeys.TITLE, config?.config.title);
  CookieStorage.set(CookieKeys.TEMPLATE, config?.config.template);
  CookieStorage.set(CookieKeys.INSTANT_DEPO, config?.config.instant_deposit);
  CookieStorage.set(CookieKeys.LIVE_EVENT, config?.config.live_event);
};

export const setCookieConfig = (
  config: DefaultPageProps["config"],
  req: IncomingMessage,
  res: ServerResponse
) => {
  setCookie(CookieKeys.API_ENDPOINT, config?.api_endpoint, { req, res });
  setCookie(CookieKeys.API_KEY, config?.api_key, { req, res });
  setCookie(CookieKeys.LOBBY_URL, config?.lobby_url, { req, res });
  setCookie(CookieKeys.TITLE, config?.config.title, { req, res });
  setCookie(CookieKeys.TEMPLATE, config?.config.template, { req, res });
  setCookie(CookieKeys.INSTANT_DEPO, config?.config.instant_deposit, {
    req,
    res,
  });
  setCookie(CookieKeys.LIVE_EVENT, config?.config.live_event, {
    req,
    res,
  });
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=600, stale-while-revalidate=59"
  );
};

export const getApiEndpoint = () => CookieStorage.get(CookieKeys?.API_ENDPOINT);
export const getApiKey = () => CookieStorage.get(CookieKeys?.API_KEY);
export const getTitle = () => CookieStorage.get(CookieKeys?.TITLE);
export const getTemplate = () => CookieStorage.get(CookieKeys?.TEMPLATE);
export const getInstantDepo = () => CookieStorage.get(CookieKeys?.INSTANT_DEPO);
export const getLiveEvent = () => CookieStorage.get(CookieKeys?.LIVE_EVENT);

export const getCountDownToCloseHour = (
  closeHour: string,
  type?: number
): string => {
  if (!closeHour) return "";
  const today = new Date();
  const todayISODate = today.toISOString().split("T")[0];
  if (Array.isArray(closeHour)) {
    const todayDateString = today.toISOString().split("T")[0];
    const close_hours = closeHour.map((dt) => {
      if (moment(dt).isBefore(moment())) {
        moment(todayCLose).add(1, "days").toISOString();
      }
      return dt;
    });
    const sortedCloseHour = close_hours.sort((a, b) => {
      const timeA = a.split("T")[1];
      const timeB = b.split("T")[1];
      const dateA = new Date(`${todayDateString}T${timeA}`);
      const dateB = new Date(`${todayDateString}T${timeB}`);
      return dateA.getTime() - dateB.getTime();
    });
    closeHour = sortedCloseHour[0];
    for (let i = 0; i < sortedCloseHour.length; i++) {
      const ch = sortedCloseHour[i];
      const nch = new Date(`${todayISODate}T${ch.split("T")[1]}`);
      if (moment(nch).isAfter(moment())) {
        closeHour = ch;
        break;
      }
    }
  }
  const time = closeHour.split("T")[1];
  let todayCLose = moment(new Date(`${todayISODate}T${time}`));
  if (todayCLose.isBefore(moment())) {
    todayCLose = moment(todayCLose).add(1, "days");
  }
  const hours = todayCLose.diff(moment(), "hours");
  const minutes = todayCLose.diff(moment(), "minutes") % 60;
  const seconds = todayCLose.diff(moment(), "seconds") % 60;

  if (type == 0) {
    return `${padStart(hours.toString(), 2, "0")}`;
  } else if (type == 1) {
    return `${padStart(minutes.toString(), 2, "0")}`;
  } else if (type == 2) {
    return `${padStart(seconds.toString(), 2, "0")}`;
  } else {
    return "";
  }
};

export const getAllProductPaths = (sites: string[]) => {
  const paths = [];
  for (let i = 0; i < sites.length; i++) {
    const site = sites[i];
    for (let j = 0; j < PRODUCT_TYPES.length; j++) {
      const type = PRODUCT_TYPES[j];
      paths.push({
        params: {
          site,
          type,
        },
      });
    }
  }
  return paths;
};

export const getProvidersByType = (gameTypes: any[], allData = false) => {
  const providers = [];
  for (let i = 0; i < gameTypes.length; i++) {
    const providersByType = gameTypes[i];
    for (let j = 0; j < providersByType.providers.length; j++) {
      const item = providersByType.providers[j];
      if (allData) {
        providers.push(item);
      } else {
        providers.push(item.provider);
      }
    }
  }
  return providers;
};

export function getUnique(arr: any, index: string) {
  const unique = arr
    ?.map((e: any) => e[index])
    // store the keys of the unique objects
    .map((e: any, i: number, final: any) => final.indexOf(e) === i && i)
    // eliminate the dead keys & store unique objects
    .filter((e: any) => arr[e])
    .map((e: any) => arr[e]);
  return unique;
}
