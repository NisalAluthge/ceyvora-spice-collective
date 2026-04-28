import pepperImg from "@/assets/spice-pepper.jpg";
import flatlayImg from "@/assets/spices-flatlay.jpg";
import { ShieldCheck, Droplets, Award, Sprout, FlaskConical, Leaf } from "lucide-react";

const specs = [
  { label: "Compliance", value: "SLS 81:2021", note: "Sri Lanka Standards Institute" },
  { label: "Moisture Content", value: "< 12%", note: "Verified per batch" },
  { label: "Contamination", value: "Zero", note: "Heavy metal & pesticide screened" },
  { label: "Cinnamon Grade", value: "Alba", note: "≤ 6mm diameter, pale quills" },
  { label: "Pepper Grade", value: "Grade 1", note: "550+ g/L bulk density" },
  { label: "Traceability", value: "Farm-ID", note: "Lot-level origin tracking" },
];

const SpecsSection = () => {
  return (
    <section id="specs" className="relative py-28 md:py-40 bg-background">
      <div className="container">
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-12 bg-primary" />
            <span className="hairline text-primary">Technical Specifications</span>
          </div>
          <h2 className="font-serif text-4xl md:text-6xl leading-tight">
            Export standards held to an <em className="text-gold-gradient not-italic">uncompromising</em> benchmark.
          </h2>
          <p className="mt-6 text-foreground/70 text-lg max-w-2xl">
            Every lot leaves our facility with documented provenance, laboratory verification, and adherence to the most rigorous Ceylon export protocols.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-5 auto-rows-[minmax(160px,auto)]">
          {/* Big feature — Alba Cinnamon */}
          <div
            className="md:col-span-3 md:row-span-2 bento-card overflow-hidden p-10 flex flex-col justify-between min-h-[420px] grain"
            style={{
              backgroundImage: `url(${pepperImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="relative z-10 bg-background/70 backdrop-blur-sm inline-flex w-fit px-4 py-2 rounded-full border border-primary/40">
              <span className="hairline text-primary">Signature Product</span>
            </div>
            <div className="relative z-10">
              <h3 className="font-serif text-4xl md:text-5xl text-cream">Alba Cinnamon</h3>
              <p className="mt-3 text-cream/80 max-w-md">
                The rarest grade of Ceylon cinnamon — pale, tightly rolled quills with a delicate, clove-forward aroma.
              </p>
            </div>
          </div>

          {/* Spec tiles */}
          {specs.slice(0, 3).map((s, i) => (
            <div key={s.label} className="md:col-span-3 bento-card-dark p-7 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <span className="hairline text-primary/80">{s.label}</span>
                <span className="text-xs text-foreground/40">0{i + 1}</span>
              </div>
              <div>
                <div className="font-serif text-3xl md:text-4xl text-primary">{s.value}</div>
                <div className="text-sm text-foreground/60 mt-2">{s.note}</div>
              </div>
            </div>
          ))}

          {/* Bottom row tiles */}
          <div className="md:col-span-2 bento-card-dark p-7 flex flex-col justify-between">
            <ShieldCheck className="text-primary" size={28} strokeWidth={1.5} />
            <div>
              <div className="font-serif text-xl">Lab Verified</div>
              <div className="text-sm text-foreground/60 mt-1">Every export lot</div>
            </div>
          </div>
          <div className="md:col-span-2 bento-card-dark p-7 flex flex-col justify-between">
            <Droplets className="text-primary" size={28} strokeWidth={1.5} />
            <div>
              <div className="font-serif text-xl">Moisture Cap</div>
              <div className="text-sm text-foreground/60 mt-1">&lt; 12% guaranteed</div>
            </div>
          </div>
          <div className="md:col-span-2 bento-card-dark p-7 flex flex-col justify-between">
            <Award className="text-primary" size={28} strokeWidth={1.5} />
            <div>
              <div className="font-serif text-xl">SLS Certified</div>
              <div className="text-sm text-foreground/60 mt-1">81:2021 compliance</div>
            </div>
          </div>

          {/* Wide image + grades */}
          <div
            className="md:col-span-4 bento-card overflow-hidden min-h-[280px] grain relative"
            style={{
              backgroundImage: `url(${flatlayImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/30 to-transparent" />
            <div className="relative z-10 p-8 h-full flex flex-col justify-end">
              <h3 className="font-serif text-3xl text-cream">Grade 1 Black Pepper</h3>
              <p className="text-cream/80 mt-2 max-w-md">Dense, aromatic, sun-dried peppercorns — cultivated in the Matale highlands.</p>
            </div>
          </div>

          <div className="md:col-span-2 bento-card-dark p-7 flex flex-col justify-between">
            <Sprout className="text-primary" size={28} strokeWidth={1.5} />
            <div>
              <div className="font-serif text-xl">Farm-ID Tracing</div>
              <div className="text-sm text-foreground/60 mt-1">Lot-level origin</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecsSection;
