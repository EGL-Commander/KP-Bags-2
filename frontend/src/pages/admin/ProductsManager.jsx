import React, { useEffect, useState, useRef } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct, uploadImage } from '../../services/adminService';
import { Search, Plus, Trash2, Edit3, X, Save, Image as ImageIcon, Upload } from 'lucide-react';

export default function ProductsManager() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlug, setEditingSlug] = useState(null);
  const [formData, setFormData] = useState({
    slug: '',
    name: '',
    description: '',
    category_id: '',
    category_name: '',
    image: '',
    specifications: '{}',
    applications: '[]'
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(slug);
        fetchProducts();
      } catch (error) {
        alert("Failed to delete product");
      }
    }
  };

  const openModal = (product = null) => {
    if (product) {
      setEditingSlug(product.slug);
      setFormData({
        slug: product.slug,
        name: product.name,
        description: product.description || '',
        category_id: product.category_id,
        category_name: product.category_name,
        image: product.image || '',
        specifications: JSON.stringify(product.specifications || {}, null, 2),
        applications: JSON.stringify(product.applications || [], null, 2)
      });
    } else {
      setEditingSlug(null);
      setFormData({
        slug: '',
        name: '',
        description: '',
        category_id: '',
        category_name: '',
        image: '',
        specifications: '{\n  "Material": "Polypropylene"\n}',
        applications: '[\n  "Industrial packaging"\n]'
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const data = await uploadImage(file);
      setFormData({ ...formData, image: data.imageUrl });
    } catch (error) {
      alert("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Parse JSON strings
      const payload = {
        ...formData,
        specifications: JSON.parse(formData.specifications),
        applications: JSON.parse(formData.applications)
      };

      if (editingSlug) {
        await updateProduct(editingSlug, payload);
      } else {
        await createProduct(payload);
      }
      
      closeModal();
      fetchProducts();
    } catch (error) {
      alert("Error saving product. Make sure JSON fields are valid arrays/objects.");
      console.error(error);
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.category_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Products Manager</h1>
          <p className="text-slate-400 mt-1">Manage your catalog, categories, and specifications.</p>
        </div>
        
        <div className="flex w-full md:w-auto gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="admin-input w-full pl-10 pr-4 py-2 rounded-lg text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button 
            onClick={() => openModal()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center transition-colors shadow-lg shadow-blue-500/20"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Product
          </button>
        </div>
      </div>

      <div className="admin-glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/50 border-b border-slate-700/50">
                <th className="px-6 py-4 text-sm font-semibold text-slate-300 w-16">Image</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-300">Name & Slug</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-300">Category</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-300 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" className="text-center py-8 text-slate-400">Loading products...</td></tr>
              ) : filteredProducts.length === 0 ? (
                <tr><td colSpan="4" className="text-center py-8 text-slate-400">No products found.</td></tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr key={p.slug} className="border-b border-slate-700/50 admin-table-row">
                    <td className="px-6 py-4">
                      <div className="w-12 h-12 rounded bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center">
                        {p.image ? (
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="w-5 h-5 text-slate-500" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{p.name}</div>
                      <div className="text-xs text-slate-500 mt-1">{p.slug}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-full bg-slate-700 text-slate-300 text-xs font-medium">
                        {p.category_name}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => openModal(p)}
                          className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(p.slug)}
                          className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm admin-animate-fade">
          <div className="bg-slate-800 rounded-2xl w-full max-w-4xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-slate-700 bg-slate-800/50">
              <h3 className="text-xl font-bold text-white">{editingSlug ? 'Edit Product' : 'Add New Product'}</h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
              <div className="p-6 overflow-y-auto admin-scrollbar flex-1 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-2">Basic Info</h4>
                    
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Product Name</label>
                      <input 
                        type="text" required
                        className="admin-input w-full p-2.5 rounded-lg text-sm"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Slug (Unique ID)</label>
                      <input 
                        type="text" required disabled={!!editingSlug}
                        className="admin-input w-full p-2.5 rounded-lg text-sm disabled:opacity-50"
                        value={formData.slug}
                        onChange={(e) => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Image URL or Path</label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          className="admin-input w-full p-2.5 rounded-lg text-sm"
                          value={formData.image}
                          onChange={(e) => setFormData({...formData, image: e.target.value})}
                          placeholder="/images/product.jpg"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current.click()}
                          className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg flex items-center transition-colors"
                          disabled={uploading}
                        >
                          <Upload className="w-4 h-4 mr-2" /> {uploading ? '...' : 'Upload'}
                        </button>
                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          className="hidden" 
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Description</label>
                      <textarea 
                        className="admin-input w-full p-2.5 rounded-lg text-sm h-20 resize-none"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                      />
                    </div>
                  </div>

                  {/* Category Info */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-2">Category Info</h4>
                    
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Category Name</label>
                      <input 
                        type="text" required
                        className="admin-input w-full p-2.5 rounded-lg text-sm"
                        value={formData.category_name}
                        onChange={(e) => setFormData({...formData, category_name: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Category ID</label>
                      <input 
                        type="text" required
                        className="admin-input w-full p-2.5 rounded-lg text-sm"
                        value={formData.category_id}
                        onChange={(e) => setFormData({...formData, category_id: e.target.value.toLowerCase().replace(/\s+/g, '-')})}
                      />
                    </div>
                  </div>

                  {/* JSON Data */}
                  <div className="space-y-4 md:col-span-2 mt-4">
                    <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-2">Technical Data (JSON format)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Specifications (JSON Object)</label>
                        <textarea 
                          required
                          className="admin-input w-full p-3 rounded-lg text-xs font-mono h-40 resize-none bg-slate-900"
                          value={formData.specifications}
                          onChange={(e) => setFormData({...formData, specifications: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Applications (JSON Array)</label>
                        <textarea 
                          required
                          className="admin-input w-full p-3 rounded-lg text-xs font-mono h-40 resize-none bg-slate-900"
                          value={formData.applications}
                          onChange={(e) => setFormData({...formData, applications: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t border-slate-700 bg-slate-800/50 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center transition-colors shadow-lg shadow-blue-500/20"
                >
                  <Save className="w-4 h-4 mr-2" /> {editingSlug ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
