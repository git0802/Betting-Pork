import { useUserQuery } from "@framework/user/get-user-profile";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import HistoryDeposit from "./HistoryPage/HistoryDeposit";
import HistoryWithdraw from "./HistoryPage/HistoryWithdraw";

interface IHistoryProps {
  scrollToTop:()=>void;
}

const History = (props: IHistoryProps) => {
  const { t } = useTranslation("common");
  const { data: datauser }: any = useUserQuery();
  const [PageSelected, setPageSelected] = useState("Deposit");
  const router = useRouter();
  const {
    query: {
      limit,
      page,
      tab,
      type,
      q,
      memberid,
      start_date,
      end_date,
      market,
      period,
      HistoryPage,
    },
  } = router;

  // get Data from api
  useEffect(() => {
    HistoryPage ? setPageSelected(HistoryPage) : null;

    router.push(
      {
        pathname: `/wallet`,
        query: {
          tab: 2,
          page: 1,
          id: datauser?._id,
          limit: 20,
        },
      },
      "",
      { shallow: true }
    );
  }, [PageSelected]);

  const renderHalaman = () => {
    if (PageSelected === "Deposit") {
      return <HistoryDeposit scrollToTop={props.scrollToTop} pageSelcted={setPageSelected} />;
    } else {
      return <HistoryWithdraw scrollToTop={props.scrollToTop} pageSelcted={setPageSelected} />;
    }
  };
  return <>{renderHalaman()}</>;
};

export default History;
