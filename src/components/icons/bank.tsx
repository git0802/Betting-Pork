import React from "react";
import dynamic from "next/dynamic";

function IconBank({ name, style }: { name: string, style: string }) {
  const setBankIcon = (name: string, style: string) => {
    switch (name) {
      case "bca":
        const IconBca:any = dynamic(()=>(import("public/icons/bank/bca.svg")));
        return <IconBca className={style} />;
      case "bni":
        const IconBni:any = dynamic(()=>(import("public/icons/bank/bni.svg")));
        return <IconBni className={style} />;
      case "bri":
        const IconBri:any = dynamic(()=>(import("public/icons/bank/bri.svg")));
        return <IconBri className={style} />;
      case "mandiri":
        const IconMandiri:any = dynamic(()=>(import("public/icons/bank/mandiri.svg")));
        return <IconMandiri className={style} />;
      case "danamon":
        const IconDanamon:any = dynamic(()=>(import("public/icons/bank/danamon.svg")));
        return <IconDanamon className={style} />;
      case "cimb":
        const IconCimb:any = dynamic(()=>(import("public/icons/bank/cimb.svg")));
        return <IconCimb className={style} />;
      case "dana":
        const IconDana:any = dynamic(()=>(import("public/icons/bank/dana.svg")));
        return <IconDana className={style} />;
      case "gopay":
        const IconGopay:any = dynamic(()=>(import("public/icons/bank/gopay.svg")));
        return <IconGopay className={style} />;
      case "linkaja":
        const IconLinkAja:any = dynamic(()=>(import("public/icons/bank/linkaja.svg")));
        return <IconLinkAja className={style} />;
      case "ovo":
        const IconOvo:any = dynamic(()=>(import("public/icons/bank/ovo.svg")));
        return <IconOvo className={style} />;
      default:
        break;
    }
  };

  return (
    <>
      {setBankIcon(name, style)}
    </>
  )
}

export default IconBank;
