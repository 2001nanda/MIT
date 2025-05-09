"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux-toolkit/store";
import { Bus, ChevronDown, ChevronUp, Sunrise, Sun, Sunset, Moon } from "lucide-react";
<div> Icons made by <a href="https://www.flaticon.com/authors/rosa-suave" title="Rosa Suave"> Rosa Suave </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>
interface TimeRangeFilterProps {
  filterType: "departureTime" | "arrivalTime";
}

const timeRanges = [
  { label: "BEFORE 10 AM", value: "before-10am", icon: Sunrise },
  { label: "10 AM - 5 PM", value: "10am-5pm", icon: Sun },
  { label: "5 PM - 11 PM", value: "5pm-11pm", icon: Sunset },
  { label: "AFTER 11 PM", value: "after-11pm", icon: Moon },
];

const TimeRangeFilter: React.FC<TimeRangeFilterProps> = ({ filterType }) => {
  const dispatch = useDispatch();
  const selected = useSelector((state: RootState) =>
    filterType === "departureTime"
      ? state.tourFilterReducer.departureTimeStatus || []
      : state.tourFilterReducer.arrivalTimeStatus || []
  );

  const [show, setShow] = useState(true);

  const handleChange = (value: string) => {
    const alreadySelected = selected.includes(value);
    const updated = alreadySelected ? [] : [value];

    dispatch({
      type: filterType === "departureTime" ? "departureTimeStatus" : "arrivalTimeStatus",
      payload: updated,
    });
  };

  const handleClear = () => {
    dispatch({
      type: filterType === "departureTime" ? "departureTimeStatus" : "arrivalTimeStatus",
      payload: [],
    });
  };

  return (
    <div className="filter-block">
      <h6 onClick={() => setShow(!show)} className="toggle-header">
        <span className="header-left">
          <Bus size={16} />
          {filterType === "departureTime" ? "Departure Time" : "Arrival Time"}
        </span>
        <span className="header-right">
          {selected.length > 0 && (
            <button className="clear-button" onClick={(e) => { e.stopPropagation(); handleClear(); }}>
              Clear
            </button>
          )}
          {show ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </h6>

      {show && (
        <div className="button-row">
          {timeRanges.map(({ label, value, icon: Icon }) => (
            <div
              key={value}
              className={`time-button ${selected.includes(value) ? "active" : ""}`}
              onClick={() => handleChange(value)}
            >
              <Icon width={24} height={24} />
              <span className="time-label">{label}</span>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .filter-block {
          width: 100%;
          padding: 12px;
          background: #fff;
          border: 1px solid #ddd;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          margin-bottom: 16px;
          box-sizing: border-box;
        }

        .toggle-header {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .clear-button {
          background-color: transparent;
          border: none;
          color: rgb(239, 63, 62);
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          text-decoration: underline;
        }

        .button-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .time-button {
          flex: 1 1 calc(50% - 4px);
          height: 80px;
          border: 1px solid #ccc;
          border-radius: 8px;
          background-color: #f9f9f9;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }

        .time-button .time-label {
          margin-top: 4px;
          line-height: 1.2;
        }

        .time-button.active {
          background-color: rgb(239, 63, 62);
          border: 1px solid rgb(239, 63, 62);
          color: #fff;
        }

        .time-button:hover {
          background-color: #e0e0e0;
          color:black;
        }

        @media (max-width: 480px) {
          .time-button {
            flex: 1 1 100%;
            height: 70px;
          }
        }
      `}</style>
    </div>
  );
};

export default TimeRangeFilter;
