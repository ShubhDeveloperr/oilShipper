import React from "react";
import Select, { MultiValue} from "react-select";
import { FaTimes } from "react-icons/fa";
import "./dashboardTableWrapper.css";


interface PipelineOption {
    value: string;
    label: string;
}

type TableWrapperProps = {
  title: string;
  pipelineOptions: any[];
  selectedPipelines: MultiValue<PipelineOption>;
  handlePipelineChange: (selectedOptions: any) => void;
  tableData: { pipeline: string; subject: string; date: string }[];
};

const DashboardTableWrapper: React.FC<TableWrapperProps> = ({
  title,
  pipelineOptions,
  selectedPipelines,
  handlePipelineChange,
  tableData,
}) => {
    console.log({ title});
  return (
    <div className="grid-item">
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
                <th>Pipeline</th>
                <th>Subject</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td>{row.pipeline}</td>
                  <td>{row.subject}</td>
                  <td>{row.date}</td>
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