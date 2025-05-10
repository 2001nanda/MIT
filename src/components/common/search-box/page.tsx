"use client";
import { CheckIn, CheckOut, Guests, Hotel, Search, From, To } from "@/constant/constant";
import { FC, useState, useEffect } from "react";
import DatePickerComponent from "../date-picker";
import Link from "next/link";
import { FaMapMarkerAlt, FaExchangeAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Loader from "../../../layouts/loader/page";

const SearchBox: FC<ISearchBoxProps> = ({ classRound, searchType }) => {
  const [guestCount, setGuestCount] = useState(1);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [startDate1, setStartDate1] = useState(new Date());
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [fromQuery, setFromQuery] = useState("Bangalore");
  const [toQuery, setToQuery] = useState("Chennai");
  const [fromSuggestions, setFromSuggestions] = useState<City[]>([]);
  const [toSuggestions, setToSuggestions] = useState<City[]>([]);
  const [hasUserTypedFrom, setHasUserTypedFrom] = useState(false);
  const [hasUserTypedTo, setHasUserTypedTo] = useState(false);
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedFromCity, setSelectedFromCity] = useState<City | null>(null);
  const [selectedToCity, setSelectedToCity] = useState<City | null>(null);

  interface City {
    id: string;
    name: string;
    state: string;
  }

  const handleSearch = () => {
    setLoading(true);
    const from = fromQuery || "Bangalore";
    const to = toQuery || "Chennai";
    const date = startDate.toISOString().split("T")[0];
    const searchParams = new URLSearchParams({ from, to, date });
    const fullUrl = `/bus/listing?${searchParams.toString()}`;
    push(fullUrl);
  };

  const handleFromSelect = (city: City) => {
    setFromQuery(city.name);
    setSelectedFromCity(city);
    setShowFromSuggestions(false);
    setHasUserTypedFrom(false);
  };
  const handleSearchmain = () => {
    setLoading(true);
  
    const fromId = selectedFromCity?.id || 0;
    const toId = selectedToCity?.id || 0;
    const dateOfJourney = startDate.toISOString(); // Full ISO string with time
    const name = `${fromQuery || "bangalore"}#${toQuery || "chennai"}`;
  
    const searchParams = new URLSearchParams({
      source: String(fromId),
      destination: String(toId),
      dateOfJourney,
      name,
    });
  
    const fullUrl = `/bus/listing?${searchParams.toString()}`;
  
    push(fullUrl);
  };
  

  const handleToSelect = (city: City) => {
    setToQuery(city.name);
    setSelectedToCity(city);
    setShowToSuggestions(false);
    setHasUserTypedTo(false);
  };

  const handleSwap = () => {
    setFromQuery(toQuery);
    setToQuery(fromQuery);
    setSelectedFromCity(selectedToCity);
    setSelectedToCity(selectedFromCity);
  };

  useEffect(() => {
    if (hasUserTypedFrom && fromQuery.length > 1) {
      fetch(`https://localhost:44370/api/My/getautosuggest?query=${fromQuery}`)
        .then((res) => res.json())
        .then((data: City[]) => {
          setFromSuggestions(data);
          setShowFromSuggestions(true);
        })
        .catch((err) => console.error("Error fetching cities for From:", err));
    } else {
      setShowFromSuggestions(false);
    }
  }, [fromQuery, hasUserTypedFrom]);

  useEffect(() => {
    if (hasUserTypedTo && toQuery.length > 1) {
      fetch(`https://localhost:44370/api/My/getautosuggest?query=${toQuery}`)
        .then((res) => res.json())
        .then((data: City[]) => {
          setToSuggestions(data);
          setShowToSuggestions(true);
        })
        .catch((err) => console.error("Error fetching cities for To:", err));
    } else {
      setShowToSuggestions(false);
    }
  }, [toQuery, hasUserTypedTo]);

  return (
    <div className={`search-box ${classRound ? "rounded10" : ""}`}>
      {loading && (
        <div className="fullscreen-loader">
          <Loader loaderTimeout={5000} />
        </div>
      )}

      <div className="left-part row">
        <div className="search-body title-hotel col-3" style={{ position: "relative", overflow: "visible" }}>
          <h6>{From}</h6>
          <input
            type="text"
            value={fromQuery}
            onChange={(e) => {
              setFromQuery(e.target.value);
              setHasUserTypedFrom(true);
            }}
            // placeholder="Source City"
            className="form-control"
            style={{ fontSize: "30px" }}
          />
          {showFromSuggestions && (
            <ul style={suggestionStyles}>
              {fromSuggestions.slice(0, 4).map((city, index) => (
                <li
                  key={city.id}
                  onClick={() => handleFromSelect(city)}
                  style={suggestionItemStyle(index !== fromSuggestions.length - 1)}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f0f0")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
                >
                  <FaMapMarkerAlt size={14} />
                  <div>{city.name}</div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div onClick={handleSwap} style={{alignItems: "center", cursor: "pointer", width: "40px" }}>
          <FaExchangeAlt size={20} style={{ marginRight: "-27px" }} />
        </div>

        <div className="search-body title-hotel col-3" style={{ position: "relative", overflow: "visible" }}>
           <div
      style={{
        width: "2px",
        height: "40px",
        backgroundColor: "#e8e8e8",
        position: "absolute",
        // right: 0,
        top: "50%",
        transform: "translateY(-50%)",
      }}
    />
          <h6>{To}</h6>
          <input
            type="text"
            value={toQuery}
            onChange={(e) => {
              setToQuery(e.target.value);
              setHasUserTypedTo(true);
            }}
            // placeholder="Destination City"
            className="form-control"
            style={{ fontSize: "30px" }}
          />
          {showToSuggestions && (
            <ul style={suggestionStyles}>
              {toSuggestions.slice(0, 4).map((city, index) => (
                <li
                  key={city.id}
                  onClick={() => handleToSelect(city)}
                  style={suggestionItemStyle(index !== toSuggestions.length - 1)}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f0f0")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
                >
                  <FaMapMarkerAlt size={14} />
                  <div>{city.name}</div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="search-body col-2 search-input">
          <h6>TravelDate</h6>
          <DatePickerComponent start={startDate} setStart={setStartDate} />
        </div>

        <div className="search-body btn-search col-2">
          <div className="right-part">
            <button className="btn btn-solid rounded-sm" onClick={handleSearch}>
              {Search}
            </button>
          </div>
        </div>
      </div>

      <style>
        {`
          .fullscreen-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(255, 255, 255, 0.6);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
          }
        `}
      </style>
    </div>
  );
};

const suggestionStyles: React.CSSProperties = {
  position: "absolute",
  left: 0,
  right: 0,
  width: "90%",
  background: "white",
  border: "1px solid rgba(84, 66, 66, 0.33)",
  borderRadius: "15px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
  maxHeight: "300px",
  zIndex: 9999,
  padding: 0,
  marginTop: "5px",
  listStyle: "none",
  overflowY: "auto",
  marginLeft: "20px",
};

const suggestionItemStyle = (hasBorder: boolean): React.CSSProperties => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "12px 15px",
  cursor: "pointer",
  fontSize: "16px",
  transition: "background 0.3s ease-in-out",
  borderBottom: hasBorder ? "1px solid #eee" : "none",
  fontWeight: "normal",
  background: "white",
});

export default SearchBox;
