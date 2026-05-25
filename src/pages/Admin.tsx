import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { LogOut, Mail, Phone, Globe, Package, Trash2, Save } from "lucide-react";

interface Inquiry {
  id: string;
  company: string;
  contact: string;
  email: string;
  phone: string | null;
  destination: string;
  volume: string;
  products: string[];
  message: string | null;
  status: string;
  created_at: string;
}

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [content, setContent] = useState<Record<string, string>>({});
  const [tab, setTab] = useState<"inquiries" | "content">("inquiries");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isAdmin) return;
    loadInquiries();
    loadContent();
  }, [isAdmin]);

  const loadInquiries = async () => {
    const { data, error } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast({ title: "Failed to load", description: error.message, variant: "destructive" });
    else setInquiries(data || []);
  };

  const loadContent = async () => {
    const { data } = await supabase.from("site_content").select("*");
    const map: Record<string, string> = {};
    data?.forEach((row) => (map[row.key] = row.value));
    setContent(map);
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm("Delete this inquiry?")) return;
    const { error } = await supabase.from("inquiries").delete().eq("id", id);
    if (error) toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    else {
      setInquiries((prev) => prev.filter((i) => i.id !== id));
      toast({ title: "Deleted" });
    }
  };

  const saveContent = async () => {
    setSaving(true);
    const rows = Object.entries(content).map(([key, value]) => ({ key, value, updated_at: new Date().toISOString() }));
    const { error } = await supabase.from("site_content").upsert(rows, { onConflict: "key" });
    setSaving(false);
    if (error) toast({ title: "Save failed", description: error.message, variant: "destructive" });
    else toast({ title: "Content saved" });
  };

  if (loading) return null;
  if (!user) return <Navigate to="/auth" replace />;
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <h1 className="font-serif text-3xl mb-4">Access Restricted</h1>
          <p className="text-foreground/70 mb-6">
            Your account ({user.email}) is signed in but does not have admin access.
          </p>
          <p className="text-sm text-foreground/50 mb-6">
            Your user ID: <code className="text-primary">{user.id}</code>
            <br />Ask an existing admin to grant you access, or run this SQL in the backend:
            <code className="block mt-2 text-xs p-3 bg-secondary rounded text-left">
              INSERT INTO user_roles (user_id, role) VALUES ('{user.id}', 'admin');
            </code>
          </p>
          <button onClick={signOut} className="px-5 py-2 rounded-full border border-primary/30 hover:bg-primary/10">
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-primary/10 sticky top-0 z-10 bg-background/80 backdrop-blur">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="font-serif text-xl">Taste of Ceylon · Admin</Link>
            <nav className="flex gap-1">
              <button
                onClick={() => setTab("inquiries")}
                className={`px-4 py-2 text-sm rounded-full transition-colors ${tab === "inquiries" ? "bg-primary text-primary-foreground" : "hover:bg-primary/10"}`}
              >
                Inquiries ({inquiries.length})
              </button>
              <button
                onClick={() => setTab("content")}
                className={`px-4 py-2 text-sm rounded-full transition-colors ${tab === "content" ? "bg-primary text-primary-foreground" : "hover:bg-primary/10"}`}
              >
                Site Content
              </button>
            </nav>
          </div>
          <button onClick={signOut} className="flex items-center gap-2 text-sm text-foreground/70 hover:text-primary">
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </header>

      <main className="container py-10">
        {tab === "inquiries" && (
          <div className="space-y-4">
            {inquiries.length === 0 && (
              <div className="text-center py-20 text-foreground/50">No inquiries yet.</div>
            )}
            {inquiries.map((i) => (
              <div key={i.id} className="glass-card rounded-xl p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-serif text-xl">{i.company}</h3>
                    <p className="text-sm text-foreground/60">{i.contact} · {new Date(i.created_at).toLocaleString()}</p>
                  </div>
                  <button
                    onClick={() => deleteInquiry(i.id)}
                    className="text-foreground/40 hover:text-destructive transition-colors"
                    aria-label="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2"><Mail size={14} className="text-primary" /> <a href={`mailto:${i.email}`} className="hover:text-primary">{i.email}</a></div>
                  {i.phone && <div className="flex items-center gap-2"><Phone size={14} className="text-primary" /> {i.phone}</div>}
                  <div className="flex items-center gap-2"><Globe size={14} className="text-primary" /> {i.destination}</div>
                  <div className="flex items-center gap-2"><Package size={14} className="text-primary" /> {i.volume}</div>
                </div>
                {i.products.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {i.products.map((p) => (
                      <span key={p} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">{p}</span>
                    ))}
                  </div>
                )}
                {i.message && (
                  <p className="mt-4 text-sm text-foreground/70 border-l-2 border-primary/30 pl-4">{i.message}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === "content" && (
          <div className="max-w-2xl space-y-6">
            <div>
              <h2 className="font-serif text-2xl mb-2">Edit site content</h2>
              <p className="text-sm text-foreground/60 mb-6">Changes are reflected on the homepage immediately.</p>
            </div>
            {[
              { key: "hero_eyebrow", label: "Hero eyebrow", multi: false },
              { key: "hero_heading", label: "Hero heading", multi: true },
              { key: "hero_subtext", label: "Hero subtext", multi: true },
              { key: "inquiry_notify_email", label: "Notification email (receives new inquiries)", multi: false },
            ].map((f) => (
              <div key={f.key}>
                <label className="hairline text-foreground/60 text-xs mb-2 block">{f.label}</label>
                {f.multi ? (
                  <textarea
                    value={content[f.key] || ""}
                    onChange={(e) => setContent({ ...content, [f.key]: e.target.value })}
                    rows={3}
                    className="w-full rounded-lg bg-input border border-primary/20 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                ) : (
                  <input
                    type="text"
                    value={content[f.key] || ""}
                    onChange={(e) => setContent({ ...content, [f.key]: e.target.value })}
                    className="w-full rounded-lg bg-input border border-primary/20 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                )}
              </div>
            ))}
            <button
              onClick={saveContent}
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-gold text-primary-foreground font-medium hover:shadow-gold transition-all disabled:opacity-50"
            >
              <Save size={16} /> {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
