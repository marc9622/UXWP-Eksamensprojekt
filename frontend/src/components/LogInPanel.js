import { useState } from "react";
import './forms.css';

export default function LogInPanel({onCancel, onLogIn}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div>
            <div className='form'>
                <div>
                    <label className='form-field-name'>Username:</label>
                    <br/>
                    <label className='form-field-name'>Password:</label>
                </div>
                <div>
                    <form>
                        <input className='form-field' type='text' value={username} onChange={setUsername}/>
                    </form>
                    <form onSubmit={() => onLogIn(username, password)}>
                        <input className='form-field' type='text' value={password} onChange={setPassword}/>
                    </form>
                </div>
            </div>
            <button onClick={onCancel}>Cancel</button>
            <button onClick={() => onLogIn(username, password)}>Log In</button>
        </div>
    );
}
