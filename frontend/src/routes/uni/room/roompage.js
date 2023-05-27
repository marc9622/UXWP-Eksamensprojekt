import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function RoomPage() {
    const params = useParams();

    const [room, setRoom] = useState({
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
                <BookingsSchedule bookings={room.bookings.today}/>
            </div>
        </div>
    );
}

function BookingsCalender() {
    return null;
}

function BookingsSchedule(bookings) {
    return (
        <div>
            <div>
            </div>
        </div>
    );
}
