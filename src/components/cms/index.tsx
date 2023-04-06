import React, { useState } from "react";
import { usePageQuery } from "@framework/cms/get-page";
import parse, {
  DOMNode,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser";
import { useTranslation } from "next-i18next";

const CMS = ({ page_name, show_button = false }: { page_name: string, show_button?: boolean, }) => {
  const { t } = useTranslation();
  const [loadingMore, setLoadingMore] = useState<boolean>(false)
  const options: HTMLReactParserOptions = {
    replace: (domNode: DOMNode) => {
      if (
        domNode instanceof Element &&
        domNode.attribs &&
        domNode.attribs.class === "remove"
      ) {
        return <></>;
      }
    },
  };

  let pageCMS: string = "";
  const { data } = usePageQuery();
  const getPage = data?.find(
    ({ name }: { name: string }) => name === page_name
  );
  pageCMS = getPage ? getPage.value : "";
  
  return (
    <div>
      <div className={`${loadingMore ? "truncate max-h-40" : ""} `}>
        {parse(pageCMS, options)}
      </div>
      {!loadingMore ?
        <button
          onClick={() => setLoadingMore(true)}
          className={`${show_button ? "block" : "hidden"} bg-nileBlue-100 hover:bg-[#1AA9E7] hover:text-whiteDefault-100 text-sm font-semibold rounded-md px-7 h-[30px] mx-auto mt-[30px]`}
        >
          {t("common:text-read-more")}
        </button>
        : 
        <button
          onClick={() => setLoadingMore(false)}
          className={`${show_button ? "block" : "hidden"} bg-nileBlue-100 hover:bg-[#1AA9E7] hover:text-whiteDefault-100 text-sm font-semibold rounded-md px-7 h-[30px] mx-auto mt-[30px]`}
        >
          {t("common:text-read-less")}
        </button>
      }
    </div>
  );
};

export default CMS;
