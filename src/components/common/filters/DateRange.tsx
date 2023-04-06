import { FaRegCalendar } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { SyntheticEvent } from "react";
import DaterangePicker from "../daterangepicker";

export interface PropsDataRange {
  label?: string;
  startDate?: Date | null;
  endDate?: Date | null;
  onChangeStartDate: (
    date: Date | null,
    event?: SyntheticEvent<any, Event>
  ) => void;
  onChangeEndDate: (
    date: Date | null,
    event?: SyntheticEvent<any, Event>
  ) => void;
}

const DateRange = ({
  label = "RANGE",
  startDate,
  endDate,
  onChangeStartDate,
  onChangeEndDate,
}: PropsDataRange) => {
  return (
    <DaterangePicker
      startDate={startDate as Date}
      endDate={endDate as Date}
      onStartDateChange={(e: any) => e}
      onEndDateChange={(e: any) => e}
    />
  );
};

export default DateRange;
