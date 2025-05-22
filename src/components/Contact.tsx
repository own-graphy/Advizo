import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Mail } from 'lucide-react';
import SmoothFadeIn from './SmoothFadeIn';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'


const Contact = () => {
  const [formData, setFormData] = useState({
    'Full-Name': '',
    'Email': '',
    'Mob-No': '',
    'Company-Name': '',
    'Message': ''
  });

  // message state: { text: string, type: 'success' | 'error' | '' }
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | '' }>({ text: '', type: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear message when user types again
    setMessage({ text: '', type: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const rawPhone = formData['Mob-No'].replace(/\D/g, '');
    
    if (rawPhone.length < 12 || !rawPhone.startsWith('91')) {
      setMessage({ type: 'error', text: 'Phone number must include country code +91 and be 10 digits long.' });
      return;
    }
  
    const localPhone = rawPhone.slice(-10); // Last 10 digits only
  
    if (localPhone.length !== 10 || !/^[6-9]\d{9}$/.test(localPhone)) {
      setMessage({ type: 'error', text: 'Invalid mobile number. It must start with 6, 7, 8, or 9.' });
      return;
    }
  
    try {
      await fetch("https://script.google.com/macros/s/AKfycbwN7nx6Rvz7QXIYsqwLKmy0sOaWFcgCo2oj-FNXcRoq7pRQPxXmxusq-ttKHfjk61MO/exec", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
  
      setMessage({
        text: "Thanks for Contact Advizo. We will get back to you shortly",
        type: "success"
      });
  
      setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 7000);
  
      setFormData({
        'Full-Name': '',
        'Email': '',
        'Mob-No': '',
        'Company-Name': '',
        'Message': ''
      });
    } catch (error) {
      setMessage({
        text: "Sorry for inconvenience, get in touch with business@consultadvizo.com",
        type: "error"
      });
      console.error(error);
    }
  };
  

  return (
    <section id="contact" className="py-28 bg-white">
      <div className="container mx-auto px-4">
        <SmoothFadeIn>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center text-advizo-green">Get in Touch</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Schedule your free consultation and take the first step towards business growth
            </p>
          </div>
        </SmoothFadeIn>

        <SmoothFadeIn delay={150}>
          <div className="max-w-5xl mx-auto mt-12 bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <div className="grid md:grid-cols-5 gap-8">
              <div className="md:col-span-3">
                <h3 className="text-2xl font-bold text-advizo-green mb-6">Request a Free Consultation</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      type="text"
                      id="Full-Name"
                      name="Full-Name"
                      value={formData['Full-Name']}
                      onChange={handleChange}
                      required
                      className="w-full"
                      placeholder="Full Name*"
                    />
                    <Input
                      type="email"
                      id="Email"
                      name="Email"
                      value={formData['Email']}
                      onChange={handleChange}
                      required
                      className="w-full"
                      placeholder="Email Address*"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <PhoneInput
                    country={'in'}
                    value={formData['Mob-No']}
                    onChange={(phone) => setFormData((prev) => ({ ...prev, 'Mob-No': phone }))}
                    inputProps={{
                      name: 'Mob-No',
                      required: true,
                    }}
                    containerClass="!w-full custom-phone-input-container"
                    inputClass="!w-full !pl-14 !pr-4 !py-2  !text-base !rounded-md !border !border-gray-300 focus:!border-advizo-green focus:!shadow-md focus:!outline-none"
                  />

                    <Input
                      type="text"
                      id="Company-Name"
                      name="Company-Name"
                      value={formData['Company-Name']}
                      onChange={handleChange}
                      required
                      className="w-full"
                      placeholder="Company Name*"
                    />
                  </div>

                  <Textarea
                    id="Message"
                    name="Message"
                    rows={4}
                    value={formData['Message']}
                    onChange={handleChange}
                    className="resize-none w-full"
                    placeholder="Tell us about your business needs"
                  />

                  <Button
                    type="submit"
                    className="px-8 py-2 bg-advizo-gold hover:bg-advizo-gold/80 text-black"
                  >
                    Request Free Consultation
                  </Button>

                  {/* Message below button */}
                  {message.text && (
                    <p
                      className={`mt-3 text-sm font-semibold animate-zoom-in-out ${
                        message.type === "success" ? "text-advizo-green/90" : "text-red-600"
                      }`}
                    >
                      {message.text}
                    </p>
                  )}

                </form>
              </div>

              <div className="md:col-span-2 bg-advizo-lightgray p-6 rounded-lg">
                <h3 className="text-xl font-bold text-advizo-green mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="text-advizo-green mr-3 h-6 w-6 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-advizo-green mb-1">Our Location</h4>
                      <p className="text-gray-700">
                        First Floor, Building No. 3,<br />
                        Malviya Nagar, New Delhi 110017<br />
                        India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="text-advizo-green mr-3 h-6 w-6 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-advizo-green mb-1">Email Us</h4>
                      <p className="text-gray-700">
                        <a href="mailto:business@consultadvizo.com" className="text-advizo-green hover:underline">
                          business@consultadvizo.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-300">
                    <h4 className="font-semibold text-advizo-green mb-3">Business Hours</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <span>Monday - Saturday:</span>
                      <span>10:00 AM - 9:00 PM</span>
                      <span>Sunday:</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SmoothFadeIn>
      </div>
    </section>
  );
};

export default Contact;
