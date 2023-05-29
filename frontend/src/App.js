import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import FrontPage from './routes/frontpage';
import UniPage from './routes/UniPage';
import RoomPage from './routes/RoomPage';
import Header from './components/Header';
import Footer from './components/Footer';
import { useState } from 'react';

export default function App() {
    const [user, setUser] = useState({});

    const isUser = {
        loggedIn: () => user !== null,
        admin: () => user !== null && user.admin,
    }

    return (
        <div className='App'>
            <Header onUserSet={setUser}/>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<FrontPage isUser={isUser}/>}/>
                    <Route path='/uni/:uniId' element={<UniPage isUser={isUser}/>}/>
                    <Route path='/uni/:uniId/room/:roomId' element={<RoomPage isUser={isUser}/>}/>
                </Routes>
            </BrowserRouter>
            <Footer/>
        </div>
    );
}
