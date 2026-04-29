import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Profile = () => {
    // Current active tab in the sidebar
    const [activeTab, setActiveTab] = useState('profile');
    const { user } = useAuth();

    // Use real user data from AuthContext
    const [profileData] = useState({
        fullName: user ? `${user.firstName} ${user.lastName}` : 'Guest',
        email: user?.email || 'N/A',
        phone: '+63 912 345 6789',
        address: '123 Main St, Apt 4B, Springfield',
        dob: '01 January'
    });

    // Mock Communication Preferences state
    const [commPrefs, setCommPrefs] = useState({
        offersPush: false,
        offersEmail: false,
        offersSms: false,
        updatesPush: true
    });

    const handleToggle = (key) => {
        setCommPrefs(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const renderMainContent = () => {
        if (activeTab === 'profile') {
            return (
                <>
                    <div className="mb-0">
                        <h4 className="fw-bold mb-1" style={{ color: 'var(--text-dark)' }}>My Profile</h4>
                        <p className="text-muted small mb-4">Edit your personal details</p>
                        <hr style={{ borderColor: '#e9ecef', opacity: 1, margin: 0 }} />
                    </div>

                    <div className="profile-details-container">
                        {/* Detail Row: Name */}
                        <div className="info-row d-flex justify-content-between align-items-center">
                            <div className="d-flex flex-column flex-sm-row flex-grow-1 align-items-start align-items-sm-center">
                                <div className="info-label">Name</div>
                                <div className="info-value pr-3">{profileData.fullName}</div>
                            </div>
                            <i className="bi bi-pencil-square info-action" title="Edit Name"></i>
                        </div>

                        {/* Detail Row: Email */}
                        <div className="info-row d-flex justify-content-between align-items-center">
                            <div className="d-flex flex-column flex-sm-row flex-grow-1 align-items-start align-items-sm-center">
                                <div className="info-label d-flex align-items-center gap-2">
                                    Email Address 
                                </div>
                                <div className="info-value pr-3">{profileData.email}</div>
                            </div>
                            <div style={{ width: '32px' }}></div> 
                        </div>

                        {/* Detail Row: Mobile */}
                        <div className="info-row d-flex justify-content-between align-items-center">
                            <div className="d-flex flex-column flex-sm-row flex-grow-1 align-items-start align-items-sm-center">
                                <div className="info-label">Mobile Number</div>
                                <div className="info-value pr-3">{profileData.phone}</div>
                            </div>
                            <i className="bi bi-pencil-square info-action" title="Edit Mobile"></i>
                        </div>

                        {/* Detail Row: Date of Birth */}
                        <div className="info-row d-flex justify-content-between align-items-center">
                            <div className="d-flex flex-column flex-sm-row flex-grow-1 align-items-start align-items-sm-center">
                                <div className="info-label">Date of Birth</div>
                                <div className="info-value pr-3">{profileData.dob}</div>
                            </div>
                            <i className="bi bi-lock info-action text-muted" style={{ cursor: 'not-allowed' }} title="Cannot edit DOB"></i>
                        </div>
                    </div>
                </>
            );
        }

        if (activeTab === 'addresses') {
            return (
                <>
                    <div className="mb-5 d-flex justify-content-between align-items-start">
                        <div>
                            <h4 className="fw-bold mb-1" style={{ color: 'var(--text-dark)' }}>Saved Addresses</h4>
                            <p className="text-muted small">Keep your delivery destinations organized</p>
                        </div>
                        <button className="btn btn-sm shadow-sm" style={{ backgroundColor: '#dc3545', color: '#fff', borderRadius: '50px', padding: '8px 20px', fontWeight: 'bold' }}>
                            Add New Address
                        </button>
                    </div>

                    <div className="text-center py-5" style={{ marginTop: '50px' }}>
                        <i className="bi bi-geo-alt text-muted" style={{ fontSize: '3rem', opacity: 0.5 }}></i>
                        <h5 className="fw-bold mt-3 mb-2" style={{ color: 'var(--text-dark)' }}>You haven't saved any address yet</h5>
                        <p className="text-muted small">Add a new address to checkout in a breeze</p>
                    </div>
                </>
            );
        }

        if (activeTab === 'orders') {
            return (
                <>
                    <div className="mb-5">
                        <h4 className="fw-bold mb-1" style={{ color: 'var(--text-dark)' }}>My Orders</h4>
                        <p className="text-muted small">Track your order history effortlessly</p>
                    </div>

                    <div className="text-center py-5" style={{ marginTop: '50px' }}>
                        <i className="bi bi-bag text-muted mb-3 d-block" style={{ fontSize: '3rem', opacity: 0.5 }}></i>
                        <h5 className="fw-bold mb-2" style={{ color: 'var(--text-dark)' }}>Your order history is empty</h5>
                        <p className="text-muted small mb-4">Please register or log in to start tracking your orders.</p>
                        <Link to="/menu" className="btn btn-sm shadow-sm" style={{ backgroundColor: '#dc3545', color: '#fff', borderRadius: '50px', padding: '10px 30px', fontWeight: 'bold' }}>
                            Order Now
                        </Link>
                    </div>
                </>
            );
        }

        if (activeTab === 'communications') {
            return (
                <>
                    <div className="mb-0">
                        <h4 className="fw-bold mb-1" style={{ color: 'var(--text-dark)' }}>Communications</h4>
                        <p className="text-muted small mb-4">Manage your communication preferences and notifications</p>
                        <hr style={{ borderColor: '#e9ecef', opacity: 1, margin: 0 }} />
                    </div>

                    <div className="profile-details-container">
                        {/* Offers & Deals Section */}
                        <div className="info-row py-4">
                            <div className="row">
                                <div className="col-12 col-md-6 mb-3 mb-md-0">
                                    <h6 className="fw-bold" style={{ color: 'var(--text-dark)' }}>Offers & Deals</h6>
                                    <p className="text-muted small mb-0 pe-md-4">Get notified and be the first to know about Duyanan exclusive offers and marketing communications.</p>
                                </div>
                                <div className="col-12 col-md-6 d-flex flex-column justify-content-center gap-3">
                                    
                                    <div className="form-check form-switch d-flex align-items-center gap-2 m-0 p-0">
                                        <input className="form-check-input m-0 toggle-switch" type="checkbox" role="switch" id="offersPush" 
                                            checked={commPrefs.offersPush} onChange={() => handleToggle('offersPush')} 
                                            style={{ cursor: 'pointer', height: '1.2rem', width: '2.4rem' }}/>
                                        <label className="form-check-label small fw-medium" htmlFor="offersPush" style={{ cursor: 'pointer', color: 'var(--text-dark)' }}>Push notification</label>
                                    </div>
                                    
                                    <div className="form-check form-switch d-flex align-items-center gap-2 m-0 p-0">
                                        <input className="form-check-input m-0 toggle-switch" type="checkbox" role="switch" id="offersEmail" 
                                            checked={commPrefs.offersEmail} onChange={() => handleToggle('offersEmail')} 
                                            style={{ cursor: 'pointer', height: '1.2rem', width: '2.4rem' }}/>
                                        <label className="form-check-label small fw-medium" htmlFor="offersEmail" style={{ cursor: 'pointer', color: 'var(--text-dark)' }}>Email</label>
                                    </div>
                                    
                                    <div className="form-check form-switch d-flex align-items-center gap-2 m-0 p-0">
                                        <input className="form-check-input m-0 toggle-switch" type="checkbox" role="switch" id="offersSms" 
                                            checked={commPrefs.offersSms} onChange={() => handleToggle('offersSms')} 
                                            style={{ cursor: 'pointer', height: '1.2rem', width: '2.4rem' }}/>
                                        <label className="form-check-label small fw-medium" htmlFor="offersSms" style={{ cursor: 'pointer', color: 'var(--text-dark)' }}>SMS</label>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* Important Updates Section */}
                        <div className="info-row py-4 border-bottom-0">
                            <div className="row">
                                <div className="col-12 col-md-6 mb-3 mb-md-0">
                                    <h6 className="fw-bold" style={{ color: 'var(--text-dark)' }}>Important Updates</h6>
                                    <p className="text-muted small mb-0 pe-md-4">Receive important updates on your orders and new features via push notification, email, and SMS.</p>
                                </div>
                                <div className="col-12 col-md-6 d-flex align-items-center">
                                    
                                    <div className="form-check form-switch d-flex align-items-center gap-2 m-0 p-0">
                                        <input className="form-check-input m-0 toggle-switch" type="checkbox" role="switch" id="updatesPush" 
                                            checked={commPrefs.updatesPush} onChange={() => handleToggle('updatesPush')} 
                                            style={{ cursor: 'pointer', height: '1.2rem', width: '2.4rem' }}/>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </>
            );
        }

        // Default placeholder for other tabs
        return (
            <div className="text-center py-5 text-muted">
                <i className="bi bi-tools fs-1 mb-3"></i>
                <h5>This section is under construction.</h5>
            </div>
        );
    };

    return (
        <div className="container" style={{ marginTop: 'calc(var(--nav-height) + 40px)', marginBottom: '60px', minHeight: '60vh' }}>
            {/* Header / Breadcrumb */}
            <div className="mb-4 d-flex align-items-center">
                <Link to="/" className="text-decoration-none me-2" style={{ color: 'var(--text-dark)' }}>
                    <i className="bi bi-arrow-left fs-5"></i>
                </Link>
                <h3 className="fw-bold mb-0" style={{ color: 'var(--text-dark)' }}>Account Management</h3>
            </div>

            <div className="row g-5">
                {/* Sidebar Navigation */}
                <div className="col-12 col-md-3">
                    <div className="sidebar-heading">Account</div>
                    <div className="d-flex flex-column mb-3">
                        <button 
                            className={`btn text-start sidebar-link ${activeTab === 'profile' ? 'active' : ''}`}
                            onClick={() => setActiveTab('profile')}
                        >
                            <i className="bi bi-person"></i> My Profile
                        </button>
                        <button 
                            className={`btn text-start sidebar-link ${activeTab === 'addresses' ? 'active' : ''}`}
                            onClick={() => setActiveTab('addresses')}
                        >
                            <i className="bi bi-geo-alt"></i> Saved Addresses
                        </button>
                        <button 
                            className={`btn text-start sidebar-link ${activeTab === 'payment' ? 'active' : ''}`}
                            onClick={() => setActiveTab('payment')}
                        >
                            <i className="bi bi-credit-card"></i> Payment Methods
                        </button>
                        <button 
                            className={`btn text-start sidebar-link ${activeTab === 'orders' ? 'active' : ''}`}
                            onClick={() => setActiveTab('orders')}
                        >
                            <i className="bi bi-receipt"></i> My Orders
                        </button>
                    </div>

                    <div className="sidebar-heading">Settings</div>
                    <div className="d-flex flex-column mb-3">
                        <button 
                            className={`btn text-start sidebar-link ${activeTab === 'communications' ? 'active' : ''}`}
                            onClick={() => setActiveTab('communications')}
                        >
                            <i className="bi bi-arrow-left-right"></i> Communications
                        </button>
                    </div>

                    <div className="sidebar-heading">Support</div>
                    <div className="d-flex flex-column mb-4">
                        <button 
                            className={`btn text-start sidebar-link ${activeTab === 'help' ? 'active' : ''}`}
                            onClick={() => setActiveTab('help')}
                        >
                            <i className="bi bi-question-circle"></i> Help Center
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="col-12 col-md-9">
                    {renderMainContent()}
                </div>
            </div>
        </div>
    );
};

export default Profile;
