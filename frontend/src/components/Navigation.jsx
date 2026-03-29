import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Ensure bootstrap JS is loaded for collapse

const Navigation = ({ onOpenReservation }) => {
    const { cart } = useCart();
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const location = useLocation();
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close navbar on route change
    useEffect(() => {
        setIsNavCollapsed(true);
    }, [location]);

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    // Determine nav class: Always use the scrolled styling which now holds our solid gradient
    const navClass = 'nav-filled';

    // Simple Authentication Header for login/register
    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
    
    if (isAuthPage) {
        return (
            <nav className={`navbar navbar-expand-lg nav-glass fixed-top ${navClass}`} style={{ minHeight: 'var(--nav-height)' }}>
                <div className="container-fluid px-4 px-lg-5">
                    <Link className="navbar-brand d-flex align-items-center" to="/">
                        <span style={{ fontSize: '2rem', color: '#fff', marginRight: '5px', fontWeight: 'bold' }}>Duyanan</span>
                        <span style={{ fontSize: '1.5rem', transform: 'rotate(-20deg)', display: 'inline-block' }}>🍃</span>
                    </Link>
                    
                    <div className="d-flex align-items-center">
                        {location.pathname === '/login' ? (
                            <Link to="/register" className="btn btn-sm shadow-sm" style={{ backgroundColor: '#fff', color: 'var(--primary-brown)', borderRadius: '50px', padding: '8px 20px', fontWeight: 'bold' }}>Sign Up</Link>
                        ) : (
                            <Link to="/login" className="btn btn-sm shadow-sm" style={{ backgroundColor: 'var(--accent-orange)', color: '#fff', borderRadius: '50px', padding: '8px 20px', fontWeight: 'bold' }}>Log In</Link>
                        )}
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <nav className={`navbar navbar-expand-lg nav-glass fixed-top ${navClass}`} style={{ minHeight: 'var(--nav-height)' }}>
            <div className="container-fluid px-4 px-lg-5">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                   {/* Logo Placeholder */}
                   <span style={{ fontSize: '2rem', color: '#fff', marginRight: '10px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Duyanan</span>
                   <span style={{ fontSize: '1.5rem', transform: 'rotate(-20deg)', filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.3))' }}>🍃</span>
                </Link>
                
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    onClick={handleNavCollapse}
                    aria-controls="navbarCollapse" 
                    aria-expanded={!isNavCollapsed} 
                    aria-label="Toggle navigation"
                    style={{ borderColor: 'rgba(255,255,255,0.5)' }}
                >
                    <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
                </button>

                <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarCollapse">
                    <ul className="navbar-nav ms-auto align-items-center">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/" style={{ color: '#fff', fontWeight: 'bold', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/menu" style={{ color: '#fff', fontWeight: 'bold', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Menu</Link>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link btn btn-link" onClick={onOpenReservation} style={{ color: '#fff', fontWeight: 'bold', textDecoration: 'none', background: 'none', border: 'none', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Reservations</button>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about" style={{ color: '#fff', fontWeight: 'bold', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>About Us</Link>
                        </li>
                        {/* Cart Icon */}
                        <li className="nav-item ms-lg-2 d-flex align-items-center position-relative">
                             <Link className="btn btn-sm shadow-sm d-flex align-items-center btn-expandable" to="/cart" style={{ backgroundColor: '#fff', color: 'var(--accent-orange)', borderRadius: '50px', padding: '8px 20px', fontWeight: 'bold', textDecoration: 'none' }}>
                                <i className="bi bi-cart-fill" style={{ fontSize: '1.2rem' }}></i>
                                <span className="btn-expandable-label">My Orders</span>
                            </Link>
                            {cartCount > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger shadow" style={{ transform: 'translate(-50%, -50%)', zIndex: 10 }}>
                                    {cartCount}
                                </span>
                            )}
                        </li>
                        {/* Profile Icon */}
                        <li className="nav-item ms-lg-1 d-flex align-items-center">
                             <Link className="btn btn-sm shadow-sm position-relative d-flex align-items-center btn-expandable" to="/profile" style={{ backgroundColor: '#fff', color: 'var(--primary-brown)', borderRadius: '50px', padding: '8px 20px', fontWeight: 'bold', textDecoration: 'none' }}>
                                <i className="bi bi-person-circle" style={{ fontSize: '1.2rem' }}></i>
                                <span className="btn-expandable-label">My Profile</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
