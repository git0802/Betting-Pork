import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { useLoginMutation, LoginInputType } from "@framework/auth/use-login";
import { useUI } from "@contexts/ui-context";
import { useTranslation } from "next-i18next";
import CloseIcon from "@components/icons/close-icon";
import CurrencyFormat from "react-currency-format";
import { IoClose } from "react-icons/io5";
import { useClaimCommissionMutation } from "@framework/user/use-user-claim-commission";

const ClaimBonus: React.FC = () => {
  const { t } = useTranslation();
  const {
    modalData: { data },
    setModalView,
    openModal,
    closeModal,
  } = useUI();
  const { mutate: Claim, isLoading } = useClaimCommissionMutation();
  const { amount } = data;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputType>();

  function onSubmit() {
    Claim({
      amount: amount,
    });
  }

  return (
    <div className="w-full mx-auto flex flex-col overflow-hidden md:border md:border-blueDefault-45 rounded-lg px-[35px] py-[30px] sm:w-96 md:w-[360px]">
      <div className="flex items-center justify-between relative mb-5">
        <span className="uppercase">{t("forms:label-claim-commission")}</span>
        {/* <button onClick={closeModal} aria-label="Close panel" className="h-5">
          <CloseIcon />
        </button> */}
        <button
          onClick={closeModal} aria-label="Close panel"
          className="inline-flex items-center justify-center text-CadetGrey-100 hover:text-whiteDefault-100 transition duration-200 focus:outline-none"
        >
          <IoClose className="text-xl" />
        </button>
      </div>
      <div className="flex flex-col">
        <label className="text-[20px] font-bold text-success">
          Rp
          <CurrencyFormat
            value={amount}
            thousandSeparator={true}
            displayType={"text"}
          />
        </label>
        <label className="capitalize">
          Apakah Anda Yakin akan Klaim Pendapatan referral sekarang?
        </label>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-5">
        <Button
          type="button"
          variant="cancel"
          className="h-11 font-extrabold capitalize"
          onClick={closeModal}
        >
          {t("common:text-cancel")}
        </Button>
        <Button
          type="submit"
          variant="primary"
          loading={isLoading}
          disabled={isLoading}
          tabIndex={3}
          className="flex flex-row h-11 font-extrabold text-sm px-5 capitalize"
          onClick={onSubmit}
        >
          {t("common:text-claim")}
        </Button>
      </div>
    </div>
  );
};

export default ClaimBonus;
