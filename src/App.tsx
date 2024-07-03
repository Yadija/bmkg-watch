import { Route, Routes } from 'react-router-dom';

import EarthquakePage from './pages/EarthquakePage';
import WeatherPage from './pages/WeatherPage';

export default function App() {
  return (
    <main className='container mx-auto p-4'>
      <Routes>
        <Route path='/' element={<EarthquakePage />} />
        <Route path='/cuaca' element={<WeatherPage />} />
      </Routes>
    </main>
  );
}
