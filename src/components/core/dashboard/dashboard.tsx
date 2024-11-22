import React, { useState } from "react";
import { Responsive, WidthProvider, Layout } from "react-grid-layout";
import { MultiValue, SingleValue } from "react-select";
import styles from "./dashboard.module.css";
import DashboardTableWrapper from "../../../helpers/elements/DashboardTableWrapper/dashboardTableWrapper";
import { nominationTable, ptoSTable, schedulesTable, thirdPartyTicketTable, ticketsTable } from "../../../helpers/interfaces/DashboardInterfaces/dashboardWrapperInterface";
import { FaCheck } from "react-icons/fa";
import { Dropdown } from "react-bootstrap";


const ResponsiveGridLayout = WidthProvider(Responsive);

interface PipelineOption {
  value: string;
  label: string;
}


const nominationsData: nominationTable[] = [
  {
    "Batch Code": "BCH001",
    "Scheduled": <FaCheck color="green" />,
    "Ticketed": <FaCheck color="green" />,
    "Volume": "",
    "Projected": "1200",
    "Location": "Warehouse A",
    "Tank": "Tank 1",
    "Details": "Details about BCH001",
    "Events": "Event A",
    "Granted To": "John Doe",
    "Supplier Consignee": "Supplier A / Consignee B",
    "Tankage": "Tank Info",
    "Carrier Status": <FaCheck color="green" />,
  },
  {
    "Batch Code": "BCH002",
    "Scheduled": <FaCheck color="green" />,
    "Ticketed": <FaCheck color="green" />,
    "Volume": "800",
    "Projected": "950",
    "Location": "Warehouse B",
    "Tank": "Tank 2",
    "Details": "Details about BCH002",
    "Events": "Event B",
    "Granted To": "Jane Doe",
    "Supplier Consignee": "Supplier X / Consignee Y",
    "Tankage": "Tank Info",
    "Carrier Status": <FaCheck color="green" />,
  },
];

const schedulesData: schedulesTable[] = [
  {
    "Line": "Line 1",
    "Start Date": "2024-11-01",
    "Batch Code": "BCH001",
    "Location": "Warehouse A",
    "Tankage": "Tank Info",
    "Granted To": "John Doe",
    "Volume": "1000",
    "Ticketed": <FaCheck color="green" />,
    "Action": "Approve",
    "Date Created": "2024-10-15",
    "Created By": "Admin",
  },
];

const ticketsData: ticketsTable[] = [
  {
    "Batch Code": "BCH001",
    "Date": "2024-11-01",
    "Ticket": "TCK001",
    "Volume": "1000",
    "Granted By": "Admin",
    "Granted To": "John Doe",
    "Event": "Event A",
    "Location": "Warehouse A",
    "Supplier": "Supplier X",
    "Consignee": "Consignee Y",
    "Tankage": "Tank Info",
    "External Batch ID": "EXT001",
  },
];

const ptosData: ptoSTable[] = [
  {
    "PTO": "PTO001",
    "Type": "Transfer",
    "Volume": "500",
    "From Shipper": "Shipper A",
    "To Shipper": "Shipper B",
    "Carrier Status": <FaCheck color="green" />,
    "From Shipper Status": "Ready",
    "To Shipper Status": "In Transit",
    "Requested Date": "2024-10-25",
    "From Batch Code": "BCH001",
    "To Batch Code": "BCH002",
    "Days To Expire": "5",
  },
];

const thirdPartyTicketsData: thirdPartyTicketTable[] = [
  {
    "Grant/Reject": "Granted",
    "Batch Code": "BCH001",
    "Location": "Warehouse A",
    "Tankage": "Tank Info",
    "Granted By": "Admin",
    "Granted To": "Third Party",
    "Days To Expire": "10",
    "Ticket": "TCK001",
    "Nomination": "Nom001",
    "Schedule": "Sched001",
    "Tickets": "5",
  },
];


