import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingsCalender from "../components/BookingCalender";
import BookingsSchedule from "../components/BookingSchedule";
import './StyleSheets/RoomPage.css';

export default function RoomPage({getIsAdmin}) {
    const params = useParams();
    const [room, setRoom] = useState({
        // Structure of the room objects that should be fetched from the API
        facilities: {},
        bookings: {
            today: [],
            thisMonth: [],
        }
    });

    async function fetchRoom() {
        return await fetch('http://localhost:3001/' + params.uniId + '/room/' + params.roomId, {method: 'GET'}).then(res => res.json());
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
            {/* 
                <h2>Bookings:</h2>
                <BookingsCalender bookings={room.bookings.thisMonth}/>
                <BookingsSchedule bookings={room.bookings.today}/>
            */}  
            </div>
        </div>
    );
}
