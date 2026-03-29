import React from 'react';

const Footer = () => {
    return (
        <footer className="text-center text-lg-start mt-auto" style={{ backgroundColor: '#6E2C00', color: '#fff' }}>
            <div className="container p-4">
                <div className="row">
                    <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                        <h5 className="text-uppercase" style={{ fontFamily: 'cursive' }}>Duyanan Restaurant</h5>
                        <p>
                            Experience the best of Filipino cuisine with a modern twist. 
                            Tuloy po kayo!
                        </p>
                    </div>

                    <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                        <h5 className="text-uppercase">Links</h5>
                        <ul className="list-unstyled mb-0">
                            <li><a href="/" className="text-white text-decoration-none">Home</a></li>
                            <li><a href="/menu" className="text-white text-decoration-none">Menu</a></li>
                            <li><a href="/reservations" className="text-white text-decoration-none">Reservations</a></li>
                        </ul>
                    </div>

                    <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                        <h5 className="text-uppercase">Contact</h5>
                        <ul className="list-unstyled mb-0">
                            <li><span className="text-white">Lucban, Quezon Province, Philippines</span></li>
                            <li><span className="text-white">+63 912 345 6789</span></li>
                            <li><span className="text-white">hello@duyanan.com</span></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                © 2026 Duyanan Restaurant
            </div>
        </footer>
    );
};

export default Footer;
