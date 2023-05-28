import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function UniPage() {
    const params = useParams();
    const [rooms, setRooms] = useState([]);

    async function fetchRooms() {
        return await fetch('http://localhost:3001/' + params.uniId + '/rooms-list', {method: 'GET'}).then(res => res.json());
    }

    useEffect(() => {fetchRooms().then(data => setRooms(data))}, []);

    return (
        <div>
            <h1>Rooms in '{params.uniId || 'null'}'</h1>
            {rooms.map(room =>
                <div>
                    <Link to={'/uni/' + params.uniId + '/room/' + room.id}>{room.name}</Link>
                </div>
            )}
        </div>
    );
}
