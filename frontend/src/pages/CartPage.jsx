import React from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const { cart, removeFromCart, clearCart } = useCart();

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handleCheckout = async () => {
        try {
            // Mock checkout for now if backend expects specific format
            alert(`Order placed! Total: $${total.toFixed(2)}`);
            clearCart();
        } catch (error) {
            console.error("Checkout failed:", error);
            alert("Checkout failed. Please try again.");
        }
    };

    if (cart.length === 0) {
        return (
            <div className="container text-center" style={{ minHeight: '60vh', paddingTop: 'calc(var(--nav-height) + 40px)' }}>
                <h2 style={{ color: '#A04000' }}>Your cart is empty</h2>
                <Link to="/menu" className="btn btn-brand mt-3">Go to Menu</Link>
            </div>
        );
    }

    return (
        <div className="container mb-5" style={{ backgroundColor: '#fff', borderRadius: '15px', padding: '30px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', marginTop: 'calc(var(--nav-height) + 40px)' }}>
            <h2 className="mb-4 text-center" style={{ color: '#A04000', fontWeight: 'bold' }}>Order Confirmation</h2>
            
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr style={{ color: '#A04000' }}>
                            <th scope="col">Item</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Total</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item) => (
                            <tr key={item.id} style={{ verticalAlign: 'middle' }}>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <img src={item.imageUrl || 'https://placehold.co/50'} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px', marginRight: '10px' }} />
                                        <div>
                                            <h6 className="mb-0" style={{ color: '#333' }}>{item.name}</h6>
                                            <small className="text-muted">{item.description}</small>
                                        </div>
                                    </div>
                                </td>
                                <td>${item.price.toFixed(2)}</td>
                                <td>{item.quantity}</td>
                                <td>${(item.price * item.quantity).toFixed(2)}</td>
                                <td>
                                    <button className="btn-remove" onClick={() => removeFromCart(item.id)} title="Remove item">
                                        <i className="bi bi-trash3-fill"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="row mt-4">
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label text-muted">Delivery Address</label>
                        <textarea className="form-control" rows="2" placeholder="Enter your address..." style={{ borderRadius: '10px', backgroundColor: '#f9f9f9' }}></textarea>
                    </div>
                </div>
                <div className="col-md-6 d-flex flex-column align-items-end justify-content-center">
                    <h4 className="mb-3" style={{ color: '#A04000' }}>Total: <span style={{ fontWeight: 'bold' }}>${total.toFixed(2)}</span></h4>
                    <div className="d-flex gap-2">
                        <Link to="/menu" className="btn btn-outline-brand">Add More</Link>
                        <button className="btn btn-brand" onClick={handleCheckout}>Order Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
