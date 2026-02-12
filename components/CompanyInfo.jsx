import { Card } from '@/components/ui/card';
import { Building2, Mail, MapPin } from 'lucide-react';

export default function CompanyInfo() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Trusted by Communities Worldwide
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We're committed to providing the best platform for online communities to thrive and grow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 text-center">
            <Building2 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Enterprise-Grade</h3>
            <p className="text-slate-600">
              Built with security and scalability in mind to support communities of all sizes
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Mail className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">24/7 Support</h3>
            <p className="text-slate-600">
              Our dedicated team is always here to help you make the most of your community
            </p>
          </Card>

          <Card className="p-6 text-center">
            <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Global Reach</h3>
            <p className="text-slate-600">
              Connect with members from around the world with our globally distributed platform
            </p>
          </Card>
        </div>

        <div className="mt-16 bg-white rounded-lg border border-slate-200 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">About Our Platform</h3>
              <p className="text-slate-600 mb-4">
                Modern SaaS Community Platform is designed from the ground up to help communities connect, 
                collaborate, and grow. With powerful features like real-time notifications, rich content 
                creation, and advanced moderation tools, we provide everything you need to build a thriving 
                online community.
              </p>
              <p className="text-slate-600">
                Whether you're running a professional network, hobbyist group, or customer community, 
                our platform scales with your needs and adapts to your unique requirements.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Why Choose Us?</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Modern, intuitive interface that users love</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Comprehensive moderation and safety tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Flexible role-based permissions system</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Real-time notifications and messaging</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Analytics and insights to track growth</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}