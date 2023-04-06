import React from "react";
import classnames from "classnames";
import * as Icon from "react-feather";
import { usePagination, DOTS } from "./usePagination";
import { FaCaretRight, FaCaretLeft } from "react-icons/fa";

type Props = {
  pageSize: number;
  totalCount: number;
  currentPage: number;
  siblingCount?: number;
  onPageChange: (event: number) => void;
};

const Pagination = (props: Props) => {
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
    <div className="flex items-center space-x-1">
      <div
        className={classnames(
          "btn p-1 btn-default btn-default-color btn-circle btn-default-color  bg-[#153853]/60 rounded-full h-5 w-5",
          {
            "pointer-events-none": currentPage === 1,
            "cursor-pointer": currentPage !== 1,
            "text-gray-300": currentPage === 1,
          }
        )}
        onClick={onPrevious}
      >
        <FaCaretLeft size={12} className="" />
      </div>
      {/* {paginationRange && paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li key={index} className="pagination-item p-2 dots">
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={index}
            className={classnames('mx-1 btn btn-default p-2 btn-circle bg-gray-100 rounded', {
              'bg-red-600': pageNumber === currentPage,
              'btn-default-color cursor-pointer': pageNumber !== currentPage,
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })} */}
      <div
        className={classnames(
          "btn p-1 btn-default btn-default-color btn-circle bg-[#153853]/60 rounded-full h-5 w-5",
          {
            "pointer-events-none": currentPage === lastPage,
            "cursor-pointer": currentPage !== lastPage,
            "text-gray-300": currentPage === lastPage,
          }
        )}
        onClick={onNext}
      >
        <FaCaretRight size={12} />
      </div>
    </div>
  );
};

export default Pagination;
