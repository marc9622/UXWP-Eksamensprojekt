import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function FrontPage({isUser}) {
    const [universities, setUniversities] = useState([]);
    const [clients, setClients] = useState([]);

    async function fetchUniversities() {
        return await fetch('http://localhost:3001/unis-list', {method: 'GET'}).then(res => res.json());
    }
    async function fetchClients() {
        return await fetch('http://localhost:3001/users-list', {method: 'GET'}).then(res => res.json());
    }

    useEffect(() => {fetchUniversities().then(data => setUniversities(data))}, []);
    useEffect(() => {fetchClients().then(data => setClients(data))}, []);

    return (
        <div>
            <h1>Universities</h1>
            {universities.map(uni =>
                <div>
                    <Link to={'/uni/' + uni.id}>{uni.name}</Link>
                </div>
            )}

            <h1>Clients</h1>
            {clients.map(client =>
                <div>
                    <p>{client.id}: {client.username}, {client.password} ({client.role})</p>
                </div>
            )}
        </div>
    );
}
