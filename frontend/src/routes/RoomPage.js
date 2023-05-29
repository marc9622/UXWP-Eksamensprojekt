import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Schedule from "../components/BookingSchedule";
import './StyleSheets/RoomPage.css';

export default function RoomPage({isUser}) {
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
  const [selectedTime, setSelectedTime] = useState(null);

    async function fetchRoom() {
        return await fetch('http://localhost:3001/' + params.uniId + '/room/' + params.roomId, {method: 'GET'}).then(res => res.json());
    }

    useEffect(() => {fetchRoom().then(data => setRoom(data))}, []);


    function handleDateSelection(date) {
        setSelectedDate(date);
        setSelectedTime(null);
      }
    
      function handleTimeSelection(time) {
        setSelectedTime(time);
      }

      function handleBooking() {
        if (selectedDate && selectedTime) {
            console.log('Booking:', selectedDate, selectedTime);
        }else{
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
                onTimeSelect={handleTimeSelection}
              />
            </div>
            <button className="BookBtn" onClick={handleBooking} disabled={!selectedDate || !selectedTime}>
              Book Room
            </button>
          </div>
        </div>
      );
    }