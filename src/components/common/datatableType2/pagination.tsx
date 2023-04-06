import classnames from "classnames";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { usePagination } from "./usePagination";

type Props = {
  pageSize: number;
  currentPage: number;
  siblingCount?: number;
  hasMore?: boolean;
  onPageChange: (event: number) => void;
};

const Pagination = (props: Props) => {
  const {
    onPageChange,
    siblingCount = 1,
    currentPage,
    hasMore,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
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
    <ul className="flex items-center space-x-2 list-none text-[14px]">
      <li
        className={classnames(
          "btn p-1 btn-prevNext-carousel btn-default-color  bg-white/5 hover:bg-whiteDefault-15 transition duration-200 ease-linear rounded-full h-7 w-7 ",
          {
            "pointer-events-none text-whiteDefault-50": currentPage === 1,
            "cursor-pointer text-whiteDefault-100": currentPage !== 1,
          }
        )}
        onClick={onPrevious}
      >
        <FaAngleLeft strokeWidth={3.2} />
      </li>
      {hasMore ? (
        <li
          className={classnames(
            "btn p-1 btn-prevNext-carousel  btn-circle bg-white/5 hover:bg-whiteDefault-15 transition duration-200 ease-linear rounded-full h-7 w-7",
            {
              "pointer-events-none text-whiteDefault-50":
                currentPage === lastPage,
              "cursor-pointer text-whiteDefault-100": currentPage !== lastPage,
            }
          )}
          onClick={onNext}
        >
          <FaAngleRight  strokeWidth={3.2}/>
        </li>
      ) : (
        <li
          className={classnames(
            "btn p-1 btn-prevNext-carousel btn-circle bg-white/5 hover:bg-white/20 transition duration-200 ease-linear rounded-full h-7 w-7 cursor-not-allowed text-whiteDefault-50"
          )}
          // onClick={onNext}
        >
          <FaAngleRight  strokeWidth={3.2}/>
        </li>
      )}
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
    </ul>
  );
};

export default Pagination;
