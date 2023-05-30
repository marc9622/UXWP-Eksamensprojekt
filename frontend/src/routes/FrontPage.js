import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function FrontPage({isAdmin}) {
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

    // sets padding to 5
    // p-5
    // reduces absolute max width
    // w-50
    return (
        <div>
            <Container className='p-5 w-50'>
                <h1>Institutions</h1>
                <ul className='list-group'>
                    {universities.map(uni =>
                        <li className='list-group-item'>
                            <Link to={'/uni/' + uni.id}>{uni.name}</Link>
                        </li>
                    )}
                </ul>
            </Container>
            {isAdmin &&
                <Container className='p-5 w-50'>
                    <h1>Clients</h1>
                    <ul className='list-group'>
                    {clients.map(client => (
                        <li className='list-group-item'>
                            {client.role}: {client.username}
                        </li>
                    ))}
                    </ul>
                </Container>
            }
        </div>
    );
}
