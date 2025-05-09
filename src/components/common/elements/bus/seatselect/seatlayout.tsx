"use client";

import { FC, useState } from "react";
import { Route, Seat } from "../../element";
import Image from "next/image";
import chair from "@/public/assets/images/chair.png";
import steeringIcon from "@/public/assets/images/steeringIcon.png";
import Dropdown from "react-bootstrap/Dropdown";
import "./SeatLayout.css";
import { useRouter } from "next/navigation";
import { useRef } from "react"; // Already imported
import seatAvailableSeater from "@/public/assets/seater/avaiableSeater.png";
import seaterBooked from "@/public/assets/seater/bookedSeater.png";
import seaterFemaleAvailable from "@/public/assets/seater/SeaterAF.png";
import seaterFemaleBooked from "@/public/assets/seater/seaterBF.png";
import seaterSelected from "@/public/assets/seater/selectedSeater.png";
import sleeperAvailable from "@/public/assets/sleeper/avaiableSleeper.png";
import sleeperBooked from "@/public/assets/sleeper/bookedSleeper.png";
import sleeperFemaleAvaiable from "@/public/assets/sleeper/sleeperFA.png";
import sleeperFemaleBooked from "@/public/assets/sleeper/sleeperFB.png";
import sleeperSelected from "@/public/assets/sleeper/selectedSleeper.png";
interface SeatLayoutProps {
  seats: Seat[];
  route: Route;
  baseItem : IBaseProps;
  formatDuration:string;
}


const SeatLayout: FC<SeatLayoutProps> = ({ seats ,route  ,baseItem,formatDuration}) => {
  const router = useRouter();
  const droppingRef = useRef<HTMLDivElement | null>(null);
  const droppingToggleRef = useRef<HTMLButtonElement | null>(null);
  

  const formatSubLocationTime = (isoTime: string, isNextDay: boolean) => {
    const date = new Date(isoTime);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' }); // 'Apr', etc.
    return {
      time: `${hours}:${minutes}`,
      date: isNextDay ? `(${day} ${month})` : null,
    };
  };
  
  

  const boardingPoints = route.departureLocation.subLocations.map((sl, idx) => {
    const formatted = formatSubLocationTime(sl.time, sl.isnextday);
    return (
      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{ fontWeight: 'bold', color: '#000' }}>{formatted.time}</span>
        {formatted.date && (
          <span style={{ color: 'red', fontSize: '12px' }}>{formatted.date}</span>
        )}
        <span style={{ marginLeft: '6px' }}>{sl.name}</span>
      </div>
    );
  });
  
  const droppingPoints = route.arrivalLocation.subLocations.map((sl, idx) => {
    const formatted = formatSubLocationTime(sl.time, sl.isnextday);
    return (
      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{ fontWeight: 'bold', color: '#000' }}>{formatted.time}</span>
        {formatted.date && (
          <span style={{ color: 'red', fontSize: '12px' }}>{formatted.date}</span>
        )}
        <span style={{ marginLeft: '6px' }}>{sl.name}</span>
      </div>
    );
  });

  const getSeatImage = (seat: Seat, selectedSeats: Seat[]) => {
    const isSelected = selectedSeats.some((s) => s.id === seat.id);

  
    if (seat.type === "seater") {
      if (isSelected) {
        return seaterSelected; // Selected image for both types
      }
      switch (seat.status) {
        case "AFM":
        case "AFA":
          return seatAvailableSeater; // Available
        case "BFA":
          return seaterBooked; // Booked
        case "BFF":
          return seaterFemaleBooked; // Female Booked
        case "AFF":
          return seaterFemaleAvailable; // Female Available
        case "blocked":
          return seaterBooked; // Assuming blocked = booked image
        default:
          return seatAvailableSeater; // Fallback
      }
    } else if (seat.type === "sleeper") {
      if (isSelected) {
        return sleeperSelected; // Selected image for both types
      }
      switch (seat.status) {
        case "AFM":
        case "AFA":
          return sleeperAvailable;
        case "BFA":
          return sleeperBooked;
        case "BFF":
          return sleeperFemaleBooked;
        case "AFF":
          return sleeperFemaleAvaiable;
        case "blocked":
          return sleeperBooked;
        default:
          return sleeperAvailable;
      }
    }
  
    // Fallback in case type is unrecognized
    return seatAvailableSeater;
  };
  
  // const boardingPoints = route.departureLocation.subLocations.map(sl => 
  //   `${formatSubLocationTime(sl.time, sl.isnextday)} ${sl.name}`
  // );
  
  // const droppingPoints = route.arrivalLocation.subLocations.map(sl => 
  //   `${formatSubLocationTime(sl.time, sl.isnextday)} ${sl.name}`
  // );
  

  const [boardingPoint, setBoardingPoint] = useState("");
  const [droppingPoint, setDroppingPoint] = useState("");
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [selectedBoardingPoint, setSelectedBoardingPoint] = useState("BOARDING POINT");
  const [selectedDroppingPoint, setSelectedDroppingPoint] = useState("DROPPING POINT");
  const [fareFilter, setFareFilter] = useState<number | "all">("all");
  const [boardingError, setBoardingError] = useState<boolean>(false);
  const [droppingError, setDroppingError] = useState<boolean>(false);
  const [boardingSearch, setBoardingSearch] = useState("");
