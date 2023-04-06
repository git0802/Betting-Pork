import { useTranslation } from "next-i18next";
import { useUserQuery } from "@framework/user/get-user-profile";
import { useRouter } from "next/router";
import cn from "classnames";

const PageHeader = () => {
  const { data } = useUserQuery();
  const { pathname } = useRouter();
  const newPathname = pathname.split("/").slice(2, 3);
  const { t } = useTranslation("common");
  return (
    <div
      className={cn(
        "flex justify-center p-6 md:p-10 2xl:p-8 relative bg-no-repeat bg-center bg-cover md:hidden",
        {
          hidden: newPathname[0] === "change-email",
        },
        {
          hidden: newPathname[0] === "change-password",
        },
        {
          hidden: newPathname[0] === "change-pin",
        },
        {
          hidden: newPathname[0] === "status-email",
        }
      )}
    >
      <div className="absolute top-0 start-0 bg-black w-full h-full opacity-50 transition-opacity duration-500 group-hover:opacity-80" />
      <div className="w-full flex flex-col items-center justify-center relative z-10 py-10 md:py-14 lg:py-20 xl:py-24 2xl:py-32 space-y-4">
        <div className="w-20 h-20 rounded-full bg-gray-100"></div>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white text-center">
          {data?.username}
        </h2>
      </div>
    </div>
  );
};

export default PageHeader;
