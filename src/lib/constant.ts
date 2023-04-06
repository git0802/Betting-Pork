export const CookieKeys = {
  AuthToken: "@user-web/authToken",
  AuthPin: "@user-web/authPin",
  hasPin: "@user-web/hasPin",
  User: "@user-web/user",
  SelectedGame: "@user-web/selected-game",
  API_KEY: "@user-web/apiKey",
  API_ENDPOINT: "@user-web/apiEndpoint",
  LOBBY_URL: "@user-web/lobbyUrl",
  TITLE: "@user-web/title",
  TEMPLATE: "@user-web/template",
  INSTANT_DEPO: "@user-web/instanDepo",
  LIVE_EVENT: "@user-web/liveEvent",
};

export const DATE_TIME_FORMAT = {
  YEAR_MONTH_DATE_FORMAT: "YYYY-MM-DD",
  HOUR_FORMAT: "HH:mm",
  FULL_TIME_FORMAT: "YYYY-MM-DD HH:mm",
  FULL_TIME_FORMAT_SECONDS: "YYYY-MM-DD HH:mm:ss",
};

export type SportsBooksItems = {
  alt: string;
  width: number;
  height: number;
  src: string;
};

export const SPORTSBOOKS_IMAGES = [
  {
    alt: "sportsbook",
    width: 468,
    height: 271,
    src: "/images/sports/sportsbook1.png",
  },
  {
    alt: "sportsbook",
    width: 468,
    height: 271,
    src: "/images/sports/sportsbook2.png",
  },
  {
    alt: "sportsbook",
    width: 468,
    height: 271,
    src: "/images/sports/sportsbook3.png",
  },
];

export const SPORTSBOOKS_PROVIDERS = [
  {
    provider: "awc",
    alt: "awc",
    width: 100,
    height: 30,
    src: "/images/provider/logo/awc.png",
  },
  {
    provider: "sbo",
    alt: "sbo",
    width: 100,
    height: 30,
    src: "/images/provider/logo/sbo.png",
  },
  {
    provider: "pragmatic",
    alt: "pragmatic",
    width: 100,
    height: 40,
    src: "/images/provider/logo/pragmatic.png",
  },
  {
    provider: "cq9",
    alt: "cq9",
    width: 80,
    height: 30,
    src: "/images/provider/logo/cq9.png",
  },
  {
    provider: "saba",
    alt: "saba",
    width: 90,
    height: 35,
    src: "/images/provider/logo/saba-sport.png",
  },
];

export const PRODUCT_TYPES = ["slot", "casino", "sport", "arcade", "poker"];
