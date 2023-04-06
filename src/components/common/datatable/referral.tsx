import React, { useEffect } from "react";
import * as Icon from "react-feather";
import Pagination from "./pagination";
import Footer from "./footer";
import {
  useTable,
  useSortBy,
  useRowSelect,
  HeaderGroup,
  useExpanded,
} from "react-table";
import DataTableSkeleton from "./DataTableSkeleton";
import isEmpty from "lodash/isEmpty";
import classNames from "classnames";
import Indicator from "@components/ui/loading-indicator";

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
  isLoading: boolean;
  pageSize: number;
  totalPage: number;
  currentPage: number;
  totalItems: number;
  hasMore?: any;
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

const Datatable = ({
  columns,
  data,
  isLoading,
  pageSize,
  totalPage,
  totalItems,
  currentPage,
  hasSelection,
  tableClassName,
  hasMore,
  headerShow,
  classOdd,
  classEven,
  isActiveClass,
  IsActiveParam,
  IsActiveClassSetup,
  pagination,
  onClickRow,
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
    <div
      className={`bg_cont_web rounded-[5px] w-full text-sm font-semibold text-whiteDefault-40`}
    >
      <div className="overflow-x-auto scrollbar rounded-t-[5px] -mx-[1px] -mt-[1px]">
        <table
          {...getTableProps()}
          className={classNames("table", tableClassName)}
        >
          {isEmpty(data) && !isLoading ? null : (
            <thead>
              {headerGroups.map((headerGroup, index) => (
                <tr
                  key={index}
                  {...headerGroup.getHeaderGroupProps()}
                  className={`bg-black/40 ${
                    headerShow ? "bg-black/40 hidden" : null
                  }`}
                >
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="px-4 py-[10px] text-white text-lg"
                    >
                      <div className="flex flex-row items-center justify-start">
                        {column.render("Header")}
                        {/* Add a sort direction indicator */}
                        <span className="ltr:ml-auto rtl:mr-auto">
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <Icon.ChevronDown size={18} />
                            ) : (
                              // <icon className="icon-arrow-down text-xxs" />
                              <Icon.ChevronUp size={18} />
                              // <icon className="icon-arrow-up text-xxs" />
                            )
                          ) : (
                            ""
                          )}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
          )}

          <tbody {...getTableBodyProps()}>
            {isEmpty(data) && !isLoading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="!text-center pt-[2rem] pb-[2rem]"
                >
                  Tidak ada data. Silahkan coba merubah pilihan anda
                </td>
              </tr>
            ) : (
              rows.map((row, i) => {
                prepareRow(row);

                return (
                  <React.Fragment key={i + "_frag"}>
                    <tr
                      onClick={() => {
                        if (onClickRow) onClickRow(row);
                      }}
                      {...row.getRowProps()}
                      className={`${
                        isActiveClass
                          ? // Ketika tidak ada aktiv
                            i % 2 !== 0
                            ? `${HandleActive(row)}`
                            : `${HandleActive(row)}`
                          : // Ketika tidak ada aktiv

                          i % 2 !== 0
                          ? ` ${classOdd ? classOdd : "bg-black/5"}`
                          : `${classEven ? classEven : "bg-black/10"}`
                      } ${onClickRow ? "cursor-pointer" : ""}`}
                    >
                      {row.cells.map((cell) => {
                        return (
                          !(
                            cell.column.isHidden && cell.column.isHidden(cell)
                          ) && (
                            <td
                              rowSpan={
                                cell.column.rowSpan && cell.column.rowSpan(cell)
                              }
                              {...cell.getCellProps()}
                              className="px-4 py-2.5 text-[14px] text-whiteDefault-50"
                            >
                              {cell.render("Cell")}
                            </td>
                          )
                        );
                      })}
                    </tr>
                    {row.isExpanded ? renderRowSubComponent({ row }) : null}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
          {isVisibleFooter && (
            <tfoot>
              {footerGroups.map((group) => (
                <tr {...group.getFooterGroupProps()}>
                  {group.headers.map((column) => {
                    return (
                      <td {...footerProps} {...column.getFooterProps()}>
                        {column?.Footer ? column.render("Footer") : null}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tfoot>
          )}
        </table>
        {renderCustomFooter?.(footerGroups)}
      </div>

      {!isLoading && !isEmpty(data) && (
        <div className="md:ml-[2rem] text-xs flex flex-col sm:flex-row items-center justify-end">
          {pagination == false ? null : (
            <div className="flex flex-row items-center justify-start sm:justify-end md:m-0  sm:mt-0 sm:m-4">
              <div className="flex items-center text-sm font-normal">
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
            <div className="flex flex-row items-center justify-start sm:justify-end my-[30px] mx-4">
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

export default Datatable;
