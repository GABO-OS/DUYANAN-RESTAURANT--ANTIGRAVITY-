import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import duyananBg from '../assets/img/duyanan_bg.jpg';

const API_URL = import.meta.env.VITE_API_URL;

// Only letters, spaces, hyphens and apostrophes are valid in names
const NAME_REGEX = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s'\-]*$/;

const Register = () => {
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [formError, setFormError] = useState('');
    const [nameErrors, setNameErrors] = useState({ firstName: '', lastName: '' });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Real-time name validation — block digits and special characters
        if (name === 'firstName' || name === 'lastName') {
            if (!NAME_REGEX.test(value)) {
                setNameErrors(prev => ({
                    ...prev,
                    [name]: 'Only letters, spaces, hyphens and apostrophes are allowed.',
                }));
                return; // prevent the invalid character from being typed
            } else {
                setNameErrors(prev => ({ ...prev, [name]: '' }));
            }
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');

        // Guard: names must not contain digits or special characters
        if (!NAME_REGEX.test(formData.firstName) || !NAME_REGEX.test(formData.lastName)) {
            setFormError('First name and last name must contain letters only.');
            return;
        }
        if (formData.firstName.trim().length < 2) {
            setFormError('First name must be at least 2 characters.');
            return;
        }
        if (formData.lastName.trim().length < 2) {
            setFormError('Last name must be at least 2 characters.');
            return;
        }
        if (formData.password.length < 8) {
            setFormError('Password must be at least 8 characters.');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setFormError('Passwords do not match.');
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName:  formData.lastName,
                    email:     formData.email,
                    password:  formData.password,
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                setFormError(data.error || 'Registration failed. Please try again.');
            } else {
                navigate('/login');
            }
        } catch {
            setFormError('Could not connect to the server. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const glassInput = { background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', color: '#fff', borderRadius: '12px' };
    const iconPos = (side = 'left') => ({ [side]: '15px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.6)', zIndex: 1 });

    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '100px 20px 40px',
                backgroundImage: `url(${duyananBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                position: 'relative',
            }}
        >
            {/* Dark gradient overlay */}
            <div style={{
                position: 'fixed', inset: 0,
                background: 'linear-gradient(160deg, rgba(0,0,0,0.45) 0%, rgba(110,44,0,0.55) 100%)',
                zIndex: 0,
            }} />

            {/* Two-column glass card */}
            <div
                className="position-relative d-flex w-100"
                style={{
                    maxWidth: '950px',
                    zIndex: 1,
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 12px 48px rgba(0,0,0,0.5)',
                    border: '1px solid rgba(255,255,255,0.2)',
                }}
            >
                {/* Left — Image Panel */}
                <div
                    className="d-none d-md-flex flex-column align-items-center justify-content-center"
                    style={{
                        width: '40%',
                        flexShrink: 0,
                        background: 'linear-gradient(160deg, rgba(110,44,0,0.85) 0%, rgba(40,10,0,0.95) 100%)',
                        backdropFilter: 'blur(12px)',
                        padding: '48px 32px',
                        borderRight: '1px solid rgba(255,255,255,0.1)',
                    }}
                >
                    <img src="/duyanan_logo.png" alt="Duyanan Logo" style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '50%', boxShadow: '0 8px 40px rgba(0,0,0,0.6)', marginBottom: '24px' }} />
                    <h3 style={{ color: '#fff', fontWeight: 800, textAlign: 'center', textShadow: '0 2px 8px rgba(0,0,0,0.5)', marginBottom: '10px' }}>
                        Join Duyanan!
                    </h3>
                    <p style={{ color: 'rgba(255,200,120,0.85)', textAlign: 'center', fontSize: '0.9rem', lineHeight: 1.6 }}>
                        Sign up to enjoy our delicious Filipino cuisine and exclusive deals.
                    </p>
                </div>

                {/* Right — Form Panel */}
                <div
                    className="flex-grow-1 d-flex flex-column justify-content-center"
                    style={{
                        background: 'rgba(255,255,255,0.10)',
                        backdropFilter: 'blur(28px) saturate(200%)',
                        WebkitBackdropFilter: 'blur(28px) saturate(200%)',
                        padding: '44px 44px',
                    }}
                >
                    <h2 className="fw-bold mb-1" style={{ color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                        Create Account 🌿
                    </h2>
                    <p className="mb-4" style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.88rem' }}>
                        Fill in the details below to get started
                    </p>

                    <form onSubmit={handleSubmit}>
                        {/* First & Last Name */}
                        <div className="row g-2 mb-1">
                            <div className="col-6 position-relative">
                                <i className="bi bi-person position-absolute" style={iconPos()}></i>
                                <input
                                    type="text"
                                    className="form-control input-auth ps-5"
                                    placeholder="First Name"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    style={{
                                        ...glassInput,
                                        border: nameErrors.firstName ? '1px solid rgba(255,150,30,0.7)' : glassInput.border,
                                    }}
                                />
                            </div>
                            <div className="col-6 position-relative">
                                <i className="bi bi-person-fill position-absolute" style={iconPos()}></i>
                                <input
                                    type="text"
                                    className="form-control input-auth ps-5"
                                    placeholder="Last Name"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    style={{
                                        ...glassInput,
                                        border: nameErrors.lastName ? '1px solid rgba(255,150,30,0.7)' : glassInput.border,
                                    }}
                                />
                            </div>
                        </div>
                        {/* Inline name error hint */}
                        {(nameErrors.firstName || nameErrors.lastName) && (
                            <div className="mb-2 d-flex align-items-center gap-2" style={{ fontSize: '0.78rem', color: '#ffc060', paddingLeft: '4px' }}>
                                <i className="bi bi-exclamation-triangle-fill"></i>
                                <span>{nameErrors.firstName || nameErrors.lastName}</span>
                            </div>
                        )}
                        {!(nameErrors.firstName || nameErrors.lastName) && <div className="mb-2" />}

                        {/* Email */}
                        <div className="mb-3 position-relative">
                            <i className="bi bi-envelope position-absolute" style={iconPos()}></i>
                            <input type="email" className="form-control input-auth ps-5" placeholder="Email Address" name="email" value={formData.email} onChange={handleChange} required style={glassInput} />
                        </div>

                        {/* Password + Confirm */}
                        <div className="row g-2 mb-4">
                            <div className="col-6 position-relative">
                                <i className="bi bi-lock position-absolute" style={iconPos()}></i>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-control input-auth ps-5 pe-5"
                                    placeholder="Password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    style={glassInput}
                                />
                                <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} position-absolute`} onClick={() => setShowPassword(p => !p)} style={{ ...iconPos('right'), cursor: 'pointer' }}></i>
                            </div>
                            <div className="col-6 position-relative">
                                <i className="bi bi-lock-fill position-absolute" style={iconPos()}></i>
                                <input
                                    type={showConfirm ? 'text' : 'password'}
                                    className="form-control input-auth ps-5 pe-5"
                                    placeholder="Confirm Password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    style={glassInput}
                                />
                                <i className={`bi ${showConfirm ? 'bi-eye-slash' : 'bi-eye'} position-absolute`} onClick={() => setShowConfirm(p => !p)} style={{ ...iconPos('right'), cursor: 'pointer' }}></i>
                            </div>
                        </div>

                        {formError && (
                            <div className="mb-3 d-flex align-items-center gap-2" style={{ background: 'rgba(220,53,69,0.18)', border: '1px solid rgba(220,53,69,0.4)', borderRadius: '10px', padding: '10px 14px', color: '#ffaaaa', fontSize: '0.85rem' }}>
                                <i className="bi bi-exclamation-circle-fill"></i> {formError}
                            </div>
                        )}
                        <button type="submit" className="btn-brand w-100" style={{ borderRadius: '50px', padding: '13px' }} disabled={isLoading}>
                            {isLoading ? <><span className="spinner-border spinner-border-sm me-2" role="status"></span>Creating Account...</> : 'Create Account'}
                        </button>
                    </form>

                    <div className="mt-4 text-center pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
                        <span className="small" style={{ color: 'rgba(255,255,255,0.55)' }}>Already have an account? </span>
                        <Link to="/login" className="text-decoration-none fw-bold small" style={{ color: 'rgba(255,200,120,0.9)' }}>Log In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
