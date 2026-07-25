import React, { useEffect, useState } from 'react';
import { getDashboardStats } from '../../services/adminService';
import { Inbox, Activity, CheckCircle, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch stats", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>;
  }

  const statCards = [
    { title: 'Total Inquiries', value: stats?.totalInquiries || 0, icon: Inbox, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { title: 'New Today', value: stats?.todayCount || 0, icon: Activity, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { title: 'In Progress', value: stats?.inProgressInquiries || 0, icon: Package, color: 'text-amber-400', bg: 'bg-amber-400/10' },
    { title: 'Resolved', value: stats?.resolvedInquiries || 0, icon: CheckCircle, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-400 mt-1">Here is what's happening with your products today.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="admin-glass-card rounded-2xl p-6 flex items-center">
            <div className={`p-4 rounded-xl ${stat.bg} mr-4`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400">{stat.title}</p>
              <h3 className="text-3xl font-bold text-white mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Top Products Chart (Simple Bar) */}
        <div className="lg:col-span-2 admin-glass-card rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Inquiries by Product (Top 5)</h2>
          <div className="space-y-6">
            {stats?.productBreakdown?.map((item, index) => {
              const maxCount = stats.productBreakdown[0].count;
              const percentage = (item.count / maxCount) * 100;
              return (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-300 font-medium">{item.product_slug}</span>
                    <span className="text-white font-bold">{item.count} inquiries</span>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-cyan-400 h-3 rounded-full" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
            {(!stats?.productBreakdown || stats.productBreakdown.length === 0) && (
              <p className="text-slate-400">No inquiry data available yet.</p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="admin-glass-card rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="space-y-4">
            <Link to="/admin/inquiries?status=new" className="flex items-center p-4 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 transition-colors border border-slate-700/50">
              <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg mr-4">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-white font-medium">View New Inquiries</h4>
                <p className="text-xs text-slate-400 mt-1">Review recently submitted requests</p>
              </div>
            </Link>
            
            <Link to="/admin/products" className="flex items-center p-4 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 transition-colors border border-slate-700/50">
              <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg mr-4">
                <Package className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-white font-medium">Manage Products</h4>
                <p className="text-xs text-slate-400 mt-1">Add or update product catalog</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
