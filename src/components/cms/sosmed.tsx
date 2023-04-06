import React, { useMemo } from "react";
import {
  FaFacebookF,
  FaTelegramPlane,
  FaLine,
  FaSkype,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import IconTiktok from "/public/icons/sosmed/tiktok.svg"
import { AiFillInstagram } from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";
import { useQueryGetSosmed } from "@framework/cms/get-sosmed";

const CmsSosmed = () => {
  const { data: dataSosmed } = useQueryGetSosmed();
  const filterSosmed = dataSosmed?.filter(
    (item: any) =>
      item.name !== "livechat" &&
      item.value !== "-" &&
      item.name !== "link_alternatif" &&
      item.name !== "analytic"
  );

  const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const setIcon = (iconName: string, value: string) => {
    switch (iconName) {
      case "facebook":
        const linkFb = "https://www.facebook.com/" + value;
        return (
          <a
            className="flex items-center space-x-2 cursor-pointer"
            target="_blank"
            rel="noreferrer"
            href={linkFb}
          >
            <FaFacebookF className="footer_icon_sosmed" />
          </a>
        );
      case "instagram":
        const linkIg = "https://www.instagram.com/" + value;
        return (
          <a
            className="flex items-center space-x-2 cursor-pointer"
            target="_blank"
            rel="noreferrer"
            href={linkIg}
          >
            <AiFillInstagram className="footer_icon_sosmed" />
          </a>
        );
      case "whatsapp":
        const linkWa = "https://wa.me/" + value;
        return (
          <a
            className="flex items-center space-x-2 cursor-pointer"
            target="_blank"
            rel="noreferrer"
            href={linkWa}
          >
            <IoLogoWhatsapp className="footer_icon_sosmed" />
          </a>
        );
      case "telegram":
        const linkTG = "https://telegram.me/" + value;
        return (
          <a
            className="flex items-center space-x-2 cursor-pointer"
            target="_blank"
            rel="noreferrer"
            href={linkTG}
          >
            <FaTelegramPlane className="footer_icon_sosmed" />
          </a>
        );
      case "line":
        const linkLn = "https://line.me/ti/p/" + value;
        return (
          <a
            className="flex items-center space-x-2 cursor-pointer"
            target="_blank"
            rel="noreferrer"
            href={linkLn}
          >
            <FaLine className="footer_icon_sosmed" />
          </a>
        );
      case "skype":
        const linkSk = "https://www.skype.com/" + value;
        return (
          <a
            className="flex items-center space-x-2 cursor-pointer"
            target="_blank"
            rel="noreferrer"
            href={linkSk}
          >
            <FaSkype className="footer_icon_sosmed" />
          </a>
        );
      case "twitter":
        const linkTw = "https://twitter.com/" + value;
        return (
          <a
            className="flex items-center space-x-2 cursor-pointer"
            target="_blank"
            rel="noreferrer"
            href={linkTw}
          >
            <FaTwitter className="footer_icon_sosmed" />
          </a>
        );
      case "youtube":
        const linkYt = "https://www.youtube.com/c/" + value;
        return (
          <a
            className="flex items-center space-x-2 cursor-pointer"
            target="_blank"
            rel="noreferrer"
            href={linkYt}
          >
            <FaYoutube className="footer_icon_sosmed" />
          </a>
        );
      case "tiktok":
        const linkTt = "https://www.tiktok.com/@" + value;
        return (
          <a
            className="flex items-center space-x-2 cursor-pointer"
            target="_blank"
            rel="noreferrer"
            href={linkTt}
          >
            <IconTiktok className="w-[30px] h-[30px]" />
          </a>
        );
      default:
        break;
    }
  };

  const listSosmed = useMemo(() => {
    return filterSosmed?.map((item: any, index: number) => (
      <div
        key={index}
        className={`footer_list_sosmed ${item.name}`}
      >
        {setIcon(item.name, item.value)}
      </div>
    ));
  }, [filterSosmed]);
  return listSosmed;
};

export default CmsSosmed;
