import Skeleton from "@components/ui/skeleton";
import { useUI } from "@contexts/ui-context";
import { Notification } from "@framework/types";
import moment from "moment";
import React, { useMemo } from "react";
import { updateReadMemoInbox } from "@framework/memo/get-memo-inbox";
import { useUnreadNotificationQuery } from "src/framework/basic-rest/notification/get-unread";
import parse, {
  DOMNode,
  domToReact,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser";

const NotificationRow = ({ data, refetch }: { data: any; refetch: any }) => {
  const options: HTMLReactParserOptions = {
    replace: (domNode: DOMNode) => {
      if (domNode instanceof Element && domNode.name == "p") {
        return (
          <div className=" relative w-full flex max-w-[80vw] lg:max-w-none">
                <p className="w-full flex flex-col break-words">{domToReact(domNode.children)}</p>
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
  const { openModal, setModalView, setModalData, setCountNotification } =
    useUI();
  const { data: getTotalNotification, refetch: refetchGetNotif } =
    useUnreadNotificationQuery();
  const totalNotification = getTotalNotification
    ? getTotalNotification?.data?.total_unread
    : 0;
  moment.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s",
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

  const handleReadNotif = (
    id: string,
    status: string,
    msg: string,
    dt: string
  ) => {
    refetchGetNotif();
    setModalData({ data: { message: msg, date: dt } });
    setModalView("NOTIFICATION_READ");
    TotalNotif;
    if (status === "unread") {
      updateReadMemoInbox(id);
    }
    refetch();
    return openModal();
  };

  const TotalNotif = useMemo(() => {
    setCountNotification(totalNotification);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalNotification]);

  return (
    <>
      {!data &&
        [0, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
          <div
            key={item}
            className="flex flex-col items-start xl:flex-row xl:items-center lg:justify-between w-full min-h-[55px] cursor-pointer odd:bg-[#a6a6a60d] even:bg-[#FFFFFF0D] hover:bg-[rgba(0,0,0,0.5)]"
          >
            <Skeleton width="100%" height="72" />
          </div>
        ))}
      {data?.map((item: Notification, index: number) => (
        <div
          key={index}
          onClick={() =>
            handleReadNotif(
              item?._id,
              item?.status,
              item?.message,
              item?.created_at
            )
          }
          className="flex flex-col  items-start xl:flex-row xl:items-center lg:justify-between w-full min-h-[72px]  max-h-[72px overflow-hidden px-[25px] lg:px-10 py-5 lg:py-4 cursor-pointer even:bg-[#FFFFFF0D] hover:bg-[rgba(0,0,0,0.5)]"
        >
          <div className="flex  flex-row justify-between items-center w-full xl:w-fit xl:pr-5 mb-[10px] xl:mb-0">
            <div className="flex flex-row items-center justify-between">
              <span
                className={`w-[100px] xl:w-[150px] notif-status ${
                  item?.status == "unread" ? "unread ml-5" : "ml-0 lg:ml-5"
                } capitalize text-[14px]font-bold xl:text-[14px] text-[#D3F2FF] xl:font-normal`}
              >
                admin
              </span>
              <span className="capitalize bg-[#FFB80033] text-[#FFA800] text-[10px] md:text-sm text-center font-bold px-[7px] md:px-[10px] py-[3px] md:py-[5px] rounded">
                {item?.type === "general" ? "umum" : item?.type}
              </span>
            </div>
            <span className="xl:hidden text-xs text-whiteDefault-50 font-normal capitalize  text-right">
              {moment(item?.created_at).startOf("h").fromNow()}
            </span>
          </div>
          <p className="capitalize relative md:max-h-[4.5rem]   max-w-[900px] flex-1 text-[14px] text-[#D3F2FF] font-normal text-left">
            <p className=" block break-words break-all">
              {parse(
                item?.message.slice(0, 150) +
                  (item?.message.length > 150 ? "... " : ""),
                options
              )}{" "}
              {}
            </p>
          </p>
          <span className="hidden xl:block w-[60px] pl-2 text-right text-[14px] text-[#D3F2FF80] font-normal">
            {moment(item?.created_at).startOf("h").fromNow()}
          </span>
        </div>
      ))}
    </>
  );
};

export default NotificationRow;
