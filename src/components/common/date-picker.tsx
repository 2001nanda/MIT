import { FC } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface IDatePickerProps {
  setStart: Function;
  start: Date;
  isDark?: boolean; // ✅ make it optional
}

const datePickerStyles = {
  lightInput: {
    color: "black",
    // fontWeight: "normal",
  },
  darkInput: {
    color: "black", // darker
    // fontWeight: "bold",
  },
};

const DatePickerComponent: FC<IDatePickerProps> = ({ setStart, start, isDark = false }) => {
  return (
    <ReactDatePicker
      selected={start}
      onChange={(date: Date) => setStart(date)}
      id="datepicker"
      dateFormat="dd MMMM"
      className="datepicker-main"
      customInput={<input style={isDark ? datePickerStyles.darkInput : datePickerStyles.lightInput} />}
    />
  );
};

export default DatePickerComponent;
