import React from "react";
import classnames from "classnames";
import * as Icon from "react-feather";
import { usePagination, DOTS } from "./usePagination";

type Props = {
  pageSize: number;
  totalCount: number;
  currentPage: number;
  siblingCount?: number;
  onPageChange: (event: number) => void;
};

const footer = (props: Props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange?.[paginationRange?.length - 1];
  return (
    <div className="flex items-center w-full bg-black space-x-1">
      <li
        className={classnames(
          "btn p-1 btn-default btn-default-color btn-circle btn-default-color bg-gray-100 rounded",
          {
            "pointer-events-none": currentPage === 1,
            "cursor-pointer": currentPage !== 1,
            "text-gray-300": currentPage === 1,
          }
        )}
        onClick={onPrevious}
      >
        <Icon.ChevronLeft size={20} className="" />
      </li>

      <li
        className={classnames(
          "btn p-1 btn-default btn-default-color btn-circle bg-gray-100 rounded",
          {
            "pointer-events-none": currentPage === lastPage,
            "cursor-pointer": currentPage !== lastPage,
            "text-gray-300": currentPage === lastPage,
          }
        )}
        onClick={onNext}
      >
        <Icon.ChevronRight size={20} />
      </li>
    </div>
  );
};

export default footer;
