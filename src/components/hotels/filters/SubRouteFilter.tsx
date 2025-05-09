"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux-toolkit/store";
import { MapPin, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
interface SubRouteFilterProps {
  boardingOptions: string[];
  droppingOptions: string[];
}

const SubRouteFilter: React.FC<SubRouteFilterProps> = ({
  boardingOptions,
  droppingOptions,
}) => {
  const dispatch = useDispatch();
  const [boardingSearch, setBoardingSearch] = useState("");
  const [droppingSearch, setDroppingSearch] = useState("");
  const [showBoarding, setShowBoarding] = useState(false);
  const [showDropping, setShowDropping] = useState(false);

  const selectedBoarding = useSelector(
    (state: RootState) => state.tourFilterReducer.boardingStatus || []
  );
  const selectedDropping = useSelector(
    (state: RootState) => state.tourFilterReducer.droppingStatus || []
  );
  const handleClear = (type: "boarding" | "dropping") => {
    dispatch({
      type: type === "boarding" ? "boardingStatus" : "droppingStatus",
      payload: [],
    });
  };
  const handleChange = (route: string, type: "boarding" | "dropping") => {
    const selectedRoutes = type === "boarding" ? selectedBoarding : selectedDropping;

    const newSelection = selectedRoutes.includes(route)
      ? selectedRoutes.filter((r) => r !== route)
      : [...selectedRoutes, route];

    dispatch({
      type: type === "boarding" ? "boardingStatus" : "droppingStatus",
      payload: newSelection,
    });
  };

  const filteredBoarding = useMemo(
    () =>
      boardingOptions.filter((route) =>
        route.toLowerCase().includes(boardingSearch.toLowerCase())
      ),
    [boardingSearch, boardingOptions]
  );

  const filteredDropping = useMemo(
    () =>
      droppingOptions.filter((route) =>
        route.toLowerCase().includes(droppingSearch.toLowerCase())
      ),
    [droppingSearch, droppingOptions]
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" ,marginTop: "20px"  }}>
      {/* Boarding Section */}
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
          }}
          onClick={() => setShowBoarding(!showBoarding)}
        >
             <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <MapPin size={16} /> Boarding Points
          </span>
          <span
            style={{
              fontSize: "18px",
              fontWeight: "700",
              marginLeft: "8px",
              
            }}
          >
          <span className="header-right">
  {selectedBoarding.length > 0 && (
    <button
      className="clear-btn"
      style={{
        backgroundColor: "transparent",  // transparent background
        border: "none",                   // remove border
        color: "rgb(239, 63, 62)",       // text color
        fontSize: "12px",                 // font size
        fontWeight: "600",                // font weight
        cursor: "pointer",               // cursor pointer on hover
        textDecoration: "underline",      // underline the text
      }}
      onClick={(e) => { e.stopPropagation(); handleClear("boarding"); }}
    >
      Clear
    </button>
  )}
  {showBoarding ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
</span>

          </span>
        </h4>

        {showBoarding && (
          <>
            <input
              type="text"
              placeholder="Search boarding..."
              value={boardingSearch}
              onChange={(e) => setBoardingSearch(e.target.value)}
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
              {filteredBoarding.map((route, i) => (
                <label
                  key={i}
                  htmlFor={`boarding-${route}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "0.5rem",
                    cursor: "pointer",
                    fontSize: "16px",
                    accentColor: "rgb(239, 63, 62)"
                    
                  }}
                >
                  <input
                    type="checkbox"
                    id={`boarding-${route}`}
                    checked={selectedBoarding.includes(route)}
                    onChange={() => handleChange(route, "boarding")}
                    style={{ width: "auto", marginRight: "0.75rem" }}
                  />
                  {route}
                </label>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Dropping Section */}
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
          // style={{
          //   fontWeight: 600,
          //   marginBottom: "1rem",
          //   position: "relative",
          //   fontSize: "14px",
          //   color: "black",
          //   textTransform: "capitalize",
          //   margin: "20px 0",
          //   cursor: "pointer",
          //   display: "flex", // Ensure flexbox is enabled
          //   justifyContent: "space-between", // Distribute space between elements
          //   width: "100%", // Ensure it takes up the full width
          // }}
          onClick={() => setShowDropping(!showDropping)}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <MapPin size={16} /> Dropping Point
          </span>
          
          <span
            style={{
              fontSize: "18px",
              fontWeight: "700",
              marginLeft: "8px",
            }}
          >
            {/* {showDropping ? "−" : "+"} */}
            {showDropping ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </span>
        </h4>

        {showDropping && (
          <>
            <input
              type="text"
              placeholder="Search dropping..."
              value={droppingSearch}
              onChange={(e) => setDroppingSearch(e.target.value)}
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
              {filteredDropping.map((route, i) => (
                <label
                  key={i}
                  htmlFor={`dropping-${route}`}
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
                    id={`dropping-${route}`}
                    checked={selectedDropping.includes(route)}
                    onChange={() => handleChange(route, "dropping")}
                    style={{ width: "auto", marginRight: "0.75rem" }}
                  />
                  {route}
                </label>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SubRouteFilter;
