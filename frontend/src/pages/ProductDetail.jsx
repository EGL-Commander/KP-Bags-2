import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, CheckCircle2, ChevronRight, Layers, FileSpreadsheet, X, ZoomIn } from 'lucide-react';
import { getProduct, submitInquiry } from '../services/productService';
import ProductImage from '../components/ProductImage';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Keyboard support: Esc to close
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isLightboxOpen]);
  
  // Inquiry Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    quantity: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Find product by slug
  useEffect(() => {
    getProduct(slug).then(foundProduct => {
      if (foundProduct) {
        setProduct(foundProduct);

        setFormData(prev => ({
          ...prev,
          message: `Hello, I am interested in your ${foundProduct.name}. Please send me the technical drawings, specifications sheet, and B2B wholesale pricing parameters.`
        }));
      } else {
        setProduct(null);
      }

      setIsSubmitted(false);
      setErrorMsg('');
    });
  }, [slug]);

  // IMPORTANT: this must come before any code using product.categoryId
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-6">
        <h2 className="text-2xl font-bold text-kp-blue-900">
          Product Not Found
        </h2>

        <p className="text-slate-500 max-w-md mx-auto">
          We couldn't find the product page you are looking for.
        </p>

        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-kp-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </Link>
      </div>
    );
  }


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const {
      name,
      email,
      phone,
      company,
      quantity,
      message
    } = formData;

    if (!name.trim() || name.trim().length < 2) {
      setErrorMsg('Please enter a valid name (min 2 characters).');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(phone.trim())) {
      setErrorMsg('Please enter a valid phone number (min 10 digits).');
      return;
    }
    if (!message.trim() || message.trim().length < 10) {
      setErrorMsg('Please enter a detailed message (min 10 characters).');
      return;
    }

    // 1. Compile message content for WhatsApp
    const messageText = `*New Product Inquiry - KP BIG BAGS*\n\n` +
                        `*Product:* ${product.name} (${product.slug})\n` +
                        `*Name:* ${name}\n` +
                        `*Email:* ${email}\n` +
                        `*Phone:* ${phone}\n` +
                        `*Company:* ${company || 'N/A'}\n` +
                        `*Qty Required:* ${quantity || 'N/A'}\n` +
                        `*Message:* ${message}`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=918840575264&text=${encodeURIComponent(messageText)}`;

    // 2. Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');

    // 3. Send to Database + SMTP in background (fail-safe)
    submitInquiry({
      productSlug: product.slug,
      name,
      email,
      phone,
      company,
      quantity,
      message
    }).catch(err => {
      console.warn("Backend inquiry submission notice:", err);
    });

    // 4. Reset form data to fresh state & show success confirmation
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      quantity: '',
      message: `Hello, I am interested in your ${product.name}. Please send me the technical drawings, specifications sheet, and B2B wholesale pricing parameters.`
    });
    setIsSubmitted(true);
    setErrorMsg('');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* Breadcrumb Header */}
      <section className="bg-kp-blue-50 border-b border-kp-blue-100 py-6 px-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm font-semibold text-slate-500">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Link to="/" className="hover:text-kp-blue-600 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link to="/products" className="hover:text-kp-blue-600 transition-colors">Products</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link to={`/products?category=${product.categoryId}`} className="hover:text-kp-blue-600 transition-colors truncate max-w-[120px] sm:max-w-none">
              {product.categoryName}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-kp-blue-900 truncate max-w-[150px] sm:max-w-none">{product.name}</span>
          </div>
          
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-1 text-kp-blue-600 hover:text-kp-blue-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </div>
      </section>

      {/* Main Info Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Product Header */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-kp-blue-600 uppercase tracking-widest bg-kp-blue-100/50 px-2.5 py-1 rounded">
                  {product.categoryName}
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-kp-blue-900 leading-tight">
                  {product.name}
                </h1>
              </div>

              {/* Product Graphic Representation */}
              <div 
                className="w-full h-64 sm:h-80 bg-kp-blue-50 border border-kp-blue-100 rounded-2xl flex items-center justify-center relative overflow-hidden cursor-pointer group"
                onClick={() => setIsLightboxOpen(true)}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-kp-blue-100/30 rounded-full blur-xl" />
                <ProductImage src={product.image} alt={product.name} className="w-32 h-32 group-hover:scale-110 transition-transform duration-500 relative z-10" />
                <div className="absolute inset-0 bg-kp-blue-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                  <div className="bg-white/90 text-kp-blue-900 px-4 py-2 rounded-full flex items-center gap-2 font-bold text-xs shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <ZoomIn className="w-4 h-4" /> View Full Image
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-kp-blue-900 text-white text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider z-10">
                  Industrial Grade Polypropylene
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-kp-blue-900 border-b border-kp-blue-100 pb-2">
                  Product Overview
                </h3>
                <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Technical Specifications */}
              {product.specifications && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-kp-blue-900 border-b border-kp-blue-100 pb-2 flex items-center gap-2">
                    <FileSpreadsheet className="w-5 h-5 text-kp-blue-600" />
                    <span>Technical Specifications</span>
                  </h3>
                  
                  <div className="border border-slate-100 rounded-xl overflow-x-auto shadow-sm admin-scrollbar">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm whitespace-nowrap sm:whitespace-normal">
                      <thead>
                        <tr className="bg-kp-blue-50 text-kp-blue-900 font-bold border-b border-kp-blue-100">
                          <th className="p-3 sm:p-4 w-1/3">Parameter</th>
                          <th className="p-3 sm:p-4">Standard Detail</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-600">
                        {Object.entries(product.specifications).map(([key, val], index) => (
                          <tr 
                            key={key} 
                            className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${index % 2 === 1 ? 'bg-slate-50/20' : ''}`}
                          >
                            <td className="p-3 sm:p-4 font-semibold text-kp-blue-950">{key}</td>
                            <td className="p-3 sm:p-4 font-light leading-normal">{val}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Product Applications */}
              {product.applications && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-kp-blue-900 border-b border-kp-blue-100 pb-2">
                    Key Applications / Industry Uses
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.applications.map((app, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 bg-slate-50/40 p-3 rounded-lg border border-slate-100/60 font-light">
                        <span className="text-kp-blue-600 font-bold mr-1">•</span>
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>

            {/* Right B2B Inquiry Form Column */}
            <div className="lg:col-span-5">
              <div className="bg-slate-50 border border-kp-blue-100 p-6 sm:p-8 rounded-2xl shadow-inner sticky top-24">
                <div className="border-b border-kp-blue-100 pb-4 mb-6">
                  <span className="text-[10px] text-kp-blue-600 font-extrabold uppercase tracking-widest block mb-1">Request Wholesale Pricing</span>
                  <h3 className="text-lg font-bold text-kp-blue-900">B2B Trade Inquiry</h3>
                </div>

                {isSubmitted ? (
                  <div className="bg-white border border-green-100 p-6 rounded-xl text-center space-y-4 shadow-sm animate-scale-up">
                    <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
                    <h4 className="font-bold text-slate-800 text-lg">Inquiry Received</h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-light">
                      Thank you for contacting KP BIG BAGS. A B2B technical representative will contact you within 24 hours with product blueprints and customized wholesale price parameters.
                    </p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="mt-2 bg-kp-blue-600 hover:bg-kp-blue-700 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4 text-xs sm:text-sm">
                    {errorMsg && (
                      <div className="bg-red-50 text-red-600 p-3 rounded-lg font-semibold text-xs border border-red-100">
                        {errorMsg}
                      </div>
                    )}
                    
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 block">Your Name <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        name="name" 
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white border border-slate-200 focus:border-kp-blue-600 rounded-lg p-2.5 focus:outline-none transition-colors"
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-700 block">Work Email <span className="text-red-500">*</span></label>
                        <input 
                          type="email" 
                          name="email" 
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-white border border-slate-200 focus:border-kp-blue-600 rounded-lg p-2.5 focus:outline-none transition-colors"
                          placeholder="name@company.com"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-700 block">Phone Number <span className="text-red-500">*</span></label>
                        <input 
                          type="tel" 
                          name="phone" 
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-white border border-slate-200 focus:border-kp-blue-600 rounded-lg p-2.5 focus:outline-none transition-colors"
                          placeholder="+91 99999 99999"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-700 block">Company Name</label>
                        <input 
                          type="text" 
                          name="company" 
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full bg-white border border-slate-200 focus:border-kp-blue-600 rounded-lg p-2.5 focus:outline-none transition-colors"
                          placeholder="Logistics Corp"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-700 block">Required Qty (Bags/Yards)</label>
                        <input 
                          type="text" 
                          name="quantity" 
                          value={formData.quantity}
                          onChange={handleInputChange}
                          className="w-full bg-white border border-slate-200 focus:border-kp-blue-600 rounded-lg p-2.5 focus:outline-none transition-colors"
                          placeholder="e.g. 5,000 bags"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 block">Custom Message / Requirements <span className="text-red-500">*</span></label>
                      <textarea 
                        name="message" 
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows="4"
                        className="w-full bg-white border border-slate-200 focus:border-kp-blue-600 rounded-lg p-2.5 focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="w-full flex items-center justify-center gap-2 bg-kp-blue-600 hover:bg-kp-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all duration-300 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Trade Inquiry</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 bg-black/95 flex flex-col z-[100] backdrop-blur-sm animate-fade-in select-none"
          role="dialog"
          aria-modal="true"
        >
          {/* Top Bar */}
          <div className="absolute top-0 inset-x-0 p-4 md:p-6 flex justify-between items-start z-50">
            <div className="text-white drop-shadow-md">
              <h3 className="text-xl md:text-2xl font-bold">{product.name}</h3>
              <span className="text-xs md:text-sm uppercase tracking-wider text-kp-blue-300">
                {product.categoryName}
              </span>
            </div>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="p-3 text-white bg-white/10 hover:bg-white/20 hover:text-red-400 rounded-full transition-colors backdrop-blur-md border border-white/10"
              title="Close (Esc)"
            >
              <X className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          </div>

          {/* Center Image */}
          <div 
            className="flex-1 flex items-center justify-center p-4 md:p-12 w-full h-full relative"
            onClick={() => setIsLightboxOpen(false)} 
          >
            <ProductImage
              src={product.image}
              alt={product.name}
              className="max-h-[85vh] max-w-[90vw] object-contain drop-shadow-2xl animate-fade-in"
            />
          </div>
        </div>
      )}
    </div>
  );
}
