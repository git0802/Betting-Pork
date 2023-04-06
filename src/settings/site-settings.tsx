import { USFlag } from "@components/icons/USFlag";
import { IDFlag } from "@components/icons/IDFlag";
export const siteSettings = {
  name: "ix-web",
  description: "ix-web",
  author: {
    name: "IT Nation ID",
    websiteUrl: "https://itnationid.com",
    address: "",
  },
  logo: {
    url: "/assets/images/logo.png",
    alt: "",
    href: "/",
    width: 400,
    height: 400,
  },
  defaultLanguage: "en",
  currencyCode: "ID",
  site_topbar: {
    social_instagram: "victorytotoofficial",
    social_twitter: "victorytoto",
    social_tiktok: "victorytoto",
    social_phone: "+888-777-333",
  },
  site_header: {
    menu: [
      {
        id: 1,
        path: "/deposit",
        label: "Deposit",
      },
      {
        id: 2,
        path: "/withdraw",
        label: "Withdraw",
      },
      {
        id: 3,
        path: "/transaction",
        label: "Transaction",
      },
      {
        id: 4,
        path: "/memo",
        label: "Memo",
      },
      {
        id: 5,
        path: "/referral",
        label: "Referral",
      },
    ],
    mobileMenu: [
      {
        id: 1,
        path: "/how-to-play",
        label: "Cara Bermain",
      },
      {
        id: 2,
        path: "/dream-book",
        label: "Buku Mimpi",
      },
      {
        id: 3,
        path: "/togel",
        label: "Hasil Lengkap Togel",
      },
      {
        id: 4,
        path: "/referral",
        label: "Refer a Friend",
      },
    ],
    mobileMenuOther: [
      {
        id: 1,
        path: "/support",
        label: "Support",
      },
      {
        id: 2,
        path: "/about-us",
        label: "About Us",
      },
    ],
    languageMenu: [
      {
        id: "en",
        name: "English - EN",
        value: "en",
        icon: <USFlag width="20px" height="15px" />,
      },
      {
        id: "id",
        name: "Indonesia - ID",
        value: "id",
        icon: <IDFlag width="20px" height="15px" />,
      },
    ],
  },
};
