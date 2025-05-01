import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux-toolkit/store";
import { ChevronUp, ChevronDown } from "lucide-react";
import useFilterTour from "@/utils/filters/useFilterTour";

const sortOptions = [
  { label: "Departure", value: "departure" },
  { label: "Duration", value: "duration" },
  { label: "Arrival", value: "arrival" },
  // { label: "Ratings", value: "rating" },
  { label: "Seats Available", value: "seats" },

  { label: "Price", value: "price" },
];
interface SortByFilterProps {
  totalCount: number;
}
const SortByFilter: React.FC<SortByFilterProps> = ({ totalCount }) => {
  const dispatch = useDispatch();
  const { sortBy, sortOrder } = useSelector((state: RootState) => state.tourFilterReducer);
  const allBuses = useSelector((state: RootState) => state.tourFilterReducer.allBuses); // 👈 this grabs all buses from Redux
  const filteredBuses = useFilterTour({ value: allBuses });
  const handleSortChange = (value: string) => {
    dispatch({ type: "setSort", payload: { sortBy: value } });
  };

  const renderSortIcon = (value: string) => {
    if (sortBy !== value) return null;
    return sortOrder === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
  };

  return (
<div className="sort-wrapper">
  <div className="left-section">
    <span className="bus-count"><strong>{Array.isArray(filteredBuses) ? filteredBuses.length : 0} Buses </strong>  found</span>
  </div>
  <div className="right-section">
    <span className="sort-label">SORT BY:</span>
    <div className="sort-options">
      {sortOptions.map((option) => (
        <button
          key={option.value}
          className={`sort-btn ${sortBy === option.value ? "active" : ""}`}
          onClick={() => handleSortChange(option.value)}
        >
          {option.label} {renderSortIcon(option.value)}
        </button>
      ))}
    </div>
  </div>

  <style jsx>{`
    .sort-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: 16px;
      margin-top: 16px;
    }
    .left-section {
      font-size: 14px;
      font-weight: 500;
      color: #2b2b2b;
    }
    .right-section {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }
    .sort-label {
      font-weight: 600;
      font-size: 14px;
    }
    .sort-options {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .sort-btn {
      padding: 6px 12px;
      font-size: 14px;
      border: 1px solid #ccc;
      border-radius: 6px;
      background-color: #f5f5f5;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .sort-btn.active {
      background-color: rgb(12, 97, 142);
      color: white;
      border-color: rgb(12, 97, 142);
    }
    .sort-btn:hover {
      background-color: #e6e6e6;
      color:rgb(0, 0, 0);
    }
  `}</style>
</div>

  );
};

export default SortByFilter;