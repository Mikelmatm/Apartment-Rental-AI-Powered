// src/pages/LandingPage.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';

export default function LandingPage() {
  const { user, profile } = useAuth();

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Background Image with Overlay */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="border-b border-gray-800/50 backdrop-blur-sm bg-black/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center">
                <h1 className="text-xl sm:text-2xl font-bold">
                  Rent<span className="text-[#006239]">ify</span>
                </h1>
              </div>

              {/* Navigation Links */}
              <div className="flex items-center gap-2 sm:gap-4">
                {user ? (
                  <Link
                    to={`/${profile?.role}/dashboard`}
                    className="px-3 sm:px-4 py-2 text-sm sm:text-base bg-[#006239] hover:bg-[#005030] rounded-lg transition"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="px-3 sm:px-4 py-2 text-sm sm:text-base text-gray-300 hover:text-white transition"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="px-3 sm:px-4 py-2 text-sm sm:text-base bg-[#006239] hover:bg-[#005030] rounded-lg transition"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
            <div className="text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#006239]/20 border border-[#006239]/30 rounded-full mb-6 sm:mb-8">
                <span className="w-2 h-2 bg-[#006239] rounded-full animate-pulse"></span>
                <span className="text-xs sm:text-sm text-gray-300">School Project Demo</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-4">
                Find Your Perfect
                <br />
                <span className="text-[#006239]">Apartment</span> Today
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8 sm:mb-12 px-4">
                A modern apartment rental platform connecting tenants with landlords.
                Browse listings, apply online, and manage everything in one place.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
                <Link
                  to="/signup"
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-[#006239] hover:bg-[#005030] rounded-lg text-base sm:text-lg font-medium transition w-full sm:w-auto text-center"
                >
                  Get Started Free
                </Link>
                <a
                  href="#features"
                  className="px-6 sm:px-8 py-3 sm:py-4 border border-gray-700 hover:border-[#006239] rounded-lg text-base sm:text-lg font-medium transition w-full sm:w-auto text-center backdrop-blur-sm bg-black/30"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 sm:py-20 md:py-24 bg-black/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                Everything You Need
              </h2>
              <p className="text-gray-300 text-base sm:text-lg">
                Built for landlords, tenants, and administrators
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* For Tenants */}
              <div className="bg-[#1a1a1a]/80 backdrop-blur-sm border border-gray-800 rounded-lg p-6 sm:p-8 hover:border-[#006239] transition">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#006239]/20 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#006239]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3">For Tenants</h3>
                <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-[#006239] mt-1">✓</span>
                    <span>Search apartments by location and price</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#006239] mt-1">✓</span>
                    <span>Apply online with digital documents</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#006239] mt-1">✓</span>
                    <span>Sign contracts electronically</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#006239] mt-1">✓</span>
                    <span>Pay rent via GCash, PayPal, or Bank</span>
                  </li>
                </ul>
              </div>

              {/* For Landlords */}
              <div className="bg-[#1a1a1a]/80 backdrop-blur-sm border border-gray-800 rounded-lg p-6 sm:p-8 hover:border-[#006239] transition">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#006239]/20 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#006239]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3">For Landlords</h3>
                <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-[#006239] mt-1">✓</span>
                    <span>List and manage multiple properties</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#006239] mt-1">✓</span>
                    <span>Review and approve applications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#006239] mt-1">✓</span>
                    <span>Generate digital contracts instantly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#006239] mt-1">✓</span>
                    <span>Track payments and maintenance</span>
                  </li>
                </ul>
              </div>

              {/* AI Chatbot */}
              <div className="bg-[#1a1a1a]/80 backdrop-blur-sm border border-gray-800 rounded-lg p-6 sm:p-8 hover:border-[#006239] transition sm:col-span-2 lg:col-span-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#006239]/20 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#006239]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3">AI Assistant</h3>
                <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-[#006239] mt-1">✓</span>
                    <span>24/7 automated support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#006239] mt-1">✓</span>
                    <span>Answer questions instantly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#006239] mt-1">✓</span>
                    <span>Guide through application process</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#006239] mt-1">✓</span>
                    <span>Help with payment inquiries</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 sm:py-20 md:py-24 bg-black/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                How It Works
              </h2>
              <p className="text-gray-300 text-base sm:text-lg">
                Get started in three simple steps
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
              <div className="text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#006239] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-xl sm:text-2xl font-bold">
                  1
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Sign Up</h3>
                <p className="text-sm sm:text-base text-gray-300">
                  Create your account as a tenant or landlord in seconds
                </p>
              </div>

              <div className="text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#006239] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-xl sm:text-2xl font-bold">
                  2
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Browse or List</h3>
                <p className="text-sm sm:text-base text-gray-300">
                  Search for apartments or list your properties
                </p>
              </div>

              <div className="text-center sm:col-span-2 lg:col-span-1">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#006239] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-xl sm:text-2xl font-bold">
                  3
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Manage Everything</h3>
                <p className="text-sm sm:text-base text-gray-300">
                  Handle applications, contracts, and payments online
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 md:py-24 bg-black/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8">
              Join Rentify today and experience modern apartment rental management
            </p>
            <Link
              to="/signup"
              className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-[#006239] hover:bg-[#005030] rounded-lg text-base sm:text-lg font-medium transition"
            >
              Create Free Account
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-800/50 py-6 sm:py-8 bg-black/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-gray-400 text-sm sm:text-base">
              <p>© 2024 Rentify.edu - School Project Demo</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}