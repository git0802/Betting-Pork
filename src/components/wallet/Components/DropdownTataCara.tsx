import TextBCA from "@components/text-transfer/BCA.json";
import TextBNI from "@components/text-transfer/BNI.json";
import TextBRI from "@components/text-transfer/BRI.json";
import TextCIMB from "@components/text-transfer/CIMB.json";
import TextDANA from "@components/text-transfer/DANA.json";
import TextDANAMON from "@components/text-transfer/DANAMON.json";
import TextGOPAY from "@components/text-transfer/GOPAY.json";
import TextLINKAJA from "@components/text-transfer/LINKAJA.json";
import TextMANDIRI from "@components/text-transfer/MANDIRI.json";
import TextOVO from "@components/text-transfer/OVO.json";
import { useQueryBankList } from "@framework/user/get-bank-list";
import { getUnique } from "@utils/functionutil";
import { useEffect, useMemo, useState } from "react";
import { DropdownTataCaraItem } from "./DropdownTataCaraItem";
interface DropdownCustomType {
  data?: string[] | string | object;
  bank?: string;
  onChange?: any;
  useTititle?: boolean;
  title?: string;
  value?: string;
  labelKey?: string;
  tabIndex?: number;
  selected?: string;
  placeholder?: string;
  noRekning?: string;
}

export const DropdownTataCara = (props: DropdownCustomType) => {
  const { data: ListBankForFilter } = useQueryBankList();

  const BankListFilter = useMemo(() => {
    const uniqListBank: any = [];
    uniqListBank.push(getUnique(ListBankForFilter, "bank"));
    return uniqListBank;
  }, [ListBankForFilter]);

  const [Open, setOpen] = useState("BCA");
  const [DataText, setDataText] = useState<any>([]);

  useEffect(() => {
    if (props.bank !== Open && props.bank) {
      setOpen(props.bank);
    }
  }, [props.bank, Open]);

  const RenderData = () => {
    let DataDropdown = [];
    DataDropdown.push(TextBCA);
    DataDropdown.push(TextBNI);
    DataDropdown.push(TextBRI);
    DataDropdown.push(TextCIMB);
    DataDropdown.push(TextDANA);
    DataDropdown.push(TextDANAMON);
    DataDropdown.push(TextGOPAY);
    DataDropdown.push(TextLINKAJA);
    DataDropdown.push(TextMANDIRI);
    DataDropdown.push(TextOVO);
    setDataText(DataDropdown);
  };

  useEffect(() => {
    RenderData();
  }, []);

  const DataRenderBank = () => {

    return DataText?.map((value: any, index: number) => {
      if (BankListFilter[0] !== undefined) {
      return  BankListFilter[0]?.map((valueData: any) => {
          if (value.name == valueData.bank) {
            return (
              <DropdownTataCaraItem
                setOpen={setOpen}
                noRekening={props.noRekning}
                open={Open}
                value={value}
                key={index}
              />
            );
          }
        });
      }
   
    });
    // }
  };

  return <div className="space-y-2 w-full">{DataRenderBank()}</div>;
};
