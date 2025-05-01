"use client";
import { CheckIn, CheckOut, Guests, Hotel, Search, From, To } from "@/constant/constant";
import { FC, useState, useEffect, useRef } from "react";
import DatePickerComponent from "../date-picker";
import Link from "next/link";
import { FaMapMarkerAlt, FaCity } from "react-icons/fa"; // Import icons
import { useRouter } from "next/navigation";
import Loader from "../../../layouts/loader/page";


const SearchBox: FC<ISearchBoxProps> = ({ classRound, searchType }) => {
  const [guestCount, setGuestCount] = useState(1);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [startDate1, setStartDate1] = useState(new Date());
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");
  const [fromSuggestions, setFromSuggestions] = useState<City[]>([]);
  const [toSuggestions, setToSuggestions] = useState<City[]>([]);
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedFromCity, setSelectedFromCity] = useState<City | null>(null);
const [selectedToCity, setSelectedToCity] = useState<City | null>(null);
  // Define City type
  interface City {
    id: string;
    name: string;
    state: string;
  }
  const router = useRouter();

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
  
    router.push(fullUrl);
  };
  
  
  
  const handleSearch = () => {
    setLoading(true);
    let from = fromQuery;
    let to = toQuery;

    if (!fromQuery && !toQuery) {
       from =  "Bangalore";
       to =  "Chennai";
    }
  
    const date = startDate.toISOString().split("T")[0];
    const searchParams = new URLSearchParams({
      from,
      to,
      date,
    });
  
    const fullUrl = `/bus/listing?${searchParams.toString()}`;
  
    router.push(fullUrl);
  };
  
  useEffect(() => {
    if (fromQuery.length > 1) {
      fetch(`https://localhost:44370/api/My/getautosuggest?query=${fromQuery}`)
        .then((res) => res.json())
        .then((data: City[]) => {
          setFromSuggestions(data);
          setShowFromSuggestions(true);
        })
        .catch((error) => console.error("Error fetching cities for From:", error));
    } else {
      setFromSuggestions([]);
      setShowFromSuggestions(false);
    }
  }, [fromQuery]);

  // Fetch suggestions for "To" field
  useEffect(() => {
    if (toQuery.length > 1) {
      fetch(`https://localhost:44370/api/My/getautosuggest?query=${toQuery}`)
        .then((res) => res.json())
        .then((data: City[]) => {
          setToSuggestions(data);
          setShowToSuggestions(true);
        })
        .catch((error) => console.error("Error fetching cities for To:", error));
    } else {
      setToSuggestions([]);
      setShowToSuggestions(false);
    }
  }, [toQuery]);

  // Handle selection for "From" field
  const handleFromSelect = (city: City) => {
    setFromQuery(city.name);
    setSelectedToCity(city);
    setTimeout(() => {
      setFromSuggestions([]);
      setShowFromSuggestions(false);
    }, 100); // Slight delay to allow state update
  };
  

  // Handle selection for "To" field
  const handleToSelect = (city: City) => {
    setToQuery(city.name);
    setSelectedToCity(city); 
    setTimeout(() => {
      setToSuggestions([]);
      setShowToSuggestions(false);
    }, 100);
  };

  const FaMapMarkerAltIcon = FaMapMarkerAlt as unknown as FC<{ size?: number }>;
  
  return (
    <div className={`search-box ${classRound ? "rounded10" : ""}`}>
      {searchType === "hotel" ? (
        <div className="left-part row">
          <div className="search-body title-hotel col-2">
            <h6>{Hotel}</h6>
            <input type="text" name="text" placeholder="Dubai" className="form-control" />
          </div>
          <div className="search-body col-2 search-input">
            <h6>{CheckIn}</h6>
            <DatePickerComponent start={startDate} setStart={setStartDate} />
          </div>
          <div className="search-body col-2 search-input">
            <h6>{CheckOut}</h6>
            <DatePickerComponent start={startDate1} setStart={setStartDate1} />
          </div>
          <div className="search-body col-2">
            <h6>{Guests}</h6>
            <div className="qty-box">
              <div className="input-group">
                <span className="input-group-prepend">
                  <button
                    type="button"
                    className="btn quantity-left-minus"
                    data-type="minus"
                    onClick={() => setGuestCount((prev) => Math.max(1, prev - 1))}
                  >
                    <i className="fas fa-chevron-down"></i>
                  </button>
                </span>
                <input
                  type="text"
                  className="form-control input-number"
                  value={guestCount}
                  readOnly
                />
                <span className="input-group-prepend">
                  <button
                    type="button"
                    className="btn quantity-right-plus"
                    data-type="plus"
                    onClick={() => setGuestCount((prev) => prev + 1)}
                  >
                    <i className="fas fa-chevron-up"></i>
                  </button>
                </span>
              </div>
            </div>
          </div>
          <div className="search-body btn-search col-2">
            <div className="right-part">
              <Link href="/hotel/single-page/left-sidebar" className="btn btn-solid">
                {Search}
              </Link>
            </div>
          </div>
        </div>
      ) : 
      (
        <>
        {loading && (
  <div className="fullscreen-loader">
    <Loader loaderTimeout={5000} />
  </div>
)}


        <div className="left-part row">
          
          <div className="search-body title-hotel col-4" style={{ position: "relative", overflow: "visible" }}>
            <h6>{From}</h6>
            <input
              type="text"
              value={fromQuery || (fromSuggestions.length > 0 ? fromSuggestions[0].name : '')}
              onChange={(e) => setFromQuery(e.target.value)}
              placeholder="Bangalore"
              className="form-control"
              style={{ fontSize: "30px" }}
            />
            {showFromSuggestions && (
              <ul style={{
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
                marginLeft: "20px"
              }}>
                {fromSuggestions.slice(0, 4).map((city, index) => (
                  <li key={city.id} onClick={() => handleFromSelect(city)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "12px 15px",
                      cursor: "pointer",
                      fontSize: "16px",
                      transition: "background 0.3s ease-in-out",
                      borderBottom: index !== fromSuggestions.length - 1 ? "1px solid #eee" : "none",
                      fontWeight: index === 0 ? "bold" : "normal",
                      background: "white"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#f0f0f0"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "white"}
                  >
                    {index === 0 ? <FaMapMarkerAltIcon size={14} /> : <FaMapMarkerAltIcon size={14} />}
                    <div>
                      <div>{city.name}</div>
                      {/* {index !== 0 && <div style={{ fontSize: "12px", color: "#777" }}>Bangalore</div>} */}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="search-body title-hotel col-4" style={{ position: "relative", overflow: "visible" }}>
            <h6>{To}</h6>
            <input
              type="text"
              value={toQuery || (toSuggestions.length > 0 ? toSuggestions[1].name : '')}
              onChange={(e) => setToQuery(e.target.value)}
              placeholder="Chennai"
              className="form-control"
              style={{ fontSize: "30px" }}
            />
            {showToSuggestions && (
              <ul style={{
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
                marginLeft: "20px"
              }}>
                {toSuggestions.slice(0, 4).map((city, index) => (
                  <li key={city.id} onClick={() => handleToSelect(city)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "12px 15px",
                      cursor: "pointer",
                      fontSize: "16px",
                      transition: "background 0.3s ease-in-out",
                      borderBottom: index !== toSuggestions.length - 1 ? "1px solid #eee" : "none",
                      fontWeight: index === 0 ? "bold" : "normal",
                      background: "white"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#f0f0f0"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "white"}
                  >
                    {index === 0 ? <FaMapMarkerAltIcon size={14} /> : <FaMapMarkerAltIcon size={14} />}
                    <div>
                      <div>{city.name}</div>
                      {/* {index !== 0 && <div style={{ fontSize: "12px", color: "#777" }}>Chennai</div>} */}
                    </div>
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
              {/* <Link href="/tour/listing/list-view"  className="btn btn-solid rounded-sm"  onClick={handleSearch}  style={{ borderRadius: "3px" }}>
                {Search}
              </Link> */}
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
    background: rgba(255, 255, 255, 0.6); /* optional overlay */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999; /* make sure it's above everything */
  }
`}
</style>

        </>

        
        
      )
      }
    </div>
  );
};

export default SearchBox;
