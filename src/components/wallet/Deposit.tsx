import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import DepositInstan from "./DepositPage/DepositInstan";
import DepositNormal from "./DepositPage/DepositNormal";

interface IDepositProps {
  setDepositInstant: (instant: boolean) => void;
  scrollToTop: () => void;
  instant: boolean;
}

const Deposit = (props: IDepositProps) => {
  const { t } = useTranslation("common");

  const router = useRouter();
  const {
    query: {},
  } = router;

  return (
    <>
      {props.instant ? (
        <DepositInstan
          scrollToTop={props.scrollToTop}
          setDepositInstant={props.setDepositInstant}
        />
      ) : (
        <DepositNormal
          scrollToTop={props.scrollToTop}
          setDepositInstant={props.setDepositInstant}
        />
      )}
    </>
  );
};

export default Deposit;
