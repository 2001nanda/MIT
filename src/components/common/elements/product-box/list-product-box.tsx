import { FC, useState } from "react";
import SeatLayout from "../bus/seatselect/seatlayout";
import { IListProductBoxProps, SeatLayoutResponse } from "../element";
import { BsBusFront, BsFlag } from "react-icons/bs";



const ListPage: FC<IListProductBoxProps> = ({ data }) => {
  const [showSeats, setShowSeats] = useState(false);
  const [seatsData, setSeatsData] = useState<SeatLayoutResponse | null>(null);
  const [activeSection, setActiveSection] = useState<null | "amenities" | "cancellation" | "boarding" | "dropping"| "viewSeat">(null);
  console.log(data.busName);
  const [loadingSeats, setLoadingSeats] = useState(false);

  const fetchSeatLayout = async () => {
    try {
      const response = await fetch("https://localhost:44370/api/My/seatlayout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          traceId: "your-trace-id",
          busId: data.busId,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch seat layout");
      }
  
      const result: SeatLayoutResponse = await response.json();
      console.log("seatlayout \n" + JSON.stringify(result, null, 2));
  
      setSeatsData(result);
      setShowSeats(true);
    } catch (error) {
      console.error("Error fetching seats:", error);
    }
  };
  const BusIcon = BsBusFront as unknown as FC<{ size?: string | number; color?: string }>;
const FlagIcon = BsFlag as unknown as FC<{ size?: string | number; color?: string }>;


  const formatDuration = (minutes: number) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs}:${mins < 10 ? "0" : ""}${mins} hr`;
  };

  const formatDateToDayMonth = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' });
    return `${day} ${month}`;
  };
  
  const sectionWrapperStyle = {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    marginBottom: '20px'
  };
  
  return (
    <>
      <style>{`
        .bus-card {
          border: 1px solid #ccc;
          border-radius: 12px;
          // padding: 16px;
          margin-bottom: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          background-color: #fff;
        }

        .bus-info {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
        }

        .bus-name {
          font-weight: 600;
          font-size: 24px;
          color: #004080;
          min-width: 140px;
        }

        .bus-icon {
          margin-right: 5px;
        }

        .bus-type {
          font-size: 13px;
          color: gray;
        }

        .bus-time {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 90px;
        }

        .time {
          font-weight: bold;
          font-size: 18px;
        }

        .date {
          font-size: 13px;
          color: gray;
        }

        .location {
          font-size: 13px;
          color: #555;
        }

        .bus-duration {
          background: #eee;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 500;
        }

        .bus-price {
          text-align: center;
          min-width: 120px;
        }

        .price {
          font-size: 18px;
          color: #004080;
          font-weight: 600;
        }
          .startingrrom {
          font-size: 18px;
          color:rgb(0, 0, 0);
          font-weight: 600;
        }

        .seats {
          font-size: 13px;
          color: gray;
        }

        .bus-action {
          min-width: 120px;
          display: flex;
          justify-content: center;
        }

        .bus-action button {
          padding: 8px 14px;
          background-color:rgb(12, 97, 142);
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: 0.3s;
        }

        .bus-action button:hover {
  background-color: rgb(255, 255, 255);
  color: black;
  border: 1px solid rgb(12, 97, 142); /* Add this line */
}


        .seats-layout {
          margin-top: 16px;
        }
      `}</style>

      <div className="bus-card" >
        <div className="bus-info" style={{ marginTop: "10px", cursor: "pointer", gap: "20px", display: "flex" ,  marginLeft: "30px",
    marginRight: "30px" }}>
          <div className="bus-name">
             {data.busName}
            <div className="bus-type">{data.busType}</div>
          </div>

          <div className="bus-time">
            <div className="time">{data.departureTime}</div>
            <div className="date">{formatDateToDayMonth(data.route.departureLocation.date)}</div>
            <div className="location">{data.route?.departureLocation?.name}</div>
          </div>

          {/* <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', minWidth: '90px' }}>
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <BsBusFront size={20} color="#0c618e" />
    <div style={{ height: '2px', width: '40px', backgroundColor: '#0c618e' }}></div>
    <BsFlag size={20} color="#0c618e" />
  </div>
  <div className="bus-duration">{formatDuration(data.duration)}</div>
</div> */}



<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px 0' }}>
  {/* Start icon */}
  <BusIcon size={20} color="#0c618e" />

  {/* Line + timing */}
  <div style={{
    display: 'flex',
    alignItems: 'center',
    margin: '0 10px'
  }}>
    <div style={{
      width: '50px', 
      height: '1px', 
      backgroundColor: '#0c618e'
    }} />
    <div style={{
      margin: '0 6px',
      fontSize: '12px',
      color: '#0c618e',
      fontWeight: '500'
    }}>
      {formatDuration(data.duration)}
    </div>
    <div style={{
      width: '50px',
      height: '1px',
      backgroundColor: '#0c618e'
    }} />
  </div>

  {/* End icon */}
  <FlagIcon size={20} color="#0c618e" />
</div>




          <div className="bus-time">
            <div className="time">{data.arrivalTime}</div>
            <div className="date">{formatDateToDayMonth(data.route.departureLocation.date)}</div>
            <div className="location">{data.route?.arrivalLocation?.name}</div>
          </div>

          <div className="bus-price">
          <div className="startingrrom">Starting From</div>
            <div className="price">₹{data.totalPrice}</div>
            <div className="seats">{data.seatsAvailable} Seat's available</div>
          </div>

          {/* <div className="bus-action">
            <button onClick={fetchSeatLayout}>
              {showSeats ? "Hide Seats" : "View Seats"}
            </button>
          </div> */}
        </div>
        <hr
  style={{
    border: "none",
    height: "2px",
    backgroundColor: "rgb(12, 97, 142)", // soft gray
    margin: "0px 30px", // top/bottom + horizontal padding
    borderRadius: "2px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)", // optional subtle shadow
  }}
/>
        <div className="bus-info" style={{ marginTop: "10px", cursor: "pointer", gap: "20px", display: "flex" ,  marginLeft: "30px",
    marginRight: "30px"}}>

  <div
    onClick={() => setActiveSection(activeSection === "amenities" ? null : "amenities")}
    style={{
      color: activeSection === "amenities" ? "rgb(12, 97, 142)" : "inherit",
      fontWeight: "bold",
    }}
  >
    Amenities
  </div>

  <div
    onClick={() => setActiveSection(activeSection === "cancellation" ? null : "cancellation")}
    style={{
      color: activeSection === "cancellation" ? "rgb(12, 97, 142)" : "inherit",
      fontWeight: "bold",
    }}
  >
    Cancellation Policy
  </div>

  <div
    onClick={() => setActiveSection(activeSection === "boarding" ? null : "boarding")}
    style={{
      color: activeSection === "boarding" ? "rgb(12, 97, 142)" : "inherit",
      fontWeight: "bold",
    }}
  >
    Boarding/Dropping Point
  </div>

  <div
  onClick={async () => {
    const isActive = activeSection === "viewSeat";

    if (isActive) {
      // Close seat view
      setActiveSection(null);
      setShowSeats(false);
    } else {
      // Open seat view
      setActiveSection("viewSeat");
      await fetchSeatLayout();
    }
  }}
  className="bus-action"
>
  <button>
    {showSeats && activeSection === "viewSeat" ? "Hide Seats" : "View Seats"}
  </button>
</div>

</div>


<div style={{ marginTop: "10px" ,  marginLeft: "30px",
    marginRight: "30px" }}>
{activeSection === "amenities" && (
  <div style={sectionWrapperStyle}>
  <div style={{ marginLeft: "10px", marginBottom: "10px", color: "#333" }}>
    {data.amenities?.join(", ") || "Not specified"}
  </div>
  </div>
)}

{activeSection === "cancellation" && (
  <div style={{ margin: '10px 30px', color: '#333' }}>
      {data?.policy?.length > 0 ? (
        <div style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
          <h3 style={{ fontWeight: 600, marginBottom: '10px' }}>Cancellation Policy</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ borderBottom: '1px solid #ddd', padding: '8px', fontWeight: 600 }}>Cancellation Time</th>
                <th style={{ borderBottom: '1px solid #ddd', padding: '8px', fontWeight: 600 }}>Cancellation Charges</th>
              </tr>
            </thead>
            <tbody>
              {data.policy.map((rule, index) => (
                <tr key={index}>
                  <td style={{ borderBottom: '1px solid #eee', padding: '8px' }}>{rule.span}</td>
                  <td style={{ borderBottom: '1px solid #eee', padding: '8px', color: '#d9534f', fontWeight: 600 }}>{rule.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginTop: '10px' }}>
            <li>Please note that this ticket is non-refundable</li>
            <li>Cancellation charges are computed on a per seat basis.</li>
            <li>Cancellation charges are calculated based on service start date + time at: 19-04-2025 12:40</li>
          </ul>
        </div>
      ) : (
        <div>Not available</div>
      )}
    </div>
)}


{activeSection === "boarding" && (
  <div style={sectionWrapperStyle}>
 <div style={{ marginLeft: '10px', marginBottom: '10px', color: '#333' }}>
 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
   <div style={{ width: '45%' }}>
     <h3 style={{ fontWeight: 600, marginBottom: '10px' }}>Boarding Point</h3>
     {data.route?.departureLocation?.subLocations?.length > 0 ? (
       <ul style={{ listStyleType: 'none', padding: 0 }}>
         {data.route.departureLocation.subLocations.map((loc, index) => (
           <li key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' }}>
             <div>
               <span style={{ fontWeight: 500 }}>{loc.name}</span><br />
               <span style={{ color: '#666' }}>{loc.time} <b>/</b> </span>
               <span style={{ color: '#666' }}>{loc.address}</span>
               <span style={{ color: '#666' }}>{loc.landmark}</span>
             </div>
           </li>
         ))}
       </ul>
     ) : (
       <div>Not specified</div>
     )}
   </div>
   <div style={{ width: '45%' }}>
     <h3 style={{ fontWeight: 600, marginBottom: '10px' }}>Dropping Point</h3>
     {data.route?.arrivalLocation?.subLocations?.length > 0 ? (
       <ul style={{ listStyleType: 'none', padding: 0 }}>
         {data.route.arrivalLocation.subLocations.map((loc, index) => (
           <li key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' }}>
             <div>
             <span style={{ fontWeight: 500 }}>{loc.name}</span><br />
               <span style={{ color: '#666' }}>{loc.time} <b>/</b> </span>
               <span style={{ color: '#666' }}>{loc.address}</span>
               <span style={{ color: '#666' }}>{loc.landmark}</span>
             </div>
           </li>
         ))}
       </ul>
     ) : (
       <div>Not specified</div>
     )}
   </div>
 </div>
</div>
</div>
)}


{showSeats && seatsData && activeSection === "viewSeat" && (
  <div className="seats-layout">
    <SeatLayout seats={seatsData.seats} route = {seatsData.route} baseItem = {data} formatDuration = {formatDuration(data.duration)}/>
  </div>
)}
</div>

      </div>
    </>
  );
};

export default ListPage;
