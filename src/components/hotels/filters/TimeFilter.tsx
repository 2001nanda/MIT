// TimeFilter.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux-toolkit/store';

interface TimeFilterProps {
  onTimeRangeChange: (timeRange: [number, number]) => void;
}

const TimeFilter: React.FC<TimeFilterProps> = ({ onTimeRangeChange }) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<[number, number] | null>(null);

  const handleTimeRangeChange = (timeRange: [number, number]) => {
    setSelectedTimeRange(timeRange);
    onTimeRangeChange(timeRange);
  };

  return (
    <div className="time-filter">
      <h5>Select Time Range</h5>
      <div className="time-range-options">
        <button
          onClick={() => handleTimeRangeChange([0, 6])}
          className={selectedTimeRange?.[0] === 0 && selectedTimeRange?.[1] === 6 ? 'active' : ''}
        >
          0-6
        </button>
        <button
          onClick={() => handleTimeRangeChange([6, 12])}
          className={selectedTimeRange?.[0] === 6 && selectedTimeRange?.[1] === 12 ? 'active' : ''}
        >
          6-12
        </button>
        <button
          onClick={() => handleTimeRangeChange([12, 18])}
          className={selectedTimeRange?.[0] === 12 && selectedTimeRange?.[1] === 18 ? 'active' : ''}
        >
          12-18
        </button>
        <button
          onClick={() => handleTimeRangeChange([18, 24])}
          className={selectedTimeRange?.[0] === 18 && selectedTimeRange?.[1] === 24 ? 'active' : ''}
        >
          18-24
        </button>
      </div>
    </div>
  );
};

export default TimeFilter;