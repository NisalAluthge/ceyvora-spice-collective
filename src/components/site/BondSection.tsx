import { useEffect, useRef } from "react";
import handsImg from "@/assets/founders-hands.jpg";
import { Handshake, Eye, Users } from "lucide-react";

const BondSection = () => {
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!imgRef.current) return;
      const rect = imgRef.current.getBoundingClientRect();
      const offset = (window.innerHeight - rect.top) * 0.08;
      imgRef.current.style.transform = `translate3d(0, ${-offset}px, 0) scale(1.1)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="bond" className="relative py-28 md:py-40 overflow-hidden border-t border-primary/10">
      <div className="absolute inset-0 bg-gradient-radial-gold opacity-40" />

      <div className="container relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Image with parallax */}
          <div className="lg:col-span-5 relative">
            <div className="relative h-[520px] rounded-2xl overflow-hidden shadow-luxe">
              <div
                ref={imgRef}
                className="absolute inset-0 parallax-slow"
                style={{
                  backgroundImage: `url(${handsImg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
            {/* Floating credential card */}
            <div className="absolute -bottom-6 -right-4 md:-right-10 glass-card rounded-xl p-5 w-64 shadow-luxe">
              <div className="hairline text-primary mb-2">Founders</div>
              <div className="font-serif text-xl">Nisal & Shashikala</div>
              <div className="text-xs text-foreground/60 mt-1">Taste of Ceylon · Galle, Sri Lanka</div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-7 lg:pl-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-12 bg-primary" />
              <span className="hairline text-primary">The Taste of Ceylon Bond</span>
            </div>
            <h2 className="font-serif text-4xl md:text-6xl leading-[1.05]">
              Human-verified sourcing, <em className="italic text-gold-gradient not-italic">not</em> automated aggregation.
            </h2>
            <p className="mt-8 text-foreground/75 text-lg leading-relaxed">
              Founded by Nisal and Shashikala, Taste of Ceylon operates on a simple premise: the finest Ceylon spice is a product of human judgment — of hands that have stripped bark for thirty years, of eyes that know when a peppercorn has reached its density.
            </p>
            <p className="mt-4 text-foreground/75 text-lg leading-relaxed">
              We visit every farm. We grade every lot ourselves. We refuse the convenience of algorithms where craft is required.
            </p>

            <div className="mt-12 grid sm:grid-cols-3 gap-5">
              {[
                { icon: Handshake, k: "Direct Farm Bonds", v: "No middlemen, ever." },
                { icon: Eye, k: "Hand-Graded", v: "Every lot, every time." },
                { icon: Users, k: "Fair Partnerships", v: "Farmers earn 2× market." },
              ].map(({ icon: Icon, k, v }) => (
                <div key={k} className="p-5 rounded-xl border border-primary/20 bg-secondary/40">
                  <Icon className="text-primary mb-3" size={22} strokeWidth={1.5} />
                  <div className="font-serif text-lg">{k}</div>
                  <div className="text-sm text-foreground/60 mt-1">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BondSection;
