import React from "react";
import Select, { MultiValue} from "react-select";
import { FaTimes } from "react-icons/fa";
import "./dashboardTableWrapper.css";
import { nominationTable, ptoSTable, schedulesTable, thirdPartyTicketTable, ticketsTable } from "../../interfaces/interfaces";


interface PipelineOption {
    value: string;
    label: string;
}

type TableWrapperProps = {
  key:string;
  title: string;
  pipelineOptions: {value:string; label:string}[];
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
    console.log({key});
    const tableHeaders = tableData.length > 0 ? Object.keys(tableData[0]) : [];
    const isRowObject = (row: object, key: string): boolean => key in row;
  return (
    <div >
      <div className="item-header">
        <div className="draggable-handle">{title}</div>
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
      <div className="list-content draggable-handle">
        <div className="table-container">
          <table>
          <thead>
              <tr>
                {tableHeaders.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  {tableHeaders.map((header) => (
                    <td key={header}>
                        {/* {row[header]} */}
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