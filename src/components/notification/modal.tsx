import { useUI } from "@contexts/ui-context";
import { useTranslation } from "next-i18next";
import { IoClose } from "react-icons/io5";
import moment from "moment";
import parse, {
  DOMNode,
  Element,
  domToReact,
  HTMLReactParserOptions,
} from "html-react-parser";
import { useEffect, useState } from "react";

const ReadNotification: React.FC = () => {
  const { t } = useTranslation();
  moment.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s yang lalu",
      s: "1 detik",
      m: "1 menit",
      mm: "%d menit",
      h: "an jam",
      hh: "%d jam",
      d: "1 hari",
      dd: "%d hari",
      M: "1 bulan",
      MM: "%d bulan",
      y: "1 tahun",
      yy: "%d tahun",
    },
  });

  const options: HTMLReactParserOptions = {
    replace: (domNode: DOMNode) => {
        if (domNode instanceof Element && domNode.name == "p") {
            return (
              <div className=" relative w-full flex break-words break-all">
                    <p className="w-full flex flex-col">{domToReact(domNode.children)}</p>
              </div>
            );
          }
      if (
        domNode instanceof Element &&
        domNode.attribs &&
        domNode.attribs.class === "remove"
      ) {
        return <></>;
      }
    },
  };

  const {
    modalData: { data },
    setModalView,
    openModal,
    closeModal,
  } = useUI();
  const { message, date } = data;

  function handleSignUp() {
    closeModal;
    setModalView("SIGN_UP_VIEW");
    return openModal();
  }

  function handleForgotPassword() {
    closeModal;
    setModalView("FORGET_PASSWORD");
    return openModal();
  }
  return (
    <div className="w-full mx-auto overflow-hidden md:rounded-lg pb-5 md:pb-0 h-full sm:w-96 lg:w-[720px]">
      <div className="flex flex-col px-[36px] py-[30px] overflow-y-auto w-full h-full">
        <div className="flex items-center justify-between relative mb-5">
          <span className="text-xl font-semibold uppercase">Notification</span>
          <button
            onClick={closeModal}
            aria-label="Close panel"
            className="inline-flex items-center justify-center text-CadetGrey-100 hover:text-whiteDefault-100 transition duration-200 focus:outline-none"
          >
            <IoClose className="text-xl" />
          </button>
        </div>
        <div className="text-sm text-[#D3F2FF80] font-normal">
          {moment(date).startOf("h").fromNow()}
        </div>

        <div className="flex flex-col overflow-x-clip relative break-words  break-all">
          {parse(message, options)}
        </div>
      </div>
    </div>
  );
};

export default ReadNotification;
