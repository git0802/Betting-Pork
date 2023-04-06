import React, { useMemo } from "react";
import { useUserQuery } from "@framework/user/get-user-profile";
import Image from "next/image";
import { AiOutlinePlus } from "react-icons/ai";
import { useUI } from "@contexts/ui-context";
import IconBank from "@components/icons/bank";

const PaymentChannel = () => {
  const { data: dataUser, refetch }: any = useUserQuery();

  const { setModalView, openModal, setModalData } = useUI();

  const dataPaymentChannel = useMemo(() => {
    if (dataUser) {
      if (dataUser?.bank_account_number && dataUser?.bank_name) {
        return [
          {
            bank_account_name: dataUser.bank_account_name,
            bank_account_number: dataUser.bank_account_number,
            bank_name: dataUser.bank_name,
          },
          ...dataUser.banks,
          ...dataUser.e_wallets.map((item: any) => ({
            bank_account_name: item.e_wallet_account_name,
            bank_account_number: item.e_wallet_account_number,
            bank_name: item.e_wallet_name,
          })),
        ];
      }
      return [
        ...dataUser.banks,
        ...dataUser.e_wallets.map((item: any) => ({
          bank_account_name: item.e_wallet_account_name,
          bank_account_number: item.e_wallet_account_number,
          bank_name: item.e_wallet_name,
        })),
      ];
    }
    return [];
  }, [dataUser]);

  const handleOpenModalCreate = (e: any) => {
    e.preventDefault();
    setModalData({ refetchUser: refetch, username: dataPaymentChannel[0]?.bank_account_name });
    setModalView("PAYMENT_CHANNEL_CREATE");
    openModal();
  };
  
  return (
    <div className={`bg_content_user_container lg:w-full py-4 md:py-0 px-mobile px-desktop md:px-0 lg:bg-transparent lg:bg-none`}>
      <div className="sm:mx-auto sm:w-full grid grid-cols-1 sm:grid-cols-4 gap-4">
        {dataPaymentChannel.map((item: any, index: number) => (
          <div
            key={index}
            className={`bg_cont_payment_body w-full sm:h-[180px] rounded-[10px]`}
          >
            <div className={`bg_cont_payment_header sm:h-[58px] rounded-t-[10px] flex items-center px-5 pt-5 sm:py-0`}>
              <IconBank
                name={item.bank_name.toLowerCase()}
                style="w-[55px] h-[18px]"
              />
            </div>
            <div className="px-5 py-4 flex flex-col">
              <span className="text-white font-bold text-base">
                {item.bank_account_name}
              </span>
              <span className="text-[#d3f2ff80] text-xs">
                {item.bank_account_number}
              </span>
            </div>
          </div>
        ))}
        <button
          onClick={handleOpenModalCreate}
          className={`w-full sm:h-[180px] h-[60px] cursor-pointer rounded-[10px] bg-[#d3f2ff33] flex justify-center items-center sm:flex-col sm:space-y-4 space-x-4 sm:space-x-0`}
        >
          <AiOutlinePlus className="text-white sm:w-[35px] sm:h-[35px] w-[20px] h-[20px]" />
          <span className="text-white text-center sm:w-24">
            Tambah Pembayaran
          </span>
        </button>
      </div>
    </div>
  );
};

export default PaymentChannel;
