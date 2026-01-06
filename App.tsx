import React, { useState, useEffect } from 'react';
import { SERVICES, BENEFITS, PARTNERS, FAQS } from './constants';
import WhatsAppButton from './components/WhatsAppButton';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePartner, setActivePartner] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Form State
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Solar Installation',
    details: ''
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=1200&auto=format&fit=crop';
    target.onerror = null;
  };

  const saveToSafetyNet = (data: any) => {
    try {
      const existingLeads = JSON.parse(localStorage.getItem('es_leads_backup') || '[]');
      existingLeads.push({ ...data, timestamp: new Date().toISOString() });
      localStorage.setItem('es_leads_backup', JSON.stringify(existingLeads.slice(-20))); // Keep last 20
      console.log('Lead saved to local safety net.');
    } catch (e) {
      console.error('Safety net failed', e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      const formParams = new URLSearchParams();
      formParams.append('Name', formData.name);
      formParams.append('Phone', formData.phone);
      formParams.append('Email', formData.email);
      formParams.append('Service', formData.service);
      formParams.append('Message', formData.details);
      formParams.append('_subject', `New Lead from ElectroSpark: ${formData.name}`);
      formParams.append('_template', 'table');
      formParams.append('_captcha', 'false');

      const response = await fetch('https://formsubmit.co/ajax/electrospark1@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        body: formParams.toString()
      });

      const data = await response.json();

      if (response.ok && data.success) {
        saveToSafetyNet(formData);
        setFormStatus('success');
      } else {
        console.error('FormSubmit Error:', data);
        setFormStatus('error');
      }
    } catch (error) {
      console.error('Network error during submission:', error);
      setFormStatus('error');
    }
  };

  const generateWhatsAppLink = () => {
    const text = `Hello ElectroSpark! I am requesting a quote:\n\nName: ${formData.name}\nPhone: ${formData.phone}\nService: ${formData.service}\nDetails: ${formData.details}`;
    return `https://wa.me/27724904296?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen">
      {/* Sticky Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center relative z-50">
          <div className="flex items-center cursor-pointer" onClick={() => scrollToSection('home')}>
            <span className={`text-2xl font-black tracking-tighter ${isScrolled || isMenuOpen ? 'text-gray-900' : 'text-white md:text-gray-900'}`}>
              ELECTRO<span className="text-yellow-500">SPARK</span>
            </span>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            {['Home', 'Services', 'About', 'Partners', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`text-sm font-bold uppercase tracking-widest hover:text-yellow-500 transition-colors ${
                  isScrolled ? 'text-gray-700' : 'text-gray-100'
                }`}
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-yellow-500 text-black px-6 py-2.5 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-yellow-600 transition-all shadow-lg hover:shadow-yellow-500/20"
            >
              Get Quote
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <a href="https://wa.me/27724904296" target="_blank" rel="noopener noreferrer" className={`text-2xl ${isScrolled || isMenuOpen ? 'text-[#25D366]' : 'text-white'}`}>
              <i className="fa-brands fa-whatsapp"></i>
            </a>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`${isScrolled || isMenuOpen ? 'text-gray-900' : 'text-white'} p-2 outline-none`}
            >
              <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'} text-2xl transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`md:hidden fixed inset-0 bg-white z-40 transition-all duration-500 ease-in-out transform ${
          isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}>
          <div className="flex flex-col items-center justify-center h-full space-y-8 px-4">
            {['Home', 'Services', 'About', 'Partners', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-3xl font-black uppercase tracking-widest text-gray-900 hover:text-yellow-500 transition-colors"
              >
                {item}
              </button>
            ))}
            <div className="pt-8 w-full max-w-xs space-y-4">
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full bg-yellow-500 text-black py-4 rounded-full font-black text-xl uppercase tracking-widest shadow-xl"
              >
                Get Quote
              </button>
              <a 
                href="https://wa.me/27724904296"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] text-white py-4 rounded-full font-black text-xl uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl"
              >
                <i className="fa-brands fa-whatsapp text-2xl"></i> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop"
            className="w-full h-full object-cover brightness-50"
            alt="Electrician at work"
            onError={handleImageError}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              POWERING YOUR <span className="text-yellow-500 underline decoration-4 underline-offset-8">WORLD</span> WITH PRECISION
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
              Leading electrical solutions for residential, commercial, and industrial projects. From solar transformations to legally compliant certificates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-yellow-500 text-black px-10 py-4 rounded-full font-black text-lg uppercase tracking-wider hover:bg-yellow-400 transition-all transform hover:-translate-y-1 shadow-2xl"
              >
                Get Started Today
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-full font-black text-lg uppercase tracking-wider hover:bg-white/20 transition-all"
              >
                Our Services
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <i className="fa-solid fa-chevron-down text-white text-2xl cursor-pointer" onClick={() => scrollToSection('services')}></i>
        </div>
      </section>

      {/* Services Overview Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h4 className="text-yellow-500 font-bold uppercase tracking-widest">Expert Solutions</h4>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">What We Do</h2>
            <div className="w-20 h-1 bg-yellow-500 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="h-[450px] md:h-[400px] w-full overflow-hidden bg-gray-100 relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    loading="eager"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-60"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
                     <i className={`fa-solid ${service.icon} text-9xl text-black`}></i>
                  </div>
                </div>
                
                <div className="p-10 relative -mt-20 bg-white mx-6 rounded-3xl shadow-lg mb-8 border border-gray-50">
                  <div className="w-16 h-16 bg-yellow-500 text-black rounded-2xl flex items-center justify-center mb-6 text-3xl shadow-lg transition-transform group-hover:rotate-6">
                    <i className={`fa-solid ${service.icon}`}></i>
                  </div>
                  <h3 className="text-2xl font-black mb-4 text-gray-900">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                    {service.description}
                  </p>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="w-full py-4 rounded-xl bg-gray-900 text-white font-black uppercase tracking-widest text-sm hover:bg-yellow-500 hover:text-black transition-all flex items-center justify-center gap-3"
                  >
                    Enquire Now <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="about" className="py-24 bg-gray-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h4 className="text-yellow-500 font-bold uppercase tracking-widest">Why ElectroSpark?</h4>
              <h2 className="text-4xl md:text-6xl font-black">UNCOMPROMISING SAFETY, EXCEPTIONAL SERVICE</h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                With years of industry presence, we have built a reputation for tackling the most complex electrical challenges. We prioritize safety above all else, ensuring every wire we pull meets international standards.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                {BENEFITS.map((benefit) => (
                  <div key={benefit.id} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-yellow-500 flex items-center justify-center text-gray-900 text-xl">
                      <i className={`fa-solid ${benefit.icon}`}></i>
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{benefit.title}</h4>
                      <p className="text-sm text-gray-400">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-yellow-500/20 rounded-2xl blur-2xl group-hover:bg-yellow-500/30 transition-all"></div>
              <img
                src="https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=1887&auto=format&fit=crop"
                alt="Expertise"
                className="relative rounded-2xl w-full h-[600px] object-cover border border-white/10 shadow-2xl"
                onError={handleImageError}
              />
              <div className="absolute bottom-10 left-10 right-10 bg-white/10 backdrop-blur-xl p-8 rounded-xl border border-white/20">
                <div className="flex justify-between items-center">
                  <div className="text-center">
                    <div className="text-3xl font-black text-yellow-500">100%</div>
                    <div className="text-xs uppercase tracking-widest text-gray-300">Safety Compliance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-yellow-500">15+</div>
                    <div className="text-xs uppercase tracking-widest text-gray-300">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-yellow-500">5k+</div>
                    <div className="text-xs uppercase tracking-widest text-gray-300">Projects Done</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h4 className="text-yellow-500 font-bold uppercase tracking-widest">Our Affiliations</h4>
            <h2 className="text-4xl font-black text-gray-900">Certified & Trusted</h2>
            <p className="text-gray-600">We work with the leading regulatory bodies to ensure quality.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PARTNERS.map((partner) => (
              <div
                key={partner.id}
                onClick={() => setActivePartner(activePartner === partner.id ? null : partner.id)}
                className={`bg-white p-8 rounded-2xl border transition-all cursor-pointer ${
                  activePartner === partner.id ? 'border-yellow-500 shadow-xl ring-2 ring-yellow-500/20' : 'border-gray-200 hover:border-yellow-300'
                }`}
              >
                <div className="h-24 flex items-center justify-center mb-6 grayscale hover:grayscale-0 transition-all">
                  <img src={partner.logo} alt={partner.name} className="max-h-full max-w-full object-contain" onError={handleImageError} />
                </div>
                <h3 className="text-center font-bold text-gray-900 mb-2">{partner.name}</h3>
                {activePartner === partner.id && (
                  <p className="text-sm text-gray-600 text-center animate-fadeIn py-2 border-t mt-4 leading-relaxed">
                    {partner.description}
                  </p>
                )}
                <div className="text-center mt-4">
                  <i className={`fa-solid ${activePartner === partner.id ? 'fa-chevron-up' : 'fa-chevron-down'} text-gray-400 text-xs`}></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Engagement Section */}
      <section id="contact" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20">
            <div className="space-y-12">
              <div className="space-y-4">
                <h4 className="text-yellow-500 font-bold uppercase tracking-widest">Contact Us</h4>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900">Let's Discuss Your Project</h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Fill out the form and our technical team will get back to you within 2 business hours for an assessment and quote.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex gap-6 items-start">
                  <div className="w-14 h-14 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-600 text-xl">
                    <i className="fa-solid fa-phone"></i>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 uppercase font-bold tracking-widest mb-1">Call Support</div>
                    <a href="tel:+27724904296" className="text-xl font-bold text-gray-900 block hover:text-yellow-600 transition-colors">+27 72 490 4296</a>
                    <a 
                      href="https://wa.me/27724904296" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-2 mt-2 bg-[#25D366] text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-[#20ba5a] transition-all"
                    >
                      <i className="fa-brands fa-whatsapp"></i> Chat on WhatsApp
                    </a>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-14 h-14 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-600 text-xl">
                    <i className="fa-solid fa-envelope"></i>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 uppercase font-bold tracking-widest mb-1">Email Us</div>
                    <a href="mailto:electrospark1@gmail.com" className="text-xl font-bold text-gray-900 block hover:text-yellow-600 transition-colors">electrospark1@gmail.com</a>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-14 h-14 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-600 text-xl">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 uppercase font-bold tracking-widest mb-1">Office Location</div>
                    <div className="text-xl font-bold text-gray-900">Cape Town, Western Cape, South Africa</div>
                  </div>
                </div>
              </div>

              {/* FAQ Accordion */}
              <div className="pt-12 border-t border-gray-100">
                <h3 className="text-2xl font-black mb-8">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {FAQS.map((faq, i) => (
                    <div key={i} className="border-b border-gray-100 pb-4">
                      <button
                        onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                        className="w-full flex justify-between items-center text-left py-2 group"
                      >
                        <span className="font-bold text-gray-800 group-hover:text-yellow-600 transition-colors">{faq.question}</span>
                        <i className={`fa-solid ${activeFaq === i ? 'fa-minus' : 'fa-plus'} text-xs text-yellow-500`}></i>
                      </button>
                      {activeFaq === i && (
                        <p className="text-gray-600 text-sm mt-2 animate-fadeIn leading-relaxed">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-10 rounded-3xl border border-gray-200 shadow-2xl relative">
              <div className="absolute top-0 right-0 p-4">
                <i className="fa-solid fa-bolt-lightning text-yellow-500/10 text-9xl"></i>
              </div>
              
              {formStatus === 'success' ? (
                <div className="relative z-10 flex flex-col items-center justify-center py-10 text-center animate-fadeIn">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mb-6">
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">Thank You!</h3>
                  <p className="text-gray-600 mb-8 text-lg leading-relaxed max-w-sm">
                    Your request has been received. Our technical team will review your requirements and contact you shortly.
                  </p>
                  
                  <div className="flex flex-col gap-4 w-full">
                    <a 
                      href={generateWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#25D366] text-white py-4 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl hover:bg-[#20ba5a] transition-all"
                    >
                      <i className="fa-brands fa-whatsapp text-2xl"></i> Chat on WhatsApp
                    </a>
                    
                    <button 
                      onClick={() => setFormStatus('idle')}
                      className="text-gray-500 font-bold hover:text-gray-900 transition-colors text-sm"
                    >
                      Return to Website
                    </button>
                  </div>
                </div>
              ) : (
                <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                  {formStatus === 'error' && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100 animate-shake">
                      An error occurred. Please try again or contact us via WhatsApp.
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase font-black text-gray-500 tracking-widest">Full Name</label>
                      <input 
                        required
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all" 
                        placeholder="John Doe" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase font-black text-gray-500 tracking-widest">Phone Number</label>
                      <input 
                        required
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all" 
                        placeholder="+27 ..." 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-black text-gray-500 tracking-widest">Email Address</label>
                    <input 
                      required
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all" 
                      placeholder="john@example.com" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-black text-gray-500 tracking-widest">Service Required</label>
                    <select 
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option>Solar Installation</option>
                      <option>Maintenance & Repair</option>
                      <option>COC Certification</option>
                      <option>Full Rewire</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-black text-gray-500 tracking-widest">Project Details</label>
                    <textarea 
                      required
                      rows={4} 
                      name="details"
                      value={formData.details}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all" 
                      placeholder="Tell us more about your needs..."
                    ></textarea>
                  </div>
                  <button
                    disabled={formStatus === 'submitting'}
                    type="submit"
                    className="w-full bg-gray-900 text-yellow-500 py-5 rounded-xl font-black uppercase tracking-widest text-lg hover:bg-black hover:text-yellow-400 disabled:bg-gray-800 disabled:text-gray-500 transition-all shadow-xl flex items-center justify-center gap-3 group"
                  >
                    {formStatus === 'submitting' ? (
                      <><i className="fa-solid fa-spinner animate-spin"></i> Submitting...</>
                    ) : (
                      <><span className="group-hover:translate-x-1 transition-transform">Request Your Free Quote</span> <i className="fa-solid fa-paper-plane group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform"></i></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
            <div className="space-y-6">
              <span className="text-3xl font-black tracking-tighter">
                ELECTRO<span className="text-yellow-500">SPARK</span>
              </span>
              <p className="text-gray-500 leading-relaxed">
                South Africa's premier electrical service provider. We deliver power where it matters most, with a commitment to excellence and safety.
              </p>
              <div className="flex gap-4">
                <a href="https://wa.me/27724904296" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all">
                  <i className="fa-brands fa-whatsapp text-xl"></i>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-8 uppercase tracking-widest text-yellow-500">Quick Links</h4>
              <ul className="space-y-4 text-gray-400">
                {['Home', 'Services', 'About', 'Partners', 'Contact'].map(link => (
                  <li key={link}>
                    <button onClick={() => scrollToSection(link.toLowerCase())} className="hover:text-yellow-500 transition-colors">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-8 uppercase tracking-widest text-yellow-500">Our Services</h4>
              <ul className="space-y-4 text-gray-400">
                {['Solar Systems', 'COC Testing', 'Industrial DBs', 'Maintenance', 'Residential Wiring'].map(svc => (
                  <li key={svc}>
                    <button onClick={() => scrollToSection('services')} className="hover:text-yellow-500 transition-colors">
                      {svc}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-8 uppercase tracking-widest text-yellow-500">Business Hours</h4>
              <ul className="space-y-4 text-gray-400">
                <li className="flex justify-between">
                  <span>Mon - Fri:</span>
                  <span className="text-white">08:00 - 17:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="text-white">09:00 - 13:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="text-white">Emergency Only</span>
                </li>
                <li className="pt-4 text-yellow-500 font-bold flex items-center gap-2">
                  <i className="fa-solid fa-circle-check"></i> 24/7 Rapid Response Available
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:row justify-between items-center gap-8 text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} ElectroSpark. All Rights Reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
};

export default App;