import React, { useState } from "react";
import Select, { MultiValue } from "react-select";
import { FaSortAlphaDownAlt, FaSortAlphaUp, FaTimes } from "react-icons/fa";
import "./dashboardTableWrapper.css";

import { nominationTable, ptoSTable, schedulesTable, thirdPartyTicketTable, ticketsTable } from "../../interfaces/DashboardInterfaces/dashboardWrapperInterface";
import { RiDragMove2Fill } from "react-icons/ri";



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
};

const DashboardTableWrapper: React.FC<TableWrapperProps> = ({
  key,
  title,
  pipelineOptions,
  selectedPipelines,
  handlePipelineChange,
  tableData,
}) => {
  console.log({ key });
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>("asc");

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

  return (
    <div>
      <div className="item-header">
        <div className="d-flex gap-1">
          <div className="dragIcon draggable-handle" >
            <RiDragMove2Fill className="draggable-icon" />
          </div>
          <div className="dragTitle">
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
          />
        </div>
        <div>
          <FaTimes className="notice-close-btn" aria-label="Close" />
        </div>
      </div>
      <div className="list-content  ">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                {tableHeaders.map((header) => (
                  <th key={header} onClick={() => !excludedHeaders.includes(header) && handleSort(header)}>
                    {header}
                    {!excludedHeaders.includes(header) && (
                      <span className="sort-icons">
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
            <tbody>
              {sortedTableData.map((row, index) => (
                <tr key={index}>
                  {tableHeaders.map((header) => (
                    <td key={header}>
                      {isRowObject(row, header) ? row[header as keyof typeof row] : null}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardTableWrapper;