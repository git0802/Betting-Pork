/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useUI } from "@contexts/ui-context";
import { IoClose } from "react-icons/io5";
import cn from "classnames";
import { useRouter } from "next/router";
import Image from "next/image";

const PinVerificationForm = () => {
  const { closeModal, modalData, setModalData, modalData: { data } } = useUI();
  const router = useRouter();
  const { providers } = data;
  const handleSelectProvider = (provider: string) => {
    closeModal();
    // setModalData({ data: {selectedProvider: provider}});
    setModalData({
      data: { providers: providers, selected: provider },
    });
    return router.push(
      {
        pathname: "/provider-profile/" + provider,
        query: {
          provider: provider as string,
        },
      },
      undefined,
      { shallow: false }
    );
  };

  return (
    <div className="w-full mx-auto overflow-hidden border border-blueDefault-45 rounded-lg pb-5 md:pb-0 h-full sm:w-96 lg:w-[720px] lg:h-[425px]">
      <div className="flex flex-col p-5 w-full h-full">
        <div className="flex items-center justify-between h-5 mb-5 relative">
          <div className="text-xl font-bold">PENYEDIA</div>
          <button
            onClick={closeModal}
            aria-label="Close panel"
            className="absolute right-3 top-0 z-10 items-center justify-center text-CadetGrey-100 hover:text-whiteDefault-100 transition duration-200 focus:outline-none"
          >
            <IoClose className="text-xl" />
          </button>
        </div>
        <div className="overflow-y-scroll space-y-2 w-full">
          {modalData &&
            modalData?.data?.providers?.map((provider: any, i: number) => {
              return (
                <button
                  onClick={() => handleSelectProvider(provider?.key)}
                  className={cn(
                    "flex gap-3 items-center py-2.5 px-4 rounded-[5px] w-full text-white",
                    {
                      "bg-[#1AA9E7] ":
                        provider.title === modalData?.data?.selected,
                      "tidak aktif":
                        provider.title !== modalData?.data?.providers,
                    }
                  )}
                  key={i}
                >
                  <Image
                    alt={provider?.title}
                    src={provider?.image_url}
                    width={25}
                    height={20}
                    quality={100}
                    objectFit="contain"
                  />
                  <div>{provider?.title.toUpperCase()}</div>
                  {provider?.title?.toLowerCase() === "joker" && (
                    <div className="">
                      <Image
                        alt=""
                        src="/images/provider/joker/hot.png"
                        width={25}
                        height={25}
                        quality={100}
                        objectFit="contain"
                      />
                    </div>
                  )}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default PinVerificationForm;
