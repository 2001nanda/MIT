"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux-toolkit/store";
import { Bus, ChevronDown, ChevronUp, Snowflake, Fan, BedDouble, Armchair } from "lucide-react";

const busTypes = [
  { label: "AC", value: "ac", icon: <Snowflake size={14} /> },
  { label: "Non AC", value: "non-ac", icon: <Fan size={14} /> },
  { label: "Seater", value: "seater", icon: <Armchair size={14} /> },
  { label: "Sleeper", value: "sleeper", icon: <BedDouble size={14} /> },
];

const BusTypeFilter: React.FC = () => {
  const dispatch = useDispatch();
  const selected = useSelector((state: RootState) => state.tourFilterReducer.busTypeTags || []);
  const [show, setShow] = useState(true);

  const handleChange = (value: string) => {
    const alreadySelected = selected.includes(value);
    const updated = alreadySelected
      ? selected.filter((val) => val !== value)
      : [...selected, value];

    dispatch({
      type: "busTypeTags",
      payload: updated,
    });
  };

  const handleClear = () => {
    dispatch({ type: "busTypeTags", payload: [] });
  };

  return (
    <div className="filter-block">
      <h6 onClick={() => setShow(!show)} className="toggle-header">
        <span className="header-left">
          <Bus size={16} />
          Bus Type
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
          {busTypes.map(({ label, value, icon }) => (
            <div
              key={value}
              className={`type-button ${selected.includes(value) ? "active" : ""}`}
              onClick={() => handleChange(value)}
            >
              <span className="icon">{icon}</span>
              {label}
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
        .type-button {
          flex: 1 1 48%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 8px;
          background-color: #f9f9f9;
          text-align: center;
          font-size: 13px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .type-button.active {
          background-color: rgb(239, 63, 62);
          color: white;
          border-color: rgb(239, 63, 62);
        }
        .type-button:hover {
          background-color: #e0e0e0;
          color:black;
        }
      `}</style>
    </div>
  );
};

export default BusTypeFilter;
