import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us - ShopEasy",
  description: "Learn about ShopEasy - your modern e-commerce destination",
};

const features = [
  { icon: "🚀", title: "Fast Delivery", desc: "Get your orders delivered within 2-3 business days across India" },
  { icon: "🔒", title: "Secure Payments", desc: "100% secure payment processing with end-to-end encryption" },
  { icon: "↩️", title: "Easy Returns", desc: "Hassle-free 30-day return policy on all products" },
  { icon: "🎧", title: "24/7 Support", desc: "Round-the-clock customer support to help you anytime" },
  { icon: "✅", title: "Quality Products", desc: "Curated selection of premium products from trusted brands" },
  { icon: "💰", title: "Best Prices", desc: "Competitive pricing with regular deals and discounts" },
];

const team = [
  { name: "Vivek Jhariya", role: "Founder & Developer", emoji: "👨‍💻" },
  { name: "Design Team", role: "UI/UX Design", emoji: "🎨" },
  { name: "Dev Team", role: "Engineering", emoji: "⚙️" },
];

const AboutPage = () => {
  return (
    <div className="pb-20">
      {/* Hero */}
      <div className="relative overflow-hidden py-20 text-white" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)' }}>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 30% 50%, rgba(255,153,0,0.2) 0%, transparent 60%)' }} />
        <div className="absolute top-10 right-20 w-32 h-32 rounded-full bg-orange-500/10 animate-float" />
        <div className="absolute bottom-10 left-20 w-20 h-20 rounded-full bg-amber-400/10 animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="container relative z-10 text-center">
          <p className="text-orange-400 font-semibold text-sm uppercase tracking-widest mb-3 animate-fadeInUp">Our Story</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            About <span className="text-orange-400">ShopEasy</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            A modern full-stack e-commerce platform built with Next.js 15, TypeScript, and MongoDB — designed to make online shopping effortless.
          </p>
          <div className="flex justify-center gap-4 mt-8 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <Link href="/shops" className="btn-primary-gradient">Start Shopping →</Link>
            <Link href="/contact" className="bg-white/10 border border-white/20 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-white/20 transition-all duration-300">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Mission */}
      <div className="container py-16">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Our Mission</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Making Shopping <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">Simple & Joyful</span>
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full mx-auto mb-6" />
          <p className="text-muted-foreground text-lg leading-relaxed">
            ShopEasy was built with one goal — to provide a seamless, fast, and enjoyable shopping experience. From electronics to groceries, fashion to furniture, we bring everything to your doorstep.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {features.map((f, i) => (
            <div key={i} className="bg-secondary border border-border rounded-2xl p-6 hover:border-primary/40 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group">
              <div className="text-4xl mb-4 group-hover:animate-wiggle inline-block">{f.icon}</div>
              <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors duration-200">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14">
          {[
            { v: "10K+", l: "Happy Customers" },
            { v: "500+", l: "Products" },
            { v: "10", l: "Categories" },
            { v: "99%", l: "Satisfaction Rate" },
          ].map((s, i) => (
            <div key={i} className="text-center bg-gradient-to-br from-orange-500/10 to-amber-400/5 border border-orange-500/20 rounded-2xl p-6">
              <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">{s.v}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </div>

        {/* Team */}
        <div className="mt-16 text-center">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">The People</p>
          <h2 className="text-3xl font-bold mb-8">Meet the <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">Team</span></h2>
          <div className="flex flex-wrap justify-center gap-6">
            {team.map((t, i) => (
              <div key={i} className="bg-secondary border border-border rounded-2xl p-8 w-52 hover:border-primary/40 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <div className="text-5xl mb-3 animate-float" style={{ animationDelay: `${i * 0.4}s` }}>{t.emoji}</div>
                <h3 className="font-bold">{t.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{t.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-orange-500/10 to-amber-400/5 border border-orange-500/20 rounded-3xl p-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to Start Shopping?</h2>
          <p className="text-muted-foreground mb-6">Explore thousands of products across all categories</p>
          <Link href="/shops" className="btn-primary-gradient text-base">
            Explore All Shops →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
