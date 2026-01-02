import { FaEnvelope, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { useRef , useState } from "react";
import Layout from "../components/Layout";
import "../contact.css";

export default function Contact() {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    const form = formRef.current;

    /* ===============================
       HONEYPOT (ANTI BOT)
    ================================ */
    if (form.website.value !== "") {
      return; // bot terdeteksi
    }
    
    /* ===============================
       VALIDASI DASAR
    ================================ */
    if (form.message.value.length < 10) {
      alert("Pesan terlalu pendek.");
      return;
    }

    if (loading) return;
    setLoading(true);

    emailjs
      .sendForm(
        "Miftah@123",
        "Miftah@123",
        formRef.current,
        "4HCmCRqE4br37Cozx"
      )
      .then(() => {
        alert("Pesan berhasil dikirim!");
        formRef.current.reset();
      })
      .catch(() => {
        alert("Gagal mengirim pesan. Coba lagi.");
      })
      .finally(() => {
        // rate limit 5 detik
        setTimeout(() => setLoading(false), 10000);
      });
  };
  return (
<Layout>
    <section id="contact" className="contact-section">
      <div className="contact-card">
        <div className="contact-title">
          <h2>Get in Touch</h2>
          <p>
            Terbuka untuk peluang magang, freelance, maupun kerja sama profesional.
          </p>
        </div>

        <div className="contact-grid">
          {/* INFO */}
          <div className="contact-info">
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <div>
                <h3>Email</h3>
                <p>miftah.khur.3@gmail.com</p>
              </div>
            </div>

            <div className="contact-item">
              <FaWhatsapp className="contact-icon whatsapp" />
              <div>
                <h3>WhatsApp</h3>
                <p>+62 89512848205</p>
              </div>
            </div>

            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <div>
                <h3>Location</h3>
                <p>Indonesia</p>
              </div>
            </div>
          </div>

          {/* FORM */}
          <form ref={formRef} onSubmit={sendEmail} className="contact-form">
             {/* HONEYPOT (JANGAN DIHAPUS) */}
            <input
              type="text"
              name="website"
              style={{ display: "none" }}
              tabIndex="-1"
              autoComplete="off"
            />

            {/* TIME (OPTIONAL, UNTUK TEMPLATE EMAIL) */}
            <input
              type="hidden"
              name="time"
              value={new Date().toLocaleString("id-ID")}
            />

            <div>
              <label>Nama</label>
              <input
                type="text"
                name="name"
                placeholder="Nama lengkap"
                required
              />
            </div>

            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="email@company.com"
                required
              />
            </div>

            <div>
              <label>Pesan</label>
              <textarea
                name="message"
                rows="4"
                placeholder="Tulis pesan atau penawaran kerja sama..."
                required
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
</Layout>
  );
}