import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './BookingSchedule.css';

export default function Schedule({ bookings, selectedDate, onTimeSelect }) {
  const params = useParams();
  const [bookingsData, setBookingsData] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    try {
      const response = await fetch(`http://localhost:3001/${params.uniId}/bookings-list`, { method: 'GET' });
      const data = await response.json();
      setBookingsData(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  }

  if (selectedDate == null) {
    return null;
  }

  const selectedDateString = selectedDate.toDateString();
  const bookingsForDate = bookings[selectedDateString] || [];
  const availableTimeSlots = [
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 13:00",
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00",
    "17:00 - 18:00",
    "18:00 - 19:00",
    "19:00 - 20:00",
    "20:00 - 21:00",
    "21:00 - 22:00"
  ];

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
        setStartTime(null);
        setEndTime(null);
      }
    }
  }

  function handleNewStartTime() {
    setStartTime(null);
  }

  function handleNewEndTime() {
    setEndTime(null);
  }

  const selectedTimeRange = availableTimeSlotsFiltered.slice(
    availableTimeSlotsFiltered.indexOf(startTime),
    availableTimeSlotsFiltered.indexOf(endTime) + 1
  );

  return (
    <div className="schedule">
      <p>Available time slots for {selectedDateString}:</p>
      <div className="time-slots">
        <ul>
          {availableTimeSlotsFiltered.map(timeSlot => {
            const isBooked = bookingsData.some(booking =>
              booking.startTime <= timeSlot && booking.endTime >= timeSlot
            );
            return (
              <li key={timeSlot}>
                <button
                  className={`time-slot-button ${isBooked ? 'booked' : ''} ${timeSlot === startTime || selectedTimeRange.includes(timeSlot) ? 'selected' : ''}`}
                  onClick={() => handleTimeSelect(timeSlot)}
                >
                  {timeSlot}
                </button>
              </li>
            );
          })}
        </ul>
        <div className="buttons">
          {startTime && (
            <button className="change-button" onClick={handleNewStartTime}>
              Choose new start time
            </button>
          )}
          {endTime && (
            <button className="change-button" onClick={handleNewEndTime}>
              Choose new end time
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
