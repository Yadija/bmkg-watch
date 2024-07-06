import { Route, Routes } from 'react-router-dom';

import Footer from './components/Footer';
import Navbar from './components/Navbar';
import EarthquakePage from './pages/EarthquakePage';
import HomePage from './pages/HomePage';
import WeatherPage from './pages/WeatherPage';

export default function App() {
  return (
    <>
      <Navbar />
      <main className='container mx-auto p-4'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/gempa' element={<EarthquakePage />} />
          <Route path='/cuaca' element={<WeatherPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
