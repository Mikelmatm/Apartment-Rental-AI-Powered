// src/pages/LoginPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);

    const { data, error } = await signIn(email, password);

    if (error) {
      toast.error(error);
      setLoading(false);
      return;
    }

    // Get user profile to check role
    const userProfile = data.user.user_metadata;
    
    toast.success('Login successful!');
    
    // Redirect based on role
    if (userProfile.role === 'admin') {
      navigate('/admin/dashboard');
    } else if (userProfile.role === 'landlord') {
      navigate('/landlord/dashboard');
    } else if (userProfile.role === 'tenant') {
      navigate('/tenant/dashboard');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white relative flex items-center justify-center p-4">
      {/* Background Image with Blur and Overlay */}
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
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Rent<span className="text-[#006239]">ify</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-300">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <div className="bg-[#1a1a1a]/90 backdrop-blur-md border border-[#006239] rounded-lg p-6 sm:p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#006239] focus:ring-2 focus:ring-[#006239]/20 transition text-sm sm:text-base"
                placeholder="admin@example.com"
                disabled={loading}
                autoFocus
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#006239] focus:ring-2 focus:ring-[#006239]/20 transition text-sm sm:text-base"
                placeholder="••••••••"
                disabled={loading}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 sm:py-3 bg-[#006239] hover:bg-[#005030] text-white font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base shadow-lg hover:shadow-[#006239]/50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            {/* Keyboard Shortcuts Info */}
            <div className="text-xs sm:text-sm text-gray-400 text-center pt-2">
              Press <kbd className="px-2 py-1 bg-black/50 rounded border border-gray-700 text-[#006239]">Enter</kbd> to sign in or{' '}
              <kbd className="px-2 py-1 bg-black/50 rounded border border-gray-700 text-[#006239]">ESC</kbd> to go back
            </div>
          </form>

          {/* Divider */}
          <div className="my-5 sm:my-6 flex items-center">
            <div className="flex-1 border-t border-gray-700"></div>
            <span className="px-4 text-gray-500 text-xs sm:text-sm">or</span>
            <div className="flex-1 border-t border-gray-700"></div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm sm:text-base text-gray-300">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#006239] hover:text-[#007d4a] hover:underline font-medium transition">
              Sign up
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-4 sm:mt-6">
          <Link to="/" className="text-sm sm:text-base text-gray-300 hover:text-white transition inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}