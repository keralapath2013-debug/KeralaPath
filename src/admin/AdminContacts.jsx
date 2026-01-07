import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import "./AdminContacts.css";

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch contacts once
  const fetchContacts = async () => {
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setContacts(data);
    setLoading(false);
  };

  // REALTIME LISTENER
  useEffect(() => {
    fetchContacts();

    const channel = supabase
      .channel("contacts-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "contacts" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setContacts((prev) => [payload.new, ...prev]);
          }

          if (payload.eventType === "DELETE") {
            setContacts((prev) =>
              prev.filter((item) => item.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const deleteContact = async (id) => {
    const confirm = window.confirm("Delete this message?");
    if (!confirm) return;

    await supabase.from("contacts").delete().eq("id", id);
  };

  return (
    <section className="admin-page">
      <h2 className="page-title">📩 Contact Messages</h2>

      {loading ? (
        <p>Loading...</p>
      ) : contacts.length === 0 ? (
        <p>No messages found</p>
      ) : (
        <div className="contact-list">
          {contacts.map((item) => (
            <div key={item.id} className="contact-card">
              <div className="contact-header">
                <h4>{item.name}</h4>
                <button
                  className="delete-btn"
                  onClick={() => deleteContact(item.id)}
                >
                  🗑 Delete
                </button>
              </div>

              <p><strong>Email:</strong> {item.email}</p>
              <p><strong>Phone:</strong> {item.phone}</p>
              <p className="message">{item.message}</p>
              <small>
                {new Date(item.created_at).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
