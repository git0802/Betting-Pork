import Image from "next/image";
import bca from "../../../public/images/bank/bca.png";
import mandiri from "../../../public/images/bank/mandiri.png";
import bri from "../../../public/images/bank/bri.png";
import bni from "../../../public/images/bank/bni.png";
import ovo from "../../../public/images/bank/ovo.png";
import dana from "../../../public/images/bank/dana.png";
import gopay from "../../../public/images/bank/gopay.png";
import linkaja from "../../../public/images/bank/linkaja.png";
import cimb from "../../../public/images/bank/cimb.png";
import danamon from "../../../public/images/bank/danamon.png";

export const BankIcon = (data: any , scale? : number) => {
  const scaleImage  = scale ? scale : 1
  if (data == "MANDIRI") {
    return <Image alt="" src={mandiri} width={50 * scaleImage} height={15 * scaleImage} />;
  } else if (data == "GOPAY") {
    return <Image alt="" src={gopay} width={50 * scaleImage} height={11 * scaleImage}  />;
  } else if (data == "LINKAJA") {
    return <Image alt="" src={linkaja} width={45 * scaleImage} height={11 * scaleImage} />;
  } else if (data == "OVO") {
    return <Image alt="" src={ovo} width={35 * scaleImage} height={11 * scaleImage} />;
  } else if (data == "DANA") {
    return <Image alt="" src={dana} width={50 * scaleImage} height={15 * scaleImage} />;
  } else if (data == "BNI") {
    return <Image alt="" src={bni} width={35 * scaleImage} height={11 * scaleImage} />;
  } else if (data == "BCA") {
    return <Image alt="" src={bca} width={35 * scaleImage} height={11 * scaleImage} />;
  } else if (data == "BRI") {
    return <Image alt="" src={bri} width={35 * scaleImage} height={11 * scaleImage} />;
  } else if (data == "DANAMON") {
    return <Image alt="" src={danamon} width={50 * scaleImage} height={18 * scaleImage} />;
  } else if (data == "CIMB") {
    return <Image alt="" src={cimb} width={50 * scaleImage} height={14 * scaleImage} />;
  }
};

export const generateUniqueNumber = (value: number) => {
  return value + Math.floor(Math.random() * 1000);
};
