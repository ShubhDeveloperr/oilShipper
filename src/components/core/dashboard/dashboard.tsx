import React, { useState } from "react";
import { Responsive, WidthProvider, Layout } from "react-grid-layout";
import { MultiValue, SingleValue } from "react-select";
import "./dashboard.css";
import DashboardTableWrapper from "../../../helpers/elements/DashboardTableWrapper/dashboardTableWrapper";
import DashboardHeader from "./DashboardHeader/dashboardHeader";

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

// Define layout presets
const predefinedLayouts = {
  default: [
    { i: "Nominations", x: 0, y: 10, w: 6, h: 10 },
    { i: "Schedules", x: 6, y: 10, w: 6, h: 10 },
    { i: "Tickets", x: 0, y: 10, w: 6, h: 10 },
    { i: "PTOs", x: 6, y: 10, w: 6, h: 10 },
    { i: "Third Party Tickets", x: 0, y: 20, w: 6, h: 10 },
    { i: "notices-6", x: 6, y: 20, w: 6, h: 10 },
    { i: "notices-7", x: 0, y: 30, w: 6, h: 10 },
    { i: "notices-8", x: 6, y: 30, w: 6, h: 10 },
  ],
  compact: [
    { i: "Nominations", x: 0, y: 0, w: 12, h: 5 },
    { i: "Schedules", x: 0, y: 5, w: 12, h: 5 },
    { i: "Tickets", x: 0, y: 10, w: 12, h: 5 },
    { i: "PTOs", x: 0, y: 15, w: 12, h: 5 },
    { i: "Third Party Tickets", x: 0, y: 20, w: 12, h: 5 },
    { i: "notices-6", x: 0, y: 25, w: 12, h: 5 },
    { i: "notices-7", x: 0, y: 30, w: 12, h: 5 },
    { i: "notices-8", x: 0, y: 35, w: 12, h: 5 },
  ],
  grid: [
    { i: "Nominations", x: 0, y: 0, w: 4, h: 5 },
    { i: "Schedules", x: 4, y: 0, w: 4, h: 5 },
    { i: "Tickets", x: 8, y: 0, w: 4, h: 5 },
    { i: "PTOs", x: 0, y: 5, w: 4, h: 5 },
    { i: "Third Party Tickets", x: 4, y: 5, w: 4, h: 5 },
    { i: "notices-6", x: 8, y: 5, w: 4, h: 5 },
    { i: "notices-7", x: 0, y: 10, w: 4, h: 5 },
    { i: "notices-8", x: 4, y: 10, w: 4, h: 5 },
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

// Simulate hardcoded data (API response)
const criticalNoticesData: Notice[] = [
  {
    pipeline: "AGT",
    subject: "Operational Flow Order",
    date: "9/20/2024 3:00 PM",
  },
  {
    pipeline: "AGT",
    subject: "Pipeline Conditions for 9/18/2024",
    date: "9/17/2024 3:30 PM",
  },
  {
    pipeline: "AGT",
    subject: "Routine Maintenance Notice",
    date: "9/15/2024 10:00 AM",
  },
  {
    pipeline: "AGT",
    subject: "Update on Maintenance Schedule",
    date: "9/10/2024 2:00 PM",
  },
  {
    pipeline: "AGT",
    subject: "System Testing Alert",
    date: "9/05/2024 1:30 PM",
  },
  {
    pipeline: "AGT",
    subject: "Emergency Flow Restriction",
    date: "9/01/2024 9:00 AM",
  },
  { pipeline: "AGT", subject: "Inspection Alert", date: "8/30/2024 5:00 PM" },
  {
    pipeline: "AGT",
    subject: "Weather-Related Delay",
    date: "8/25/2024 12:00 PM",
  },
  {
    pipeline: "AGT",
    subject: "Pipeline Safety Inspection",
    date: "8/20/2024 8:00 AM",
  },
  { pipeline: "AGT", subject: "Upgrade Notice", date: "8/15/2024 6:00 PM" },
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
      <DashboardHeader />
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
        <DashboardTableWrapper
          key="Nominations"
          title="Nominations"
          pipelineOptions={pipelineOptions}
          selectedPipelines={selectedPipelines}
          handlePipelineChange={handlePipelineChange}
          tableData={criticalNoticesData}
        />
        <DashboardTableWrapper
          key="Schedules"
          title="Schedules"
          pipelineOptions={pipelineOptions2}
          selectedPipelines={selectedPipelines2}
          handlePipelineChange={handlePipelineChange2}
          tableData={criticalNoticesData}
        />
        <DashboardTableWrapper
          key="Tickets"
          title="Tickets"
          pipelineOptions={pipelineOptions2}
          selectedPipelines={selectedPipelines2}
          handlePipelineChange={handlePipelineChange2}
          tableData={criticalNoticesData}
        />
        <DashboardTableWrapper
          key="PTOs"
          title="PTOs"
          pipelineOptions={pipelineOptions2}
          selectedPipelines={selectedPipelines2}
          handlePipelineChange={handlePipelineChange2}
          tableData={criticalNoticesData}
        />
        <DashboardTableWrapper
          key="Third Party Tickets"
          title="PTOs"
          pipelineOptions={pipelineOptions2}
          selectedPipelines={selectedPipelines2}
          handlePipelineChange={handlePipelineChange2}
          tableData={criticalNoticesData}
        />
      </ResponsiveGridLayout>
    </div>
  );
};

export default Dashboard;
