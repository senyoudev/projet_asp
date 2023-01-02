import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './pages/Admin';
import AdminOwenr from './pages/AdminOwner';
import { AuthContextProvider } from './Context/AuthContext';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import CarsListing from './pages/CarsListing';
import CarDetails from './pages/CarDetails';
import Contact from './pages/Contact';
import { CarContextProvider } from './Context/CarContext';
import { OffreContextProvider } from './Context/OffreContext';
import { ReservationContextProvider } from './Context/ReservationContext';
import { BrandContextProvider } from './Context/MarqueContext';
import { FavContextProvider } from './Context/FavListContext';
import { BlackContextProvider } from './Context/BlackListContext';
function App() {
  return (
    <Router>
      <AuthContextProvider>
        <FavContextProvider>
          <BrandContextProvider>
            <CarContextProvider>
              <OffreContextProvider>
                <ReservationContextProvider>
                  <BlackContextProvider>
                    <Routes>
                      <Route exact path='/' element={<Home />} />
                      <Route path='/admin/*' element={<Admin />} />
                      <Route path='/owner/*' element={<AdminOwenr />} />
                      <Route path='/login' element={<Login />} />
                      <Route path='/register' element={<Register />} />
                      <Route path='/cars' element={<CarsListing />} />
                      <Route path="/carsDetails/:id" element={<CarDetails  />} />
                      <Route path='/contact' element={<Contact />} />
                      <Route path='*' element={<NotFound />} />
                    </Routes>
                  </BlackContextProvider>
                </ReservationContextProvider>
              </OffreContextProvider>
            </CarContextProvider>
          </BrandContextProvider>
        </FavContextProvider>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
