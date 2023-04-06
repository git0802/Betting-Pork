import React, { useEffect } from "react";
import Pagination from "./pagination";
import {
  useTable,
  useSortBy,
  useRowSelect,
  HeaderGroup,
  useExpanded,
} from "react-table";
import DataTableSkeleton from "./DataTableSkeleton";
import isEmpty from "lodash/isEmpty";
import moment from "moment";
import { currencyFormat } from "@utils/functionutil";
import { useRouter } from "next/router";
import { FiChevronRight } from "react-icons/fi";

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, disabled, ...rest }, ref) => {
    // const defaultRef = React.useRef();
    // const resolvedRef = ref || defaultRef;

    // React.useEffect(() => {
    //   resolvedRef.current.indeterminate = indeterminate;
    // }, [resolvedRef, indeterminate]);

    return (
      <input
        type="checkbox"
        // ref={resolvedRef}
        {...rest}
        disabled={disabled}
        className="form-checkbox h-4 w-4"
      />
    );
  }
);

type Props = {
  columns: object[];
  data: object[];
  type: "deposit" | "withdraw";
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
  onClickRow?: () => (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onPageChange: (page: number) => void;
  onClickDetail: (event: React.ChangeEvent<HTMLSelectElement>) => void;
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

const DatatableHistory = ({
  columns,
  data,
  type,
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
  IsActiveClassSetup,
  pagination = false,
  onClickRow,
  onPageChange,
  onPageSizeChange,
  renderCustomFooter,
  setSelectedIds,
  checkDisabled,
  checkDisabledHeader,
  onClickDetail,
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
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        ...(hasSelection
          ? [
              {
                id: "selection",
                // The header can use the table's getToggleAllRowsSelectedProps method
                // to render a checkbox
                Header: ({ getToggleAllRowsSelectedProps }) => (
                  <>
                    <IndeterminateCheckbox
                      {...getToggleAllRowsSelectedProps()}
                      disabled={!checkDisabledHeader(data)}
                    />
                  </>
                ),
                // The cell can use the individual row's getToggleRowSelectedProps method
                // to the render a checkbox
                Cell: ({ row }) => {
                  const disabled: boolean = checkDisabled(row);
                  const checked = disabled
                    ? false
                    : row.getToggleRowSelectedProps()?.checked;
                  return (
                    <>
                      <IndeterminateCheckbox
                        {...{ ...row.getToggleRowSelectedProps(), checked }}
                        disabled={checkDisabled(row)}
                      />
                    </>
                  );
                },
              },
            ]
          : []),
        ...columns,
      ]);
    }
  );
  const router = useRouter();
  useEffect(() => {
    if (setSelectedIds) {
      setSelectedIds(
        selectedFlatRows
          .filter((row) => !checkDisabled(row))
          .map(({ original }) => original?.id)
      );
    }
  }, [selectedRowIds]);

  // Render the UI for your table
  return (
    <div className="bg_cont_web rounded-10 w-full text-sm font-semibold text-whiteDefault-40">
      <div className={`overflow-x-auto rounded-t-10 -mx-[1px] ${isEmpty(data) && !isLoading  ? "flex": ""}   -mt-[1px]`}>
        {isEmpty(data) && !isLoading ? (
          <table>
            <tbody>
              <tr className="w-full">
                <td colSpan={columns.length} className=" w-full flex text-center">
                  <span className=" w-full text-center py-[2rem] flex justify-center items-center"> Tidak ada data. Silahkan coba merubah pilihan anda</span>
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          rows.map((row, i) => {
            prepareRow(row);
            return (
              <div
                key={i}
                className={`text-xs ${
                  isActiveClass
                    ? // Ketika tidak ada aktiv
                      i % 2 !== 0
                      ? `${HandleActive(row)}`
                      : `${HandleActive(row)}`
                    : // Ketika tidak ada aktiv

                    i % 2 !== 0
                    ? ` ${classOdd ? classOdd : "bg-black/40"}`
                    : `${classEven ? classEven : "bg-black/40 hidden"}`
                } ${
                  onClickRow ? "cursor-pointer" : ""
                } flex w-full flex-row justify-between px-[25px] py-5 sm:space-y-8 text-xs`}
              >
                <div className="flex flex-col space-y-[2px]  text-left">
                  <span className="text-xs text-whiteDefault-60 font-normal uppercase">
                    {moment(row.original.created_at).format(
                      "DD-MM-YYYY HH:mm:ss"
                    )}
                  </span>
                  <span className="text-base text-white font-normal capitalize">
                    {type}
                  </span>
                  <span className="text-base text-white font-normal capitalize">
                    {row.original.type == "e_wallet"  ? "e-wallet": row.original.type}
                  </span>
                  <div className="flex flex-row items-center space-x-[10px]">
                    <div>
                      <span className="text-base text-white font-normal capitalize">
                        Rp{currencyFormat(row.original.amount)}
                      </span>
                    </div>
                    {row.original.status == "approved" ? (
                      <button className="text-success bg-success/10 h-[25px] md:h-10 px-[7px] uppercase py-[5px] md:px-[16px] md:py-[11px] text-xs md:text-sm font-semibold rounded">
                        Berhasil
                      </button>
                    ) : null}

                    {row.original.status == "pending" ? (
                      <button className="text-onProcess bg-onProcess/10 h-[25px] md:h-10 px-[7px] uppercase py-[5px] md:px-[16px] md:py-[11px] text-xs md:text-sm font-semibold rounded">
                        Memproses
                      </button>
                    ) : null}
                    {row.original.status == "rejected" ? (
                      <button className="text-failed bg-failed/20 h-[25px] md:h-10 px-[7px] uppercase  py-[5px] md:px-[16px] md:py-[11px] text-xs md:text-sm font-semibold rounded">
                        Gagal
                      </button>
                    ) : null}
                  </div>
                </div>

                <div
                  className="flex flex-col space-y-3 items-end m-0 mr-[0.1rem] "
                >
                  <button
                    onClick={(e) => {
                      onClickDetail(row.original);
                    }}
                    className="text-white bg-whiteDefault-10 rounded-full text-[14px]   text-center items-center w-7 h-7 flex justify-center"
                    >
                        <FiChevronRight strokeWidth={3.2}  />
                  </button>
                </div>
              </div>
            );
          })
        )}
        {renderCustomFooter?.(footerGroups)}
      </div>

      {!isLoading && !isEmpty(data) && (
        <div className="text-xs flex flex-row md:flex-col px-[25px] py-5 sm:flex-row justify-between">
          {pagination == false ? null : (
            <div className="flex flex-row items-center justify-start sm:justify-end">
              <div className="flex items-center text-sm font-normal ">
                <div>Items per page</div>
                <select
                  className="bg_select ml-4 px-1 rounded h-5"
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
             
              <div className="flex flex-wrap items-center justify-start children-x-2 pagination">
                <Pagination
                  pageSize={pageSize}
                  totalCount={totalItems}
                  currentPage={currentPage}
                  onPageChange={onPageChange}
                />
              </div>
     
          )}
        </div>
      )}
    </div>
  );
};

export default DatatableHistory;
