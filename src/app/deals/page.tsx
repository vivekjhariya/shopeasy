"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaTag, FaClock, FaFire, FaCopy, FaCheck } from "react-icons/fa";
import Link from "next/link";

const flashDeals = [
  { title: "Electronics Sale", discount: "50% OFF", endsIn: "2h 30m", emoji: "📱", link: "/shops/gadgets", color: "from-blue-600 to-cyan-500" },
  { title: "Fashion Week", discount: "40% OFF", endsIn: "5h 15m", emoji: "👗", link: "/shops/clothing", color: "from-pink-600 to-rose-500" },
  { title: "Home Decor", discount: "30% OFF", endsIn: "1h 45m", emoji: "🛋️", link: "/shops/furniture", color: "from-amber-600 to-orange-500" },
  { title: "Beauty Deals", discount: "35% OFF", endsIn: "3h 00m", emoji: "💄", link: "/shops/makeup", color: "from-purple-600 to-fuchsia-500" },
  { title: "Fresh Grocery", discount: "25% OFF", endsIn: "6h 20m", emoji: "🥦", link: "/shops/grocery", color: "from-green-600 to-emerald-500" },
  { title: "Book Bonanza", discount: "45% OFF", endsIn: "4h 10m", emoji: "📚", link: "/shops/books", color: "from-orange-600 to-red-500" },
];

const coupons = [
  { code: "SHOPEASY20", discount: "20% OFF", minOrder: "$50", desc: "On all orders above $50" },
  { code: "FIRST10", discount: "10% OFF", minOrder: "$30", desc: "For first-time buyers" },
  { code: "FREESHIP", discount: "Free Shipping", minOrder: "$40", desc: "On orders above $40" },
  { code: "GADGET15", discount: "15% OFF", minOrder: "$60", desc: "On electronics only" },
];

const CouponCard = ({ code, discount, minOrder, desc }: typeof coupons[0]) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="bg-secondary border-2 border-dashed border-primary/40 hover:border-primary rounded-2xl p-6 text-center hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group">
      <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Use Code</p>
      <p className="text-2xl font-bold text-primary font-mono mb-1">{code}</p>
      <p className="text-lg font-semibold mb-1">{discount}</p>
      <p className="text-xs text-muted-foreground mb-4">{desc} · Min. {minOrder}</p>
      <button onClick={copy}
        className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg border font-semibold text-sm transition-all duration-300 ${copied ? "bg-green-500 text-white border-green-500" : "border-primary text-primary hover:bg-primary hover:text-white"}`}>
        {copied ? <><FaCheck /> Copied!</> : <><FaCopy /> Copy Code</>}
      </button>
    </div>
  );
};

const DealsPage = () => {
  const [couponCode, setCouponCode] = useState("");
  const [applied, setApplied] = useState(false);

  return (
    <div className="pb-20">
      {/* Hero */}
      <div className="relative overflow-hidden py-16 text-white" style={{ background: 'linear-gradient(135deg, #7c2d12 0%, #991b1b 50%, #b45309 100%)' }}>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 30% 50%, rgba(255,153,0,0.3) 0%, transparent 60%)' }} />
        <div className="absolute top-6 right-20 w-28 h-28 rounded-full bg-orange-500/10 animate-float" />
        <div className="absolute bottom-6 left-16 w-20 h-20 rounded-full bg-red-400/10 animate-float" style={{ animationDelay: '1s' }} />
        <div className="container relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-red-500/30 border border-red-400/40 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
            <FaFire className="text-orange-400 animate-pulse2" /> Limited Time Offers
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Deals & <span className="text-orange-400">Offers</span></h1>
          <p className="text-white/70 max-w-lg mx-auto">Grab the best deals before they expire. New offers added daily!</p>
        </div>
      </div>

      <div className="container py-12">
        {/* Flash Deals */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <FaFire className="text-red-500 text-2xl animate-pulse2" />
            <h2 className="text-2xl font-bold">Flash Deals</h2>
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse2">LIVE</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {flashDeals.map((deal, i) => (
              <div key={i} className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${deal.color} p-6 text-white hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 group`}>
                <div className="absolute -top-4 -right-4 text-6xl opacity-20 group-hover:opacity-30 transition-opacity">{deal.emoji}</div>
                <div className="text-3xl mb-2">{deal.emoji}</div>
                <h3 className="text-lg font-bold mb-1">{deal.title}</h3>
                <p className="text-3xl font-black mb-3">{deal.discount}</p>
                <div className="flex items-center gap-1.5 text-white/80 text-sm mb-4">
                  <FaClock className="text-xs" /> Ends in <span className="font-bold text-white">{deal.endsIn}</span>
                </div>
                <Link href={deal.link} className="block w-full text-center bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-lg py-2 font-semibold text-sm transition-all duration-300">
                  Shop Now →
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Coupons */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <FaTag className="text-primary text-xl" />
            <h2 className="text-2xl font-bold">Coupon Codes</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {coupons.map((c, i) => <CouponCard key={i} {...c} />)}
          </div>
        </div>

        {/* Apply Coupon */}
        <div className="max-w-xl mx-auto bg-gradient-to-br from-orange-500/10 to-amber-400/5 border border-orange-500/20 rounded-2xl p-8 text-center">
          <FaTag className="text-primary text-3xl mx-auto mb-3" />
          <h3 className="text-xl font-bold mb-1">Have a Coupon Code?</h3>
          <p className="text-muted-foreground text-sm mb-5">Enter your code below to apply discount at checkout</p>
          <div className="flex gap-3">
            <Input
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => { setCouponCode(e.target.value); setApplied(false); }}
              className="flex-1 rounded-xl"
            />
            <Button onClick={() => setApplied(true)} className="btn-primary-gradient border-0 rounded-xl px-5">
              Apply
            </Button>
          </div>
          {applied && couponCode && (
            <p className="mt-3 text-green-500 font-semibold text-sm flex items-center justify-center gap-1">
              <FaCheck /> Code &quot;{couponCode}&quot; applied!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DealsPage;
