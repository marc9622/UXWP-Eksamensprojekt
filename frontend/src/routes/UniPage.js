import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Color from 'color-js';
import './StyleSheets/UniPage.css';
import { asTimeString } from '../util/Numbers';
import { Container } from "react-bootstrap";

const greenColor = Color('#00ff00');
const yellowColor = Color('#ffff00');
const redColor = Color('#ff0000');

export default function UniPage({isAdmin}) {
    const params = useParams();
    const [rooms, setRooms] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date());

    const showTime = asTimeString(currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds());

    async function fetchRooms() {
        return await fetch('http://localhost:3001/' + params.uniId + '/rooms-list', {method: 'GET'})
            .then(res => res.json());
    }

    async function fetchBookings() {
        return await fetch('http://localhost:3001/' + params.uniId + '/bookings-list', { method: 'GET' })
            .then(res => res.json());
    }

    async function deleteBooking(bookingID) {

        return await fetch('http://localhost:3001/' + params.uniId + '/bookings/' + bookingID, { method: 'DELETE' })
            .then(res => res.json());
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());

            async function fetchData() {
                const roomsData = await fetchRooms();
                const bookingsData = await fetchBookings();


                setRooms(roomsData);
                setBookings(bookingsData);

                // Delete bookings if their endTime has passed
                for (let i = 0; i < bookingsData.length; i++) {
                    const booking = bookingsData[i];
                    const endTime = new Date(booking.date + 'T' + booking.endTime);
                    if (endTime <= currentTime) {
                        await deleteBooking(booking.bookingID);
                    }
                }

                // Update room bookings
                const updatedRooms = roomsData.map(room => {
                    const matchedBooking = bookingsData.find(booking => booking.roomID === room.id)
                    if (matchedBooking) {
                        const startTime = new Date(matchedBooking.date + 'T' + matchedBooking.startTime);
                        const endTime = new Date(matchedBooking.date + 'T' + matchedBooking.endTime);
                
                        const hourAhead = new Date(currentTime.getTime() + (1.5 * 60 * 60 * 1000));
                        
                        if (startTime.getTime() < currentTime.getTime() && endTime.getTime() > currentTime.getTime()) {
                            return { ...room, color: redColor, isBooked: true, booking: matchedBooking };
                        } else if (startTime <= hourAhead && endTime > currentTime) {
                            // Room will be booked within the next two hours, calculate gradient color between red and yellow
                            const percentage = Math.abs(hourAhead - startTime) / Math.abs(endTime - startTime);
                            const gradientColor = yellowColor.blend(redColor, percentage);
                            return { ...room, color: gradientColor };
                        }
                    } else {
                        const hourAhead = new Date(currentTime.getTime() + (1.5 * 60 * 60 * 1000));
                        const percentage = Math.abs(hourAhead - currentTime) / (1.5 * 60 * 60 * 1000);
                        const gradientColor = yellowColor.blend(greenColor, percentage);
                        return { ...room, color: gradientColor };
                    }

                    return { ...room, color: greenColor, isBooked: false };
                });

                setRooms(updatedRooms);
            }

            fetchData();

        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, [params.uniId, currentTime, greenColor, yellowColor, redColor]);

    function matchRoomToBooking(roomID) {
        const room = rooms.find(room => room.id === roomID);
        return room ? room.name : "Unknown Room";
    }

    return (
        <div>
        <Container className='p-5'>
            <h1>Rooms in '{params.uniId || 'null'}'</h1>
            <h2>Time: {showTime}</h2>
            <div className="room-cards-container">
                {rooms.map(room => (
                    <div className="room-cards" key={room.id} style={{ backgroundColor: room.color}}>
                        <Link to={'/uni/' + params.uniId + '/room/' + room.id}>
                            <h2>{room.name}</h2>
                        </Link>
                        {room.isBooked && (
                            <div> 
                                <p>Booked until</p>
                                <p>{room.booking.endTime}</p>
                            </div>  
                        )}

                    </div>
                ))}
            </div>
            </Container>
            {isAdmin &&
                <Container className='p-5'>
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
                </Container>
            }
        </div>
    );
}
