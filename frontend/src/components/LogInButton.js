import 'bootstrap/dist/css/bootstrap.min.css';
import './forms.css';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

export default function LogInButton({shouldShow, setShouldShow, onLogIn}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div>
            <Button
                variant='primary'
                onClick={() => setShouldShow(true)}
            >
                Log In
            </Button>
            <Modal
                show={shouldShow}
                onHide={() => setShouldShow(false)}
                backdrop='static'
            >
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title>Log in</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='form'>
                            <div className='form-field-labels'>
                                <label className='form-field-label'>Username:</label>
                                <br/>
                                <label className='form-field-label'>Password:</label>
                            </div>
                            <div>
                                <form>
                                    <input className='form-field' type='text' value={username} onChange={event => setUsername(event.target.value)}/>
                                </form>
                                <form onSubmit={() => onLogIn(username, password)}>
                                    <input className='form-field' type='text' value={password} onChange={event => setPassword(event.target.value)}/>
                                </form>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => setShouldShow(false)}>Cancel</Button>
                        <Button onClick={() => {
                            onLogIn(username, password);
                            setShouldShow(false);
                        }}>
                            Log In
                        </Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        </div>
    );
}
