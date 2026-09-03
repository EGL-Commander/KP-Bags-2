import React, { useEffect, useState, useRef } from 'react';
import { getGalleryItems, createGalleryItem, updateGalleryItem, deleteGalleryItem, uploadImage } from '../../services/adminService';
import { Plus, Trash2, Edit2, X, Save, Image as ImageIcon, Upload } from 'lucide-react';

export default function GalleryManager() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    type: 'bags',
    title: '',
    desc: '',
    src: '',
    alt: ''
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await getGalleryItems();
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch gallery items", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        await deleteGalleryItem(id);
        fetchItems();
      } catch (error) {
        alert("Failed to delete image");
      }
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setFormData({
        type: item.type,
        title: item.title,
        desc: item.desc,
        src: item.src,
        alt: item.alt
      });
      setEditId(item.id);
    } else {
      setFormData({
        type: 'bags',
        title: '',
        desc: '',
        src: '',
        alt: ''
      });
      setEditId(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditId(null);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const data = await uploadImage(file);
      setFormData({ ...formData, src: data.imageUrl, alt: file.name.split('.')[0] });
    } catch (error) {
      alert(error.message || "Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateGalleryItem(editId, formData);
      } else {
        await createGalleryItem(formData);
      }
      closeModal();
      fetchItems();
    } catch (error) {
      alert("Error saving gallery item.");
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Gallery Manager</h1>
          <p className="text-slate-400 mt-1">Upload and manage images for the public gallery.</p>
        </div>
        
        <button 
          onClick={() => openModal()}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center transition-colors shadow-lg shadow-blue-500/20"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Image
        </button>
      </div>

      <div className="admin-glass-card rounded-2xl overflow-hidden p-6">
        {loading ? (
          <div className="text-center py-12 text-slate-400">Loading gallery...</div>
        ) : items.length === 0 ? (
          <div className="text-center py-12 text-slate-400">No images in gallery.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <div key={item.id} className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 flex flex-col shadow-lg shadow-black/20 group">
                <div className="h-48 bg-slate-900 relative shrink-0 overflow-hidden p-2 flex items-center justify-center">
                  <img src={item.src} alt={item.alt} className="max-w-full max-h-full object-contain drop-shadow-md transition-transform group-hover:scale-105" />
                  <div className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur-md px-2 py-1 rounded-md text-[10px] text-white font-bold uppercase tracking-wider border border-white/10 shadow-sm z-10">
                    {item.type}
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between bg-slate-800 z-20 relative border-t border-slate-700/50">
                  <div className="min-h-[4rem]">
                    <h3 className="text-sm font-bold text-white line-clamp-1" title={item.title || 'Untitled'}>{item.title || 'Untitled'}</h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2" title={item.desc || 'No description'}>{item.desc || 'No description'}</p>
                  </div>
                  <div className="mt-4 flex justify-end gap-2 pt-2 border-t border-slate-700/50">
                    <button 
                      onClick={() => openModal(item)}
                      className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition-all shadow-sm"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-all shadow-sm"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm admin-animate-fade">
          <div className="bg-slate-800 rounded-2xl w-full max-w-xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-slate-700 bg-slate-800/50">
              <h3 className="text-xl font-bold text-white">{editId ? 'Edit Gallery Image' : 'Add New Gallery Image'}</h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
              <div className="p-6 overflow-y-auto admin-scrollbar flex-1 space-y-4">
                
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Image URL or Upload</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" required
                      className="admin-input w-full p-2.5 rounded-lg text-sm"
                      value={formData.src}
                      onChange={(e) => setFormData({...formData, src: e.target.value})}
                      placeholder="/images/photo.jpg"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                      className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg flex items-center transition-colors shrink-0"
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

                {formData.src && (
                  <div className="w-full h-32 rounded-lg overflow-hidden bg-slate-900 border border-slate-700">
                    <img src={formData.src} alt="Preview" className="w-full h-full object-contain" />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Title</label>
                  <input 
                    type="text" required
                    className="admin-input w-full p-2.5 rounded-lg text-sm"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="E.g. Cleanroom Sewing Lines"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Category / Type</label>
                  <select 
                    required
                    className="admin-input w-full p-2.5 rounded-lg text-sm"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                  >
                    <option value="bags">FIBC Bags</option>
                    <option value="factory">Factory Floor</option>
                    <option value="testing">Quality Testing</option>
                    <option value="shipping">Shipping & Loading</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Description</label>
                  <textarea 
                    className="admin-input w-full p-2.5 rounded-lg text-sm h-20 resize-none"
                    value={formData.desc}
                    onChange={(e) => setFormData({...formData, desc: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Alt Text (SEO)</label>
                  <input 
                    type="text" required
                    className="admin-input w-full p-2.5 rounded-lg text-sm"
                    value={formData.alt}
                    onChange={(e) => setFormData({...formData, alt: e.target.value})}
                  />
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
                  <Save className="w-4 h-4 mr-2" /> Save Image
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
