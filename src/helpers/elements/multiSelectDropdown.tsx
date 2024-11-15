import React, { useState, ChangeEvent } from 'react';
import "./elements.css"

interface PipelineOption {
  label: string;
  value: string;
}

interface MultiSelectDropdownProps {
  pipelineOptions: PipelineOption[];
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({ pipelineOptions }) => {
  const [selectedPipelines, setSelectedPipelines] = useState<PipelineOption[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectItem = (item: PipelineOption) => {
    if (!selectedPipelines.find((pipeline) => pipeline.value === item.value)) {
      setSelectedPipelines([...selectedPipelines, item]);
    }
  };

  const handleRemoveItem = (item: PipelineOption) => {
    setSelectedPipelines(selectedPipelines.filter((pipeline) => pipeline.value !== item.value));
  };

  const filteredOptions = pipelineOptions.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="custom-multiselect">
      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search Pipeline"
          className="search-input"
        />
      </div>
      <div className="selected-items">
        {selectedPipelines.map((item, index) => (
          <div key={index} className="selected-item">
            <span>{item.label}</span>
            <button
              className="remove-btn"
              onClick={() => handleRemoveItem(item)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <div className="dropdown-list">
        {filteredOptions.map((option, index) => (
          <div
            key={index}
            className="dropdown-item"
            onClick={() => handleSelectItem(option)}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiSelectDropdown;
