'use client';
import { FC, useState, useEffect } from 'react';
import "./Checkout.css";
import { BsBusFront, BsFlag } from 'react-icons/bs';
import seaterSelected from "@/public/assets/seater/selectedSeater.png";
import sleeperSelected from "@/public/assets/sleeper/selectedSleeper.png";
import Image from 'next/image';


type Passenger = {
  title: string;
  name: string;
  age: string;
  gender: string;
};

const CheckoutPage: FC = () => {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [bookingInfo, setBookingInfo] = useState<any>(null);
  const [passengerDetails, setPassengerDetails] = useState<Passenger[]>([]);
  const BusIcon = BsBusFront as unknown as FC<{ size?: string | number; color?: string }>;
  const FlagIcon = BsFlag as unknown as FC<{ size?: string | number; color?: string }>;
  
  useEffect(() => {
    const data = sessionStorage.getItem('bookingInfo');
    if (data) {
      setBookingInfo(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    const data = sessionStorage.getItem('bookingInfo');
    if (data) {
      const parsedData = JSON.parse(data);
      setBookingInfo(parsedData);
  
      // Ensure seatNumber is an array
      const seats: string[] = Array.isArray(parsedData.seatNumber)
        ? parsedData.seatNumber
        : (parsedData.seatNumber || '').split(',');
  
      // Initialize passenger details array
      const initialDetails: Passenger[] = seats.map(() => ({
        title: '',
        name: '',
        age: '',
        gender: ''
      }));
      setPassengerDetails(initialDetails);
    }
  }, []);

  const handlePassengerChange = (
    index: number,
    field: keyof Passenger,
    value: string
  ) => {
    const updated = [...passengerDetails];
    updated[index][field] = value;
    setPassengerDetails(updated);
  };
  

  const handleLoginToContinue = () => {
    if (!agreeTerms) {
      alert('Please agree to the terms and conditions before continuing.');
      return;
    }
    // Handle login or form submission
  };

  if (!bookingInfo) {
    return <div>Loading booking information...</div>;
  }

  const {
    busOperator,
    busType,
    seatNumber,
    journeyDate,
    from,
    to,
    departureTime,
    arrivalTime,
    baseFare,
    gst,
    convenienceFee,
    duration,
    arrivalDate,
    boardingPoint,
    droppingPoint
  } = bookingInfo;

  console.log({ "allDate":
    busOperator,
    busType,
    seatNumber,
    journeyDate,
    from,
    to,
    departureTime,
    arrivalTime,
    baseFare,
    gst,
    convenienceFee,
    duration,
    arrivalDate,
    boardingPoint,
    droppingPoint
  });
  

const totalFare = Number(baseFare) + Number(gst) + Number(convenienceFee);

  return (
    <div className="checkout-page">
      <div className="header">
        <h2>Fill out the form below and book your ride!</h2>
      </div>

      <div className="main-content">
        <div className="left-section">
          <div className="card">
            <div className="card-header">
              <div className="bus-operator">
                <h3>{busOperator || 'Unknown'}</h3>
                <p className="sub-text">{busType || 'None'}</p>
              </div>
              <div className="seat-info">
                <p>Seat No: <strong>{seatNumber.join(', ')}</strong></p>
                <a href="#">View Policies</a>
              </div>
            </div>

            <div className="travel-times">
              <div className="time-block">
                <h4>{from}</h4>
                <h6 className="time">{journeyDate} , {boardingPoint?.time}</h6>
                <h6 className="city">{boardingPoint?.name},{from}</h6>
              </div>

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
                    {duration}
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
              <div className="time-block">
              <h4>{to}</h4>
              <h6 className="time">{arrivalDate} , {droppingPoint?.time}</h6>
              <h6 className="city">{droppingPoint?.name},{from}</h6>
              </div>
            </div>


          </div>

          <div className="card">
  <h4>Passenger Details</h4>
{bookingInfo?.selectedSeatTypes?.map((seat: { id: string; type: string }, index: number) => (
  <div key={index} className="form-row">
  <p className="seat-tooltip-wrapper">
  <Image
    src={seat.type === 'sleeper' ? sleeperSelected : seaterSelected}
    alt={seat.type}
    width={40}
    height={40}
  />
  <span className="seat-tooltip-text">
    {seat.type.charAt(0).toUpperCase() + seat.type.slice(1)}
  </span>
  <span style={{ color: '#0c618e', fontWeight: 'bold' }}>#{seat.id}</span>
</p>


    <select
      value={passengerDetails[index]?.title || ''}
      onChange={(e) => handlePassengerChange(index, 'title', e.target.value)}
    >
      <option value="">Select Title</option>
      <option value="Mr">Mr</option>
      <option value="Ms">Ms</option>
      <option value="Mrs">Mrs</option>
    </select>

    <input
      type="text"
      placeholder="Enter Name"
      value={passengerDetails[index]?.name || ''}
      onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
    />

    <input
      type="number"
      placeholder="Enter Age"
      value={passengerDetails[index]?.age || ''}
      onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
    />

    <select
      value={passengerDetails[index]?.gender || ''}
      onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
    >
      <option value="">Select Gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
    </select>
  </div>
))}

</div>



          <div className="card">
            <h4>Contact Details</h4>
            <input type="text" placeholder="📞 Phone Number" />
            <input type="email" placeholder="✉️ Email" />
          </div>

<div className="terms">
  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <input
      type="checkbox"
      id="agreeTerms"
      checked={agreeTerms}
      onChange={(e) => setAgreeTerms(e.target.checked)}
    />
    I Agree To All The Terms & Conditions and Privacy Policy.
  </label>
</div>

          <button className="continue-btn" onClick={handleLoginToContinue}>
            Login to Continue
          </button>
        </div>

        <div className="right-section">
          <div className="card">
            <h4>Fare Details</h4>
            <p>Base Fare: ₹{baseFare}</p>
            <p>Bus Operator GST: ₹{gst}</p>
            <p>Convenience Fee: ₹{convenienceFee}</p>
            <hr />
            <p className="total-fare">Total: ₹{totalFare}</p>
          </div>

          <div className="card">
            <h4>Apply Promo</h4>
            <p>Please <b>Sign-In</b> to Avail Offers</p>
            <small>No Promo Code Available</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
