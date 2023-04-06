import React, { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { IconHeaderLiveHelp } from "@components/icons";
import { useDevice } from "@contexts/device-context";
interface Props {
  license: string;
  onClose: () => void;
}

function LC({ license, onClose }: Props) {
  const [showLoading, setShowLoading] = useState(true);

  const device = useDevice();

  return (
    <div>
      {device.isTabDevice ? (
        <div className="fixed z-[200] w-full h-full bg-white top-0 left-0 flex items-center justify-center">
          <div className="absolute -z-[1] flex flex-col items-center justify-center">
            <IconHeaderLiveHelp className="text-black w-20 h-20 animate-pulse" />
            <span className="text-black/50">Loading..</span>
          </div>
          <button
            onClick={() => {
              onClose();
            }}
            className="absolute right-2 top-2 text-black active:text-red-500 rounded-full"
          >
            <IoMdCloseCircle className="w-6 h-6 font-bold" />
          </button>
          <iframe
            height="100%"
            width="100%"
            src={`https://secure.livechatinc.com/licence/${license}/open_chat.cgi`}
          ></iframe>
        </div>
      ) : (
        <div className="fixed w-[300px] h-[450px] z-[200] bg-white bottom-10 right-10 transition-all ease-in-out bg-center bg-no-repeat bg-[length:100px_100px] flex items-center justify-center">
          <div className="absolute -z-[1] flex flex-col items-center justify-center">
            <IconHeaderLiveHelp className="text-black w-20 h-20 animate-pulse" />
            <span className="text-black/50">Loading..</span>
          </div>
          <button
            onClick={() => {
              onClose();
            }}
            className="absolute right-2 top-2 text-black hover:text-red-500 active:text-red-500 rounded-full  hover:drop-shadow-md"
          >
            <IoMdCloseCircle className="w-5 h-5 font-bold" />
          </button>
          <iframe
            height="450px"
            width="300px"
            src={`https://secure.livechatinc.com/licence/${license}/open_chat.cgi`}
            onLoad={() => {
              setShowLoading(false);
            }}
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default LC;
