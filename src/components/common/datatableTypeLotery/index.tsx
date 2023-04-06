import { currencyFormat } from "@utils/functionutil";
import isEmpty from "lodash/isEmpty";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FaCaretRight, FaCopy } from "react-icons/fa";
import {
  HeaderGroup,
  useExpanded,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
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
  classOdd?: string;
  classEven?: string;
  pagination?: boolean;
  // handle Active
  isActiveClass?: string;
  IsActiveParam?: string[];
  IsActiveClassSetup?: string[];
  // end
  onClickRow?: (e: any) => void;
  onClickData?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  renderCustomFooter?: (footerGroups: HeaderGroup<any>[]) => React.ReactNode;
  tableClassName?: string;
  setSelectedIds?: (ids: string[]) => void;
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

const DatatableTypeLotery = ({
  columns,
  data,
  isLoading,
  pageSize,
  totalPage,
  totalItems,
  currentPage,
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
    <div className="rounded-[5px] bg-backgroundDefault-100  w-full  text-sm font-semibold text-whiteDefault-40">
      <div className="overflow-x-auto rounded-t-[5px] -mx-[1px] -mt-[1px]">
        {isEmpty(data) && !isLoading ? (
          <tr>
            <td colSpan={columns.length} className="!text-center py-4 px-mobile">
            Tidak ada data. Silahkan coba merubah pilihan anda     
            </td>
          </tr>
        ) : (
          rows?.map((valueData, i) => {
            const DataHandle: any =
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

            const render = () => {
              if (DataHandle.number_groups !== undefined) {
                return DataHandle?.number_groups.map((data: any, i: number) => {
                  return (
                    <div key={i}>
                      {data.number} {data.position ? "-" : ""} {data.position}
                    </div>
                  );
                });
              } else {
                null;
              }
            };

            const renderData = () => {
              if (DataHandle.number == null) {
                return (
                  <div className="  text-[#D3F2FF]  cursor-pointer rounded text-center flex space-x-2  font-bold uppercase text-base">
                    {DataHandle ? render() : null}
                  </div>
                );
              } else {
                return (
                  <div className="  text-[#D3F2FF] cursor-pointer rounded text-left    font-bold uppercase text-base">
                    {DataHandle.number == null ? "-" : DataHandle.number}
                  </div>
                );
              }
            };

            valueData.original !== undefined ? prepareRow(valueData) : null;
            return valueData.original !== undefined ? (
              <div
                key={i}
                onClick={() => {
                  if (onClickRow) onClickRow(valueData);
                }}
                className={` ${
                  isActiveClass
                    ? // Ketika tidak ada aktiv
                      i % 2 !== 0
                      ? `${HandleActive(valueData)}`
                      : `${HandleActive(valueData)}`
                    : // Ketika tidak ada aktiv

                    i % 2 !== 0
                    ? ` ${classOdd ? classOdd : ""}`
                    : `${classEven ? classEven : "bg-[#07263D] "}`
                } ${
                  onClickRow ? "cursor-pointer" : ""
                } flex w-full flex-col px-4 py-6 space-y-8`}
              >
                <div>
                  <div className="text-left flex items-center justify-between font-normal ">
                    <h1 className="text-[#FFFFFF] capitalize text-[16px]">
                      {DataHandle?.game}{" "}
                      {DataHandle?.position
                        ? " - " + DataHandle?.position
                        : null}
                      {DataHandle?.status ? " - " + DataHandle?.status : null}
                    </h1>

                    <div className="text-lg flex items-center ">
                      {renderData()}
                    </div>
                  </div>
                  <hr className="my-[1rem] hidden md:flex border-[#D3F2FF]/20 color-[#D3F2FF]/20" />
                  <div className="flex justify-between text-[14px] font-normal">
                    <div className="flex flex-col">
                      <h1 className="text-left text-[#D3F2FF]/60">Amount</h1>{" "}
                      <h1 className="text-[#ffffff]">
                        <div className=" py-1 rounded text-left text-[14px]  font-normal w-full   uppercase ">
                          Rp. {currencyFormat(DataHandle?.amount)}
                        </div>
                      </h1>{" "}
                    </div>
                    <div className="flex  flex-col text-right">
                      <h1 className="text-right   text-[#D3F2FF]/60">Paid </h1>
                      <h1>
                        <div
                          className={`${
                            DataHandle.win == 0
                              ? "text-[#F85E83]"
                              : "text-[#21D980]"
                          }   py-1 rounded text-right  text-[14px] w-full  font-normal uppercase `}
                        >
                          Rp. {currencyFormat(DataHandle?.paid)}
                        </div>
                      </h1>{" "}
                    </div>
                  </div>
                </div>
              </div>
            ) : null;
          })
        )}
      </div>

      {!isLoading && !isEmpty(data) && (
        <div className=" flex flex-col sm:flex-row justify-between">
          {pagination == false ? null : (
            <div className="flex flex-row items-center justify-start sm:justify-end m-0 mt-4 sm:mt-0 sm:m-4">
              <div className="flex items-center">
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
            <div className="flex flex-row items-center justify-start sm:justify-end my-[30px] mx-4 ">
            <div className="flex flex-wrap items-center justify-start children-x-2 pagination">
                <Pagination
                  pageSize={pageSize}
                  totalCount={totalItems}
                  currentPage={currentPage}
                  hasMore={true}
                  onPageChange={onPageChange}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DatatableTypeLotery;
