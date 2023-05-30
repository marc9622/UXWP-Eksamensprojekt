import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function FrontPage({isAdmin}) {
    const [universities, setUniversities] = useState([]);
    const [users, setUsers] = useState([]);

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
    async function fetchUsers() {
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

    async function fetchDeleteUser(username) {
        return await
            fetch('http://localhost:3001/user/' + username, {method: 'DELETE'})
            .then(async res => {
                setUsers(await fetchUsers());
                if (res.status == 200)
                    return res.json()
                console.log(res.status);
                console.log(res.json());
                return null;
            });
    }

    useEffect(() => {fetchUniversities().then(data => setUniversities(data))}, []);
    useEffect(() => {if (isAdmin) fetchUsers().then(data => setUsers(data))}, [isAdmin]);

    return (
        <div>
            <Container className='p-5'>
                <h1 className='d-flex'>Choose your institution</h1>
                <ul className='list-group'>
                    {universities.map(uni =>
                        <li className='d-flex list-group-item'>
                            <Link to={'/uni/' + uni.id}>{uni.name}</Link>
                        </li>
                    )}
                </ul>
            </Container>
            {isAdmin &&
                <Container className='p-5'>
                    <h1 className='d-flex'>Users</h1>
                    {users.map(user => (
                        <div className='d-flex'>
                            <Button className='mt-2' variant='danger' onClick={() => fetchDeleteUser(user.username)}>
                                DELETE
                            </Button>
                            <div className='d-flex mt-3'>
                                {user.role === 'admin' ?
                                    <span className='text-success'>admin: </span> :
                                    <span className='text-primary'>{user.role}: </span>
                                }
                                {user.username + ' '}
                            </div>
                        </div>
                    ))}
                </Container>
            }
        </div>
    );
}
