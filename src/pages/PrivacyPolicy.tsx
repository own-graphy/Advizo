
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to top when page loads
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4 pl-0">
              <ArrowLeft className="mr-2" size={18} />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-advizo-green">Privacy Policy</h1>
          <p className="text-gray-500 mb-8">Last updated: May 7, 2025</p>
        </div>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-advizo-blue">1. Introduction</h2>
            <p className="mb-4">
              Advizo Consulting ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. 
              This privacy policy will inform you about how we look after your personal data when you visit our website and tell 
              you about your privacy rights and how the law protects you.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-advizo-blue">2. The Data We Collect</h2>
            <p className="mb-4">
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
            </p>
            <ul className="list-disc ml-6 mb-4 space-y-2">
              <li>Identity Data includes first name, last name, username or similar identifier.</li>
              <li>Contact Data includes email address and telephone numbers.</li>
              <li>Technical Data includes internet protocol (IP) address, browser type and version, time zone setting and location, 
                browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
              <li>Usage Data includes information about how you use our website and services.</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-advizo-blue">3. How We Use Your Data</h2>
            <p className="mb-4">
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc ml-6 mb-4 space-y-2">
              <li>To provide and maintain our service</li>
              <li>To notify you about changes to our service</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information so that we can improve our service</li>
              <li>To monitor the usage of our service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-advizo-blue">4. Data Security</h2>
            <p className="mb-4">
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, 
              used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data 
              to those employees, agents, contractors and other third parties who have a business need to know. 
              They will only process your personal data on our instructions and they are subject to a duty of confidentiality.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-advizo-blue">5. Your Legal Rights</h2>
            <p className="mb-4">
              Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
            </p>
            <ul className="list-disc ml-6 mb-4 space-y-2">
              <li>Request access to your personal data</li>
              <li>Request correction of your personal data</li>
              <li>Request erasure of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Request restriction of processing your personal data</li>
              <li>Request transfer of your personal data</li>
              <li>Right to withdraw consent</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-advizo-blue">6. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this privacy policy or our privacy practices, please contact us at:
            </p>
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <p className="mb-1">Email: privacy@advizo-consulting.com</p>
              <p className="mb-1">Phone: +91 123-456-7890</p>
              <p>Address: 123 Business Avenue, Mumbai, India 400001</p>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
