import { FC } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface IDatePickerProps {
  setStart: (date: Date) => void;
  start: Date;
  isDark?: boolean;
}

const datePickerStyles = {
  lightInput: {
    color: "black",
  },
  darkInput: {
    color: "black",
  },
};

const DatePickerComponent: FC<IDatePickerProps> = ({ setStart, start, isDark = false }) => {
  const today = new Date();

  return (
    <ReactDatePicker
      selected={start}
      onChange={(date: Date) => setStart(date)}
      id="datepicker"
      dateFormat="dd MMMM"
      className="datepicker-main"
      minDate={today} // ✅ Prevent past dates
      customInput={
        <input
          style={isDark ? datePickerStyles.darkInput : datePickerStyles.lightInput}
        />
      }
    />
  );
};

export default DatePickerComponent;
