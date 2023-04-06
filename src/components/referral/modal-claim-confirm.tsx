import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { useLoginMutation, LoginInputType } from "@framework/auth/use-login";
import { useUI } from "@contexts/ui-context";
import { useTranslation } from "next-i18next";
import router from "next/router";
import { IoClose } from "react-icons/io5";

const closeBtnClasses = {
  center: "-top-3.5 md:-top-4 -end-3.5 md:-end-4",
  bottom: "top-1/4 start-1/2 transform -translate-y-1/2 -translate-x-1/2",
};

const ClaimConfirm: React.FC = () => {
  const { t } = useTranslation();
  const { setModalView, openModal, closeModal } = useUI();
  const { mutate: login, isLoading } = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputType>();

  function onSubmit({ username, password, remember_me }: LoginInputType) {
    login({
      username,
      password,
      remember_me,
    });
  }

  return (
    <div className="w-full mx-auto flex flex-col overflow-hidden border border-blueDefault-45 rounded-lg p-5 sm:w-96 md:w-[360px]">
      <div className="flex items-center justify-between relative mb-5">
        <span className="uppercase">Claim pendapatan</span>
        <button onClick={closeModal} aria-label="Close panel" className="h-5">
          <IoClose className="text-xl" />
          &nbsp;
        </button>
      </div>
      <div className="flex flex-col text-center space-y-5">
        <h5 className="capitalize">Claim Anda berhasil</h5>
        <h3 className="capitalize">
          Anda dapat melakukan claim selanjutnya di tanggal 1/12/2022
        </h3>
      </div>
      <div className="grid mt-5">
        <Button
          type="submit"
          variant="primary"
          loading={isLoading}
          disabled={isLoading}
          tabIndex={3}
          className="flex flex-row h-11 font-extrabold text-sm px-5 capitalize"
          onClick={closeModal}
        >
          {t("common:text-submit")}
        </Button>
      </div>
    </div>
  );
};

export default ClaimConfirm;