const predefinedLayouts = {
  Default: [
    { i: "Nominations", x: 0, y: 10, w: 6, h: 10 },
    { i: "Schedules", x: 6, y: 10, w: 6, h: 10 },
    { i: "Tickets", x: 0, y: 10, w: 6, h: 10 },
    { i: "PTOs", x: 6, y: 10, w: 6, h: 10 },
    { i: "Third Party Tickets", x: 0, y: 20, w: 6, h: 10 },
  ],
  Compact: [
    { i: "Nominations", x: 0, y: 0, w: 12, h: 5 },
    { i: "Schedules", x: 0, y: 5, w: 12, h: 5 },
    { i: "Tickets", x: 0, y: 10, w: 12, h: 5 },
    { i: "PTOs", x: 0, y: 15, w: 12, h: 5 },
    { i: "Third Party Tickets", x: 0, y: 20, w: 12, h: 5 },
  ],
  Grid: [
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
  const [layout, setLayout] = useState<Layout[]>(predefinedLayouts.Default);
  const [layoutType, setLayoutType] = useState<string>("Default");
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

  const handleLayoutSelect = (val: string) => {
    const selectedLayout = val;
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
      case "Grid":
        return 70;
      case "Compact":
        return 70;
      default:
        return 30;
    }
  };

  const onBreakpointChange = (newBreakpoint: string) => {
    if (newBreakpoint !== lastBreakpoint) {
      setLastBreakpoint(newBreakpoint);
      console.log(`Changed to ${newBreakpoint} breakpoint`);

      if (newBreakpoint === "lg" || newBreakpoint === "md") {
        setLayout(predefinedLayouts.Grid);
        setLayoutType("Grid");
      } else if (newBreakpoint === "sm" || newBreakpoint === "xs") {
        setLayout(predefinedLayouts.Compact);
        setLayoutType("Compact");
      } else {
        setLayout(predefinedLayouts.Default);
        setLayoutType("Default");
      }
    }
  };

  return (
    <div className={styles.dashboardContainer}>

      <div className={`d-flex justify-content-between`}>

        <div className={``}>
          <input
            type="text"
            placeholder="Batch Code"
            className={styles.batchCodeInput}
          />
          <button className={styles.batchSearchBtn}>Batch Search</button>
        </div>
        <div className={styles.controls}>
          <Dropdown className={styles.layoutDropdown}>
            <Dropdown.Toggle className={styles.layoutDropdown} id="dropdown-basic">
              {layoutType}
            </Dropdown.Toggle>

            <Dropdown.Menu className={styles.layoutDropdownMenu}>
              <Dropdown.Item
                className={styles.layoutDropdownItems}

                onClick={() => handleLayoutSelect("Default")}
              >
                Default Layout
              </Dropdown.Item>
              <Dropdown.Item
                className={styles.layoutDropdownItems}
                onClick={() => handleLayoutSelect("Compact")}
              >
                Compact Layout
              </Dropdown.Item>
              <Dropdown.Item
                className={styles.layoutDropdownItems}
                onClick={() => handleLayoutSelect("Grid")}
              >
                Grid Layout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>


      <ResponsiveGridLayout
        className={styles.layout}
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={getRowHeight()}
        width={1200}
        onLayoutChange={handleLayoutChange}
        draggableHandle=".draggableHandle"
        onBreakpointChange={onBreakpointChange}
      >

        <div key="Nominations" className={`${styles.gridItem}`}>
          <div className= "">

          <DashboardTableWrapper
            key="Nominations"
            title="Nominations"
            pipelineOptions={pipelineOptions}
            selectedPipelines={selectedPipelines}
            handlePipelineChange={handlePipelineChange}
            tableData={nominationsData}
            />
            </div>
        </div>

        <div key="Schedules" className={styles.gridItem}>
        <div className= "">
          <DashboardTableWrapper
            key="Schedules"
            title="Schedules"
            pipelineOptions={pipelineOptions2}
            selectedPipelines={selectedPipelines2}
            handlePipelineChange={handlePipelineChange2}
            tableData={schedulesData}
          />
        </div>
        </div>

        <div key="Tickets" className={styles.gridItem}>
        <div className= "">
          <DashboardTableWrapper
            key="Tickets"
            title="Tickets"
            pipelineOptions={pipelineOptions2}
            selectedPipelines={selectedPipelines2}
            handlePipelineChange={handlePipelineChange2}
            tableData={ticketsData}
          />
        </div>
        </div>

        <div key="PTOs" className={styles.gridItem}>
        <div className= "">
          <DashboardTableWrapper
            key="PTOs"
            title="PTOs"
            pipelineOptions={pipelineOptions2}
            selectedPipelines={selectedPipelines2}
            handlePipelineChange={handlePipelineChange2}
            tableData={ptosData}
          />
        </div>
        </div>

        <div key="Third Party Tickets" className={styles.gridItem}>
        <div className= "">
          <DashboardTableWrapper
            key="Third Party Tickets"
            title="Third Party Tickets"
            pipelineOptions={pipelineOptions2}
            selectedPipelines={selectedPipelines2}
            handlePipelineChange={handlePipelineChange2}
            tableData={thirdPartyTicketsData}
          />
        </div>
        </div>

      </ResponsiveGridLayout>
    </div>
  );
};

export default Dashboard;
