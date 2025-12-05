// src/pages/admin/AdminDashboard.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
import supabase from '../../lib/supabase';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalLandlords: 0,
    totalTenants: 0,
    totalApartments: 0,
    totalApplications: 0,
    totalComplaints: 0
  });
  const [users, setUsers] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    // Check if user is admin
    if (profile && profile.role !== 'admin') {
      toast.error('Access denied. Admin only.');
      navigate('/');
      return;
    }

    if (profile) {
      fetchDashboardData();
    }
  }, [profile]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch statistics
      const [usersData, landlordsData, tenantsData, apartmentsData, applicationsData, complaintsData] = await Promise.all([
        supabase.from('users').select('*', { count: 'exact' }),
        supabase.from('users').select('*', { count: 'exact' }).eq('role', 'landlord'),
        supabase.from('users').select('*', { count: 'exact' }).eq('role', 'tenant'),
        supabase.from('apartments').select('*', { count: 'exact' }),
        supabase.from('applications').select('*', { count: 'exact' }),
        supabase.from('complaints').select('*', { count: 'exact' })
      ]);

      setStats({
        totalUsers: usersData.count || 0,
        totalLandlords: landlordsData.count || 0,
        totalTenants: tenantsData.count || 0,
        totalApartments: apartmentsData.count || 0,
        totalApplications: applicationsData.count || 0,
        totalComplaints: complaintsData.count || 0
      });

      // Fetch detailed data
      setUsers(usersData.data || []);
      
      const { data: apartmentsWithLandlord } = await supabase
        .from('apartments')
        .select(`
          *,
          landlord:landlord_id (full_name, email)
        `)
        .order('created_at', { ascending: false })
        .limit(10);
      setApartments(apartmentsWithLandlord || []);

      const { data: complaintsWithUsers } = await supabase
        .from('complaints')
        .select(`
          *,
          complainant:complainant_id (full_name, email)
        `)
        .order('created_at', { ascending: false })
        .limit(10);
      setComplaints(complaintsWithUsers || []);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    toast.success('Signed out successfully');
  };

  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      const { error } = await supabase
        .from('users')
        .update({ is_active: !currentStatus })
        .eq('id', userId);

      if (error) throw error;

      toast.success(`User ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
      fetchDashboardData();
    } catch (error) {
      console.error('Error updating user status:', error);
      toast.error('Failed to update user status');
    }
  };

  const updateComplaintStatus = async (complaintId, newStatus) => {
    try {
      const { error } = await supabase
        .from('complaints')
        .update({ 
          status: newStatus,
          resolved_at: newStatus === 'resolved' ? new Date().toISOString() : null
        })
        .eq('id', complaintId);

      if (error) throw error;

      toast.success('Complaint status updated');
      fetchDashboardData();
    } catch (error) {
      console.error('Error updating complaint:', error);
      toast.error('Failed to update complaint');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background */}
      <div className="fixed inset-0 z-0" style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-black/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-4">
                <h1 className="text-xl sm:text-2xl font-bold">
                  Rent<span className="text-[#006239]">ify</span>
                </h1>
                <span className="px-3 py-1 bg-[#006239]/20 border border-[#006239] rounded-full text-xs sm:text-sm">
                  Admin
                </span>
              </div>

              <div className="flex items-center gap-2 sm:gap-4">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium">{profile?.full_name}</p>
                  <p className="text-xs text-gray-400">{profile?.email}</p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="px-3 sm:px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-600 text-red-400 rounded-lg transition text-sm"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="bg-[#1a1a1a]/80 backdrop-blur-sm border border-gray-800 rounded-lg p-4 sm:p-6">
              <div className="text-xs sm:text-sm text-gray-400 mb-1 sm:mb-2">Total Users</div>
              <div className="text-2xl sm:text-3xl font-bold text-[#006239]">{stats.totalUsers}</div>
            </div>
            <div className="bg-[#1a1a1a]/80 backdrop-blur-sm border border-gray-800 rounded-lg p-4 sm:p-6">
              <div className="text-xs sm:text-sm text-gray-400 mb-1 sm:mb-2">Landlords</div>
              <div className="text-2xl sm:text-3xl font-bold">{stats.totalLandlords}</div>
            </div>
            <div className="bg-[#1a1a1a]/80 backdrop-blur-sm border border-gray-800 rounded-lg p-4 sm:p-6">
              <div className="text-xs sm:text-sm text-gray-400 mb-1 sm:mb-2">Tenants</div>
              <div className="text-2xl sm:text-3xl font-bold">{stats.totalTenants}</div>
            </div>
            <div className="bg-[#1a1a1a]/80 backdrop-blur-sm border border-gray-800 rounded-lg p-4 sm:p-6">
              <div className="text-xs sm:text-sm text-gray-400 mb-1 sm:mb-2">Apartments</div>
              <div className="text-2xl sm:text-3xl font-bold">{stats.totalApartments}</div>
            </div>
            <div className="bg-[#1a1a1a]/80 backdrop-blur-sm border border-gray-800 rounded-lg p-4 sm:p-6">
              <div className="text-xs sm:text-sm text-gray-400 mb-1 sm:mb-2">Applications</div>
              <div className="text-2xl sm:text-3xl font-bold">{stats.totalApplications}</div>
            </div>
            <div className="bg-[#1a1a1a]/80 backdrop-blur-sm border border-gray-800 rounded-lg p-4 sm:p-6">
              <div className="text-xs sm:text-sm text-gray-400 mb-1 sm:mb-2">Complaints</div>
              <div className="text-2xl sm:text-3xl font-bold text-red-400">{stats.totalComplaints}</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-[#1a1a1a]/80 backdrop-blur-sm border border-gray-800 rounded-lg mb-6">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium border-b-2 transition whitespace-nowrap ${
                  activeTab === 'overview'
                    ? 'border-[#006239] text-[#006239]'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium border-b-2 transition whitespace-nowrap ${
                  activeTab === 'users'
                    ? 'border-[#006239] text-[#006239]'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                Users
              </button>
              <button
                onClick={() => setActiveTab('apartments')}
                className={`px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium border-b-2 transition whitespace-nowrap ${
                  activeTab === 'apartments'
                    ? 'border-[#006239] text-[#006239]'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                Apartments
              </button>
              <button
                onClick={() => setActiveTab('complaints')}
                className={`px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium border-b-2 transition whitespace-nowrap ${
                  activeTab === 'complaints'
                    ? 'border-[#006239] text-[#006239]'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                Complaints
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-[#1a1a1a]/80 backdrop-blur-sm border border-gray-800 rounded-lg p-4 sm:p-6">
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-4">System Overview</h2>
                <p className="text-gray-400 mb-6">Welcome to the admin dashboard. Monitor and manage all system activities from here.</p>
                
                <div className="space-y-4">
                  <div className="border border-gray-800 rounded-lg p-4">
                    <h3 className="font-semibold mb-2 text-sm sm:text-base">Quick Actions</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        onClick={() => setActiveTab('users')}
                        className="px-4 py-3 bg-[#006239]/20 hover:bg-[#006239]/30 border border-[#006239] rounded-lg transition text-left text-sm"
                      >
                        Manage Users →
                      </button>
                      <button
                        onClick={() => setActiveTab('complaints')}
                        className="px-4 py-3 bg-red-600/20 hover:bg-red-600/30 border border-red-600 rounded-lg transition text-left text-sm"
                      >
                        View Complaints →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-4">User Management</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-800">
                        <th className="text-left py-3 px-2 sm:px-4">Name</th>
                        <th className="text-left py-3 px-2 sm:px-4 hidden sm:table-cell">Email</th>
                        <th className="text-left py-3 px-2 sm:px-4">Role</th>
                        <th className="text-left py-3 px-2 sm:px-4">Status</th>
                        <th className="text-left py-3 px-2 sm:px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b border-gray-800/50">
                          <td className="py-3 px-2 sm:px-4">
                            <div>
                              <div className="font-medium">{user.full_name}</div>
                              <div className="text-xs text-gray-400 sm:hidden">{user.email}</div>
                            </div>
                          </td>
                          <td className="py-3 px-2 sm:px-4 hidden sm:table-cell text-gray-400">{user.email}</td>
                          <td className="py-3 px-2 sm:px-4">
                            <span className={`px-2 py-1 rounded text-xs ${
                              user.role === 'admin' ? 'bg-purple-600/20 text-purple-400' :
                              user.role === 'landlord' ? 'bg-blue-600/20 text-blue-400' :
                              'bg-green-600/20 text-green-400'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="py-3 px-2 sm:px-4">
                            <span className={`px-2 py-1 rounded text-xs ${
                              user.is_active ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'
                            }`}>
                              {user.is_active ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="py-3 px-2 sm:px-4">
                            {user.role !== 'admin' && (
                              <button
                                onClick={() => toggleUserStatus(user.id, user.is_active)}
                                className="px-2 sm:px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs transition"
                              >
                                {user.is_active ? 'Deactivate' : 'Activate'}
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'apartments' && (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-4">Apartment Listings</h2>
                <div className="space-y-4">
                  {apartments.map((apt) => (
                    <div key={apt.id} className="border border-gray-800 rounded-lg p-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-base sm:text-lg mb-1">{apt.title}</h3>
                          <p className="text-xs sm:text-sm text-gray-400 mb-2">{apt.address}, {apt.city}</p>
                          <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
                            <span className="text-gray-400">By: {apt.landlord?.full_name}</span>
                            <span className="text-gray-600">•</span>
                            <span className="text-[#006239]">₱{apt.monthly_rent}/month</span>
                            <span className="text-gray-600">•</span>
                            <span className={apt.is_published ? 'text-green-400' : 'text-gray-400'}>
                              {apt.is_published ? 'Published' : 'Unpublished'}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2 sm:flex-col">
                          <span className={`px-2 sm:px-3 py-1 rounded text-xs whitespace-nowrap ${
                            apt.type === 'studio' ? 'bg-purple-600/20 text-purple-400' :
                            apt.type === '1br' ? 'bg-blue-600/20 text-blue-400' :
                            apt.type === '2br' ? 'bg-green-600/20 text-green-400' :
                            'bg-yellow-600/20 text-yellow-400'
                          }`}>
                            {apt.type.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'complaints' && (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-4">Complaint Management</h2>
                <div className="space-y-4">
                  {complaints.length === 0 ? (
                    <p className="text-gray-400 text-center py-8">No complaints yet</p>
                  ) : (
                    complaints.map((complaint) => (
                      <div key={complaint.id} className="border border-gray-800 rounded-lg p-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-base mb-1">{complaint.subject}</h3>
                            <p className="text-xs sm:text-sm text-gray-400 mb-2">
                              By: {complaint.complainant?.full_name} ({complaint.complainant?.email})
                            </p>
                            <p className="text-sm text-gray-300">{complaint.description}</p>
                          </div>
                          <span className={`px-2 sm:px-3 py-1 rounded text-xs whitespace-nowrap ${
                            complaint.status === 'resolved' ? 'bg-green-600/20 text-green-400' :
                            complaint.status === 'investigating' ? 'bg-yellow-600/20 text-yellow-400' :
                            'bg-red-600/20 text-red-400'
                          }`}>
                            {complaint.status}
                          </span>
                        </div>
                        {complaint.status !== 'resolved' && (
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => updateComplaintStatus(complaint.id, 'investigating')}
                              className="px-3 py-1.5 bg-yellow-600/20 hover:bg-yellow-600/30 border border-yellow-600 text-yellow-400 rounded text-xs transition"
                            >
                              Investigating
                            </button>
                            <button
                              onClick={() => updateComplaintStatus(complaint.id, 'resolved')}
                              className="px-3 py-1.5 bg-green-600/20 hover:bg-green-600/30 border border-green-600 text-green-400 rounded text-xs transition"
                            >
                              Mark Resolved
                            </button>
                            <button
                              onClick={() => updateComplaintStatus(complaint.id, 'dismissed')}
                              className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-xs transition"
                            >
                              Dismiss
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}