import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux-toolkit/store";
import { ChevronRight } from "lucide-react";
import useFilterTour from "@/utils/filters/useFilterTour";

const sortOptions = [
  { label: "Departure", value: "departure" },
  { label: "Duration", value: "duration" },
  { label: "Arrival", value: "arrival" },
  { label: "Price", value: "price" },
];

interface SortByFilterProps {
  totalCount: number;
}

const SortByFilter: React.FC<SortByFilterProps> = ({ totalCount }) => {
  const dispatch = useDispatch();
  const { sortBy, sortOrder } = useSelector((state: RootState) => state.tourFilterReducer);
  const allBuses = useSelector((state: RootState) => state.tourFilterReducer.allBuses);
  const filteredBuses = useFilterTour({ value: allBuses });

  const handleSortChange = (value: string) => {
    dispatch({ type: "setSort", payload: { sortBy: value } });
  };

  const renderSortIcon = (value: string) => {
    const isActive = sortBy === value;

    const rotation = isActive
      ? sortOrder === "asc"
        ? "-90deg"  // Ascending: up
        : "90deg"   // Descending: down
      : "0deg";     // Default: right

    return (
      <span
        style={{
          display: "inline-flex",
          transform: `rotate(${rotation})`,
          transition: "transform 0.3s ease",
        }}
      >
        <ChevronRight size={14} />
      </span>
    );
  };

  return (
    <div className="sort-wrapper">
      <div className="left-section">
        {/* <span className="bus-count">
          <strong>{Array.isArray(filteredBuses) ? filteredBuses.length : 0} Buses</strong> found
        </span> */}
        <span><strong>SORT BY:</strong></span>
      </div>
      <div className="right-section">
        {/* <span className="sort-label" style={{ marginRight: "35px" }}>SORT BY:</span> */}
        <div className="sort-options">
          {sortOptions.map((option) => {
            let marginRight;
            switch (option.value) {
              case "price":
                marginRight = "88px";
                break;
              case "arrival":
                marginRight = "120px";
                break;
              case "duration":
                marginRight = "162px";
                break;
              case "departure":
                marginRight = "149px";
                break;
              default:
                marginRight = "0";
            }

            return (
              <button
                key={option.value}
                className={`sort-btn ${sortBy === option.value ? "active" : ""}`}
                style={{ marginRight }}
                onClick={() => handleSortChange(option.value)}
              >
                {option.label} {renderSortIcon(option.value)}
              </button>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .sort-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          margin: 16px 0;
          padding: 12px 16px;
          border: 1px solid #ccc;
          border-radius: 8px;
          background-color: #f9f9f9;
        }
        .left-section {
          font-size: 14px;
          font-weight: 500;
          color: #2b2b2b;
        }
        .right-section {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
        }
        .sort-label {
          font-weight: 600;
          font-size: 14px;
        }
        .sort-options {
          display: flex;
          flex-wrap: wrap;
        }
        .sort-btn {
          padding: 6px 0;
          font-size: 14px;
          background: transparent;
          border: none;
          color: #333;
          cursor: pointer;
          transition: color 0.2s ease;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .sort-btn.active {
          font-weight: 600;
          color: rgb(12, 97, 142);
        }
        .sort-btn:hover {
          color: rgb(12, 97, 142);
        }
      `}</style>
    </div>
  );
};

export default SortByFilter;
