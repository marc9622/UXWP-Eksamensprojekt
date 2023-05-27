import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Index from './routes/index';
import FrontPage from './routes/uni/frontpage';
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
  return (
      <div className='App'>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Index/>}/>
                <Route path='/uni/:universityId' element={<FrontPage/>}/>
            </Routes>
        </BrowserRouter>
      </div>
  );
}
