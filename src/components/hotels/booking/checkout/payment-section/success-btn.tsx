import { MakePayment } from "@/constant/constant";
import { RootState } from "@/redux-toolkit/store";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const SuccessBtn = () => {
  const { push } = useRouter();
   

  const makePaymentBtn = () => {
    push(`/hotel/booking/booking-success`)
  };
  return (
    <div className="payment-btn">
      <button type="button" className="btn btn-solid color1" onClick={makePaymentBtn}>
        {MakePayment}
      </button>
    </div>
  );
};

export default SuccessBtn;
