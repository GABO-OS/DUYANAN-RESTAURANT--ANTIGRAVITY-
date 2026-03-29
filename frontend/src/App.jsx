import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Menu from './pages/Menu'; // Was ProductList
import CartPage from './pages/CartPage'; // Was Cart
import Footer from './components/Footer';
import ReservationModal from './components/ReservationModal';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [showReservation, setShowReservation] = useState(false);

    const handleOpenReservation = () => setShowReservation(true);
    const handleCloseReservation = () => setShowReservation(false);

    return (
        <CartProvider>
            <Router>
                <div className="d-flex flex-column min-vh-100">
                    <Navigation onOpenReservation={handleOpenReservation} />
                    <ReservationModal show={showReservation} handleClose={handleCloseReservation} />
                    <Routes>
                        <Route path="/" element={<Home onOpenReservation={handleOpenReservation} />} />
                        <Route path="/menu" element={<Menu />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/reservations" element={<div className="container mt-5 text-center"><h2>Reservations</h2><button className="btn btn-primary" onClick={handleOpenReservation}>Book Now</button></div>} />
                        <Route path="/about" element={<About />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                    <Footer />
                </div>
            </Router>
        </CartProvider>
    );
}

export default App;
