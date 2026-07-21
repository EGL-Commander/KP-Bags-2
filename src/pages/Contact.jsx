import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'B2B Wholesale Inquiry',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, subject, message } = formData;

    if (!name || !email || !phone || !message) {
      setErrorMsg('Please fill in all required fields (*).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    // Compile message content for WhatsApp
    const messageText = `*New B2B Inquiry - KP BIG BAGS*\n\n` +
                        `*Name:* ${name}\n` +
                        `*Email:* ${email}\n` +
                        `*Phone:* ${phone}\n` +
                        `*Subject:* ${subject || 'B2B Wholesale Inquiry'}\n` +
                        `*Message:* ${message}`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=918840575264&text=${encodeURIComponent(messageText)}`;
    
    // Redirect to WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');

    // Reset Form Data
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'B2B Wholesale Inquiry',
      message: ''
    });

    // Success Simulation
    setIsSubmitted(true);
    setErrorMsg('');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Page Header */}
      <section className="bg-kp-blue-900 text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#4da6d9_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 text-left space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">Contact Us</h1>
          <p className="text-sm sm:text-base md:text-lg text-kp-blue-100 max-w-2xl font-light leading-relaxed">
            Get in touch with our commercial sales office for technical layouts, container estimates, or wholesale quotation sheets.
          </p>
        </div>
      </section>
      
      {/* Main Form & Details Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
            
            {/* Left Column: Contact Cards */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-2">
                <span className="text-xs font-bold text-kp-blue-600 uppercase tracking-widest block">Commercial Office</span>
                <h2 className="text-3xl font-extrabold text-kp-blue-900 leading-tight">KP BIG BAGS</h2>
                <p className="text-sm text-slate-500 leading-relaxed font-light">
                  Our team is available Monday through Saturday to address technical parameters and logistics queries.
                </p>
              </div>

              {/* Cards List */}
              <div className="space-y-4 text-xs sm:text-sm">
                
                {/* Location */}
                <div className="flex items-start gap-4 p-5 bg-kp-blue-50/50 border border-kp-blue-100 rounded-2xl">
                  <div className="p-3 bg-kp-blue-100 text-kp-blue-600 rounded-xl shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-kp-blue-900 mb-1">Office & Facility Address</h4>
                    <p className="text-slate-600 leading-relaxed font-light mb-2">
                      Orchid Villa, Reliance Petrol Pump, Sanand-Viramgam Highway, Dist-Ahmedabad, Gujarat-382110, India
                    </p>
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=Orchid+Villa+Reliance+Petrol+Pump+Sanand-Viramgam+Highway+Dist-Ahmedabad+Gujarat-382110" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-xs font-bold text-kp-blue-600 hover:text-kp-blue-800 transition-colors"
                    >
                      View on Google Maps &rarr;
                    </a>
                  </div>
                </div>

                {/* Phones */}
                <div className="flex items-start gap-4 p-5 bg-kp-blue-50/50 border border-kp-blue-100 rounded-2xl">
                  <div className="p-3 bg-kp-blue-100 text-kp-blue-600 rounded-xl shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-kp-blue-900 mb-1">Phone Connection</h4>
                    <div className="flex flex-col gap-1 text-slate-600 font-light">
                      <p>Corporate: <a href="tel:+918840575264" className="font-semibold text-kp-blue-950 hover:underline">+91 88405 75264</a></p>
                    </div>
                  </div>
                </div>

                {/* Emails */}
                <div className="flex items-start gap-4 p-5 bg-kp-blue-50/50 border border-kp-blue-100 rounded-2xl">
                  <div className="p-3 bg-kp-blue-100 text-kp-blue-600 rounded-xl shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-kp-blue-900 mb-1">Email Inquiries</h4>
                    <div className="flex flex-col gap-1 text-slate-600 font-light">
                      <p>B2B Sales: <a href="mailto:sales@kpbigbags.com" className="font-semibold text-kp-blue-950 hover:underline">sales@kpbigbags.com</a></p>
                      <p>Information Desk: <a href="mailto:info@kpBigBags.com" className="font-semibold text-kp-blue-950 hover:underline">info@kpBigBags.com</a></p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-slate-50 border border-kp-blue-100 p-6 sm:p-8 rounded-3xl shadow-inner">
                <div className="border-b border-kp-blue-100 pb-4 mb-6">
                  <span className="text-[10px] text-kp-blue-600 font-extrabold uppercase tracking-widest block mb-1">Get in Touch</span>
                  <h3 className="text-xl font-bold text-kp-blue-900">Send an Online Message</h3>
                </div>

                {isSubmitted ? (
                  <div className="bg-white border border-green-100 p-8 rounded-2xl text-center space-y-4 shadow-sm animate-scale-up">
                    <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
                    <h4 className="font-bold text-slate-800 text-lg">Message Dispatched</h4>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-light max-w-md mx-auto">
                      Thank you for contacting us. Your message has been routed to our Ahmedabad sales office. We will reply to your registered email address shortly.
                    </p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="mt-2 bg-kp-blue-600 hover:bg-kp-blue-700 text-white px-5 py-2.5 rounded-lg text-xs font-semibold transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4 text-xs sm:text-sm">
                    {errorMsg && (
                      <div className="bg-red-50 text-red-600 p-3 rounded-lg font-semibold text-xs border border-red-100">
                        {errorMsg}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-700 block">Your Name <span className="text-red-500">*</span></label>
                        <input 
                          type="text" 
                          name="name" 
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-white border border-slate-200 focus:border-kp-blue-600 rounded-lg p-2.5 focus:outline-none transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-700 block">Work Email <span className="text-red-500">*</span></label>
                        <input 
                          type="email" 
                          name="email" 
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-white border border-slate-200 focus:border-kp-blue-600 rounded-lg p-2.5 focus:outline-none transition-colors"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-700 block">Phone Number <span className="text-red-500">*</span></label>
                        <input 
                          type="tel" 
                          name="phone" 
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-white border border-slate-200 focus:border-kp-blue-600 rounded-lg p-2.5 focus:outline-none transition-colors"
                          placeholder="+91 99999 99999"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-700 block">Subject</label>
                        <input 
                          type="text" 
                          name="subject" 
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="w-full bg-white border border-slate-200 focus:border-kp-blue-600 rounded-lg p-2.5 focus:outline-none transition-colors"
                          placeholder="B2B Wholesale Inquiry"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 block">Message Details <span className="text-red-500">*</span></label>
                      <textarea 
                        name="message" 
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows="5"
                        className="w-full bg-white border border-slate-200 focus:border-kp-blue-600 rounded-lg p-2.5 focus:outline-none transition-colors resize-none"
                        placeholder="Please write details of your requirements here..."
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="w-full flex items-center justify-center gap-2 bg-kp-blue-600 hover:bg-kp-blue-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-all duration-300 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Embedded Map Section */}
      <section className="w-full h-80 sm:h-96 border-t border-kp-blue-100 bg-slate-100 relative">
        <iframe 
          title="KP BIG BAGS Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117462.62886737525!2d72.33924716766444!3d23.07123910398418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc04df6b094db%3A0xe54d920042f9e422!2sSanand%20-%20Viramgam%20Hwy%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </div>
  );
}
