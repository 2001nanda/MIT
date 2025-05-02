"use client";
import { FC, useState } from "react";
import RangeInputFields from "@/components/common/filters/input-range";
import { Wallet, ChevronDown, ChevronUp } from "lucide-react";

interface IPrice {
  min?: number | null;
  max?: number | null;
}

const PriceRange: FC<IPrice> = ({ min, max }) => {
  const safeMin = typeof min === "number" && !Number.isNaN(min) ? min : 0;
  const safeMax = typeof max === "number" && !Number.isNaN(max) ? max : 100;

  const [show, setShow] = useState(
    typeof min === "number" && typeof max === "number"
  );

  return (
    <div
      className="filter-block"
      style={{
        border: "1px solid #ddd",
        padding: "1rem",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        background: "#fff",
        marginBottom: "1rem",
      }}
    >
      <div className={`collection-collapse-block ${show ? "open" : ""}`}>
        <h6
          className="collapse-block-titl"
          onClick={() => setShow(!show)}
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Wallet size={18} /> Price Range
          </span>
          <span
            style={{
              fontSize: "18px",
              fontWeight: "700",
              marginLeft: "8px",
            }}
          >
            {show ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </span>
        </h6>

        <div className={`collection-collapse-block-content ${show ? "" : "d-none"}`}>
          <RangeInputFields min={safeMin} max={safeMax} />
        </div>
      </div>
    </div>
  );
};

export default PriceRange;
