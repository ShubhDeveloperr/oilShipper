import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import './dashboard.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

const Dashboard: React.FC = () => {
  const [layout, setLayout] = useState([
    { i: 'critical-notices', x: 0, y: 0, w: 16, h: 10 },
    { i: 'non-critical-notices', x: 6, y: 0, w: 16, h: 10 },
  ]);

  const handleLayoutChange = (newLayout: React.SetStateAction<{ i: string; x: number; y: number; w: number; h: number; }[]>) => {
    setLayout(newLayout);
  };

  return (
    <div className="dashboard-container">
      <div className="controls">
        <select className="layout-select">
          <option value="default">Select Layout</option>
          {/* Additional layout options can go here */}
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
        <div key="critical-notices" className="grid-item">
          <div className="item-header draggable-handle">Critical Notices</div>
          {/* Your list content here */}
        </div>
        <div key="non-critical-notices" className="grid-item">
          <div className="item-header draggable-handle">Non-Critical Notices</div>
          {/* Your list content here */}
        </div>
      </ResponsiveGridLayout>
    </div>
  );
};

export default Dashboard;
