import React from 'react';

const About = () => {
    return (
        <div className="app-container section-py" style={{ paddingTop: 'calc(var(--nav-height) + 40px)' }}>
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <div className="frosted-panel p-5 mb-5 text-center">
                        <h1 className="display-4 mb-3" style={{ color: 'var(--primary-brown)', fontWeight: 'bold' }}>Our Story</h1>
                        <p className="lead" style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
                            Welcome to <span style={{ color: 'var(--accent-orange)', fontWeight: 'bold' }}>Duyanan</span> – where comfort meets flavor in every bite.
                        </p>
                        <hr className="my-4" style={{ borderColor: 'var(--primary-brown)', width: '50%', margin: '2rem auto' }} />
                        <p className="mb-4">
                            Born from a love of traditional Filipino hospitality and modern culinary experiences, Duyanan is more than just a restaurant. It's a place to relax, unwind, and enjoy good food with good company. Our name, inspired by the "Duyan" (hammock), reflects our commitment to providing a laid-back, comforting atmosphere.
                        </p>
                    </div>

                    <div className="row g-4 mb-5">
                        <div className="col-md-6">
                            <div className="frosted-card p-4 h-100 text-center">
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🥗</div>
                                <h3 className="mb-3">Fresh Ingredients</h3>
                                <p>We source the finest local ingredients to ensure every dish bursts with authentic flavor and quality.</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="frosted-card p-4 h-100 text-center">
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🤲</div>
                                <h3 className="mb-3">Warm Hospitality</h3>
                                <p>Our team is dedicated to making you feel at home. Experience service that treats you like family.</p>
                            </div>
                        </div>
                    </div>

                    <div className="frosted-panel p-5 text-center">
                         <h2 className="mb-4" style={{ color: 'var(--primary-brown)' }}>Visit Us</h2>
                         <p className="mb-2"><strong>Duyanan Restaurant</strong></p>
                         <p className="mb-2">Padre Burgos, Quezon Province, Philippines</p>
                         <p className="mb-4">Open Daily: 10:00 AM – 9:00 PM</p>
                         <p><i className="bi bi-telephone-fill me-2" style={{ color: 'var(--accent-orange)' }}></i>+63 912 345 6789</p>
                         <p><i className="bi bi-envelope-fill me-2" style={{ color: 'var(--accent-orange)' }}></i>hello@duyanan.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
