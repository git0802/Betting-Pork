import Image from "next/image";
import Link from "@components/ui/link";
import cn from "classnames";
import { siteSettings } from "@settings/site-settings";

const Logo: React.FC<React.AnchorHTMLAttributes<{}>> = ({
  className,
  ...props
}) => {
  return (
    <Link
      href={siteSettings.logo.href}
      className={cn(
        "inline-flex focus:outline-none items-center logo",
        className
      )}
      {...props}
    >
      <Image
        src={siteSettings.logo.url}
        alt={siteSettings.logo.alt}
        height={900}
        width={900}
        loading="eager"
        className="w-full"
      />
      {/* <div className="font-bold text-gray-600">{siteSettings.name}</div> */}
    </Link>
  );
};

export default Logo;
