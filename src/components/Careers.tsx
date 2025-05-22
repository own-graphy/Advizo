import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Upload } from 'lucide-react';
import SmoothFadeIn from './SmoothFadeIn';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const Careers = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    resume: null as File | null,
  });

  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);

  // message state for inline feedback
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error' | null;
    text: string;
    visible: boolean;
  }>({ type: null, text: '', visible: false });

  // Show message with zoom animation then hide after 7s
  useEffect(() => {
    if (feedback.visible) {
      const timer = setTimeout(() => {
        setFeedback(f => ({ ...f, visible: false }));
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [feedback.visible]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        resume: e.target.files[0],
      }));
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const rawPhone = formData.phone?.replace(/\D/g, '') || '';

    if (rawPhone.length < 12 || !rawPhone.startsWith('91')) {
      setFeedback({ type: 'error', text: 'Please enter a valid 10-digit mobile number with country code.', visible: true });
      return;
    }
    
    const localPhone = rawPhone.slice(-10);
    
    if (localPhone.length !== 10 || !/^[6-9]\d{9}$/.test(localPhone)) {
      setFeedback({ type: 'error', text: 'Mobile number must be 10 digits and start with 6, 7, 8, or 9.', visible: true });
      return;
    }

    
    if (!formData.resume) {
      setFeedback({ type: 'error', text: 'Please upload your resume', visible: true });
      return;
    }
    


    setLoading(true);

    const reader = new FileReader();
    reader.readAsDataURL(formData.resume);

    reader.onloadend = async () => {
      const fileData = reader.result;

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        fileData,
        fileName: formData.resume!.name,
        fileType: formData.resume!.type,
      };

      try {
        await fetch(
          'https://script.google.com/macros/s/AKfycbwxCxDQlbOD-3kG_EufgSo6dtVNzoFen3icbNBrxEHLeyzaW81AdW0ovEp2kS1XsovP_w/exec',
          {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          }
        );

        setFeedback({
          type: 'success',
          text: 'Application submitted. Thank you for applying. We will get back to you soon.',
          visible: true,
        });

        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          resume: null,
        });
        setFileName('');
      } catch (error) {
        console.error("Submit error:", error);
        setFeedback({
          type: 'error',
          text: 'Submission failed. Please try again later.',
          visible: true,
        });
      } finally {
        setLoading(false);
      }
    };
  };

  return (
    <section id="careers" className="py-28 bg-advizo-lightgray">
      <div className="container mx-auto px-4">
        <SmoothFadeIn>
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center text-advizo-green">Join Our Team</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Explore career opportunities and be part of our mission to empower MSMEs
            </p>
          </div>
        </SmoothFadeIn>

        <SmoothFadeIn delay={150}>
          <div className="bg-white p-8 rounded-lg shadow-md max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Left side - Why work with us */}
              <div className="md:col-span-1">
                <h3 className="text-xl font-bold text-advizo-green mb-4">Why Work With Us</h3>
                <div className="space-y-4 text-gray-700">
                  <div className="border-l-4 border-advizo-gold pl-4 py-1">
                    <h4 className="font-semibold text-base mb-1 text-advizo-green">Meaningful Impact</h4>
                    <p className="text-sm">Help transform the MSME sector in India with innovative solutions.</p>
                  </div>
                  <div className="border-l-4 border-advizo-gold pl-4 py-1">
                    <h4 className="font-semibold text-base mb-1 text-advizo-green">Growth Opportunities</h4>
                    <p className="text-sm">Continuous learning and career advancement paths.</p>
                  </div>
                  <div className="border-l-4 border-advizo-gold pl-4 py-1">
                    <h4 className="font-semibold text-base mb-1 text-advizo-green">Collaborative Environment</h4>
                    <p className="text-sm">Work with diverse, talented professionals.</p>
                  </div>
                </div>
              </div>

              {/* Right side - Application form */}
              <div className="md:col-span-2" id="application-form">
                <h3 className="text-xl font-bold text-advizo-green mb-4">Quick Application</h3>
                <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4" noValidate>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name*"
                    required
                  />
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address*"
                    required
                  />
                  <PhoneInput
                    country={'in'}
                    value={formData['phone']}
                    onChange={(phone) =>
                      setFormData((prev) => ({ ...prev, 'phone': phone }))
                    }
                    inputProps={{
                      name: 'phone',
                      required: true,
                    }}
                    containerClass="!w-full"
                    inputClass="!w-full !pl-14 !pr-4 !py-2 !text-base !rounded-md !border !border-gray-300 focus:!border-advizo-green focus:!shadow-md focus:!outline-none"
                  />
                  <Textarea
                    name="message"
                    rows={2}
                    value={formData.message}
                    onChange={handleChange}
                    className="resize-none md:col-span-2"
                    placeholder="Cover Message (optional)"
                  />

                  <div className="md:col-span-2">
                    <label className="w-full flex cursor-pointer items-center">
                      <Input
                        type="file"
                        name="resume"
                        accept=".pdf,.doc,.docx"
                        className="sr-only"
                        onChange={handleFileChange}
                        required
                      />
                      <span className="bg-white py-2 px-4 border border-gray-300 rounded-l-md text-sm text-gray-700 overflow-hidden whitespace-nowrap overflow-ellipsis flex-1">
                        {fileName || 'No file selected'}
                      </span>
                      <span className="bg-advizo-gold py-2 px-4 border border-l-0 border-advizo-gold rounded-r-md text-sm flex items-center text-white">
                        <Upload className="h-4 w-4 mr-2" /> Upload Resume*
                      </span>
                    </label>
                    <p className="mt-1 text-xs text-gray-500">PDF, DOC, or DOCX up to 5MB</p>
                  </div>

                  {/* Inline feedback message + Submit button container */}
                  <div className="md:col-span-2 flex items-center mt-2">
                    {feedback.visible && (
                      <div
                        className={`
                          animate-zoom-in-out text-sm font-medium whitespace-nowrap
                          ${feedback.type === 'success' ? 'text-advizo-green' : 'text-red-600'}
                        `}
                        aria-live="polite"
                      >
                        {feedback.text}
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="ml-auto bg-advizo-green hover:bg-advizo-green/80 text-white"
                      disabled={loading}
                    >
                      {loading ? 'Submitting...' : 'Submit Application'}
                    </Button>
                  </div>


                </form>
              </div>
            </div>
          </div>
        </SmoothFadeIn>
      </div>
    </section>
  );
};

export default Careers;
