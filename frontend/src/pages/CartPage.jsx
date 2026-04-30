import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const API_URL = import.meta.env.VITE_API_URL;

const CartPage = () => {
    const { cart, removeFromCart, clearCart } = useCart();
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handleCheckout = async () => {
        if (!isAuthenticated) {
            Swal.fire({
                icon: 'warning',
                title: 'Sign In Required',
                text: 'Please log in to place your order.',
                confirmButtonColor: '#A04000'
            });
            navigate('/login');
            return;
        }

        const result = await Swal.fire({
            title: 'Confirm Order?',
            text: `Place order for a total of ₱${total.toFixed(2)}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#A04000',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Order Now'
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`${API_URL}/api/orders`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    },
                    body: JSON.stringify({
                        notes: "Customer order via Website",
                        items: cart.map(item => ({
                            productId: item.id,
                            quantity: item.quantity
                        }))
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Order Placed!',
                        text: 'Your delicious meal is now being prepared.',
                        confirmButtonColor: '#A04000',
                        timer: 5000
                    });
                    clearCart();
                    navigate('/profile'); // Redirect to profile to see order status
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Order Failed',
                        text: data.error || 'There was a problem placing your order.',
                        confirmButtonColor: '#A04000'
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Checkout Error',
                    text: 'Could not reach the server. Please try again later.',
                    confirmButtonColor: '#A04000'
                });
            }
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
                                <td>₱{item.price.toFixed(2)}</td>
                                <td>{item.quantity}</td>
                                <td>₱{(item.price * item.quantity).toFixed(2)}</td>
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
                    <h4 className="mb-3" style={{ color: '#A04000' }}>Total: <span style={{ fontWeight: 'bold' }}>₱{total.toFixed(2)}</span></h4>
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
