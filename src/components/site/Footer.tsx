import logo from "@/assets/ceyvora-logo.png";

const Footer = () => {
  return (
    <footer className="relative border-t border-primary/10 py-16 bg-background">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Taste of Ceylon logo"
                className="h-12 w-12 rounded-full object-cover ring-1 ring-primary/40"
              />
              <div>
                <div className="font-serif text-xl">Taste of Ceylon</div>
                <div className="hairline text-primary/80 mt-1">Ceylon Spices</div>
              </div>
            </div>
            <p className="mt-6 text-foreground/60 max-w-sm">
              A premium B2B aggregation house specializing in hand-verified Ceylon spices for discerning export partners worldwide.
            </p>
          </div>

          <div>
            <div className="hairline text-primary mb-4">Contact</div>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>Galle, Sri Lanka</li>
              <li>export@ceyvora.lk</li>
              <li>+94 91 000 0000</li>
            </ul>
          </div>

          <div>
            <div className="hairline text-primary mb-4">Compliance</div>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>SLS 81:2021</li>
              <li>ISO 22000 In Process</li>
              <li>EU Organic Certified</li>
            </ul>
          </div>
        </div>

        <div className="gold-divider mt-12 mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-foreground/40">
          <div>© {new Date().getFullYear()} Taste of Ceylon (Pvt) Ltd. All rights reserved.</div>
          <div className="hairline">Crafted in Ceylon</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
