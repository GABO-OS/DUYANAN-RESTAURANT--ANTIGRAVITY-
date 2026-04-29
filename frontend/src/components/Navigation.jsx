import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Navigation = ({ onOpenReservation }) => {
    const { cart } = useCart();
    const { isAuthenticated, isAdmin, user, logout } = useAuth();
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const location = useLocation();
    const navigate = useNavigate();
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    useEffect(() => { setIsNavCollapsed(true); }, [location]);

    const handleLogout = () => { logout(); navigate('/'); };
    const navClass = 'nav-filled';
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
                   <span style={{ fontSize: '2rem', color: '#fff', marginRight: '10px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Duyanan</span>
                   <span style={{ fontSize: '1.5rem', transform: 'rotate(-20deg)', filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.3))' }}>🍃</span>
                </Link>
                <button className="navbar-toggler" type="button" onClick={() => setIsNavCollapsed(!isNavCollapsed)} aria-controls="navbarCollapse" aria-expanded={!isNavCollapsed} aria-label="Toggle navigation" style={{ borderColor: 'rgba(255,255,255,0.5)' }}>
                    <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
                </button>
                <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarCollapse">
                    <ul className="navbar-nav ms-auto align-items-center">
                        <li className="nav-item"><Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/" style={{ color: '#fff', fontWeight: 'bold', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/menu" style={{ color: '#fff', fontWeight: 'bold', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Menu</Link></li>
                        <li className="nav-item"><button className="nav-link btn btn-link" onClick={onOpenReservation} style={{ color: '#fff', fontWeight: 'bold', textDecoration: 'none', background: 'none', border: 'none', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Reservations</button></li>
                        <li className="nav-item"><Link className="nav-link" to="/about" style={{ color: '#fff', fontWeight: 'bold', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>About Us</Link></li>

                        {isAuthenticated && isAdmin && (
                            <li className="nav-item"><Link className="nav-link" to="/admin" style={{ color: '#ffd580', fontWeight: 'bold', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}><i className="bi bi-shield-lock me-1"></i>Admin</Link></li>
                        )}

                        {isAuthenticated ? (
                            <>
                                <li className="nav-item ms-lg-2 d-flex align-items-center position-relative">
                                     <Link className="btn btn-sm shadow-sm d-flex align-items-center btn-expandable" to="/cart" style={{ backgroundColor: '#fff', color: 'var(--accent-orange)', borderRadius: '50px', padding: '8px 20px', fontWeight: 'bold', textDecoration: 'none' }}>
                                        <i className="bi bi-cart-fill" style={{ fontSize: '1.2rem' }}></i>
                                        <span className="btn-expandable-label">My Orders</span>
                                    </Link>
                                    {cartCount > 0 && (<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger shadow" style={{ transform: 'translate(-50%, -50%)', zIndex: 10 }}>{cartCount}</span>)}
                                </li>
                                <li className="nav-item ms-lg-1 d-flex align-items-center">
                                     <Link className="btn btn-sm shadow-sm position-relative d-flex align-items-center btn-expandable" to="/profile" style={{ backgroundColor: '#fff', color: 'var(--primary-brown)', borderRadius: '50px', padding: '8px 20px', fontWeight: 'bold', textDecoration: 'none' }}>
                                        <i className="bi bi-person-circle" style={{ fontSize: '1.2rem' }}></i>
                                        <span className="btn-expandable-label">{user?.firstName || 'Profile'}</span>
                                    </Link>
                                </li>
                                <li className="nav-item ms-lg-1 d-flex align-items-center">
                                    <button className="btn btn-sm shadow-sm d-flex align-items-center" onClick={handleLogout} style={{ backgroundColor: 'rgba(220,53,69,0.9)', color: '#fff', borderRadius: '50px', padding: '8px 20px', fontWeight: 'bold', border: 'none' }}>
                                        <i className="bi bi-box-arrow-right" style={{ fontSize: '1.1rem' }}></i>
                                        <span className="ms-1 d-none d-xl-inline">Logout</span>
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item ms-lg-2 d-flex align-items-center">
                                    <Link className="btn btn-sm shadow-sm" to="/login" style={{ backgroundColor: 'var(--accent-orange)', color: '#fff', borderRadius: '50px', padding: '8px 20px', fontWeight: 'bold', textDecoration: 'none' }}>Log In</Link>
                                </li>
                                <li className="nav-item ms-lg-1 d-flex align-items-center">
                                    <Link className="btn btn-sm shadow-sm" to="/register" style={{ backgroundColor: '#fff', color: 'var(--primary-brown)', borderRadius: '50px', padding: '8px 20px', fontWeight: 'bold', textDecoration: 'none' }}>Sign Up</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
