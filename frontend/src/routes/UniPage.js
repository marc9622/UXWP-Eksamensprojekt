import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Color from 'color-js';

const greenColor = Color('#00ff00');
const yellowColor = Color('#ffff00');
const redColor = Color('#ff0000');

export default function UniPage({getIsAdmin}) {
    const params = useParams();
    const [rooms, setRooms] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date());

    let showTime = currentTime.getHours() 
        + ':' + currentTime.getMinutes() 
        + ":" + currentTime.getSeconds();

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
                        const startTime = new Date(matchedBooking.date + 'T' + matchedBooking.startTime);
                        const endTime = new Date(matchedBooking.date + 'T' + matchedBooking.endTime);
                        const twoHoursAhead = new Date(currentTime.getTime() + (2 * 60 * 60 * 1000));

                        if (startTime.getTime() < currentTime.getTime() && endTime.getTime() > currentTime.getTime()) {
                            return { ...room, color: redColor };
                        } else if (startTime <= twoHoursAhead && endTime > currentTime) {
                            // Room will be booked within the next two hours, calculate gradient color between red and yellow
                            const percentage = Math.abs(twoHoursAhead - startTime) / Math.abs(endTime - startTime);
                            const gradientColor = yellowColor.blend(redColor, percentage);
                            return { ...room, color: gradientColor };
                        }
                    } else {
                        const twoHoursAhead = new Date(currentTime.getTime() + (2 * 60 * 60 * 1000));
                        const percentage = Math.abs(twoHoursAhead - currentTime) / (2 * 60 * 60 * 1000);
                        const gradientColor = yellowColor.blend(greenColor, percentage);
                        return { ...room, color: gradientColor };
                    }

                    return { ...room, color: greenColor };     
                });
                setRooms(updatedRooms);
            });
        });
        fetchBookings().then(data => setBookings(data));
    }, [params.uniId]);


    useEffect(() => {
        const timer = setInterval(() => {setCurrentTime(new Date())}, 1000);
        return () => clearInterval(timer);
    }, []);

    function matchRoomToBooking(roomID) {
        const room = rooms.find(room => room.id === roomID);
        return room ? room.name : "Unknown Room";
    }

    return (
        <div>
            <h1>Rooms in '{params.uniId || 'null'}'</h1>
            <h2>Time: {showTime}</h2>
            <div className="room-cards-container">
                {rooms.map(room => (
                    <div className="room-cards" key={room.id} style={{ backgroundColor: room.color }}>
                        <Link to={'/uni/' + params.uniId + '/room/' + room.id}>
                            <h2>{room.name}</h2>
                        </Link>
                        {room.isBooked && (
                            <p>Booked until {room.bookingEndTime}</p>
                        )}
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
