"use client";

import { FC } from "react";
import { useRouter } from "next/navigation"; // NEXT 13+ router
import CustomLayout from "@/layouts/layout";
import Booking from "@/components/hotels/booking/booking-page/booking-main-page";
import CheckoutPage from "./CheckoutPage/CheckoutPage";

const BookingPage: FC = () => {
  const router = useRouter();

  return (
    <CustomLayout title="inner-page" userBgClass="user user-light" loader="no">
      <br />
      <br />

      <br />
      <br />
      <br />
      <br />

      {/* <div style={{ padding: "20px" }}>
        <button
          onClick={() => router.back()}
          style={{
            backgroundColor: "#0c618e",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          ← Back to Seat Layout
        </button>
      </div> */}
      <CheckoutPage />
    </CustomLayout>
  );
};

export default BookingPage;
