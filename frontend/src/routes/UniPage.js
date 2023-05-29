import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function UniPage({isUser}) {
    const params = useParams();
    const [rooms, setRooms] = useState([]);
    const [bookings, setBookings] = useState([]);

    async function fetchRooms() {
        return await fetch('http://localhost:3001/' + params.uniId + '/rooms-list', {method: 'GET'})
            .then(res => res.json());
    }

    async function fetchBookings() {
        return await fetch('http://localhost:3001/' + params.uniId + '/bookings-list', { method: 'GET' })
          .then(res => res.json());
      }

    useEffect(() => {
        fetchRooms().then(data => {
            setRooms(data);
            fetchBookings().then(bookings => {
                // Update room bookings
                const updatedRooms = data.map(room => {
                    const matchedBooking = bookings.find(booking => booking.roomID === room.id);
                    if (matchedBooking) {
                        return { ...room, isBooked: true };
                    }
                    return { ...room, isBooked: false };
                });
                setRooms(updatedRooms);
            });
        });
        fetchBookings().then(data => setBookings(data));
    }, [params.uniId]);

    function matchRoomToBooking(roomID) {
        const room = rooms.find(room => room.id === roomID);
        return room ? room.name : "Unknown Room";
    }

  

    return (
     
        <div>
        <h1>Rooms in '{params.uniId || 'null'}'</h1>
        <div className="room-cards-container">
          {rooms.map(room => (
            <div className={`room-cards ${room.isBooked ? 'booked' : 'available'}`} key={room.id}>
              <Link to={'/uni/' + params.uniId + '/room/' + room.id}>
                <h2>{room.name}</h2>
              </Link>
            </div>
          ))}
        </div>
  
        <h1>Bookings in '{params.uniId || 'null'}'</h1>
        <div className="booking-cards-container">
          {bookings.map(booking => (
            <div className="booking-cards" key={booking.bookingID}>
              <h3>Booking ID: {booking.bookingID}</h3>
              <p>Room ID: {booking.roomID}</p>
              <p>Room Name: {matchRoomToBooking(booking.roomID)}</p>
              <p>User ID: {booking.userID}</p>
              <p>Date: {booking.date}</p>
              <p>Start Time: {booking.startTime}</p>
              <p>End Time: {booking.endTime}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
