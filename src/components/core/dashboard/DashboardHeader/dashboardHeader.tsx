import { useState } from "react";
import { Responsive, WidthProvider, Layout } from "react-grid-layout";

export default function DashboardHeader() {
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
  const [layoutType, setLayoutType] = useState<string>("default");
  const [layout, setLayout] = useState<Layout[]>(predefinedLayouts.default);
  const handleLayoutSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLayout = event.target.value;
    setLayout(
      predefinedLayouts[selectedLayout as keyof typeof predefinedLayouts]
    );
    setLayoutType(selectedLayout);
  };

  return (
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
  );
}
