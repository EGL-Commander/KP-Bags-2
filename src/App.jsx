import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Quality from './pages/Quality';
import Infrastructure from './pages/Infrastructure';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/quality" element={<Quality />} />
            <Route path="/infrastructure" element={<Infrastructure />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} /> {/* Fallback route */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
