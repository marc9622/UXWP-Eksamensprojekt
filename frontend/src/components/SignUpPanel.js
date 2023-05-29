import { useState } from "react";

export default function SignUpPanel({onCancel, onSignUp}) {
    const [uniId, setUniId] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    return (
        <div>
            <form>
                <label>uni id (temp)</label>
                <input type='text' value={uniId} onChange={setUniId}/>
            </form>
            <form>
                <label>Username:</label>
                <input type='text' value={username} onChange={setUsername}/>
            </form>
            <form>
                <label>Password:</label>
                <input type='text' value={password} onChange={setPassword}/>
            </form>
            <form>
                <label>Confirm Password:</label>
                <input type='text' value={passwordConfirm} onChange={setPasswordConfirm}/>
            </form>
            <button onClick={onCancel}>Cancel</button>
            <button onClick={() => onSignUp(uniId, username, password, passwordConfirm)}>Sign Up</button>
        </div>
    );
}
