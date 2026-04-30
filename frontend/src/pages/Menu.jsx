import React, { useEffect, useState } from 'react';
import axios from 'axios';
import sfcImg from '../assets/img/sfc.png';
import habhabImg from '../assets/img/habhab.jpg';
import logoImg from '../assets/img/duyanan_logo.png';
import { useCart } from '../context/CartContext';
import Swal from 'sweetalert2';

const API_URL = import.meta.env.VITE_API_URL;

const Menu = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { addToCart } = useCart();
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = ['All', 'Appetizers', 'Set Meal', 'Party Meal', 'Kids Meal', 'Drinks'];

    useEffect(() => {
        axios.get(`${API_URL}/api/products`)
            .then(response => {
                const updatedProducts = response.data.map(p => {
                    let finalImg = p.imageUrl;
                    if (p.name === 'Sizzling Fried Chicken' || p.name === 'Chicken Inasal') {
                        finalImg = sfcImg;
                    } else if (p.name === 'Pancit Habhab') {
                        finalImg = habhabImg;
                    }
                    return { ...p, imageUrl: finalImg };
                });
                setProducts(updatedProducts);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setProducts([
                    { id: 1, name: 'Sizzling Fried Chicken', price: 109.00, description: 'Solo | Ala Carte', imageUrl: sfcImg, category: 'Set Meal' },
                    { id: 2, name: 'Pancit Habhab', price: 250.00, description: 'Ala Carte', imageUrl: habhabImg, category: 'Party Meal' },
                    { id: 3, name: 'Lumpiang Turon', price: 50.00, description: '10pcs', imageUrl: 'https://placehold.co/300x200/brown/white?text=Turon', category: 'Appetizers' },
                    { id: 4, name: 'Chicken Inasal', price: 120.00, description: 'Solo | Ala Carte', imageUrl: sfcImg, category: 'Set Meal' },
                ]);
            })
            .finally(() => setIsLoading(false));
    }, []);

    // Filter products by search query first
    const searchedProducts = products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Group products by category
    const productsByCategory = categories.slice(1).reduce((acc, category) => {
        acc[category] = searchedProducts.filter(p => p.category === category);
        return acc;
    }, {});

    const scrollToCategory = (categoryName) => {
        setActiveCategory(categoryName);
        if (categoryName === 'All') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        
        const element = document.getElementById(`category-${categoryName}`);
        if (element) {
            // Adjust offset for the sticky headers
            const y = element.getBoundingClientRect().top + window.scrollY - 180;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <div className="container-fluid px-0" style={{ minHeight: '100vh', paddingTop: 'var(--nav-height)', paddingBottom: '40px' }}>
            {/* Sticky category nav bar */}
            <div className="sticky-top bg-white pt-4 pb-3 px-4 shadow-sm z-3" style={{ top: 'var(--nav-height)' }}>
                <h2 className="mb-3" style={{ color: 'var(--primary-brown)', fontWeight: 'bold' }}>Duyanan Menu</h2>
                
                <div className="d-flex align-items-center flex-wrap flex-md-nowrap gap-3">
                    {/* Search Bar */}
                    <div className="position-relative" style={{ minWidth: '250px' }}>
                        <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                        <input 
                            type="text" 
                            className="form-control rounded-pill ps-5" 
                            placeholder="Search Menu" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ border: '1px solid #ccc', boxShadow: 'none' }}
                        />
                    </div>

                    {/* Horizontal Scroller for Categories */}
                    <div className="flex-grow-1 overflow-x-auto no-scrollbar d-flex align-items-center gap-2" style={{ whiteSpace: 'nowrap' }}>
                        <button 
                            className="btn rounded-pill border-0 fw-bold px-4 py-2"
                            onClick={() => scrollToCategory('All')}
                            style={{ 
                                backgroundColor: activeCategory === 'All' ? 'var(--accent-orange)' : 'transparent', 
                                color: activeCategory === 'All' ? '#fff' : '#6c757d', 
                            }}
                        >
                            All
                        </button>
                        {categories.slice(1).map(cat => (
                            <button 
                                key={cat}
                                className="btn rounded-pill border-0 fw-bold px-4 py-2"
                                onClick={() => scrollToCategory(cat)}
                                style={{ 
                                    backgroundColor: activeCategory === cat ? 'var(--accent-orange)' : 'transparent', 
                                    color: activeCategory === cat ? '#fff' : '#6c757d', 
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content Areas */}
            <div className="px-4 mt-4">
                {isLoading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border" style={{ color: 'var(--accent-orange)', width: '3rem', height: '3rem' }} role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3 text-muted">Loading menu...</p>
                    </div>
                ) : (
                    <>
                {categories.slice(1).map(category => {
                    const categoryProducts = productsByCategory[category] || [];
                    
                    // Only render the section if there are actual products in this category
                    // or if there's an active search that matches nothing, we handle that elsewhere
                    if (categoryProducts.length === 0 && searchQuery === '') return null;

                    return (
                        <div key={category} id={`category-${category}`} className="mb-5 pt-2">
                            <h3 className="mb-4 pb-2" style={{ color: 'var(--primary-brown)', fontWeight: 'bold', borderBottom: '2px solid rgba(160, 64, 0, 0.1)' }}>
                                {category}
                            </h3>
                            
                            {categoryProducts.length > 0 ? (
                                <div className="row g-4">
                                    {categoryProducts.map(product => (
                                        <div className="col-md-6 col-lg-4 col-xl-3" key={product.id}>
                                            <div className="card h-100 border-0 frosted-card">
                                                <img 
                                                    src={product.imageUrl || 'https://placehold.co/300x200?text=No+Image'} 
                                                    className="card-img-top" 
                                                    alt={product.name} 
                                                    style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
                                                />
                                                <div className="card-body text-center d-flex flex-column">
                                                    <h5 className="card-title mb-1" style={{ color: 'var(--primary-brown)', fontWeight: 'bold', fontSize: '1.1rem' }}>{product.name}</h5>
                                                    <p className="card-text text-muted small mb-2">{product.description}</p>
                                                    <div className="mt-auto">
                                                        <p className="card-text mb-2">
                                                            <span style={{ color: 'var(--accent-orange)', fontWeight: 'bold', fontSize: '1.2rem' }}>
                                                                {typeof product.price === 'number' ? `₱${product.price.toFixed(2)}` : product.price}
                                                            </span>
                                                        </p>
                                                        <button 
                                                            className="btn-outline-brand w-100" 
                                                            style={{ fontSize: '0.9rem', padding: '8px 0' }}
                                                            onClick={() => {
                                                                addToCart(product);
                                                                Swal.fire({
                                                                    toast: true,
                                                                    position: 'bottom-end',
                                                                    icon: 'success',
                                                                    title: 'Added to cart',
                                                                    text: `${product.name} has been added.`,
                                                                    showConfirmButton: false,
                                                                    timer: 2500,
                                                                    timerProgressBar: true
                                                                });
                                                            }}
                                                        >
                                                            Add to cart
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted">No products match your search in this category.</p>
                            )}
                        </div>
                    );
                })}

                    {searchedProducts.length === 0 && searchQuery !== '' && (
                        <div className="text-center py-5">
                            <i className="bi bi-search" style={{ fontSize: '3rem', color: '#ccc' }}></i>
                            <h4 className="mt-3 text-muted">No results found for "{searchQuery}"</h4>
                            <p className="text-muted">Try adjusting your search term.</p>
                        </div>
                    )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Menu;
