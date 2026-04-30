import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Menu from './pages/Menu'; // Was ProductList
import CartPage from './pages/CartPage'; // Was Cart
import Footer from './components/Footer';
import Reservations from './pages/Reservations';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <div className="d-flex flex-column min-vh-100">
                        <Navigation />
                        <Routes>
                            {/* Public Auth routes */}
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />

                            {/* Protected routes — require login */}
                            <Route path="/" element={
                                <ProtectedRoute>
                                    <Home />
                                </ProtectedRoute>
                            } />
                            <Route path="/menu" element={
                                <ProtectedRoute>
                                    <Menu />
                                </ProtectedRoute>
                            } />
                            <Route path="/about" element={
                                <ProtectedRoute>
                                    <About />
                                </ProtectedRoute>
                            } />
                            <Route path="/reservations" element={
                                <ProtectedRoute>
                                    <Reservations />
                                </ProtectedRoute>
                            } />
                            {/* Protected routes — require login */}
                            <Route path="/cart" element={
                                <ProtectedRoute>
                                    <CartPage />
                                </ProtectedRoute>
                            } />
                            <Route path="/profile" element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            } />

                            {/* Admin-only route */}
                            <Route path="/admin" element={
                                <ProtectedRoute requiredRole="ADMIN">
                                    <AdminPanel />
                                </ProtectedRoute>
                            } />
                        </Routes>
                        <Footer />
                    </div>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
