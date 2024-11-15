import React, { useState } from 'react';
import { Responsive, WidthProvider, Layout } from 'react-grid-layout';
import Select, { MultiValue, SingleValue } from 'react-select';
import './dashboard.css';
import { colourStyles } from '../../../helpers/styles/dropdown';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface PipelineOption {
  value: string;
  label: string;
}

interface Notice {
  pipeline: string;
  subject: string;
  date: string;
}

const pipelineOptions: PipelineOption[] = [
  { value: 'acadian', label: 'Acadian Oil Pipeline System (135481971)' },
  { value: 'algonquin', label: 'Algonquin Oil Transmission, LLC (006951446)' },
  { value: 'adelphia', label: 'Adelphia Gateway (081273189)' },
  { value: 'alliance-canada', label: 'Alliance Canada Pipeline (253846620)' },
  { value: 'alliance-pipeline', label: 'Alliance Pipeline L.P. (809785713)' },
];
const pipelineOptions2: PipelineOption[] = [
  { value: 'acadian', label: 'Acadian Oil Pipeline System (135481971)' },
  { value: 'algonquin', label: 'Algonquin Oil Transmission, LLC (006951446)' },
  { value: 'adelphia', label: 'Adelphia Gateway (081273189)' },
  { value: 'alliance-canada', label: 'Alliance Canada Pipeline (253846620)' },
  { value: 'alliance-pipeline', label: 'Alliance Pipeline L.P. (809785713)' },
];

// Simulate hardcoded data (API response)
const criticalNoticesData: Notice[] = [
  { pipeline: 'AGT', subject: 'Operational Flow Order', date: '9/20/2024 3:00 PM' },
  { pipeline: 'AGT', subject: 'Pipeline Conditions for 9/18/2024', date: '9/17/2024 3:30 PM' },
  { pipeline: 'AGT', subject: 'Routine Maintenance Notice', date: '9/15/2024 10:00 AM' },
  { pipeline: 'AGT', subject: 'Update on Maintenance Schedule', date: '9/10/2024 2:00 PM' },
  { pipeline: 'AGT', subject: 'System Testing Alert', date: '9/05/2024 1:30 PM' },
  { pipeline: 'AGT', subject: 'Emergency Flow Restriction', date: '9/01/2024 9:00 AM' },
  { pipeline: 'AGT', subject: 'Inspection Alert', date: '8/30/2024 5:00 PM' },
  { pipeline: 'AGT', subject: 'Weather-Related Delay', date: '8/25/2024 12:00 PM' },
  { pipeline: 'AGT', subject: 'Pipeline Safety Inspection', date: '8/20/2024 8:00 AM' },
  { pipeline: 'AGT', subject: 'Upgrade Notice', date: '8/15/2024 6:00 PM' },
];


const Dashboard: React.FC = () => {
  const [layout, setLayout] = useState<Layout[]>([
    { i: 'critical-notices', x: 0, y: 0, w: 6, h: 10 },
    { i: 'non-critical-notices', x: 6, y: 0, w: 6, h: 10 },
  ]);

  const [selectedPipelines, setSelectedPipelines] = useState<MultiValue<PipelineOption>>([]);
  const [selectedPipelines2, setSelectedPipelines2] = useState<MultiValue<PipelineOption>>([]);

  const handleLayoutChange = (newLayout: Layout[]) => {
    setLayout(newLayout);
  };

  const handlePipelineChange = (selectedOptions: MultiValue<PipelineOption> | SingleValue<PipelineOption>) => {
    setSelectedPipelines(selectedOptions as MultiValue<PipelineOption>);
  };
  const handlePipelineChange2 = (selectedOptions: MultiValue<PipelineOption> | SingleValue<PipelineOption>) => {
    setSelectedPipelines2(selectedOptions as MultiValue<PipelineOption>);
  };
  // const loadPipelineOptions = async (inputValue: string) => {
  //   const filteredOptions = pipelineOptions.filter((option) =>
  //     option.label.toLowerCase().includes(inputValue.toLowerCase())
  //   );
  //   return filteredOptions;
  // };

  return (
    <div className="dashboard-container">
      <div className="controls">
        <select className="layout-select">
          <option value="default">Select Layout</option>
          {/* layout options */}
        </select>
      </div>

      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={30}
        width={1200}
        onLayoutChange={handleLayoutChange}
        draggableHandle=".draggable-handle"
      >
        {/* Critical Notices */}
        <div key="critical-notices" className="grid-item">
          <div className="item-header">
            <div className='draggable-handle col-8'>
              Critical Notices
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
                // components={{
                //   DropdownIndicator : () => < BiSearch />,
                // }}
              />
              {/* <AsyncSelect
                isMulti
                loadOptions={loadPipelineOptions}
                value={selectedPipelines}
                onChange={handlePipelineChange}
                className="pipeline-select"
                placeholder="Select Pipeline"
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                isSearchable
              /> */}
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
                  {criticalNoticesData.map((notice, index) => (
                    <tr key={index}>
                      <td>{notice.pipeline}</td>
                      <td>{notice.subject}</td>
                      <td>{notice.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Non-Critical Notices */}
        <div key="non-critical-notices" className="grid-item">
          <div className=" item-header">
            <div className='draggable-handle col-8'>
              Non-Critical Notices
            </div>
            <div>
              <Select
                isMulti
                options={pipelineOptions2}
                value={selectedPipelines2}
                onChange={handlePipelineChange2}
                className="pipeline-select"
                placeholder="Search Pipeline"
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                isSearchable
                styles={colourStyles}
                // components={{
                //   DropdownIndicator : () => < BiSearch />,
                // }}
              />
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
                  {criticalNoticesData.map((notice, index) => (
                    <tr key={index}>
                      <td>{notice.pipeline}</td>
                      <td>{notice.subject}</td>
                      <td>{notice.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </ResponsiveGridLayout>
    </div>
  );
};

export default Dashboard;
