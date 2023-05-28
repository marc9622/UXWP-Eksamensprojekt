import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import FrontPage from './routes/FrontPage';
import UniPage from './routes/UniPage';
import RoomPage from './routes/RoomPage';
import UniPageAdmin from './routes/UniPageAdmin';
import RoomPageAdmin from './routes/RoomPageAdmin';
import Header from './components/Header';
import Footer from './components/Footer';
import { useState } from 'react';
import { useEffect } from 'react';

export default function App() {
    const [user, setUser] = useState({});

    function isUserLoggedIn() {
        return user !== null;
    }

    function isUserAdmin() {
        return user !== null && user.admin;
    }

    async function fetchUser() {
        return null; // TODO:
    }

    useEffect(() => {fetchUser().then(data => setUser(user))}, []);

    return (
        <div className='App'>
            <Header/>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<FrontPage/>}/>
                    <Route path='/uni/:uniId' element={<UniPage/>}/>
                    <Route path='/uni/:uniId/room/:roomId' element={<RoomPage/>}/>
                    <Route path='/a/uni/:uniId' element={<UniPageAdmin/>}/>
                    <Route path='/a/uni/:uniId/room/:roomId' element={<RoomPageAdmin/>}/>
                </Routes>
            </BrowserRouter>
            <Footer/>
        </div>
    );
}
