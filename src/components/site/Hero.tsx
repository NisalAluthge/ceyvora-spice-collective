import { useEffect, useRef } from "react";
import heroImg from "@/assets/hero-cinnamon.jpg";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!bgRef.current) return;
      const y = window.scrollY;
      bgRef.current.style.transform = `translate3d(0, ${y * 0.25}px, 0) scale(1.08)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative min-h-[100svh] flex items-end overflow-hidden">
      {/* Parallax background */}
      <div
        ref={bgRef}
        className="absolute inset-0 parallax-slow"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-hero-overlay" />
      <div className="absolute inset-0 bg-gradient-radial-gold opacity-80" />

      <div className="container relative pb-20 pt-40 md:pb-32">
        <div className="max-w-4xl animate-fade-in-slow">
          <div className="flex items-center gap-3 mb-8">
            <span className="h-px w-12 bg-primary" />
            <span className="hairline text-primary">Est. Sri Lanka · Export Grade</span>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
            Ceyvora: <span className="italic text-gold-gradient">Redefining</span> the Ceylon Spice Standard.
          </h1>

          <p className="mt-8 text-lg md:text-xl text-foreground/75 max-w-2xl leading-relaxed">
            Direct-from-farm aggregation specializing in hand-verified Alba Cinnamon and Grade 1 Black Pepper — delivered with the rigor of a luxury house and the soul of an artisan.
          </p>

          <div className="mt-12 flex flex-wrap gap-4">
            <a
              href="#inquiry"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-gold text-primary-foreground font-medium hover:shadow-gold transition-all"
            >
              Request Bulk Quote
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#specs"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-primary/40 text-foreground hover:bg-primary/10 transition-all"
            >
              View Export Standards
            </a>
          </div>

          {/* Stats strip */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl">
            {[
              { k: "SLS 81:2021", v: "Certified" },
              { k: "< 12%", v: "Moisture" },
              { k: "0", v: "Contaminants" },
              { k: "100%", v: "Hand-Verified" },
            ].map((s) => (
              <div key={s.k} className="border-l border-primary/30 pl-4">
                <div className="font-serif text-2xl md:text-3xl text-primary">{s.k}</div>
                <div className="hairline mt-1 text-foreground/60">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 hidden md:flex items-center gap-3 text-foreground/50 hairline rotate-90 origin-bottom-right">
        <span>Scroll</span>
        <span className="h-px w-10 bg-foreground/40" />
      </div>
    </section>
  );
};

export default Hero;
