import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import 'bootstrap-icons/font/bootstrap-icons.css';

const API_URL = import.meta.env.VITE_API_URL;

const AdminPanel = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('users');
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    // Product form state
    const [showProductForm, setShowProductForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [productForm, setProductForm] = useState({
        name: '', price: '', description: '', imageUrl: '', category: 'Appetizers'
    });

    const categories = ['Appetizers', 'Set Meal', 'Party Meal', 'Kids Meal', 'Drinks'];

    const authHeaders = () => ({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
    });

    // ── Fetch data ────────────────────────────────────────
    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/admin/users`, { headers: authHeaders() });
            if (res.ok) setUsers(await res.json());
        } catch { /* ignore */ }
        setIsLoading(false);
    };

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/admin/products`, { headers: authHeaders() });
            if (res.ok) setProducts(await res.json());
        } catch { /* ignore */ }
        setIsLoading(false);
    };

    useEffect(() => {
        if (activeTab === 'users') fetchUsers();
        else if (activeTab === 'products') fetchProducts();
    }, [activeTab]);

    // ── Product CRUD ─────────────────────────────────────
    const resetProductForm = () => {
        setProductForm({ name: '', price: '', description: '', imageUrl: '', category: 'Appetizers' });
        setEditingProduct(null);
        setShowProductForm(false);
    };

    const handleProductSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        const payload = { ...productForm, price: parseFloat(productForm.price) };

        try {
            const url = editingProduct
                ? `${API_URL}/api/admin/products/${editingProduct.id}`
                : `${API_URL}/api/admin/products`;
            const method = editingProduct ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: authHeaders(),
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setMessage(editingProduct ? 'Product updated!' : 'Product created!');
                resetProductForm();
                fetchProducts();
            }
        } catch {
            setMessage('Error saving product.');
        }
    };

    const handleEditProduct = (product) => {
        setProductForm({
            name: product.name,
            price: product.price,
            description: product.description || '',
            imageUrl: product.imageUrl || '',
            category: product.category || 'Appetizers'
        });
        setEditingProduct(product);
        setShowProductForm(true);
    };

    const handleDeleteProduct = async (id) => {
        if (!confirm('Are you sure you want to delete this product?')) return;
        try {
            const res = await fetch(`${API_URL}/api/admin/products/${id}`, {
                method: 'DELETE',
                headers: authHeaders()
            });
            if (res.ok) {
                setMessage('Product deleted.');
                fetchProducts();
            }
        } catch {
            setMessage('Error deleting product.');
        }
    };

    // ── Render ────────────────────────────────────────────
    return (
        <div className="container" style={{ marginTop: 'calc(var(--nav-height) + 40px)', marginBottom: '60px', minHeight: '60vh' }}>
            <div className="mb-4">
                <h3 className="fw-bold" style={{ color: 'var(--primary-brown)' }}>
                    <i className="bi bi-shield-lock me-2"></i>Admin Panel
                </h3>
                <p className="text-muted small">Manage users and products</p>
            </div>

            {/* Tab Navigation */}
            <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
                        onClick={() => setActiveTab('users')}
                        style={activeTab === 'users' ? { color: 'var(--primary-brown)', fontWeight: 'bold', borderColor: 'var(--accent-orange) var(--accent-orange) #fff' } : { color: '#6c757d' }}
                    >
                        <i className="bi bi-people me-1"></i> Users
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'products' ? 'active' : ''}`}
                        onClick={() => setActiveTab('products')}
                        style={activeTab === 'products' ? { color: 'var(--primary-brown)', fontWeight: 'bold', borderColor: 'var(--accent-orange) var(--accent-orange) #fff' } : { color: '#6c757d' }}
                    >
                        <i className="bi bi-box-seam me-1"></i> Products
                    </button>
                </li>
            </ul>

            {message && (
                <div className="alert alert-info alert-dismissible fade show py-2" role="alert">
                    {message}
                    <button type="button" className="btn-close" onClick={() => setMessage('')}></button>
                </div>
            )}

            {isLoading ? (
                <div className="text-center py-5">
                    <div className="spinner-border" style={{ color: 'var(--accent-orange)' }} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <>
                    {/* ── Users Tab ── */}
                    {activeTab === 'users' && (
                        <div className="table-responsive">
                            <table className="table table-hover align-middle">
                                <thead style={{ backgroundColor: 'var(--primary-brown)', color: '#fff' }}>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(u => (
                                        <tr key={u.id}>
                                            <td>{u.id}</td>
                                            <td>{u.firstName} {u.lastName}</td>
                                            <td>{u.email}</td>
                                            <td>
                                                <span className={`badge ${u.role === 'ADMIN' ? 'bg-danger' : 'bg-success'}`}>
                                                    {u.role}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    {users.length === 0 && (
                                        <tr><td colSpan="4" className="text-center text-muted py-4">No users found.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* ── Products Tab ── */}
                    {activeTab === 'products' && (
                        <>
                            <div className="d-flex justify-content-end mb-3">
                                <button
                                    className="btn btn-sm shadow-sm"
                                    style={{ backgroundColor: 'var(--accent-orange)', color: '#fff', borderRadius: '50px', padding: '8px 20px', fontWeight: 'bold' }}
                                    onClick={() => { resetProductForm(); setShowProductForm(true); }}
                                >
                                    <i className="bi bi-plus-lg me-1"></i> Add Product
                                </button>
                            </div>

                            {/* Product Form */}
                            {showProductForm && (
                                <div className="card mb-4 border-0 shadow-sm">
                                    <div className="card-body">
                                        <h5 className="fw-bold mb-3" style={{ color: 'var(--primary-brown)' }}>
                                            {editingProduct ? 'Edit Product' : 'Add New Product'}
                                        </h5>
                                        <form onSubmit={handleProductSubmit}>
                                            <div className="row g-3">
                                                <div className="col-md-6">
                                                    <label className="form-label small fw-bold">Name</label>
                                                    <input type="text" className="form-control" value={productForm.name}
                                                        onChange={e => setProductForm(p => ({ ...p, name: e.target.value }))} required />
                                                </div>
                                                <div className="col-md-3">
                                                    <label className="form-label small fw-bold">Price (₱)</label>
                                                    <input type="number" step="0.01" className="form-control" value={productForm.price}
                                                        onChange={e => setProductForm(p => ({ ...p, price: e.target.value }))} required />
                                                </div>
                                                <div className="col-md-3">
                                                    <label className="form-label small fw-bold">Category</label>
                                                    <select className="form-select" value={productForm.category}
                                                        onChange={e => setProductForm(p => ({ ...p, category: e.target.value }))}>
                                                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                                    </select>
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label small fw-bold">Description</label>
                                                    <input type="text" className="form-control" value={productForm.description}
                                                        onChange={e => setProductForm(p => ({ ...p, description: e.target.value }))} />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label small fw-bold">Image URL</label>
                                                    <input type="text" className="form-control" value={productForm.imageUrl}
                                                        onChange={e => setProductForm(p => ({ ...p, imageUrl: e.target.value }))} />
                                                </div>
                                            </div>
                                            <div className="mt-3 d-flex gap-2">
                                                <button type="submit" className="btn btn-sm"
                                                    style={{ backgroundColor: 'var(--accent-orange)', color: '#fff', borderRadius: '50px', padding: '8px 24px', fontWeight: 'bold' }}>
                                                    {editingProduct ? 'Update' : 'Create'}
                                                </button>
                                                <button type="button" className="btn btn-sm btn-outline-secondary" style={{ borderRadius: '50px', padding: '8px 24px' }}
                                                    onClick={resetProductForm}>Cancel</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}

                            {/* Products Table */}
                            <div className="table-responsive">
                                <table className="table table-hover align-middle">
                                    <thead style={{ backgroundColor: 'var(--primary-brown)', color: '#fff' }}>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Category</th>
                                            <th>Price</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map(p => (
                                            <tr key={p.id}>
                                                <td>{p.id}</td>
                                                <td>{p.name}</td>
                                                <td><span className="badge bg-secondary">{p.category}</span></td>
                                                <td style={{ color: 'var(--accent-orange)', fontWeight: 'bold' }}>₱{p.price?.toFixed(2)}</td>
                                                <td>
                                                    <button className="btn btn-sm btn-outline-primary me-1" onClick={() => handleEditProduct(p)}>
                                                        <i className="bi bi-pencil"></i>
                                                    </button>
                                                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteProduct(p.id)}>
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {products.length === 0 && (
                                            <tr><td colSpan="5" className="text-center text-muted py-4">No products found.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default AdminPanel;
