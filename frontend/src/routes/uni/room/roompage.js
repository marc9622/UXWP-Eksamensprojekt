import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function RoomPage() {
    const params = useParams();

    const [room, setRoom] = useState({ // Layout of the room objects that should be fetched from the API
        facilities: {},
        bookings: {
            today: [],
            thisMonth: [],
        }
    });

    async function fetchRoom() {
        return await fetch('http://localhost:3001/uni/' + params.uniId + '/room/' + params.roomId, {method: 'GET'}).then(res => res.json());
    }

    useEffect(() => {fetchRoom().then(data => setRoom(data))}, []);

    return (
        <div>
            <h1>Room '{params.roomId || 'null'}' in '{params.uniId || 'null'}'</h1>
            <div>
                <h2>Facilities:</h2>
                {room.facilities.chairs} chairs <br/>
                {room.facilities.powerOutlets} power outlets <br/>
                {room.facilities.isFoodAllowed ?
                    'Food is allowed' :
                    'Food is not allowed'} <br/>
                {room.facilities.hasScreen &&
                    <div>Has screen</div> }
                {room.facilities.hasCamera &&
                    <div>Has camera</div> }
                {room.facilities.hasProjector &&
                    <div>Has projector</div> }
                {room.facilities.hasWhiteboard &&
                    <div>Has whiteboard</div> }
            </div>
            <div>
                <h2>Bookings:</h2>
                <BookingsCalender bookings={room.bookings}/>
                <BookingsSchedule bookings={room.bookings}/>
            </div>
        </div>
    );
}

function BookingsCalender(room) {
    return (
        <div>
            <div>
                <h3>This Month:</h3>
                {room.bookings.thisMonth.map(day => (
                    <div>
                        The {day.date + getNumberSuffix(day.date)} is {day.bookedAmount} booked
                    </div>
                ))}
            </div>
        </div>
    );
}

function getNumberSuffix(number) {
    switch (number.toString().slice(-1)) {
        case '1': return 'st';
        case '2': return 'nd';
        case '3': return 'rd';
        default: return 'th';
    }
}

function BookingsSchedule(room) {
    return (
        <div>
            <div>
                <h3>Todays Schedule:</h3>
                {room.bookings.today.map(booking => (
                    <div>
                        Booking {booking.id} from {booking.startTimeHour}:{booking.startTimeMinute} to {booking.endTimeHour}:{booking.endTimeMinute}
                    </div>
                ))}
            </div>
        </div>
    );
}
