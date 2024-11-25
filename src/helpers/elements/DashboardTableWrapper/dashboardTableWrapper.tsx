import React, { useState } from "react";
import Select, { MultiValue } from "react-select";
import { FaSortAlphaDownAlt, FaSortAlphaUp } from "react-icons/fa";
import styles from "./dashboardTableWrapper.module.css";
import { nominationTable, ptoSTable, schedulesTable, thirdPartyTicketTable, ticketsTable } from "../../interfaces/DashboardInterfaces/dashboardWrapperInterface";
import { RiDragMove2Fill } from "react-icons/ri";
import { colourStyles } from "../../styles/dropdown";
import { MdOutlineKeyboardDoubleArrowDown, MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";



interface PipelineOption {
  value: string;
  label: string;
}

type TableWrapperProps = {
  key: string;
  title: string;
  pipelineOptions: { value: string; label: string }[];
  selectedPipelines: MultiValue<PipelineOption>;
  handlePipelineChange: (selectedOptions: MultiValue<PipelineOption>) => void;
  tableData: nominationTable[] | schedulesTable[] | ticketsTable[] | ptoSTable[] | thirdPartyTicketTable[];
  dragHandleClass?: string
};

const DashboardTableWrapper: React.FC<TableWrapperProps> = ({
  key,
  title,
  pipelineOptions,
  selectedPipelines,
  handlePipelineChange,
  tableData,
  dragHandleClass,
}) => {
  console.log({ key });
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>("asc");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const tableHeaders = tableData.length > 0 ? Object.keys(tableData[0]) : [];
  const isRowObject = (row: object, key: string): boolean => key in row;

  const excludedHeaders = ["xyz"];

  const handleSort = (header: string) => {
    if (sortColumn === header) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(header);
      setSortDirection("asc");
    }
  };

  const sortedTableData = [...tableData].sort((a, b) => {
    if (!sortColumn || !sortDirection) return 0;
    const valA = a[sortColumn as keyof typeof a];
    const valB = b[sortColumn as keyof typeof b];

    if (valA < valB) return sortDirection === "asc" ? -1 : 1;
    if (valA > valB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const toggleCollapse = () => setIsCollapsed((prev) => !prev);

  return (
    <div>
      <div className={styles.itemHeader}>
        <div className={"d-flex gap-1"}>
          <div className={`${styles.dragIcon} ${styles.draggableHandle} ${dragHandleClass}`} >
            <RiDragMove2Fill className="draggable-icon" />
          </div>
          <div className={styles.dragTitle}>
            {title}
          </div>
        </div>
        <div>
          <Select
            isMulti
            options={pipelineOptions}
            value={selectedPipelines}
            onChange={handlePipelineChange}
            className="pipeline-select"
            placeholder="Search Pipeline"
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            isSearchable
            styles={colourStyles}
          />
        </div>
        <div onClick={toggleCollapse} className={styles.collapseToggle}>
          {isCollapsed ? (
            <MdOutlineKeyboardDoubleArrowDown
              className={styles.noticeToggleIcon}
              aria-label="Expand"
            />
          ) : (
            <MdOutlineKeyboardDoubleArrowUp
              className={styles.noticeToggleIcon}
              aria-label="Collapse"
            />
          )}
        </div>
      </div>
      {!isCollapsed && (
      <div className={styles.listContent}>
        <div className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                {tableHeaders.map((header) => (
                  <th key={header} onClick={() => !excludedHeaders.includes(header) && handleSort(header)}>
                    {header}
                    {!excludedHeaders.includes(header) && (
                      <span className={styles.sortIcons}>
                        {sortColumn === header && sortDirection === "asc" && (
                          <FaSortAlphaUp />
                        )}
                        {sortColumn === header && sortDirection === "desc" && (
                          <FaSortAlphaDownAlt />
                        )}
                        {sortColumn !== header && <FaSortAlphaUp style={{ opacity: 0.3 }} />}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            {/* <tbody>
              {sortedTableData.map((row, index) => (
                <tr key={index}>
                  {tableHeaders.map((header) => (
                    <td key={header}>
                      {isRowObject(row, header) ? (
                        row[header as keyof typeof row] || <span className={styles.emptyPlace}>-</span> 
                      ) : (
                        <span className={styles.emptyPlace}>-</span> 
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody> */}
            <tbody>
              {sortedTableData.map((row, index) => (
                <tr key={`data-row-${index}`}>
                  {tableHeaders.map((header) => (
                    <td key={header}>
                      {isRowObject(row, header) ? (
                        row[header as keyof typeof row] || <span className={styles.emptyPlace}>-</span>
                      ) : (
                        <span className={styles.emptyPlace}>-</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}

              {Array.from(
                { length: Math.max(0, 7 - sortedTableData.length) },
                (_, index) => (
                  <tr key={`placeholder-row-${index}`}>
                    {tableHeaders.map((header) => (
                      <td key={header}>
                        <span className={styles.emptyPlace}>-</span>
                      </td>
                    ))}
                  </tr>
                )
              )}
            </tbody>

          </table>
        </div>
      </div>
      )}
    </div>
  );
};

export default DashboardTableWrapper;