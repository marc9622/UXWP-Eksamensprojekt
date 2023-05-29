import { useState } from "react";
import './forms.css';

export default function SignUpPanel({onCancel, onSignUp}) {
    const [uniId, setUniId] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    return (
        <div>
            <div className='form'>
                <div className='form-field-labels'>
                    <label className='form-field-label'>uni id (temp):</label>
                    <br/>
                    <label className='form-field-label'>Username:</label>
                    <br/>
                    <label className='form-field-label'>Password:</label>
                    <br/>
                    <label className='form-field-label'>Confirm Password:</label>
                </div>
                <div>
                    <form>
                        <input className='form-field' type='text' value={uniId} onChange={event => setUniId(event.target.value)}/>
                    </form>
                    <form>
                        <input className='form-field' type='text' value={username} onChange={event => setUsername(event.target.value)}/>
                    </form>
                    <form>
                        <input className='form-field' type='text' value={password} onChange={event => setPassword(event.target.value)}/>
                    </form>
                    <form>
                        <input className='form-field' type='text' value={passwordConfirm} onChange={event => setPasswordConfirm(event.target.value)}/>
                    </form>
                </div>
            </div>
            <button onClick={onCancel}>Cancel</button>
            <button onClick={() => onSignUp(uniId, username, password, passwordConfirm)}>Sign Up</button>
        </div>
    );
}
