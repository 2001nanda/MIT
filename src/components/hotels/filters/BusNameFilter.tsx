"use client";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux-toolkit/store";
import { Bus, ChevronDown, ChevronUp } from "lucide-react";

interface BusNameFilterProps {
  options: string[];
}

const BusNameFilter: React.FC<BusNameFilterProps> = ({ options }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [showBusName, setShowBusName] = useState(false);

  const selectedBusNames = useSelector(
    (state: RootState) => state.tourFilterReducer.busNameStatus || []
  );

  const handleChange = (name: string) => {
    const updated = selectedBusNames.includes(name)
      ? selectedBusNames.filter((b) => b !== name)
      : [...selectedBusNames, name];

    dispatch({
      type: "busNameStatus",
      payload: updated,
    });
  };

  const filteredOptions = useMemo(
    () =>
      options.filter((name) =>
        name.toLowerCase().includes(search.toLowerCase())
      ),
    [search, options]
  );

  return (
    <div
    style={{
      flex: 1,
      minWidth: "250px",
      borderRadius: "12px",
      background: "#fff",
      border: "1px solid #ddd",
      padding: "0.75rem 1rem",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
      transition: "all 0.2s ease-in-out",
    }}
    >
      <h4
       style={{
        fontWeight: 500,
        fontSize: "14px",
        color: "#000",
        margin: 0,
        paddingBottom: "0.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
                  width: "100%", // Ensure it takes up the full width
      }}
        onClick={() => setShowBusName(!showBusName)}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Bus size={16} /> Bus Operators
        </span>
        {showBusName ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </h4>

      {showBusName && (
        <>
          <input
            type="text"
            placeholder="Search operators..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem",
              marginBottom: "1rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          />
          <div style={{ maxHeight: "200px", overflowY: "auto" }}>
            {filteredOptions.map((name, i) => (
              <label
                key={i}
                htmlFor={`bus-name-${name}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                <input
                  type="checkbox"
                  id={`bus-name-${name}`}
                  checked={selectedBusNames.includes(name)}
                  onChange={() => handleChange(name)}
                  style={{ width: "auto", marginRight: "0.75rem" }}
                />
                {name}
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BusNameFilter;
