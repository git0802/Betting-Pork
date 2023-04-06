import React from "react";
import classnames from "classnames";
import { usePagination } from "./usePagination";
import { FaCaretRight, FaCaretLeft, FaAngleLeft, FaAngleRight } from "react-icons/fa";

type Props = {
  pageSize: number;
  totalCount: number;
  currentPage: number;
  siblingCount?: number;
  hasMore?: boolean;
  onPageChange: (event: number) => void;
};

const Pagination = (props: Props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    hasMore,
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
    <ul className="flex items-center space-x-2 list-none mr-[-4px] text-[14px]">
      <li
        className={classnames(
          "btn p-1 btn-prevNext-carousel btn-default-color  bg-white/5 hover:bg-whiteDefault-15 transition duration-200 ease-linear rounded-full h-7 w-7",
          {
            "pointer-events-none text-whiteDefault-50": currentPage === 1,
            "cursor-pointer text-whiteDefault-100": currentPage !== 1,
          }
        )}
        onClick={onPrevious}
      >
        <FaAngleLeft strokeWidth={3.2} className="" />
      </li>
      {hasMore ? (
        <li
          className={classnames(
            "btn p-1 btn-prevNext-carousel btn-circle bg-white/5 hover:bg-whiteDefault-15 transition duration-200 ease-linear rounded-full h-7 w-7",
            {
              "pointer-events-none text-whiteDefault-50":
                currentPage === lastPage,
              "cursor-pointer text-whiteDefault-100": currentPage !== lastPage,
            }
          )}
          onClick={onNext}
        >
         
          <FaAngleRight strokeWidth={3.2} />
        </li>
      ) : (
        <li
          className={classnames(
            "btn p-1 btn-prevNext-carousel  btn-circle bg-white/5 hover:bg-white/20 transition duration-200 ease-linear rounded-full h-7 w-7 cursor-not-allowed text-whiteDefault-50"
          )}
          // onClick={onNext}
        >
            <FaAngleRight strokeWidth={3.2} />
        </li>
      )}
    </ul>
  );
};

export default Pagination;
