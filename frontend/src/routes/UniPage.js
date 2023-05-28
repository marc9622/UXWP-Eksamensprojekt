import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function UniPage() {
    const params = useParams();
    const [rooms, setRooms] = useState([]);

    async function fetchRooms() {
        return await fetch('http://localhost:3001/' + params.uniId + '/rooms-list', {method: 'GET'})
            .then(res => res.json());
    }

    useEffect(() => {
        fetchRooms().then(data => setRooms(data))
    }, []);

    return (
        <div>
            <h1>Rooms in '{params.uniId || 'null'}'</h1>
            <div  className="room-cards-container">
                {rooms.map(room => (
                    <div className="room-cards" key={room.id}>
                        <Link to={'/uni/' + params.uniId + '/room/' + room.id}>
                            <h2>{room.name}</h2>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
