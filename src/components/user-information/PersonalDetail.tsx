import React from "react";
import { useUserQuery } from "@framework/user/get-user-profile";
import moment from "moment";
import { useTranslation } from "next-i18next";
import { useUI } from "../../contexts/ui-context";

const PersonalDetail = () => {
  const { t } = useTranslation("common");
  const { data } = useUserQuery();

  const { isReady } = useUI();
  const label = "text-sm md:text-base font-normal text-whiteDefault-60";
  const textStyle = "text-base md:text-lg font-normal md:font-bold text-white";

  return (
    <div
      className={`bg_content_user_container lg:w-full lg:mx-auto md:rounded-[10px] lg:text-white lg:py-6 lg:mb-4 space-y-4 px-mobile py-4 lg:p-6`}
    >
      <div className="flex flex-col space-y-1">
        <label className={label}>{t("text-username")}</label>
        <span className={textStyle}>{isReady ? data?.username : null}</span>
      </div>
      <div className="flex flex-col space-y-1">
        <label className={label}>{t("text-join-date")}</label>
        <span className={textStyle}>
          {isReady ? moment(data?.created_at).format("YYYY-MM-DD HH:mm") : null}
        </span>
      </div>
    </div>
  );
};

export default PersonalDetail;
