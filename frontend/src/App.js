import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import FrontPage from './routes/FrontPage';
import UniPage from './routes/UniPage';
import RoomPage from './routes/RoomPage';
import Header from './components/Header';
import Footer from './components/Footer';
import { useState } from 'react';

export default function App() {
    const [user, setUser] = useState(null);

    function isLoggedIn() {
        return user !== null;
    }

    function isAdmin() {
        return isLoggedIn() && user.role === 'admin';
    }

    function username() {
        return user.username;
    }

    return (
        <div className='App'>
            <Header setUser={setUser} getIsLoggedIn={isLoggedIn} getUsername={username}/>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<FrontPage getIsAdmin={isAdmin}/>}/>
                    <Route path='/uni/:uniId' element={<UniPage getIsAdmin={isAdmin}/>}/>
                    <Route path='/uni/:uniId/room/:roomId' element={<RoomPage getIsAdmin={isAdmin}/>}/>
                </Routes>
            </BrowserRouter>
            <Footer/>
        </div>
    );
}
