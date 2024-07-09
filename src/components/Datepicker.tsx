"use client";
import "daisyui/dist/full.css";
import { format } from "date-fns";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { CoveredLeague } from "@/types/types";
import { FaCalendarAlt } from "react-icons/fa";


type DatepickerProps = {
  range: DateRange | undefined;
  setRange: (range: DateRange | undefined) => void;
};

const Datepicker: React.FC<DatepickerProps> = ({ range, setRange }) => {
  const [isDatePickerVisible, setIsDatePickerVisible] =
    useState<boolean>(false);

  const toggleDatePicker = () => {
    setIsDatePickerVisible(!isDatePickerVisible);
  };

  const formatDate = (date: Date) => format(date, "dd/MM EEE");

  let displayValue;
  if (range?.from) {
    const fromDate = new Date(range.from);
    const toDate = new Date(range.to ? range.to : range.from);

    if (range.to && fromDate.getTime() === toDate.getTime()) {
      displayValue = formatDate(range.from);
    } else if (range.to) {
      displayValue = `${formatDate(range.from)} - ${formatDate(range.to)}`;
    } else {
      displayValue = formatDate(range.from);
    }
  } else {
    displayValue = "Select date";
  }

  return (
    <div>
      <div className="flex flex-row justify-center relative items-center w-full">
      <FaCalendarAlt className="absolute left-4 "/>
      <input
        type="text"
        value={displayValue}
        readOnly
        onClick={toggleDatePicker}
        className="input input-bordered rounded-badge text-center w-full max-h-8 max-w-60 cursor-pointer border-black border-2 pl-10"
      />
      </div>

      {/* DaisyUI Modal */}
      {isDatePickerVisible && (
        <div className="modal modal-open flex flex-col justify-center items-center">
          <div className="modal-box m-4 z-40">
            <DayPicker
              mode="range"
              defaultMonth={range?.from}
              selected={range}
              onSelect={setRange}
              max={7}
            />
            <div className="modal-action">
              <button className="btn" onClick={toggleDatePicker}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Datepicker;
