import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, ArrowRight, Layers, SlidersHorizontal } from 'lucide-react';
import { categories } from '../data/productsData';
import { getProducts } from '../services/productService';
import ProductImage from '../components/ProductImage';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [products, setProducts] = useState([]);

  // Read URL query parameter if present
  useEffect(() => {
    const catParam = searchParams.get('category');
    if (catParam) {
      setActiveCategory(catParam);
    } else {
      setActiveCategory('all');
    }
  }, [searchParams]);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(error => {
        console.error("Failed to load products:", error);
      });
  }, []);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
  };

  // Filter products based on active category and search query
  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.categoryId === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Page Header */}
      <section className="bg-kp-blue-900 text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#4da6d9_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 text-left space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">Our Product Catalog</h1>
          <p className="text-sm sm:text-base md:text-lg text-kp-blue-100 max-w-2xl font-light leading-relaxed">
            Discover our comprehensive suite of industrial bulk bags, technical textiles, geomembranes, high-tenacity yarns, and custom protection tarpaulins.
          </p>
        </div>
      </section>

      {/* Main Interactive Catalog Section */}
      <section className="py-12 bg-slate-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Sidebar Filter (Responsive) */}
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-white border-y sm:border border-kp-blue-100 p-4 sm:p-6 sm:rounded-2xl shadow-sm -mx-4 sm:mx-0">
                <div className="flex items-center gap-2 border-b border-kp-blue-100 pb-3 mb-4 hidden lg:flex">
                  <SlidersHorizontal className="w-4 h-4 text-kp-blue-600" />
                  <h3 className="font-bold text-kp-blue-900 text-sm uppercase tracking-wider">Product Filter</h3>
                </div>

                <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto admin-scrollbar pb-2 lg:pb-0 px-4 sm:px-0 -mx-4 sm:mx-0">
                  <button 
                    onClick={() => handleCategoryChange('all')}
                    className={`shrink-0 lg:w-full text-left py-2 px-4 lg:px-3 rounded-full lg:rounded-lg text-xs font-semibold transition-all border lg:border-transparent ${activeCategory === 'all' ? 'bg-kp-blue-600 text-white border-kp-blue-600 shadow-sm' : 'bg-white lg:bg-transparent border-slate-200 text-slate-600 hover:bg-kp-blue-50/50 hover:text-kp-blue-600'}`}
                  >
                    All Categories ({products.length})
                  </button>
                  
                  {categories.map((cat) => {
                    const count = products.filter(p => p.categoryId === cat.id).length;
                    return (
                      <button 
                        key={cat.id}
                        onClick={() => handleCategoryChange(cat.id)}
                        className={`shrink-0 lg:w-full text-left py-2 px-4 lg:px-3 rounded-full lg:rounded-lg text-xs font-semibold transition-all flex justify-between items-center gap-2 border lg:border-transparent ${activeCategory === cat.id ? 'bg-kp-blue-600 text-white border-kp-blue-600 shadow-sm' : 'bg-white lg:bg-transparent border-slate-200 text-slate-600 hover:bg-kp-blue-50/50 hover:text-kp-blue-600'}`}
                      >
                        <span className="truncate">{cat.name}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeCategory === cat.id ? 'bg-white/20 text-white' : 'bg-slate-100 lg:bg-kp-blue-50 text-slate-600 lg:text-kp-blue-600'}`}>{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Product Grid */}
            <div className="lg:col-span-9 space-y-6">
              
              {/* Search Bar */}
              <div className="bg-white border border-kp-blue-100 p-4 rounded-2xl shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative w-full max-w-md">
                  <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text" 
                    placeholder="Search products by name or spec..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 focus:border-kp-blue-600 rounded-xl focus:outline-none transition-colors"
                  />
                </div>
                <div className="text-xs font-semibold text-slate-500 shrink-0">
                  Showing {filteredProducts.length} of {products.length} products
                </div>
              </div>

              {/* Products Cards Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <Link
                      key={product.slug}
                      to={`/product/${product.slug}`}
                      className="
                          group
                          bg-white
                          border
                          border-kp-blue-100
                          rounded-2xl
                          p-5
                          flex
                          flex-col
                          justify-between
                          hover:shadow-xl
                          hover:-translate-y-1
                          transition-all
                          duration-300
                          text-left
                      "
                    >
                      <div className="space-y-4">
                        {/* Custom Graphic Placeholder for Products */}
                        <div className="w-full h-32 rounded-xl bg-kp-blue-50/70 flex items-center justify-center border border-kp-blue-50 overflow-hidden relative group-hover:bg-kp-blue-50 transition-colors">
                          <ProductImage src={product.image} alt={product.name} className="w-16 h-16 group-hover:scale-110 transition-transform duration-300" />
                          <div className="absolute top-2 right-2 bg-kp-blue-900/10 text-kp-blue-900 text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                            {product.categoryName.split(' ')[0]}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-bold text-kp-blue-900 text-base leading-tight group-hover:text-kp-blue-600 transition-colors line-clamp-1">
                            {product.name}
                          </h4>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mt-1">
                            {product.categoryName}
                          </span>
                          <p className="text-xs text-slate-500 leading-relaxed font-light mt-3 line-clamp-3">
                            {product.description}
                          </p>
                        </div>
                      </div>
                      <div className="pt-4 mt-4 border-t border-slate-100">

                          <span className="inline-flex items-center gap-2 text-kp-blue-600 font-semibold text-sm">

                              View Product

                              <ArrowRight
                                  className="
                                      w-4
                                      h-4
                                      group-hover:translate-x-1
                                      transition-transform
                                  "
                              />

                          </span>

                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-kp-blue-100 rounded-2xl p-12 text-center text-slate-500">
                  <p className="text-sm">No products found matching your filter criteria.</p>
                  <button 
                    onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                    className="mt-4 bg-kp-blue-600 hover:bg-kp-blue-700 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              )}

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
