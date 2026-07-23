// src/app/page.js
'use client';

import { FaInstagram, FaPhone, FaTaxi, FaMapMarkerAlt, FaTimes, FaStar } from 'react-icons/fa';
import { useState, useEffect } from 'react';

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

  const menuItems = [
    // Основные блюда
    { id: 1, name: 'Стейк Рибай', category: 'Основные блюда', description: 'Мраморная говядина с розмарином и сливочным маслом', price: '45 000', image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300&fit=crop' },
    { id: 2, name: 'Лосось на гриле', category: 'Основные блюда', description: 'Свежий лосось с лимоном и зеленью', price: '38 000', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop' },
    { id: 3, name: 'Курица с овощами', category: 'Основные блюда', description: 'Запеченная курица с сезонными овощами', price: '32 000', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&h=300&fit=crop' },
    { id: 4, name: 'Паста Карбонара', category: 'Основные блюда', description: 'Классическая паста с беконом и пармезаном', price: '28 000', image: 'https://images.unsplash.com/photo-1645112411342-4665a10ca6c7?w=400&h=300&fit=crop' },
    { id: 5, name: 'Бургер с говядиной', category: 'Основные блюда', description: 'Сочный бургер с говяжьей котлетой', price: '25 000', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop' },
    { id: 6, name: 'Рис с морепродуктами', category: 'Основные блюда', description: 'Ароматный рис с креветками и мидиями', price: '35 000', image: 'https://images.unsplash.com/photo-1569058242567-32b9cf1b9c0e?w=400&h=300&fit=crop' },
    
    // Салаты
    { id: 7, name: 'Цезарь с курицей', category: 'Салаты', description: 'Классический цезарь с пармезаном и сухариками', price: '22 000', image: 'https://images.unsplash.com/photo-1550304943-4f24f54dd0df?w=400&h=300&fit=crop' },
    { id: 8, name: 'Греческий салат', category: 'Салаты', description: 'Свежие овощи с фетой и оливками', price: '18 000', image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop' },
    { id: 9, name: 'Салат с тунцом', category: 'Салаты', description: 'Свежий салат с тунцом и яйцом', price: '24 000', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop' },
    { id: 10, name: 'Оливье', category: 'Салаты', description: 'Классический оливье с курицей', price: '16 000', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop' },
    { id: 11, name: 'Салат с креветками', category: 'Салаты', description: 'Салат с тигровыми креветками и авокадо', price: '26 000', image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?w=400&h=300&fit=crop' },
    { id: 12, name: 'Капрезе', category: 'Салаты', description: 'Томаты с моцареллой и базиликом', price: '20 000', image: 'https://images.unsplash.com/photo-1604754742629-3e5728249d73?w=400&h=300&fit=crop' },
    
    // Десерты
    { id: 13, name: 'Тирамису', category: 'Десерты', description: 'Классический итальянский десерт с маскарпоне', price: '15 000', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop' },
    { id: 14, name: 'Чизкейк', category: 'Десерты', description: 'Нежный чизкейк с ягодным соусом', price: '14 000', image: 'https://images.unsplash.com/photo-1524351199672-db9d0b9f7da7?w=400&h=300&fit=crop' },
    { id: 15, name: 'Брауни с мороженым', category: 'Десерты', description: 'Горячий брауни с ванильным мороженым', price: '16 000', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop' },
    { id: 16, name: 'Наполеон', category: 'Десерты', description: 'Классический наполеон с заварным кремом', price: '13 000', image: 'https://images.unsplash.com/photo-1578985545063-69928b1d9587?w=400&h=300&fit=crop' },
    { id: 17, name: 'Панна Котта', category: 'Десерты', description: 'Нежный панна котта с ягодным соусом', price: '12 000', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291779?w=400&h=300&fit=crop' },
    { id: 18, name: 'Фруктовый салат', category: 'Десерты', description: 'Сезонные фрукты с йогуртом', price: '11 000', image: 'https://images.unsplash.com/photo-1544891509-cf3bf0c6b236?w=400&h=300&fit=crop' },
  ];

  const categories = ['Основные блюда', 'Салаты', 'Десерты'];

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
                  <img src={item.image} alt={item.name} className="menu-card-image" />
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
            <img src={selectedItem.image} alt={selectedItem.name} className="modal-image" />
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