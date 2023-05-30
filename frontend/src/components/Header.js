import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Button, Container, Nav, Navbar} from 'react-bootstrap';
import LogInButton from './LogInButton';
import SignUpButton from './SignUpButton';

export default function Header({setUser, isLoggedIn, username}) {
    const [showLoginPopup,  setShowLoginPopup]  = useState(false);
    const [showSignUpPopup, setShowSignUpPopup] = useState(false);

    async function fetchLogIn(username, password) {
        return await fetch('http://localhost:3001/user/' + username + '/' + password, // should get hashed
            {method: 'GET'})
            .then(res => {
                if (res.status == 200)
                    return res.json();
                console.log(res.status);
                console.log(res.json());
                return null;
            });
    }

    async function fetchSignUp(username, password, passwordConfirm) {
        if (password != passwordConfirm) {
            console.log('Passwords do not match');
            return null;
        }
        return await fetch('http://localhost:3001/user/' + username + '/' + password,
            {method: 'POST', body: JSON.stringify({username, password})})
            .then(res => {
                if (res.status == 200)
                    return res.json()
                console.log(res.status);
                console.log(res.json());
                return null;
            });
    }

    return (
        <Navbar bg='primary' expand='md'>
            <Container>
                <Navbar.Brand href='/'>Room Booking</Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse>
                    <Nav>
                        {isLoggedIn ?
                            // when logged in
                            <div className='navbar-nav'>
                                <Navbar.Text className='navbar-nav'>
                                    Logged in as {username}
                                </Navbar.Text>
                                <Button variant='primary' onClick={() => setUser(null)}>
                                    Log Out
                                </Button>
                            </div> :
                            // when not logged in
                            <div className='navbar-nav'>
                                <SignUpButton
                                    shouldShow={showSignUpPopup}
                                    setShouldShow={setShowSignUpPopup}
                                    onSignUp={async (username, password, passwordConfirm) => setUser(await fetchSignUp(username, password, passwordConfirm))}
                                />
                                <LogInButton
                                    shouldShow={showLoginPopup}
                                    setShouldShow={setShowLoginPopup}
                                    onLogIn={async (username, password) => setUser(await fetchLogIn(username, password))}
                                />
                            </div>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
