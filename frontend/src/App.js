import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import FrontPage from './routes/FrontPage';
import UniPage from './routes/UniPage';
import RoomPage from './routes/RoomPage';
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
    return (
        <div className='App'>
            <Header/>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<FrontPage/>}/>
                    <Route path='/uni/:uniId' element={<UniPage/>}/>
                    <Route path='/uni/:uniId/room/:roomId' element={<RoomPage/>}/>
                </Routes>
            </BrowserRouter>
            <Footer/>
        </div>
    );
}
