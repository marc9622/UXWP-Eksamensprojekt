import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import FrontPage from './routes/FrontPage';
import UniPage from './routes/UniPage';
import RoomPage from './routes/RoomPage';
import Header from './components/Header';
import Footer from './components/Footer';
import { useState } from 'react';

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [username, setUsername] = useState(null);

    function setUser(user) {
        if (!user || !user.username || !user.role) {
            setIsLoggedIn(false);
            setIsAdmin(false);
            setUsername(null);
            return;
        }
        setIsLoggedIn(true);
        setIsAdmin(user.role === 'admin');
        setUsername(user.username);
    }

    return (
        <div className='App'>
            <Header setUser={setUser} isLoggedIn={isLoggedIn} username={username}/>
            <BrowserRouter>
                <Routes>
                    <Route path='/'
                        element={<FrontPage isAdmin={isAdmin}/>}
                    />
                    <Route path='/uni/:uniId'
                        element={<UniPage isAdmin={isAdmin}/>}
                    />
                    <Route path='/uni/:uniId/room/:roomId'
                        element={<RoomPage isLoggedIn={isLoggedIn} isAdmin={isAdmin} username={username}/>}
                    />
                </Routes>
            </BrowserRouter>
            <Footer/>
        </div>
    );
}
