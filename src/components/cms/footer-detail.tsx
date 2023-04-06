import React, { useState } from "react"; import { usePageQuery } from "@framework/cms/get-page";
import parse, {
  DOMNode,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser";
import { useTranslation } from "next-i18next";
import Button from "@components/ui/button";

const FooterCMS = () => {
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
    ({ name }: { name: string }) => name === "footer"
  );
  pageCMS = getPage ? getPage.value : "";

  return (
    <div className={`${!pageCMS && "hidden"} container mx-auto`}>
      <section className="grid gap-3 px-[18px] md:px-0 mb-[21px] md:mb-0">
        <div 
          className={`${!loadingMore ? "bg_footer_cms_close" : "bg_footer_cms"} ql-editor relative text-whiteDefault-60 p-[30px] md:p-[50px] rounded-[10px]`}>
          <div className={`${!loadingMore ? "max-h-40" : ""} overflow-hidden md:columns-2 md:gap-[30px]`}>
            {parse(pageCMS, options)}
          </div>
          <div className={`${!loadingMore ? "absolute bottom-10 left-0 right-0 z-10 " : "block mt-5"} flex justify-center`}>
            <Button
              onClick={() => {
                !loadingMore ? setLoadingMore(true) : setLoadingMore(false)
              }}
              type="button"
              variant="primary"
              width="w-fit"
              className="mt-2 px-5 h-[38px] font-extrabold uppercase animate-transationNormal active:translate-y-1"
            >
              {!loadingMore ? t("common:text-read-more") : t("common:text-read-less")}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FooterCMS;
