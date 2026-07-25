import React, { useEffect, useState } from 'react';
import { getInquiries, updateInquiry, deleteInquiry } from '../../services/adminService';
import { Search, Filter, Trash2, Edit3, X, Save, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function Inquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper functions to parse SQLite UTC string to IST
  const formatTime = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr.endsWith('Z') ? dateStr : dateStr + 'Z');
    return d.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' });
  };
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr.endsWith('Z') ? dateStr : dateStr + 'Z');
    return d.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', year: 'numeric', month: 'short', day: 'numeric' });
  };
  const formatFullDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr.endsWith('Z') ? dateStr : dateStr + 'Z');
    return d.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Modal state
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    fetchInquiries();
  }, [page, statusFilter, search]);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const data = await getInquiries({ page, limit: 10, search, status: statusFilter });
      setInquiries(data.inquiries);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Failed to fetch inquiries", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      try {
        await deleteInquiry(id);
        fetchInquiries();
      } catch (error) {
        alert("Failed to delete inquiry");
      }
    }
  };

  const openModal = (inquiry) => {
    setSelectedInquiry(inquiry);
    setAdminNotes(inquiry.admin_notes || '');
    setNewStatus(inquiry.status);
  };

  const closeModal = () => {
    setSelectedInquiry(null);
  };

  const handleUpdate = async () => {
    try {
      await updateInquiry(selectedInquiry.id, { status: newStatus, admin_notes: adminNotes });
      closeModal();
      fetchInquiries();
    } catch (error) {
      alert("Failed to update inquiry");
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'new': return <span className="px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/20 flex items-center w-max"><AlertCircle className="w-3 h-3 mr-1"/> New</span>;
      case 'in progress': return <span className="px-2 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-semibold border border-amber-500/20 flex items-center w-max"><Clock className="w-3 h-3 mr-1"/> In Progress</span>;
      case 'resolved': return <span className="px-2 py-1 rounded-full bg-slate-500/20 text-slate-400 text-xs font-semibold border border-slate-500/20 flex items-center w-max"><CheckCircle className="w-3 h-3 mr-1"/> Resolved</span>;
      default: return <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-semibold border border-blue-500/20 w-max">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Client Inquiries</h1>
          <p className="text-slate-400 mt-1">Manage and track product inquiries from customers.</p>
        </div>
        
        <div className="flex w-full md:w-auto gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search by name, email..." 
              className="admin-input w-full pl-10 pr-4 py-2 rounded-lg text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchInquiries()}
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <select 
              className="admin-input pl-10 pr-8 py-2 rounded-lg text-sm appearance-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="in progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      <div className="admin-glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/50 border-b border-slate-700/50">
                <th className="px-6 py-4 text-sm font-semibold text-slate-300">Client</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-300">Product</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-300">Date</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-300">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-300 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="5" className="text-center py-8 text-slate-400">Loading inquiries...</td></tr>
              ) : inquiries.length === 0 ? (
                <tr><td colSpan="5" className="text-center py-8 text-slate-400">No inquiries found.</td></tr>
              ) : (
                inquiries.map((inq) => (
                  <tr key={inq.id} className="border-b border-slate-700/50 admin-table-row">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{inq.name}</div>
                      <div className="text-sm text-slate-400">{inq.email}</div>
                      {inq.company && <div className="text-xs text-slate-500 mt-1">{inq.company}</div>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-300 font-medium">{inq.product_slug}</div>
                      <div className="text-xs text-slate-500 mt-1">Qty: {inq.quantity || 'Not specified'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-300 font-medium">
                        {formatDate(inq.created_at)}
                      </div>
                      <div className="text-xs text-slate-500 mt-1 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatTime(inq.created_at)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(inq.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => openModal(inq)}
                          className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors"
                          title="View & Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(inq.id)}
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
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-700/50 bg-slate-800/30">
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 text-sm text-slate-300 bg-slate-800 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-slate-400">Page {page} of {totalPages}</span>
            <button 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 text-sm text-slate-300 bg-slate-800 rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm admin-animate-fade">
          <div className="bg-slate-800 rounded-2xl w-full max-w-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-slate-700 bg-slate-800/50">
              <h3 className="text-xl font-bold text-white">Inquiry Details</h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto admin-scrollbar flex-1 space-y-6">
              {/* Client Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-700/50">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Client Name</p>
                  <p className="text-slate-200 font-medium">{selectedInquiry.name}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-700/50">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Company</p>
                  <p className="text-slate-200 font-medium">{selectedInquiry.company || 'N/A'}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-700/50">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Email</p>
                  <a href={`mailto:${selectedInquiry.email}`} className="text-blue-400 hover:underline">{selectedInquiry.email}</a>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-700/50">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Phone</p>
                  <p className="text-slate-200">{selectedInquiry.phone}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-700/50 col-span-2">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Date & Time Received</p>
                  <p className="text-slate-200">{formatFullDate(selectedInquiry.created_at)}</p>
                </div>
              </div>

              {/* Request Info */}
              <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-700/50">
                <div className="flex justify-between mb-4 pb-4 border-b border-slate-700/50">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Product Requested</p>
                    <p className="text-blue-400 font-medium">{selectedInquiry.product_slug}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Quantity</p>
                    <p className="text-slate-200 font-medium">{selectedInquiry.quantity || 'Not specified'}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Message/Requirements</p>
                  <p className="text-slate-300 whitespace-pre-wrap text-sm leading-relaxed">{selectedInquiry.message}</p>
                </div>
              </div>

              {/* Admin Controls */}
              <div className="p-5 rounded-xl bg-blue-900/10 border border-blue-500/20 space-y-4">
                <h4 className="text-sm font-bold text-blue-400 flex items-center uppercase tracking-wider">
                  Admin Controls
                </h4>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Status</label>
                  <select 
                    className="admin-input w-full p-3 rounded-lg"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                  >
                    <option value="new">New</option>
                    <option value="in progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Internal Notes (Not visible to client)</label>
                  <textarea 
                    className="admin-input w-full p-3 rounded-lg h-24 resize-none"
                    placeholder="Add notes about this inquiry..."
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-slate-700 bg-slate-800/50 flex justify-end gap-3">
              <button 
                onClick={closeModal}
                className="px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center transition-colors shadow-lg shadow-blue-500/20"
              >
                <Save className="w-4 h-4 mr-2" /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