const [droppingSearch, setDroppingSearch] = useState("");

  const totalPrice = selectedSeats.reduce((acc, seat) => acc + (seat.fare?.total || 0), 0);

  if (!seats) return null;

  const handleSeatClick = (seat: Seat) => {
    const nonSelectableStatuses = ["BFA", "BFF", "blocked"];
    if (nonSelectableStatuses.includes(seat.status)) return;
  
    const isAlreadySelected = selectedSeats.find((s) => s.id === seat.id);
  
    // If already selected, remove it
    if (isAlreadySelected) {
      setSelectedSeats((prevSelected) =>
        prevSelected.filter((s) => s.id !== seat.id)
      );
    } else {
      // Limit selection to 6 seats
      if (selectedSeats.length >= 6) {
        alert("You can only select up to 6 seats.");
        return;
      }
  
      setSelectedSeats((prevSelected) => [...prevSelected, seat]);
    }
  };

  const formatDateToDayMonth = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' });
    return `${day} ${month}`;
  };

  const handleContinueBooking = () => {
    let hasError = false;
  
    if (selectedBoardingPoint === "BOARDING POINT") {
      setBoardingError(true);
      hasError = true;
    } else {
      setBoardingError(false);
    }
  
    if (selectedDroppingPoint === "DROPPING POINT") {
      setDroppingError(true);
      hasError = true;
    } else {
      setDroppingError(false);
    }
  
    if (hasError) {
      return;
    }
    
  
 // Prepare booking data
 const bookingInfo = {
  selectedSeats,
  seatCount: selectedSeats.length,
  seatNames: selectedSeats.map(seat => seat.name),
  seatNumber: selectedSeats.map(seat => seat.id),
  boardingPoint: selectedBoardingPoint,
  droppingPoint: selectedDroppingPoint,
  totalFare: totalPrice,
  busOperator:baseItem.busName,
  busType:baseItem.busType,
  journeyDate: formatDateToDayMonth(baseItem.route.departureLocation.date),
  arrivalDate : formatDateToDayMonth(baseItem.route.arrivalLocation.date),
  from: baseItem.route.departureLocation.name,
  to: baseItem.route.arrivalLocation.name,
  departureTime: baseItem.route.departureLocation.time,
  arrivalTime: baseItem.route.arrivalLocation.time,
  baseFare: baseItem.fares.base,
  gst: baseItem.fares.gst,
  convenienceFee: "200",
  duration: formatDuration
};


sessionStorage.setItem('bookingInfo', JSON.stringify(bookingInfo));

// Store in sessionStorage
sessionStorage.setItem("bookingInfo", JSON.stringify(bookingInfo));

window.open("/bus/booking/booking-page", "_blank");
  };
  
  const boardingData = route.departureLocation.subLocations.map((sl) => {
    const formatted = formatSubLocationTime(sl.time, sl.isnextday);
    return {
      time: formatted.time,
      date: formatted.date,
      name: sl.name,
    };
  });
  
  const droppingData = route.arrivalLocation.subLocations.map((sl) => {
    const formatted = formatSubLocationTime(sl.time, sl.isnextday);
    return {
      time: formatted.time,
      date: formatted.date,
      name: sl.name,
    };
  });

  const filteredBoardingPoints = boardingData.filter(point =>
    point.name.toLowerCase().includes(boardingSearch.toLowerCase())
  );
  
  const filteredDroppingPoints = droppingData.filter(point =>
    point.name.toLowerCase().includes(droppingSearch.toLowerCase())
  );
  

  
  const getSeatStyle = (seat: Seat, selectedSeats: Seat[]) => {
    const isSelected = selectedSeats.some((s) => s.id === seat.id);
    if (isSelected) {
      return {
        backgroundColor: "#DBEAFE",
        borderColor: "#1D4ED8",
      };
    }

    switch (seat.status) {
      case "AFM":
      case "AFA":
        return { backgroundColor: "#E5E7EB", borderColor: "#9CA3AF" };
      case "BFA":
        return { backgroundColor: "#D1FAE5", borderColor: "#065F46" };
      case "BFF":
        return { backgroundColor: "#e41f8f", borderColor: "#BE185D" };
      case "AFF":
        return { backgroundColor: "#FCE7F3", borderColor: "#BE185D" };
      case "blocked":
        return { backgroundColor: "#FECACA", borderColor: "#B91C1C" };
      default:
        return { backgroundColor: "#FFFFFF", borderColor: "#D1D5DB" };
    }
  };

  const maxX = Math.max(...seats.map((seat) => seat.y)) + 1;
  const maxY = Math.max(...seats.map((seat) => seat.x)) + 1;
  const uniqueFares = Array.from(
    new Set(
      seats
        .filter((s) => typeof s.fare?.total === "number" && s.status !== "BFA" && s.status !== "BFF")
        .map((s) => s.fare!.total)
    )
  ).sort((a, b) => a - b);
  




  return (
    <div className="seat-layout-container">
      <div className="seat-layout w-3/4">
        <h5 className="text-lg font-semibold mb-2">Choose Your Seat</h5>

        <div className="legend">
      <div className="legend-item">
        <Image src={seatAvailableSeater} alt="Available" width={40} height={40} />
        Available
      </div>
      <div className="legend-item">
        <Image src={seaterFemaleAvailable} alt="Female Available" width={40} height={40} />
        Female Available
      </div>
      <div className="legend-item">
        <Image src={seaterFemaleBooked} alt="Female Booked" width={40} height={40} />
        Female Booked
      </div>
      <div className="legend-item">
        <Image src={seaterBooked} alt="Booked" width={40} height={40} />
        Booked
      </div>
      <div className="legend-item">
        <Image src={seaterSelected} alt="Selected" width={40} height={40}/>
        Selected
      </div>
    </div>

        {/* Fare Filter Buttons */}
        <div className="fare-filter flex gap-2 my-4 flex-wrap">
          <button
            className={`fare-btn ${fareFilter === "all" ? "active" : ""}`}
            onClick={() => setFareFilter("all")}
          >
            All
          </button>
          {uniqueFares.map((fare) => (
            <button
              key={fare}
              className={`fare-btn ${fareFilter === fare ? "active" : ""}`}
              onClick={() => setFareFilter(fare)}
            >
              ₹{fare}
            </button>
          ))}
        </div>

        <div className="container-test">
          <div className="leftsidewidth">
            {[1, 0].map((deck) => {
              const deckSeats = seats.filter((seat) => seat.z === deck);
              if (deck === 1 && deckSeats.length === 0) return null;

              return (
                <div key={deck} className={`seatlayoutborderbox ${deck === 1 ? "upper-deck" : "lower-deck"}`}>
                  <div className="steering">
                  <Image className="steeringImage" src={steeringIcon} alt="Steering Wheel" width={20} height={20} />
                  <h6 className="text-md font-bold mb-2">{deck === 0 ? "Lower" : "Upper"}</h6>
                  </div>
                  <div style={{ width: '3px', backgroundColor: 'rgb(12, 97, 142)', margin: '0 16px' }}></div>
                  <div
                    className="seats-container"
                    // style={{ gridTemplateColumns: `repeat(${deck === 1 ? maxY + 4 : maxY}, 25px)` }}
                  >
                    {/* <div className="steering" style={{ gridColumn: 1, gridRow: 2 }}>
                      <Image src={steeringIcon} alt="Steering Wheel" width={20} height={20} />
                    </div> */}

                    {deckSeats.map((seat) =>
                      seat.type === "Walkway" ? (
                        <div
                          key={`walkway-${seat.x}-${seat.y}-${deck}`}
                          style={{
                            gridColumn: seat.x,
                            gridRow: seat.y,
                            backgroundColor: "transparent",
                          }}
                        />
                      ) : (

                        <div
                        key={seat.id}
                        className={`seat ${seat.status} ${selectedSeats.some((s) => s.id === seat.id) ? "selected" : ""}`}
                        title={`₹${seat.fare.total}`}
                        onClick={() => handleSeatClick(seat)}
                        style={{
                          gridColumn: seat.x + 1,
                          gridRow: seat.y + 1,
                          position: "relative", // Make the div position relative for absolute positioning of the seat number
                        }}
                      >
                        <>
                          <Image
                            src={getSeatImage(seat, selectedSeats)}
                            alt={`Seat ${seat.id}`}
                            className="seat-image"
                            style={{
                               width: seat.type === "sleeper" ? "60px" : "35px",
    height: seat.type === "sleeper" ? "60px" : "35px",
                            }}
                          />
                         {/* Seat number overlay, only if seat is not booked  */}
{seat.status != "BFA" &&  seat.status != "BFA" && (
  <span
    style={{
      position: "absolute",
      top: "50%",
      left: "40%",
      transform: "translate(-50%, -50%)",
      color: "black",
      fontSize: "12px",
      fontWeight: "bold",
    }}
  >
    {seat.id}
  </span>
)}
                          {fareFilter !== "all" && seat.fare.total === fareFilter && (
                            <span className="red-dot"></span>
                          )}
                        </>
                      </div>
                      )
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="right-box shadow-card bg-white rounded-2xl p-6 flex flex-col gap-4">
            <div style={{ padding: "1rem" }}>
            <div className="label" style={{ marginTop: "1rem" }}>Choose Boarding Point</div>
<div className={`custom-dropdown ${boardingError ? "error-border" : ""}`}>
  <Dropdown>
    <Dropdown.Toggle className="custom-btn">{selectedBoardingPoint}</Dropdown.Toggle>
    <Dropdown.Menu style={{ maxHeight: "250px", overflowY: "auto" }}>
      <div style={{ padding: "0.5rem" }}>
        <input
          type="text"
          placeholder="Search Boarding Point"
          value={boardingSearch}
          onChange={(e) => setBoardingSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "0.5rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>
      {filteredBoardingPoints.map((point, idx) => (
  <Dropdown.Item
    key={idx}
    onClick={() => {
      setSelectedBoardingPoint(`${point.time} ${point.date ? point.date + " " : ""}${point.name}`);
      setTimeout(() => {
        // Scroll to dropping point
        droppingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    
        // Simulate click to open the dropdown
        droppingToggleRef.current?.click();
      }, 150);
    }}
    
    
        style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
  >
    <span style={{ fontWeight: 'bold', color: '#000', margin: "5px" }}>{point.time}</span>
    {point.date && (
      <span style={{ color: 'red', fontSize: '12px' }}>{point.date}</span>
    )}
    <span style={{ marginLeft: '6px' }}>{point.name}</span>
  </Dropdown.Item>
))}
    </Dropdown.Menu>
  </Dropdown>
</div>
{boardingError && (
  <p style={{ color: "red", marginTop: "0.25rem" }}>
    Please select a Boarding Point.
  </p>
)}


<div ref={droppingRef} className="label" style={{ marginTop: "1rem" }}>Choose Dropping Point</div>
<div className={`custom-dropdown ${droppingError ? "error-border" : ""}`}>
  <Dropdown>
  <Dropdown.Toggle ref={droppingToggleRef} className="custom-btn">
  {selectedDroppingPoint}
</Dropdown.Toggle>
    <Dropdown.Menu style={{ maxHeight: "250px", overflowY: "auto" }}>
      <div style={{ padding: "0.5rem" }}>
        <input
          type="text"
          placeholder="Search Dropping Point"
          value={droppingSearch}
          onChange={(e) => setDroppingSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "0.5rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
           
          }}
        />
      </div>
      {filteredDroppingPoints.map((point, idx) => (
  <Dropdown.Item
    key={idx}
    onClick={() => setSelectedDroppingPoint(`${point.time} ${point.date ? point.date + " " : ""}${point.name}`)}
    style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
  >
    <span style={{ fontWeight: 'bold', color: '#000', margin: "5px" }}>{point.time}</span>
    {point.date && (
      <span style={{ color: 'red', fontSize: '12px' }}>{point.date}</span>
    )}
    <span style={{ marginLeft: '6px' }}>{point.name}</span>
  </Dropdown.Item>
))}

    </Dropdown.Menu>
  </Dropdown>
</div>
{droppingError && (
  <p style={{ color: "red", marginTop: "0.25rem" }}>
    Please select a Dropping Point.
  </p>
)}


              {/* {boardingError && (
  <p style={{ color: "red", marginTop: "0.25rem" }}>
    Please select a Boarding Point.
  </p>
)}

{droppingError && (
  <p style={{ color: "red", marginTop: "0.25rem" }}>
    Please select a Dropping Point.
  </p>
)} */}

              <div className="section-divider">
                <p className="info-title">
                  <strong>Seat No.</strong> {selectedSeats.length > 0 ? selectedSeats.map(seat => seat.id).join(", ") : "None"}
                </p>
              </div>

              <div className="section-divider">
                <p className="info-title">Fare Details</p>
                <p className="info-subtext">Taxes will be calculated during payment</p>
                <p className="info-price">₹ {totalPrice.toFixed(2)}</p>
              </div>

              <button
  className={`continue-btn ${selectedSeats.length === 0 ? "disabled-btn" : "active-btn"}`}
  disabled={selectedSeats.length === 0}
  onClick={handleContinueBooking}
>
  Continue Booking
</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatLayout;
