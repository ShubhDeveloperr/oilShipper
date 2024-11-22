import React, { useState } from "react";
import { Responsive, WidthProvider, Layout } from "react-grid-layout";
import { MultiValue, SingleValue } from "react-select";
import "./dashboard.css";

// import { colourStyles } from "../../../helpers/styles/dropdown";
// import { FaTimes } from "react-icons/fa";
import DashboardTableWrapper from "../../../helpers/elements/DashboardTableWrapper/dashboardTableWrapper";
// import { Icon } from "@fortawesome/fontawesome-svg-core";
import { nominationTable, ptoSTable, schedulesTable, thirdPartyTicketTable, ticketsTable } from "../../../helpers/interfaces/interfaces";
import { FaCheck } from "react-icons/fa";


const ResponsiveGridLayout = WidthProvider(Responsive);

interface PipelineOption {
  value: string;
  label: string;
}

// interface Notice {
//   pipeline: string;
//   subject: string;
//   date: string;
// }


const nominationsData:nominationTable[] = [
  {
    batchCode: "BCH001",
    scheduled: <FaCheck color="green" />,
    ticketed: <FaCheck color="green" />,
    volume: "1000",
    projected: "1200",
    location: "Warehouse A",
    tank: "Tank 1",
    details: "Details about BCH001",
    events: "Event A",
    grantedTo: "John Doe",
    supplierConsignee: "Supplier A / Consignee B",
    tankage: "Tank Info",
    carrierStatus: <FaCheck color="green" />,
  },
  {
    batchCode: "BCH002",
    scheduled: <FaCheck color="green" />,
    ticketed: <FaCheck color="green" />,
    volume: "800",
    projected: "950",
    location: "Warehouse B",
    tank: "Tank 2",
    details: "Details about BCH002",
    events: "Event B",
    grantedTo: "Jane Doe",
    supplierConsignee: "Supplier X / Consignee Y",
    tankage: "Tank Info",
    carrierStatus: <FaCheck color="green" />,
  },
];

const schedulesData:schedulesTable[] = [
  {
    line: "Line 1",
    startDate: "2024-11-01",
    batchCode: "BCH001",
    location: "Warehouse A",
    tankage: "Tank Info",
    grantedTo: "John Doe",
    volume: "1000",
    ticketed: <FaCheck color="green" />,
    action: "Approve",
    dateCreated: "2024-10-15",
    createdBy: "Admin",
  },
];

const ticketsData:ticketsTable[] = [
  {
    batchCode: "BCH001",
    date: "2024-11-01",
    ticket: "TCK001",
    volume: "1000",
    grantedBy: "Admin",
    grantedTo: "John Doe",
    event: "Event A",
    location: "Warehouse A",
    supplier: "Supplier X",
    consignee: "Consignee Y",
    tankage: "Tank Info",
    externalBatchID: "EXT001",
  },
];

const ptosData:ptoSTable[] = [
  {
    pto: "PTO001",
    type: "Transfer",
    volume: "500",
    fromShipper: "Shipper A",
    toShipper: "Shipper B",
    carrierStatus: <FaCheck color="green" />,
    fromShipperStatus: "Ready",
    toShipperStatus: "In Transit",
    requestedDate: "2024-10-25",
    fromBatchCode: "BCH001",
    toBatchCode: "BCH002",
    daysToExpire: "5",
  },
];

const thirdPartyTicketsData:thirdPartyTicketTable[] = [
  {
    grantReject: "Granted",
    batchCode: "BCH001",
    location: "Warehouse A",
    tankage: "Tank Info",
    grantedBy: "Admin",
    grantedTo: "Third Party",
    daysToExpire: "10",
    ticket: "TCK001",
    nomination: "Nom001",
    schedule: "Sched001",
    tickets: "5",
  },
];


const predefinedLayouts = {
  default: [
    { i: "Nominations", x: 0, y: 10, w: 6, h: 10 },
    { i: "Schedules", x: 6, y: 10, w: 6, h: 10 },
    { i: "Tickets", x: 0, y: 10, w: 6, h: 10 },
    { i: "PTOs", x: 6, y: 10, w: 6, h: 10 },
    { i: "Third Party Tickets", x: 0, y: 20, w: 6, h: 10 },
  ],
  compact: [
    { i: "Nominations", x: 0, y: 0, w: 12, h: 5 },
    { i: "Schedules", x: 0, y: 5, w: 12, h: 5 },
    { i: "Tickets", x: 0, y: 10, w: 12, h: 5 },
    { i: "PTOs", x: 0, y: 15, w: 12, h: 5 },
    { i: "Third Party Tickets", x: 0, y: 20, w: 12, h: 5 },
  ],
  grid: [
    { i: "Nominations", x: 0, y: 0, w: 4, h: 5 },
    { i: "Schedules", x: 4, y: 0, w: 4, h: 5 },
    { i: "Tickets", x: 8, y: 0, w: 4, h: 5 },
    { i: "PTOs", x: 0, y: 5, w: 4, h: 5 },
    { i: "Third Party Tickets", x: 4, y: 5, w: 4, h: 5 },
  ],
};

