import { useState } from "react";
import './forms.css';

export default function LogInPanel({onCancel, onLogIn}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div>
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
            <button onClick={onCancel}>Cancel</button>
            <button onClick={() => onLogIn(username, password)}>Log In</button>
        </div>
    );
}
