import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Placeholder imports - using existing images. 
// You can replace these files in the assets folder with the 3 images you uploaded!
import bg1 from '../assets/img/duyanan_bg.jpg';
import bg2 from '../assets/img/sfc.png';
import bg3 from '../assets/img/habhab.jpg';

const bgImages = [bg1, bg2, bg3];

const Reservations = () => {
    const navigate = useNavigate();
    const [currentBg, setCurrentBg] = useState(0);
    const [formData, setFormData] = useState({
        seatingType: '',
        date: '',
        time: '',
        guests: '',
        request: ''
    });

    // Handle background slider
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentBg((prev) => (prev + 1) % bgImages.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Reservation Data:', formData);
        alert('Reservation Submitted!');
        navigate('/'); // Redirect to home after submission
    };

    const inputStyle = {
        borderRadius: '6px',
        border: '1px solid #ced4da',
        backgroundColor: '#fff',
        padding: '12px 16px',
        fontSize: '1rem',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        width: '100%',
        outline: 'none',
        color: '#333'
    };

    const labelStyle = {
        color: '#495057',
        fontWeight: '600',
        fontSize: '0.9rem',
        marginBottom: '6px',
        display: 'block'
    };

    return (
        <div className="container-fluid p-0" style={{ minHeight: '100vh', display: 'flex' }}>
            <div className="row g-0 w-100">
                {/* Left Side: Background Slider */}
                <div className="col-lg-7 d-none d-lg-block position-relative" style={{ minHeight: '100vh', overflow: 'hidden' }}>
                    {bgImages.map((img, index) => (
                        <div 
                            key={index}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                backgroundImage: `url(${img})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                opacity: index === currentBg ? 1 : 0,
                                transition: 'opacity 1s ease-in-out',
                            }}
                        />
                    ))}
                    {/* Dark gradient overlay for smooth transition into the form */}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%)' }} />
                </div>

                {/* Right Side: Form Container */}
                <div className="col-12 col-lg-5 d-flex flex-column align-items-center justify-content-center" style={{ backgroundColor: '#e9ecef', padding: '40px 0', minHeight: '100vh' }}>
                    
                    {/* The form wrapper */}
                    <div style={{ width: '100%', maxWidth: '450px', padding: '0 30px', marginTop: 'var(--nav-height)' }}>
                        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '10px', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}>🍃</div>
                            <h2 style={{ color: 'var(--primary-brown)', fontWeight: 800, margin: 0, letterSpacing: '0.02em', fontSize: '2rem' }}>
                                Duyanan Reservations
                            </h2>
                            <p style={{ color: '#555', marginTop: '8px' }}>
                                Book a table to start your session
                            </p>
                        </div>
                        
                        <form onSubmit={handleSubmit}>
                            {/* Seating Type */}
                            <div className="mb-3">
                                <label style={labelStyle}>Seating Type</label>
                                <select
                                    name="seatingType"
                                    value={formData.seatingType}
                                    onChange={handleChange}
                                    required
                                    style={inputStyle}
                                >
                                    <option value="">Select Option</option>
                                    <option value="indoor">🏠 Indoor</option>
                                    <option value="outdoor">🌿 Outdoor</option>
                                </select>
                            </div>

                            {/* Date & Time row */}
                            <div className="row g-3 mb-3">
                                <div className="col-md-6">
                                    <label style={labelStyle}>Date</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                        style={inputStyle}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label style={labelStyle}>Time</label>
                                    <input
                                        type="time"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleChange}
                                        required
                                        style={inputStyle}
                                    />
                                </div>
                            </div>

                            {/* Guests */}
                            <div className="mb-3">
                                <label style={labelStyle}>Number of Guests</label>
                                <input
                                    type="number"
                                    name="guests"
                                    value={formData.guests}
                                    onChange={handleChange}
                                    required
                                    min="1"
                                    placeholder="e.g. 4"
                                    style={inputStyle}
                                />
                            </div>

                            {/* Special Request */}
                            <div className="mb-4">
                                <label style={labelStyle}>Special Request <span style={{ color: '#888', fontWeight: 400 }}>(optional)</span></label>
                                <textarea
                                    name="request"
                                    value={formData.request}
                                    onChange={handleChange}
                                    rows="3"
                                    placeholder="e.g. Birthday celebration, dietary restrictions..."
                                    style={{ ...inputStyle, resize: 'none' }}
                                ></textarea>
                            </div>

                            {/* Submit */}
                            <button type="submit" style={{ 
                                width: '100%', 
                                padding: '12px 0', 
                                fontSize: '1.1rem', 
                                borderRadius: '6px', 
                                backgroundColor: 'var(--accent-orange)', 
                                color: '#fff', 
                                border: 'none', 
                                fontWeight: 'bold',
                                boxShadow: '0 4px 6px rgba(211, 84, 0, 0.2)',
                                transition: 'background-color 0.2s'
                            }}>
                                Confirm Reservation
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reservations;
