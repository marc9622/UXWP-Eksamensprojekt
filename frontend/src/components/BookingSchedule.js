import { asTimeString } from "../util/Numbers";
import { useEffect, useState } from "react";
import React from "react";
import './BookingSchedule.css';

export default function Schedule({ bookings, selectedDate, onTimeSelect }) {
  const [startTime, setStartTime] = useState([]);
  const [endTime, setEndTime] = useState([]);
  if(selectedDate == null){
    return
    }
  const selectedDateString = selectedDate.toDateString();
  // Get the bookings for the selected date
  const bookingsForDate = bookings[selectedDateString] || [];
  
  // Define the available time slots
  const availableTimeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
  ];

  // Filter out the booked time slots
  const availableTimeSlotsFiltered = availableTimeSlots.filter(
    timeSlot => !bookingsForDate.includes(timeSlot)
  );
  
  

  function handleTimeSelect(timeSlot) {
    if (!startTime) {
        setStartTime(timeSlot);
      } else if (!endTime) {
        if (availableTimeSlotsFiltered.indexOf(timeSlot) >= availableTimeSlotsFiltered.indexOf(startTime)) {
          setEndTime(timeSlot);
          onTimeSelect(startTime, timeSlot);
        } else {
          // Invalid selection, reset start and end time
          setStartTime(null);
          setEndTime(null);
        }
      }
  }

  return (
    <div className="schedule">
        <p>Available time slots for {selectedDateString}:</p>
        <div className="time-slots">
        <ul>
            {availableTimeSlotsFiltered.map(timeSlot => (
            <li key={timeSlot}>
                <button className="time-slot-button" onClick={() => handleTimeSelect(timeSlot)}>
                {timeSlot}
                </button>
            </li>
            ))}
        </ul>
      </div>
    </div>

  );
}
