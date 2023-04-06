import Button from "@components/ui/button";
import { useUI } from "@contexts/ui-context";
import { useTranslation } from "next-i18next";
import { formatMoney } from "@framework/user/use-currency";

const DepositForm: React.FC = () => {
  const { t } = useTranslation();
  const {
    modalData: { data },
    closeModal,
  } = useUI();
  const { amount, bank } = data;
  let date = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const total = formatMoney({amount, currencyCode: "IDR", locale: "id-ID"});

  return (
    <div className="w-full px-5 py-5 mx-auto overflow-hidden bg-white border border-gray-300 rounded-lg sm:w-96 md:w-450px sm:px-8">
      <div className="text-center mb-6 pt-2.5">
        <div onClick={closeModal}>
          <div className="w-[120px] h-[120px] rounded-full bg-gray-400 mx-auto"></div>
        </div>
        <p className="mt-2 mb-0 text-sm md:text-base text-body">
          {t("deposit:deposit-submitted-text")}
        </p>
        <p className="mt-2 mb-8 text-sm md:text-base text-body sm:mb-10">
          {t("deposit:deposit-information-text")}
        </p>
      </div>
      <div className="mb-4">
        <div className="p-5 border-t-2 border-b-2 border-gray-350">
          <h3 className="text-sm text-center">Jumlah Transfer</h3>
          <div className="my-2 text-lg font-bold text-center">{total}</div>
          <div className="text-sm text-center text-gray-400">{date}</div>
        </div>
      </div>
      <div className="mb-8">
        <h3>Tujuan Transfer</h3>
        <div className="p-5 bg-gray-200 border-2 rounded-md border-gray-350">
          <div className="flex">
            <div className="w-1/2">
              <div className="text-sm">Name:</div>
              <h2 className="font-semibold">{bank.name}</h2>
            </div>
            <div className="w-1/2">
              <div className="text-sm">Account Number:</div>
              <h2 className="font-semibold">{bank.account_number}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 mx-auto">
        <Button
          type="submit"
          className="h-11 md:h-12 w-full mt-1.5 bg-purple-600"
          onClick={() => closeModal()}
        >
          {t("deposit:text-view-request")}
        </Button>
      </div>
    </div>
  );
};

export default DepositForm;
