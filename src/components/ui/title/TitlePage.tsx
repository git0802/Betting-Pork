import IconPromo from "public/icons/header/promo.svg";
import IconProfil from "public/icons/header/personal.svg";
import IconWallet from "public/icons/header/deposit.svg";
import IconReferral from "public/icons/iconReferral.svg";
import IconTransaction from "public/icons/header/transaction.svg";
import IconNotification from "public/icons/notification.svg";
import IconTogel from "public/icons/header/togel.svg";
import IconEvent from "public/icons/header/event.svg";

const TitlePage = ({
  page,
  title,
  subtitle,
}: {
  page: string;
  title: string;
  subtitle?: string;
}) => {
  const IconTypeGame = (name: string) => {
    switch (name) {
      case "promo":
        return <IconPromo className="w-[28px] h-[28px] text-white" />;
      case "profil":
        return <IconProfil className="w-[28px] h-[28px] text-white" />;
      case "wallet":
        return <IconWallet className="w-[28px] h-[28px] text-white" />;
      case "referral":
        return <IconReferral className="w-[28px] h-[28px] text-white" />;
      case "transaction":
        return <IconTransaction className="w-[28px] h-[28px] text-white" />;
      case "notification":
        return <IconNotification className="w-[28px] h-[28px] text-white" />;
      case "togel":
        return <IconTogel className="w-[28px] h-[28px] text-white" />;
      case "events":
        return <IconEvent className="w-[28px] h-[28px] text-white" />;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col mt-[35px] md:mt-[12px] lg:items-start items-center">
      <div className="flex flex-row gap-3 items-center">
        {IconTypeGame(page)}
        <h1 className="font-light text-[#EAF5FF] text-[32px] text-center uppercase">
          {title}
        </h1>
      </div>
      {subtitle ? (
        <p className="text-whiteDefault-50 text-base font-normal mt-[10px] md:mt-3 text-center capitalize">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
};

export default TitlePage;