const pipelineOptions: PipelineOption[] = [
  { value: "acadian", label: "Acadian Oil Pipeline System (135481971)" },
  { value: "algonquin", label: "Algonquin Oil Transmission, LLC (006951446)" },
  { value: "adelphia", label: "Adelphia Gateway (081273189)" },
  { value: "alliance-canada", label: "Alliance Canada Pipeline (253846620)" },
  { value: "alliance-pipeline", label: "Alliance Pipeline L.P. (809785713)" },
];
const pipelineOptions2: PipelineOption[] = [
  { value: "acadian", label: "Acadian Oil Pipeline System (135481971)" },
  { value: "algonquin", label: "Algonquin Oil Transmission, LLC (006951446)" },
  { value: "adelphia", label: "Adelphia Gateway (081273189)" },
  { value: "alliance-canada", label: "Alliance Canada Pipeline (253846620)" },
  { value: "alliance-pipeline", label: "Alliance Pipeline L.P. (809785713)" },
];

const Dashboard: React.FC = () => {
  const [layout, setLayout] = useState<Layout[]>(predefinedLayouts.default);
  const [layoutType, setLayoutType] = useState<string>("default");
  const [selectedPipelines, setSelectedPipelines] = useState<
    MultiValue<PipelineOption>
  >([]);
  const [selectedPipelines2, setSelectedPipelines2] = useState<
    MultiValue<PipelineOption>
  >([]);
  const [lastBreakpoint, setLastBreakpoint] = useState<string>("");

  const handleLayoutChange = (newLayout: Layout[]) => {
    setLayout(newLayout);
  };

  const handleLayoutSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLayout = event.target.value;
    setLayout(
      predefinedLayouts[selectedLayout as keyof typeof predefinedLayouts]
    );
    setLayoutType(selectedLayout);
  }; 

  const handlePipelineChange = (
    selectedOptions: MultiValue<PipelineOption> | SingleValue<PipelineOption>
  ) => {
    setSelectedPipelines(selectedOptions as MultiValue<PipelineOption>);
  };
  const handlePipelineChange2 = (
    selectedOptions: MultiValue<PipelineOption> | SingleValue<PipelineOption>
  ) => {
    setSelectedPipelines2(selectedOptions as MultiValue<PipelineOption>);
  };

  const getRowHeight = () => {
    switch (layoutType) {
      case "grid":
        return 70;
      case "compact":
        return 70;
      default:
        return 30;
    }
  };

  const onBreakpointChange = (newBreakpoint: string) => {
    if (newBreakpoint !== lastBreakpoint) {
      setLastBreakpoint(newBreakpoint); // Update the last breakpoint
      console.log(`Changed to ${newBreakpoint} breakpoint`);

      // Reset layout to the appropriate breakpoint layout when resizing
      if (newBreakpoint === "lg" || newBreakpoint === "md") {
        setLayout(predefinedLayouts.grid);
        setLayoutType("grid");
      } else if (newBreakpoint === "sm" || newBreakpoint === "xs") {
        setLayout(predefinedLayouts.compact);
        setLayoutType("compact");
      } else {
        setLayout(predefinedLayouts.default);
        setLayoutType("default");
      }
    }
  };

  return (
    <div className="dashboard-container">

      <div className="d-flex justify-content-between ">

        <div className="header-left">
          <input
            type="text"
            placeholder="Batch Code"
            className="batch-code-input"
          />
          <button className="batch-search-btn">Batch Search</button>
        </div>
        <div className="controls">
          <select
            className="layout-select"
            value={layoutType}
            onChange={handleLayoutSelect}
          >
            <option value="default">Default Layout</option>
            <option value="compact">Compact Layout</option>
            <option value="grid">Grid Layout</option>
          </select>
        </div>
      </div>


      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={getRowHeight()}
        width={1200}
        onLayoutChange={handleLayoutChange}
        draggableHandle=".draggable-handle"
        onBreakpointChange={onBreakpointChange}
      >

        <div key="Nominations" className="grid-item">
          <DashboardTableWrapper
            key="Nominations"
            title="Nominations"
            pipelineOptions={pipelineOptions}
            selectedPipelines={selectedPipelines}
            handlePipelineChange={handlePipelineChange}
            tableData={nominationsData}
          />
        </div>

        <div key="Schedules" className="grid-item">
          <DashboardTableWrapper
            key="Schedules"
            title="Schedules"
            pipelineOptions={pipelineOptions2}
            selectedPipelines={selectedPipelines2}
            handlePipelineChange={handlePipelineChange2}
            tableData={schedulesData}
          />
        </div>

        <div key="Tickets" className="grid-item">
          <DashboardTableWrapper
            key="Tickets"
            title="Tickets"
            pipelineOptions={pipelineOptions2}
            selectedPipelines={selectedPipelines2}
            handlePipelineChange={handlePipelineChange2}
            tableData={ticketsData}
          />
        </div>

        <div key="PTOs" className="grid-item">
          <DashboardTableWrapper
            key="PTOs"
            title="PTOs"
            pipelineOptions={pipelineOptions2}
            selectedPipelines={selectedPipelines2}
            handlePipelineChange={handlePipelineChange2}
            tableData={ptosData}
          />
        </div>

        <div key="Third Party Tickets" className="grid-item"> 
          <DashboardTableWrapper
            key="Third Party Tickets"
            title="PTOs"
            pipelineOptions={pipelineOptions2}
            selectedPipelines={selectedPipelines2}
            handlePipelineChange={handlePipelineChange2}
            tableData={thirdPartyTicketsData}
          />
        </div>

      </ResponsiveGridLayout>
    </div>
  );
};

export default Dashboard;
