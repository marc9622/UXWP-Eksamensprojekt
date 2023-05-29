import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FrontPage({getIsAdmin}) {
    const [universities, setUniversities] = useState([]);
    const [clients, setClients] = useState([]);

    async function fetchUniversities() {
        return await
            fetch('http://localhost:3001/unis-list', {method: 'GET'})
            .then(res => {
                if (res.status == 200)
                    return res.json()
                console.log(res.status);
                console.log(res.json());
                return [];
            });
    }
    async function fetchClients() {
        return await
            fetch('http://localhost:3001/users-list', {method: 'GET'})
            .then(res => {
                if (res.status == 200)
                    return res.json()
                console.log(res.status);
                console.log(res.json());
                return [];
            });
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
