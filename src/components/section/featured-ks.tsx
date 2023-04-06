import ListGroupingCategory from "@components/layout/listGroupingCategory-ks";
import { getTemplate } from "@utils/functionutil";
import React from "react";
getTemplate;

const SectionFeaturedKS = () => {
  return (
    <div
      className={`background_featured w-full`}
    >
      <div className="background_img_featured">
        <div className="border_cont_featured hidden md:block"></div>
        <ListGroupingCategory />
        <div className="border_cont_featured"></div>
      </div>
    </div>
  );
};

export default SectionFeaturedKS;
