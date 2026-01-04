import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Miftah from "../assets/1.jpg.jpg";
import { FaWhatsapp } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import api from "../api/axios";

const API_URL = import.meta.env.VITE_API_URL;

const texts = [
  "Web Developer",
  "React Developer",
  "Laravel Developer",
  "Data Analyst",
  "UI/UX Designer",
];

export default function Home() {
  console.log("API URL:", import.meta.env.VITE_API_URL);
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [char, setChar] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);

  // === Typing Effect ===
  useEffect(() => {
    const current = texts[index];
    let timeout;

    if (!deleting && char < current.length) {
      timeout = setTimeout(() => {
        setText(current.slice(0, char + 1));
        setChar(char + 1);
      }, 90);
    } else if (deleting && char > 0) {
      timeout = setTimeout(() => {
        setText(current.slice(0, char - 1));
        setChar(char - 1);
      }, 50);
    } else if (!deleting && char === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1200);
    } else if (deleting && char === 0) {
      setDeleting(false);
      setIndex((index + 1) % texts.length);
    }

    return () => clearTimeout(timeout);
  }, [char, deleting, index]);

  // // === Smooth Scroll ===
  // const scrollToProjects = () => {
  //   const section = document.getElementById("projects");
  //   section?.scrollIntoView({ behavior: "smooth" });
  // };

  // === Fetch Projects ===
  
 useEffect(() => {
  api.get("/projects")
    .then((res) => {
      setProjects(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error fetch projects:", err);
      setLoading(false);
    });
}, []);


// === Fetch Experiences ===
useEffect(() => {
  api.get("/experiences")
    .then((res) => {
      setExperiences(res.data);
    })
    .catch((err) => console.error(err));
}, []);


// fetch skills
useEffect(() => {
  api.get("/skills")
    .then((res) => {
      setSkills(res.data);
    })
    .catch((err) => console.error(err));
}, []);



  return (
    <Layout>
      {/* === HERO SECTION === */}
      <section className="home min-h-screen flex items-center justify-center">
        <div className="hero-content text-center">
          <h1 className="hero-title">
            Hi, Saya <span className="hero-name">Miftah</span>
          </h1>

          <p className="hero-typing">
            <span className="typing-text">{text}</span>
            <span className="cursor">|</span>
          </p>

          <div className="home-actions flex gap-4 justify-center mt-8">
            <a href="/project" className="btn-primary">
              Lihat Project
            </a>

            <a href="/cv.pdf" className="btn-outline">
              Lihat CV
            </a>
          </div>
        </div>
      </section>
      {/* ================= ABOUT ME ================= */}
<section className="about-section">
  <div className="about-container">

    {/* LEFT : TEXT */}
    <div className="about-text">
      <h2 className="about-title">
        Tentang <span className="hero-name">Saya</span>
      </h2>

      <p className="about-intro">
        Hi, saya <strong>Miftah</strong>, seorang Web Developer yang
        tertarik membangun aplikasi web yang rapi, fungsional,
        dan mudah digunakan.
      </p>

      <p className="about-desc">
        Saya berpengalaman menggunakan <strong>React</strong> untuk
        frontend dan <strong>Laravel</strong> untuk backend.
        Fokus saya adalah membuat antarmuka yang bersih,
        performa yang baik, dan struktur kode yang terorganisir.
      </p>

      <p className="about-desc">
        Saya senang mempelajari teknologi baru dan terbuka
        terhadap peluang kerja, magang, maupun proyek freelance.
      </p>
      <div className="about-skills-mini">
      <h4 className="mini-skill-title">Skills</h4>

      <div className="mini-skill-list">
        {skills.map((skills) => (
          <div key={skills.id} className="mini-skill-card">
            <img
              src={`/icons/${skills.icon}.svg`}
              alt={skills.nama}
            />
            <span>{skills.nama}</span>
          </div>
        ))}
      </div>
    </div>
    </div>
     {/* MIDDLE : MINI SKILLS */}
    

    {/* RIGHT : VISUAL / CARD */}
    <div className="about-visual">
  <div className="about-photo-wrap">
    <img
      src={Miftah}
      alt="Foto Miftah"
      className="about-photo"
    />
  </div>
</div>

    </div>
</section>

      {/* === PROJECTS SECTION === */}

      <section id="projects" className="projects-section">
  <div className="projects-container">
    <div className="projects-header">
      <h2>Projects <span className="hero-name">Saya</span></h2>
      <p>Beberapa project yang pernah saya kerjakan</p>
    </div>

    {loading ? (
      <p className="projects-loading">Loading projects...</p>
    ) : projects.length === 0 ? (
      <p className="projects-empty">Belum ada project.</p>
    ) : (
      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-content">
               {project.thumbnail && (
              <img
                src={`${API_URL}/storage/${project.thumbnail}`}
                alt={project.nama}
                className="project-image"
              />
            )}
              <h3 className="project-title">{project.nama}</h3>
           
              <p className="project-desc">
                {project.deskripsi_pendek}
              </p>

              <div className="project-actions">
                {project.linkdemo && (
                  <a
                    href={project.linkdemo}
                    target="_blank"
                    rel="noreferrer"
                    className="project-btn demo"
                  >
                    Demo
                  </a>
                )}

                {project.linkgithub && (
                  <a
                    href={project.linkgithub}
                    target="_blank"
                    rel="noreferrer"
                    className="project-btn github"
                  >
                    GitHub
                  </a>
                )}
                
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</section>
{/* === EXPERIENCE TIMELINE === */}
<section className="timeline-section">
  <div className="timeline-container">
    <div className="timeline-header">
      <h2>Pengalaman Kerja <span className="hero-name">Saya</span></h2>
      <p>Riwayat pengalaman profesional saya</p>
    </div>

    <div className="timeline">
      {experiences.length === 0 ? (
        <p className="timeline-empty">Belum ada pengalaman.</p>
      ) : (
        experiences.map((exp) => (
          <div key={exp.id} className="timeline-item">
            <div className="timeline-dot" />

            <div className="timeline-content">
              {/* POSISI */}
              <h3 className="timeline-position">
                {exp.posisi}
              </h3>

              {/* PERUSAHAAN + TIPE */}
              <span className="timeline-company">
                {exp.nama_perusahaan}
                {exp.tipe_pekerjaan && (
                  <span className="timeline-type">
                    {" "}• {exp.tipe_pekerjaan}
                  </span>
                )}
              </span>

              {/* TANGGAL */}
              <span className="timeline-date">
                {exp.tanggal_mulai} –{" "}
                {exp.masih_bekerja ? "Sekarang" : exp.tanggal_selesai}
              </span>

              {/* DESKRIPSI */}
              <p className="timeline-desc">
                {exp.deskripsi}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
</section>
 { /* ================= CONTACT SECTION ================= */}
<section id="contact" className="contact-section">
  <div className="contact-container">
    <div className="contact-header">
      <h2>Hubungi <span className="hero-name">Saya</span></h2>
      <p>
        Tertarik bekerja sama atau ingin berdiskusi?
        <br />
        Saya terbuka untuk peluang kerja dan proyek freelance.
      </p>
    </div>

    <div className="contact-content">
      {/* LEFT INFO */}
      <div className="contact-info">
        <div className="contact-item">
          <span>Email</span>
          <a href="mailto:miftah.khur.3@gmail.com">
            miftah.khur.3@gmail.com
          </a>
        </div>

        <div className="contact-item">
          <span>GitHub</span>
          <a
            href="https://github.com/Miftakhur1"
            target="_blank"
            rel="noreferrer"
          >
           github.com/Miftakhur1
          </a>
        </div>

        <div className="contact-item">
          <span>INSTAGRAM</span>
          <a
            href="https://www.instagram.com/mfthkhr_/"
            target="_blank"
            rel="noreferrer"
          >
            instagram.com/mfthkhr_
          </a>
        </div>
      </div>

      {/* RIGHT CTA */}
      <div className="contact-cta">
        <h3>Mari Bekerja Sama</h3>
        <p>
          Saya siap membantu mewujudkan ide dan kebutuhan digital Anda
          dengan solusi yang rapi dan fungsional.
        </p>

        <a
          href="mailto:miftah.khur.3@gmail.com"
          className="contact-button"
        >
          <FaEnvelope /> Kirim Email
        </a>
        <a
        href="https://wa.me/6289512848205"
        target="_blank"
        rel="noreferrer"
        className="contact-button whatsapp"
      >
        <FaWhatsapp />
        WhatsApp
      </a>
        
        

      </div>
    </div>
  </div>
</section>

    </Layout>
  );
}
