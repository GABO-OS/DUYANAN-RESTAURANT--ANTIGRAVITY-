import React, { useState } from 'react';

const ReservationModal = ({ show, handleClose }) => {
    const [formData, setFormData] = useState({
        seatingType: '',
        date: '',
        time: '',
        guests: '',
        request: ''
    });

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
        handleClose();
    };

    if (!show) return null;

    const inputStyle = {
        borderRadius: '10px',
        border: '1.5px solid rgba(160, 64, 0, 0.3)',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        backdropFilter: 'blur(8px)',
        padding: '10px 14px',
        fontSize: '0.95rem',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        width: '100%',
        outline: 'none',
        color: '#333'
    };

    const labelStyle = {
        color: 'var(--primary-brown)',
        fontWeight: '600',
        fontSize: '0.9rem',
        marginBottom: '6px',
        display: 'block'
    };

    return (
        <div
            className="modal show d-block"
            tabIndex="-1"
            style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)' }}
            onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div
                    className="modal-content border-0"
                    style={{
                        borderRadius: '24px',
                        overflow: 'hidden',
                        background: 'rgba(253, 251, 247, 0.85)',
                        backdropFilter: 'blur(24px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                        border: '1px solid rgba(255,255,255,0.5)',
                        boxShadow: '0 16px 64px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.6)'
                    }}
                >
                    {/* Header */}
                    <div
                        className="modal-header border-0"
                        style={{
                            background: 'linear-gradient(135deg, var(--accent-orange), var(--dark-brown))',
                            padding: '20px 24px'
                        }}
                    >
                        <h5
                            className="modal-title w-100 text-center mb-0"
                            style={{ color: '#fff', fontWeight: 800, fontSize: '1.4rem', letterSpacing: '0.02em', textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
                        >
                            🍽️ Book a Reservation
                        </h5>
                        <button
                            type="button"
                            onClick={handleClose}
                            style={{
                                background: 'rgba(255,255,255,0.2)',
                                border: '1px solid rgba(255,255,255,0.4)',
                                borderRadius: '50%',
                                width: '32px',
                                height: '32px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                fontSize: '1.1rem',
                                cursor: 'pointer',
                                flexShrink: 0,
                                transition: 'background 0.2s'
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.35)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                            title="Close"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Body */}
                    <div className="modal-body" style={{ padding: '24px' }}>
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
                                <div className="col-6">
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
                                <div className="col-6">
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
                                <label style={labelStyle}>Special Request <span style={{ color: '#aaa', fontWeight: 400 }}>(optional)</span></label>
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
                            <button type="submit" className="btn-brand w-100" style={{ padding: '12px 0', fontSize: '1rem' }}>
                                Confirm Reservation
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReservationModal;
