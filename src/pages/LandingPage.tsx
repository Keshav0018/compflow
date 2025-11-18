import { Building2, Users, CheckCircle, Star, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import { useApp } from '../context/AppContext';

export default function LandingPage() {
  const { setUserRole, setCurrentPage } = useApp();

  const handleLogin = (role: 'company' | 'committee') => {
    setCurrentPage(`${role}-login`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Comflow</span>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" onClick={() => handleLogin('company')}>
                Login as Company
              </Button>
              <Button onClick={() => handleLogin('committee')}>
                Login as Committee
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Connect Businesses with
            <span className="text-blue-600"> Elite College Committees</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Comflow bridges the gap between companies seeking innovative solutions and talented
            college committees ready to deliver exceptional projects.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" onClick={() => handleLogin('company')}>
              Post a Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => handleLogin('committee')}>
              Join as Committee
            </Button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Companies Post Projects</h3>
            <p className="text-gray-600">
              Businesses post detailed project requirements with transparent pricing and timelines.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Committees Propose Solutions</h3>
            <p className="text-gray-600">
              College committees review projects and submit comprehensive proposals with their approach.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Collaborate & Deliver</h3>
            <p className="text-gray-600">
              Work together with milestone tracking, integrated communication, and seamless delivery.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Platform Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Transparent Pricing',
              'Milestone Tracking',
              'Integrated Communication',
              'Committee Portfolios',
              'Project Marketplace',
              'Secure Payments',
              'Rating System',
              'Progress Dashboard',
              '24/7 Support',
            ].map((feature) => (
              <div key={feature} className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What Our Users Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-600 mb-4">
              "Comflow helped us find the perfect team for our mobile app project. The quality exceeded
              our expectations!"
            </p>
            <p className="font-semibold">- Rahul Sharma, CEO TechStart</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-600 mb-4">
              "As a college committee, this platform gave us real-world projects to work on and build
              our portfolio."
            </p>
            <p className="font-semibold">- Priya Menon, Lead Developer</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-600 mb-4">
              "The milestone tracking and communication features made project management seamless.
              Highly recommended!"
            </p>
            <p className="font-semibold">- Amit Patel, Project Manager</p>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="h-6 w-6" />
                <span className="text-xl font-bold">Comflow</span>
              </div>
              <p className="text-gray-400">
                Connecting businesses with elite college committees for innovative project collaborations.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Companies</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Post Projects</li>
                <li>Browse Committees</li>
                <li>Manage Projects</li>
                <li>Pricing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Committees</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Find Projects</li>
                <li>Submit Proposals</li>
                <li>Build Portfolio</li>
                <li>Get Paid</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Contact</li>
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Comflow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
