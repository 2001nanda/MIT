"use client";
import { FC, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Button from "../btn";
import DatePickerComponent from "../date-picker";
import { Search } from "@/constant/constant";
import Img from "@/utils/BackgroundImageRatio";
import Link from 'next/link';
import { useRouter } from "next/navigation";

const FormOne: FC = () => {
  const searchParams = useSearchParams();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromSuggestions, setFromSuggestions] = useState<City[]>([]);
  const [toSuggestions, setToSuggestions] = useState<City[]>([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");
  interface City {
    id: string;
    name: string;
    state: string;
  }
  const router = useRouter();
  const [fromFocused, setFromFocused] = useState(false);
const [toFocused, setToFocused] = useState(false);
  useEffect(() => {
    const fromParam = searchParams.get("from");
    const toParam = searchParams.get("to");
    const dateParam = searchParams.get("date");

    if (fromParam) setFrom(fromParam);
    if (toParam) setTo(toParam);
    if (dateParam) setStartDate(new Date(dateParam));
  }, [searchParams]);

  useEffect(() => {
    if (from.length > 1) {
      fetch(`https://localhost:44370/api/My/getautosuggest?query=${from}`)
        .then((res) => res.json())
        .then((data: City[]) => {
          setFromSuggestions(data);
          setShowFromSuggestions(true);
          setShowFromSuggestions(fromFocused)

        })
        .catch((error) => console.error("Error fetching From cities:", error));
    } else {
      setFromSuggestions([]);
      setShowFromSuggestions(false);
    }
  }, [from]);

  useEffect(() => {
    if (to.length > 1) {
      fetch(`https://localhost:44370/api/My/getautosuggest?query=${to}`)
        .then((res) => res.json())
        .then((data: City[]) => {
          setToSuggestions(data);
          setShowToSuggestions(true);
          setShowToSuggestions(toFocused);
        })
        .catch((error) => console.error("Error fetching To cities:", error));
    } else {
      setToSuggestions([]);
      setShowToSuggestions(false);
    }
  }, [to]);

  const handleFromSelect = (city: City) => {
    setFromQuery(city.name);
    setFrom(city.name); // 👈 This updates the input field
    setTimeout(() => {
      setFromSuggestions([]);
      setShowFromSuggestions(false);
    }, 100); // Slight delay to allow state update
  };

  const handleToSelect = (city: City) => {
    setTo(city.name); // 👈 This updates the input field
    setToQuery(city.name);
    setTimeout(() => {
      setToSuggestions([]);
      setShowToSuggestions(false);
    }, 100);
  };
  

  const handleSearch = () => {
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
  
  return (
    <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => event.preventDefault()}>
      <div className="row w-100">
        <div className="form-group col p-0" style={{ position: "relative" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Starting from"
            onFocus={() => setFromFocused(true)}
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          {showFromSuggestions && (
            <ul className="suggestions-box">
              {fromSuggestions.slice(0, 5).map((city) => (
                <li key={city.id} onClick={() => handleFromSelect(city)}>
                  {city.name}
                </li>
              ))}
            </ul>
          )}
          <Img src="/assets/images/icon/table-no.png" className="img-fluid" alt="" />
        </div>

        <div className="form-group col p-0" style={{ position: "relative" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Going to"
            onFocus={() => setToFocused(true)}
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
          {showToSuggestions && (
            <ul className="suggestions-box">
              {toSuggestions.slice(0, 5).map((city) => (
                <li key={city.id} onClick={() => handleToSelect(city)}>
                  {city.name}
                </li>
              ))}
            </ul>
          )}
          <Img src="/assets/images/icon/table-no.png" className="img-fluid" alt="" />
        </div>

        <div className="form-group col p-0 custom-tour-input">
          <div className="form-control">
            <DatePickerComponent start={startDate} setStart={setStartDate} />
          </div>
          <Img src="/assets/images/icon/table-no.png" className="img-fluid" alt="" />
        </div>
        
      </div>

      <button 
  className="btn btn-solid custom-search-button" 
  onClick={handleSearch}
  style={{ borderRadius: "5px" }}
>
  {Search}
</button>


      <style jsx>{`
        .suggestions-box {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border: 1px solid #ddd;
          border-radius: 5px;
          z-index: 1000;
          max-height: 200px;
          overflow-y: auto;
          margin-top: 4px;
          padding-left: 0;
          list-style: none;
        }

        .suggestions-box li {
          padding: 10px;
          cursor: pointer;
          transition: background 0.2s;
          display: block;
        }

        .suggestions-box li:hover {
          background-color: #f2f2f2;
        }

         .custom-search-button {
    background-color: rgb(12, 97, 142);
    color: white;
    transition: all 0.3s ease;
  }

  .custom-search-button:hover {
    background-color: white;
    color: rgb(12, 97, 142);
    border: 1px solid rgb(12, 97, 142);
  }
      `}</style>
    </form>
  );
};

export default FormOne;
