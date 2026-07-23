// src/app/page.js
'use client';

import { FaInstagram, FaPhone, FaTaxi, FaMapMarkerAlt, FaTimes, FaStar } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { menuItems, categories } from './utils/data';

export default function Home() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=400&fit=crop',
    'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&h=400&fit=crop',
    'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=1200&h=400&fit=crop'
  ];

  const latitude = "39.739602";
  const longitude = "64.198873";
  const address = "Nastarin Restaurant, Bukhara";

  const handleYandexTaxi = () => {
    const fullAddress = "Nastarin Restaurant, " + address;
    const deeplink = `yandextaxi://route/?end-lat=${latitude}&end-lon=${longitude}&end-address=${encodeURIComponent(fullAddress)}`;
    const fallbackUrl = `https://taxi.yandex.uz/?rto=${latitude},${longitude}&text=${encodeURIComponent(fullAddress)}`;

    window.location.href = deeplink;
    setTimeout(() => {
      window.location.href = fallbackUrl;
    }, 500);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <header className="header">
      <div className="header-carousel">
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide})` }}
          />
        ))}
        <div className="header-overlay">
          <div className="header-content">
            <div className="header-top">
              <div className="logo-container">
                <img src="/logo.png" alt="Nastarin" className="logo" />
                <h1 className="restaurant-name">NASTARIN</h1>
              </div>
              <div className="header-actions">
                <a href="https://www.instagram.com/nastarin_restaurant/" target="_blank" rel="noopener noreferrer" className="icon-link">
                  <FaInstagram />
                </a>
                <a href="tel:+998939614777" className="icon-link">
                  <FaPhone />
                </a>
              </div>
            </div>
            <div className="header-bottom">
              <button onClick={handleYandexTaxi} className="btn btn-yandex">
                <FaTaxi /> Яндекс Такси
              </button>
              <a href="https://www.google.com/maps/dir/?api=1&destination=39.739602,64.198873" target="_blank" rel="noopener noreferrer" className="btn btn-route">
                <FaMapMarkerAlt /> Маршрут
              </a>
            </div>
          </div>
        </div>
        <div className="carousel-dots">
          {slides.map((_, index) => (
            <span 
              key={index} 
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </header>
  );
}

function Menu() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <section className="menu-section">
      <h2 className="menu-title">Наше меню</h2>
      {categories.map((category) => (
        <div key={category} className="category">
          <h3 className="category-title">{category}</h3>
          <div className="menu-grid">
            {menuItems.filter(item => item.category === category).map((item) => (
              <div 
                key={item.id} 
                className="menu-card"
                onClick={() => openModal(item)}
              >
                <div className="menu-card-image-wrapper">
                  <img 
                    src={item.image || '/placeholder.png'} 
                    alt={item.name} 
                    className="menu-card-image" 
                  />
                </div>
                <div className="menu-card-content">
                  <h4>{item.name}</h4>
                  <p className="menu-card-price">{item.price} сум</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {isModalOpen && selectedItem && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <FaTimes />
            </button>
            <img 
              src={selectedItem.image || '/placeholder.png'} 
              alt={selectedItem.name} 
              className="modal-image" 
            />
            <h3>{selectedItem.name}</h3>
            <div className="modal-rating">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </div>
            <p className="modal-description">{selectedItem.description}</p>
            <p className="modal-price">{selectedItem.price} сум</p>
            <a href="tel:+998939614777" className="btn btn-call">
              <FaPhone /> Позвонить
            </a>
          </div>
        </div>
      )}
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>Разработано <a href="https://akbarsoft.uz" target="_blank" rel="noopener noreferrer">Akbar Soft</a> 2026</p>
    </footer>
  );
}