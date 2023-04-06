import { currencyFormat } from "@utils/functionutil";
import copy from "copy-to-clipboard";
import isEmpty from "lodash/isEmpty";
import moment from "moment";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React from "react";
import { FaCopy } from "react-icons/fa";

import { FiChevronRight } from "react-icons/fi";
import {
  HeaderGroup,
  useExpanded,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import { toast } from "react-toastify";
import DataTableSkeleton from "./DataTableSkeleton";
import Pagination from "./pagination";

type Props = {
  columns: object[];
  data: object[];
  tab?: number | string;
  isLoading: boolean;
  pageSize: number;
  totalPage: number;
  currentPage: number;
  totalItems: number;
  hasSelection?: boolean;
  headerShow?: boolean;
  hasMore?: any;

  classOdd?: string;
  classEven?: string;
  pagination?: boolean;
  // handle Active
  isActiveClass?: string;
  IsActiveParam?: string[];
  IsActiveClassSetup?: string[];
  // end
  onClickRow?: () => (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onClickData?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  renderCustomFooter?: (footerGroups: HeaderGroup<any>[]) => React.ReactNode;
  tableClassName?: string;
  setSelectedIds?: (ids: string[]) => void;
  setType?: () => void;
  setData?: () => void;

  checkDisabled?: (row: object) => boolean;
  checkDisabledHeader?: (row: object[]) => boolean;
  isVisibleFooter?: boolean;
  footerProps?: React.DetailedHTMLProps<
    React.TdHTMLAttributes<HTMLTableDataCellElement>,
    HTMLTableDataCellElement
  >;
  expandRows?: boolean;
  expandedRowObj?: object;
  renderRowSubComponent?: any;
};

interface DataColoumHandle {
  _id: string;
  type: string;
  relation_id: string;
  provider: string;
  debit: number | string;
  credit: number | string;
  balance: number | string;
  created_at: string;
  period: any;
  game_name: string;
}

const datatableTypeLotery = ({
  columns,
  data,
  isLoading,
  pageSize,
  totalPage,
  totalItems,
  currentPage,
  hasMore,
  hasSelection,
  tableClassName,
  headerShow,
  classOdd,
  classEven,
  isActiveClass,
  IsActiveParam,
  tab = 0,
  IsActiveClassSetup,
  pagination,
  setType,
  setData,
  onClickRow,
  onClickData,
  onPageChange,
  onPageSizeChange,
  renderCustomFooter,
  setSelectedIds,
  checkDisabled,
  checkDisabledHeader,
  showHeader = true,
  isVisibleFooter = false,
  footerProps,
  expandRows = false,
  expandedRowObj = {},
  renderRowSubComponent,
}: Props) => {
  
  const tableData = React.useMemo(
    () => (isLoading && isEmpty(data) ? Array(3).fill({}) : data),
    [isLoading, data]
  );
  const tableColumns = React.useMemo(
    () =>
      isLoading && isEmpty(data)
        ? columns.map((column) => ({
            ...column,
            Cell: <DataTableSkeleton />,
          }))
        : columns,
    [isLoading, columns]
  );
  const { t } = useTranslation("common");
  const HandleActive = (Data?: any) => {
    if (isActiveClass && IsActiveParam && IsActiveClassSetup) {
      let data = Data.original;
      if (IsActiveParam[0] == data[`${isActiveClass}`]) {
        return `${IsActiveClassSetup[1]}`;
      } else if (IsActiveParam[1] == data[`${isActiveClass}`]) {
        return `${IsActiveClassSetup[0]}`;
      } else {
        null;
      }
    }
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    footerGroups,
    selectedFlatRows,
    state: { selectedRowIds },
  } = useTable(
    {
      columns: tableColumns,
      data: tableData,
      initialState: {
        pageIndex: 0,
        pageSize: 10,
        expanded:
          expandRows && expandedRowObj.hasOwnProperty(0) ? expandedRowObj : {},
      },
    },
    useSortBy,
    useExpanded,
    useRowSelect
  );
  const router = useRouter();
  const Handledate = (data: string) => {
    return moment(data).format("DD-MM-YYYY HH:mm:ss");
  };


  // Render the UI for your table
  return (
    <div className="rounded-10 w-full  text-sm font-semibold text-whiteDefault-40">
      <div className="overflow-x-auto rounded-t-10 -mx-[1px] -mt-[1px]">
        {isEmpty(data) && !isLoading ? (
          <tr>
            <td colSpan={columns.length} className="!text-center py-4 px-mobile">
            Tidak ada data. Silahkan coba merubah pilihan anda
            </td>
          </tr>
        ) : (
          rows?.map((valueData, i) => {
            const DataHandle =
              valueData.original !== undefined
                ? valueData.original
                : {
                    _id: "63859c8a58c01886f40671f2",
                    type: "bet",
                    relation_id: "63859c892f19219403005473",
                    provider: "pgsoft",
                    debit: 3000,
                    credit: 0,
                    balance: 4505480,
                    created_at: "2022-11-29T05:45:45.893000Z",
                    period: null,
                    game_name: "Medusa 2: the Quest of Perseus",
                  };

            valueData.original !== undefined ? prepareRow(valueData) : null;

            return valueData.original !== undefined ? (
              <div
                key={i}
                className={` ${
                  isActiveClass
                    ? // Ketika tidak ada aktiv
                      i % 2 !== 0
                      ? `${HandleActive(valueData)}`
                      : `${HandleActive(valueData)}`
                    : // Ketika tidak ada aktiv

                    i % 2 !== 0
                    ? ` ${classOdd ? classOdd : "bg-white/5"}`
                    : `${classEven ? classEven : ""}`
                } ${
                  onClickRow ? "cursor-pointer" : ""
                } flex w-full flex-col px-[25px] py-[20px] space-y-8 `}
              >
                <div>
                  <div className="flex justify-between mb-1 items-center">
                    <div className="text-[#E1EDFF]/60 font-normal text-[12px]">
                      {DataHandle.created_at
                        ? Handledate(DataHandle?.created_at)
                        : DataHandle?.created_at}
                    </div>
                    <div
                      className="flex flex-col space-y-3 items-end m-0"
                    >
                      <button
                        onClick={() => {
                          if (
                            DataHandle.game_name == null &&
                            DataHandle.real_market != null 
                          ) {
                            setData(valueData.original);
                            setType("detaillotery");
                            router.push(
                              {
                                pathname: router.pathname,
                                query: {
                                  tab: tab ? tab : 0,
                                },
                              },
                              undefined,
                              { shallow: false }
                            );
                          } else {
                            {
                              setData(valueData.original);
                              setType("detaildata");
                              router.push(
                                {
                                  pathname: router.pathname,
                                  query: {
                                    tab: tab ? tab : 0,
                                  },
                                },
                                undefined,
                                { shallow: false }
                              );
                            }
                          }
                        }}
                        className="text-white bg-whiteDefault-10 rounded-full  text-center items-center w-7 h-7 flex justify-center"
                        >
                        <FiChevronRight strokeWidth={3.2} />
                      </button>
                    </div>
                  </div>

                  <div className="text-left font-normal space-y-[2px]">
                    <h1 className="text-[#FFFFFF] text-[16px] capitalize">
                      {DataHandle?.game_name == null
                        ? DataHandle?.type?.replace("_", " ") 
                        : DataHandle.game_name}
                    </h1>

                    <p className="text-[14px] capitalize">
                    {DataHandle?.provider == "lx"
                  ? <span className="uppercase">LX</span>
                  : <span className="capitalize">{DataHandle?.provider}</span>}
                    </p>
                    <div className="text-[14px] flex items-center ">
                      <span>{DataHandle?._id} </span>
                      <span
                        onClick={() => {
                          copy(DataHandle?._id);
                          const CopyTittle = t('text-copied')
                          toast.success(CopyTittle);
                        }}
                      >
                        <FaCopy className="text-[#466379] ml-[1rem] mt-1 scale-[1] " />
                      </span>
                    </div>
                  </div>
                  <hr className="my-[12.5px] border-[#D3F2FF]/20 color-[#D3F2FF]/20" />
                  <div className="flex justify-between text-[14px] font-normal">
                    <div className="flex flex-col">
                      <h1 className="text-left text-[#D3F2FF]/60">Amount</h1>{" "}
                      <h1 className="text-[#ffffff]">
                        {DataHandle?.credit != "0" ? (
                          <div className=" py-[2px] rounded text-left text-[14px]  font-normal w-full   uppercase ">
                            Rp. {currencyFormat(DataHandle?.credit)}
                          </div>
                        ) : (
                          <div className=" py-[2px] rounded text-left text-[14px]  font-normal w-full   uppercase ">
                            Rp. {currencyFormat(DataHandle?.debit)}
                          </div>
                        )}
                      </h1>{" "}
                    </div>
                    <div className="flex flex-col text-right">
                      <h1 className="text-right  text-[#D3F2FF]/60">
                        Win/Lose
                      </h1>
                      <h1>
                        {DataHandle?.credit != "0" ? (
                          <div className=" py-[2px]  rounded text-right  text-[14px] w-full text-[#21D980]  font-normal uppercase ">
                            Rp. {currencyFormat(DataHandle?.credit)}
                          </div>
                        ) : (
                          <div className="py-[2px]  rounded text-right text-[14px] text-[#F85E83]  font-normal uppercase ">
                            Rp. {currencyFormat(DataHandle?.debit)}
                          </div>
                        )}
                      </h1>{" "}
                      <h1 className="text-[#FFFFFF] text-[14px]">
                        Saldo Rp. {currencyFormat(DataHandle?.balance)}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            ) : null;
          })
        )}
      </div>

      {!isLoading && !isEmpty(data) && (
        <div className=" flex flex-row sm:flex-row justify-between items-center px-[20px] py-[20px]">
          {pagination == false ? null : (
            <div className="flex flex-row w-7/12 items-center justify-start sm:justify-end md:mt-4 sm:mt-0 sm:m-0">
              <div className="flex items-center font-normal text-[14px]">
                <div>Items per page</div>
                <select
                  className="ml-4 bg-backgroundDefault-100 px-1 rounded h-5"
                  value={pageSize}
                  onChange={onPageSizeChange}
                >
                  {[10, 25, 50, 100].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      {pageSize}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {pagination == false ? null : (
            <div className="flex flex-row w-3/12 items-center justify-end sm:justify-end m-2 sm:m-4">
              <div className="flex flex-wrap items-center justify-start children-x-2 pagination">
                <Pagination
                  pageSize={pageSize}
                  totalCount={totalItems}
                  currentPage={currentPage}
                  onPageChange={onPageChange}
                  hasMore={hasMore}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default datatableTypeLotery;
