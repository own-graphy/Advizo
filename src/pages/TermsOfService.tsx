
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {

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
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-advizo-green">Terms of Service</h1>
          <p className="text-gray-500 mb-8">Last updated: May 7, 2025</p>
        </div>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-advizo-blue">1. Introduction</h2>
            <p className="mb-4">
              These Terms of Service ("Terms") govern your use of the website and services provided by Advizo Consulting 
              ("we," "our," or "us"). By accessing or using our website and services, you agree to be bound by these Terms.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-advizo-blue">2. Use of Our Services</h2>
            <p className="mb-4">
              You may use our Services only as permitted in these Terms and any applicable laws. Our services are 
              not designed for use by individuals under the age of 18. By using our services, you represent that you are at least 18 years of age.
            </p>
            <p className="mb-4">
              You agree not to misuse our Services or help anyone else do so. For example, you must not attempt to:
            </p>
            <ul className="list-disc ml-6 mb-4 space-y-2">
              <li>Probe, scan, or test the vulnerability of any system or network</li>
              <li>Breach or otherwise circumvent any security or authentication measures</li>
              <li>Access, tamper with, or use non-public areas or parts of the Services</li>
              <li>Interfere with or disrupt any user, host, or network</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-advizo-blue">3. Intellectual Property</h2>
            <p className="mb-4">
              All content included on this website, such as text, graphics, logos, button icons, images, audio clips, 
              digital downloads, data compilations, and software, is the property of Advizo Consulting or its content 
              suppliers and is protected by international copyright laws.
            </p>
            <p className="mb-4">
              You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Services, use of 
              the Services, or access to the Services without express written permission from us.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-advizo-blue">4. Limitation of Liability</h2>
            <p className="mb-4">
              In no event will Advizo Consulting, its directors, employees, partners, agents, suppliers, or affiliates be liable for any 
              indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, 
              use, goodwill, or other intangible losses, resulting from:
            </p>
            <ul className="list-disc ml-6 mb-4 space-y-2">
              <li>Your access to or use of or inability to access or use the Services</li>
              <li>Any conduct or content of any third party on the Services</li>
              <li>Any content obtained from the Services</li>
              <li>Unauthorized access, use or alteration of your transmissions or content</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-advizo-blue">5. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is 
              material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes 
              a material change will be determined at our sole discretion.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-advizo-blue">6. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <p className="mb-1">Email: legal@advizo-consulting.com</p>
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

export default TermsOfService;
