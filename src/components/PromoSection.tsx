import Link from "next/link";

const stats = [
  { value: "10K+", label: "Happy Customers", icon: "😊" },
  { value: "500+", label: "Products", icon: "📦" },
  { value: "10", label: "Categories", icon: "🏪" },
  { value: "24/7", label: "Support", icon: "🎧" },
];

const PromoSection = () => (
  <section className="py-14">
    <div className="container">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
        {stats.map((s, i) => (
          <div key={i} className="bg-secondary border border-border rounded-2xl p-5 text-center hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="text-3xl mb-2 animate-float" style={{ animationDelay: `${i * 0.3}s` }}>{s.icon}</div>
            <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">{s.value}</div>
            <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Promo Banner */}
      <div className="relative overflow-hidden rounded-3xl text-white" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>
        {/* glow effect */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 70% 50%, rgba(255,153,0,0.25) 0%, transparent 60%)' }} />
        {/* animated circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-orange-500/10 animate-pulse2" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-amber-400/10 animate-pulse2" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 p-8 md:p-12">
          <div>
            <p className="text-orange-400 font-semibold text-sm uppercase tracking-widest mb-2">Limited Time Offer</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Get <span className="text-orange-400">20% OFF</span> on<br />Your First Order!
            </h2>
            <p className="text-white/70 max-w-md">Use code <span className="bg-orange-500/30 px-2 py-0.5 rounded font-mono font-bold text-orange-300">SHOPEASY20</span> at checkout</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/shops" className="btn-primary-gradient text-center">
              Shop Now →
            </Link>
            <Link href="/deals" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-white/20 transition-all duration-300 text-center">
              View Deals
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default PromoSection;
