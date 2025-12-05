// src/pages/SignupPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import toast from 'react-hot-toast';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'tenant'
  });
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // ESC to go back
      if (e.key === 'Escape') {
        navigate('/');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);

    const { data, error } = await signUp(
      formData.email,
      formData.password,
      formData.fullName,
      formData.role
    );

    if (error) {
      toast.error(error);
      setLoading(false);
      return;
    }

    toast.success('Account created successfully!');
    
    // Redirect based on role
    if (formData.role === 'admin') {
      navigate('/admin/dashboard');
    } else if (formData.role === 'landlord') {
      navigate('/landlord/dashboard');
    } else if (formData.role === 'tenant') {
      navigate('/tenant/dashboard');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white relative flex items-center justify-center p-4">
      {/* Background Image with Blur */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          filter: 'blur(8px)'
        }}
      >
        <div className="absolute inset-0 bg-black/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md my-8">
        {/* Logo */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Rent<span className="text-[#006239]">ify</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-300">Create your account</p>
        </div>

        {/* Signup Form */}
        <div className="bg-[#1a1a1a]/90 backdrop-blur-md border border-[#006239] rounded-lg p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-white mb-2">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#006239] transition text-sm sm:text-base"
                placeholder="John Doe"
                disabled={loading}
                autoFocus
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#006239] transition text-sm sm:text-base"
                placeholder="admin@example.com"
                disabled={loading}
                required
              />
              <p className="text-xs text-gray-400 mt-1">Use a valid email format (e.g., user@gmail.com)</p>
            </div>

            {/* Role Selection */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-white mb-2">
                I am a...
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#006239] transition text-sm sm:text-base"
                disabled={loading}
              >
                <option value="tenant">Tenant (Looking for apartment)</option>
                <option value="landlord">Landlord (Have apartments to rent)</option>
                <option value="admin">Admin (System administrator)</option>
              </select>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#006239] transition text-sm sm:text-base"
                placeholder="••••••••"
                disabled={loading}
                required
                minLength={6}
              />
              <p className="text-xs text-gray-400 mt-1">Minimum 6 characters</p>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#006239] transition text-sm sm:text-base"
                placeholder="••••••••"
                disabled={loading}
                required
                minLength={6}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 sm:py-3 bg-[#006239] hover:bg-[#005030] text-white font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>

            {/* Keyboard Shortcuts Info */}
            <div className="text-xs sm:text-sm text-gray-400 text-center">
              Press <kbd className="px-2 py-1 bg-black/50 rounded border border-gray-700 text-[#006239]">Enter</kbd> to create account or{' '}
              <kbd className="px-2 py-1 bg-black/50 rounded border border-gray-700 text-[#006239]">ESC</kbd> to go back
            </div>
          </form>

          {/* Divider */}
          <div className="my-5 sm:my-6 flex items-center">
            <div className="flex-1 border-t border-gray-700"></div>
            <span className="px-4 text-gray-500 text-xs sm:text-sm">or</span>
            <div className="flex-1 border-t border-gray-700"></div>
          </div>

          {/* Login Link */}
          <p className="text-center text-sm sm:text-base text-gray-300">
            Already have an account?{' '}
            <Link to="/login" className="text-[#006239] hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-4 sm:mt-6">
          <Link to="/" className="text-sm sm:text-base text-gray-300 hover:text-white transition">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}