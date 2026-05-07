import Logo from "@/assets/Logo";
import Link from "next/link";
import { FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border mt-10">
      {/* Newsletter */}
      <div className="relative overflow-hidden py-12" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)' }}>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,153,0,0.15) 0%, transparent 70%)' }} />
        <div className="container relative z-10 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Stay in the Loop 📬</h2>
          <p className="text-white/60 mb-6 text-sm max-w-sm mx-auto">Subscribe for exclusive deals, new arrivals, and updates</p>
          <form className="flex justify-center items-center max-w-sm mx-auto w-full gap-2">
            <Input type="email" placeholder="Your email address" className="bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-xl" />
            <Button type="submit" className="btn-primary-gradient border-0 rounded-xl px-4">
              <IoMdSend className="text-lg" />
            </Button>
          </form>
        </div>
      </div>

      {/* Links */}
      <div className="container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <Logo />
            <p className="text-muted-foreground text-sm mt-4 leading-relaxed">
              Your one-stop modern e-commerce destination. Quality products, great prices, fast delivery.
            </p>
            <div className="flex gap-3 mt-5">
              {[
                { href: "https://github.com/vivekjhariya", icon: <FaGithub />, label: "GitHub" },
                { href: "https://twitter.com/vivekjhariya", icon: <FaTwitter />, label: "Twitter" },
                { href: "https://linkedin.com/in/vivekjhariya", icon: <FaLinkedinIn />, label: "LinkedIn" },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-base mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {[
                { label: "All Shops", href: "/shops" },
                { label: "Deals & Offers", href: "/deals" },
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-primary transition-colors duration-200 flex items-center gap-1 group">
                    <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">→</span> {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-base mb-4">Customer Service</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {[
                { label: "FAQ & Help", href: "/help" },
                { label: "Track Order", href: "/track-order" },
                { label: "My Orders", href: "/profile/orders" },
                { label: "Refund Policy", href: "#" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-primary transition-colors duration-200 flex items-center gap-1 group">
                    <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">→</span> {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-base mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>📍 Indore, India</li>
              <li><a href="mailto:vivekjhariya241@gmail.com" className="hover:text-primary transition-colors">✉️ vivekjhariya241@gmail.com</a></li>
              <li><a href="tel:+916261964512" className="hover:text-primary transition-colors">📞 +91 6261964512</a></li>
            </ul>
            <div className="mt-5 flex gap-2 flex-wrap">
              {["Gadgets", "Fashion", "Grocery"].map((tag) => (
                <Link key={tag} href={`/shops/${tag.toLowerCase()}`}
                  className="text-xs px-3 py-1 rounded-full border border-border hover:border-primary hover:text-primary transition-all duration-200">
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-border py-5">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ShopEasy. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with <span className="text-red-500 animate-heartbeat inline-block">❤️</span> by{" "}
            <a href="https://linkedin.com/in/vivekjhariya" target="_blank" rel="noopener noreferrer"
              className="text-primary hover:underline font-medium">Vivek Jhariya</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
