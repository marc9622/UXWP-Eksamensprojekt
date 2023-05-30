import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Schedule from "../components/BookingSchedule";
import './StyleSheets/RoomPage.css';

export default function RoomPage({ getIsAdmin }) {
  const params = useParams();
  const [room, setRoom] = useState({
    // Structure of the room objects that should be fetched from the API
    facilities: [],
    bookings: {
      today: [],
      thisMonth: [],
    }
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);

  async function fetchRoom() {
    return await fetch('http://localhost:3001/' + params.uniId + '/room/' + params.roomId, { method: 'GET' }).then(res => res.json());
  }

  useEffect(() => { fetchRoom().then(data => setRoom(data)) }, []);

  function handleDateSelection(date) {
    setSelectedDate(date);
    setSelectedStartTime(null);
    setSelectedEndTime(null);
  }

  function handleStartTimeSelection(time) {
    setSelectedStartTime(time);
  }

  function handleEndTimeSelection(time) {
    setSelectedEndTime(time);
  }


  async function addBooking(booking) {
    console.log("i tried");
    try {
      const response = await fetch('http://localhost:3001/' + params.uniId + '/bookings/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(booking)
      });

      if (response.ok) {
        const createdBooking = await response.json();
        console.log('Booking created:', createdBooking);
        window.location.reload();
      } else {
        throw new Error('Failed to add booking');
      }
    } catch (error) {
      console.error(error);
    }
  }

  
  function handleBooking() {
    if (selectedDate && selectedStartTime && selectedEndTime) {
      const newBooking = {
        uniId: params.uniId,
        roomId: params.roomId,
        date: new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        startTime: selectedStartTime,
        endTime: selectedEndTime
      };

      addBooking(newBooking);
    } else {
      console.log('Choose a real date and time');
    }
  }


  return (
    <div>
      <h1>Room '{params.roomId || 'null'}' in '{params.uniId || 'null'}'</h1>
      <div className="facilities">
        <h3>Facilities:</h3>
        <ul>
          {room.facilities.map(facility => (
            <li key={facility}>{facility}</li>
          ))}
        </ul>
      </div>
      <div className="booking-container">
        <div className="calendar-container">
          <h3>Select Date:</h3>
          <div className="calendar-wrapper">
            <Calendar
              value={selectedDate}
              onChange={handleDateSelection}
            />
          </div>
        </div>
        <div className="schedule-container">
          <h3>Select Time:</h3>
          <Schedule
            bookings={room.bookings}
            selectedDate={selectedDate}
            onStartTimeSelect={handleStartTimeSelection}
            onEndTimeSelect={handleEndTimeSelection}
          />
        </div>
        <button className="BookBtn" onClick={handleBooking} disabled={!selectedDate || !selectedStartTime || !selectedEndTime }>
          Book Room
        </button>
      </div>
    </div>
  );
}
