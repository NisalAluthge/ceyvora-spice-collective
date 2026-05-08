import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const inquirySchema = z.object({
  company: z.string().trim().min(1).max(200),
  contact: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  destination: z.string().trim().min(1).max(200),
  volume: z.string().trim().min(1).max(100),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

const InquiryForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      company: String(data.get("company") || ""),
      contact: String(data.get("contact") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      destination: String(data.get("destination") || ""),
      volume: String(data.get("volume") || ""),
      message: String(data.get("message") || ""),
    };
    const products = data.getAll("products").map(String);

    const parsed = inquirySchema.safeParse(payload);
    if (!parsed.success) {
      toast({ title: "Please check your input", description: parsed.error.errors[0].message, variant: "destructive" });
      return;
    }

    setBusy(true);
    const { data: inserted, error } = await supabase.from("inquiries").insert({
      company: parsed.data.company,
      contact: parsed.data.contact,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      destination: parsed.data.destination,
      volume: parsed.data.volume,
      products,
      message: parsed.data.message || null,
    }).select("id").single();

    if (error) {
      setBusy(false);
      toast({ title: "Submission failed", description: error.message, variant: "destructive" });
      return;
    }

    // Fire-and-forget email notification
    supabase.functions.invoke("notify-new-inquiry", {
      body: { inquiryId: inserted.id },
    }).catch(() => {});

    setBusy(false);
    setSubmitted(true);
    toast({
      title: "Inquiry received",
      description: `Thank you, ${parsed.data.company}. Our export desk will respond within 24 hours.`,
    });
  };

  return (
    <section id="inquiry" className="relative py-28 md:py-40 border-t border-primary/10">
      <div className="container grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-12 bg-primary" />
            <span className="hairline text-primary">Wholesale Inquiry Portal</span>
          </div>
          <h2 className="font-serif text-4xl md:text-6xl leading-[1.05]">
            For export houses and serious buyers.
          </h2>
          <p className="mt-6 text-foreground/70 text-lg">
            Request a graded sample or a bulk pricing quote. Our export desk responds within one business day.
          </p>

          <div className="mt-12 space-y-5">
            {[
              "Sample dispatch within 72 hours",
              "FOB Colombo & CIF pricing available",
              "Minimum order: 500 kg per SKU",
              "Custom grading to buyer specification",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={20} strokeWidth={1.5} />
                <span className="text-foreground/80">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7">
          <form
            onSubmit={onSubmit}
            className="glass-card rounded-2xl p-8 md:p-10 shadow-luxe"
          >
            {submitted ? (
              <div className="text-center py-16">
                <CheckCircle2 className="text-primary mx-auto mb-6" size={48} strokeWidth={1.2} />
                <h3 className="font-serif text-3xl">Inquiry Submitted</h3>
                <p className="mt-3 text-foreground/70 max-w-sm mx-auto">
                  Our export desk has received your request. Expect a detailed response within 24 hours.
                </p>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 gap-5">
                  <Field name="company" label="Company Name" required />
                  <Field name="contact" label="Contact Person" required />
                  <Field name="email" label="Business Email" type="email" required />
                  <Field name="phone" label="Phone (with country code)" />
                  <Field name="destination" label="Export Destination" placeholder="e.g. Hamburg, Germany" required />
                  <Field name="volume" label="Estimated Monthly Volume" placeholder="e.g. 2,000 kg" required />
                </div>

                <div className="mt-5">
                  <label className="hairline text-foreground/60 mb-2 block">Products of Interest</label>
                  <div className="flex flex-wrap gap-3">
                    {["Alba Cinnamon", "Grade 1 Pepper", "Cardamom", "Cloves", "Custom Blend"].map((p) => (
                      <label
                        key={p}
                        className="px-4 py-2 rounded-full border border-primary/30 text-sm cursor-pointer hover:bg-primary/10 transition-colors has-[:checked]:bg-primary has-[:checked]:text-primary-foreground has-[:checked]:border-primary"
                      >
                        <input type="checkbox" name="products" value={p} className="sr-only" />
                        {p}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <label className="hairline text-foreground/60 mb-2 block">Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Share specific requirements, certifications needed, or timelines…"
                    className="w-full rounded-lg bg-input border border-primary/20 px-4 py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={busy}
                  className="group mt-8 w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-gold text-primary-foreground font-medium hover:shadow-gold transition-all disabled:opacity-60"
                >
                  {busy ? "Submitting..." : "Submit Inquiry"}
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>
                <p className="text-xs text-foreground/50 mt-4 text-center">
                  By submitting, you agree to be contacted by the Ceyvora export desk regarding your inquiry.
                </p>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

const Field = ({
  name,
  label,
  type = "text",
  placeholder,
  required,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) => (
  <label className="block">
    <span className="hairline text-foreground/60 mb-2 block">
      {label} {required && <span className="text-primary">*</span>}
    </span>
    <input
      name={name}
      type={type}
      required={required}
      placeholder={placeholder}
      className="w-full rounded-lg bg-input border border-primary/20 px-4 py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
    />
  </label>
);

export default InquiryForm;
