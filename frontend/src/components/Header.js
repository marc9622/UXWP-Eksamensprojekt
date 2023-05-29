import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import LogInPanel from './LogInPanel';
import SignUpPanel from './SignUpPanel';

export default function Header({setUser, getIsLoggedIn, getUsername}) {
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [isSigningUp, setIsSigningUp] = useState(false);

    async function fetchLogIn(username, password) {
        return await fetch('http://localhost:3001/user',
            {method: 'GET', body: JSON.stringify({username, password})})
            .then(res => res.json());
    }

    async function fetchSignUp(username, password, uniId) {
        return await fetch('http://localhost:3001/user',
            {method: 'POST', body: JSON.stringify({username, password, uniId})})
            .then(res => res.json());
    }

    return (
        <Navbar bg='primary' expand='md'>
            <Container>
                <Navbar.Brand href='/'>Navbar Brand</Navbar.Brand>
                <Navbar.Toggle area-controls='basic-navbar-nav'/>
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='me-auto'>
                        <Nav.Link href='/'>Home</Nav.Link>
                        <Nav.Link href='/test'>Test</Nav.Link>
                        <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
                            <NavDropdown.Item href='/uni/itu'>ITU</NavDropdown.Item>
                            <NavDropdown.Item href='/uni/dtu'>DTU</NavDropdown.Item>
                            <NavDropdown.Item href='/uni/cbs'>CBS</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href='/'>Home</NavDropdown.Item>
                        </NavDropdown>
                        <button onClick={() => {setIsLoggingIn(true); setIsSigningUp(false);}}>Log In</button>
                        <button onClick={() => {setIsLoggingIn(false); setIsSigningUp(true);}}>Sign Up</button>
                        {
                            isLoggingIn ?
                                (<LogInPanel
                                    onCancel={() => setIsLoggingIn(false)}
                                    onLogIn={(username, password) => setUser(fetchLogIn(username, password))}
                                />) :
                                isSigningUp &&
                                    (<SignUpPanel
                                        onCancel={() => setIsSigningUp(false)}
                                        onSignUp={(username, password, uniId) => setUser(fetchSignUp(username, password, uniId))}
                                    />)
                        }
                        <button onClick={() => setUser(null)}>Log Out</button>
                    </Nav>
                    <span>{getIsLoggedIn() ? 'Logged in as ' + getUsername() : 'Not logged in'}</span>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
