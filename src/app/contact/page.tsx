import ContactForm from "@/components/forms/ContactForm";
import { Metadata } from "next";
import { FaGithub, FaLinkedinIn, FaTwitter, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us - ShopEasy",
  description: "Get in touch with ShopEasy support team",
};

const ContactPage = () => {
  return (
    <div className="pb-20">
      {/* Hero */}
      <div className="relative overflow-hidden py-16 text-white" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)' }}>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 70% 50%, rgba(255,153,0,0.2) 0%, transparent 60%)' }} />
        <div className="absolute top-8 right-16 w-24 h-24 rounded-full bg-orange-500/10 animate-float" />
        <div className="container relative z-10 text-center">
          <p className="text-orange-400 font-semibold text-sm uppercase tracking-widest mb-2">We&apos;d Love to Hear From You</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Contact <span className="text-orange-400">Us</span></h1>
          <p className="text-white/70 max-w-lg mx-auto">Have a question or feedback? Our team is here to help you 24/7.</p>
        </div>
      </div>

      <div className="container py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {/* Info */}
          <div className="md:col-span-2 flex flex-col gap-5">
            {[
              { icon: <FaMapMarkerAlt />, label: "Address", value: "Indore, India", color: "text-orange-500" },
              { icon: <FaPhone />, label: "Phone", value: "+91 6261964512", color: "text-green-500" },
              { icon: <FaEnvelope />, label: "Email", value: "vivekjhariya241@gmail.com", color: "text-blue-500" },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start bg-secondary border border-border rounded-2xl p-5 hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
                <div className={`text-xl mt-0.5 ${item.color}`}>{item.icon}</div>
                <div>
                  <p className="font-semibold text-sm">{item.label}</p>
                  <p className="text-muted-foreground text-sm mt-0.5">{item.value}</p>
                </div>
              </div>
            ))}

            <div className="bg-secondary border border-border rounded-2xl p-5">
              <p className="font-semibold mb-3">Follow Us</p>
              <div className="flex gap-3">
                {[
                  { href: "https://github.com/vivekjhariya", icon: <FaGithub />, color: "hover:bg-gray-800 hover:text-white" },
                  { href: "https://linkedin.com/in/vivekjhariya", icon: <FaLinkedinIn />, color: "hover:bg-blue-600 hover:text-white" },
                  { href: "https://twitter.com/vivekjhariya", icon: <FaTwitter />, color: "hover:bg-sky-500 hover:text-white" },
                ].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-full border border-border flex items-center justify-center transition-all duration-300 ${s.color}`}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3 bg-secondary border border-border rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold mb-1">Send a Message</h2>
            <p className="text-muted-foreground text-sm mb-6">We&apos;ll get back to you within 24 hours</p>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
