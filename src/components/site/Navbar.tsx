import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/ceyvora-logo.png";

const links = [
  { label: "Products", href: "#specs" },
  { label: "The Bond", href: "#bond" },
  { label: "Standards", href: "#specs" },
  { label: "Inquiry", href: "#inquiry" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 glass-nav transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <nav className="container flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="Taste of Ceylon logo"
            className="h-11 w-11 rounded-full object-cover ring-1 ring-primary/40 shadow-gold/30 transition-transform group-hover:scale-105"
          />
          <div className="leading-none">
            <div className="font-serif text-xl tracking-wide">Taste of Ceylon</div>
            <div className="hairline text-primary/80 mt-1">Ceylon Spices</div>
          </div>
        </a>

        <ul className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="text-sm text-foreground/80 hover:text-primary transition-colors relative group"
              >
                {l.label}
                <span className="absolute -bottom-2 left-0 h-px w-0 bg-primary transition-all duration-500 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#inquiry"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-gold text-primary-foreground text-sm font-medium hover:shadow-gold transition-all"
        >
          Request Quote
        </a>

        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden container mt-4 pb-4 animate-fade-in">
          <ul className="flex flex-col gap-4">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-foreground/80 hover:text-primary"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#inquiry"
                onClick={() => setOpen(false)}
                className="inline-flex px-5 py-2.5 rounded-full bg-gradient-gold text-primary-foreground text-sm font-medium"
              >
                Request Quote
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
