import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Miftah from "../assets/1.jpg.jpg";
import cika from "../assets/cika.png";
import image from "../assets/image.png";
import canva from "../assets/canva.png";

import { FaWhatsapp, FaEnvelope } from "react-icons/fa";

/* ================= DATA STATIS (BUKAN DATABASE) ================= */

// Typing text
const texts = [
  "Web Developer",
  "React Developer",
  "Laravel Developer",
  "Data Analyst",
  "UI/UX Designer",
];

// Skills (STATIS)
const skills = [
  { id: 1, nama: "React", icon: "react" },
  { id: 2, nama: "Laravel", icon: "laravel" },
  { id: 3, nama: "JavaScript", icon: "javascript" },
  { id: 4, nama: "Tailwind CSS", icon: "tailwind" },
  { id: 5, nama: "Figma", icon: "figma" },
];

// Projects (STATIS)
const projects = [
  {
    id: 1,
    nama: "Cika Laundry Website",
    deskripsi_pendek:
      "Website untuk layanan laundry Cika Laundry menggunakan React dan Tailwind CSS.",
    thumbnail: cika,
    linkgithub: "https://github.com/Miftakhur1",
    
     demo: "https://cika-laundry.vercel.app/",
  },
  {
    id: 2,
    nama: "UI / UX Design - Aplikasi Produksi Cika Laundry",
    deskripsi_pendek:
      "Desain UI/UX untuk aplikasi produksi laundry menggunakan Figma.",
    thumbnail: image,
    linkgithub: null,
    demo: "https://www.figma.com/proto/sI2uruv0OzxwLkKWIO3iaP/Aplikasi-produksi-cika-laundry?node-id=14-570&t=YIn81te040pwTZPc-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2&show-proto-sidebar=1",
  },
  {
    id: 3,
    nama: "Desain Brosur Canva",
    deskripsi_pendek:
      "Design canva membuat brosur sebagai strategi promosi",
    thumbnail: canva,
    demo: "https://www.canva.com/design/DAGgr_6q9VQ/tAjqrDhskoSrYqRwYd03zA/edit?utm_content=DAGgr_6q9VQ&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
  },
];

// Experience (STATIS)
const experiences = [
  {
    id: 1,
    posisi: "Freelance Cleaning Service ",
    nama_perusahaan: "Rabbani Assysa",
    tipe_pekerjaan: "full-time",
    tanggal_mulai: "April 2023",
    tanggal_selesai: "Juli 2023",
    deskripsi:
      "Bertanggung jawab atas pembersihan dan perawatan gedung perkantoran, memastikan lingkungan kerja yang bersih dan nyaman bagi karyawan serta pengunjung, melakukan temporary sesuai request dari teman terkait",
  },
  {
    id: 2,
    posisi: "Kurir",
    nama_perusahaan: "Ninja Xpress",
    tipe_pekerjaan: "full-time",
    tanggal_mulai: "Agustus 2023",
    tanggal_selesai: "September 2023",
    deskripsi:
      "Mengelola pengiriman paket dengan efisien, memastikan paket sampai tepat waktu dan dalam kondisi baik, serta memberikan layanan pelanggan yang ramah dan profesional selama proses pengantaran.",
  },
  {
    id: 3,
    posisi: "Kurir-Washer-Kasir",
    nama_perusahaan: "Cika Laundry",  
    tipe_pekerjaan: "full-time",
    tanggal_mulai: "Januari 2024",
    tanggal_selesai: "Sekarang",
    deskripsi:
      "Membangun dan mengelola website layanan Cika Laundry sebagai strategi promosi pada media sosial, serta mengoptimalkan performa dan desain UI agar menarik bagi pengunjung ,melakukan berbagai tugas operasional seperti mencuci pakaian, melayani pelanggan di kasir, dan mengelola pengiriman laundry untuk memastikan kepuasan pelanggan.",
  }
];

/* ================= COMPONENT ================= */

export default function Home() {
  /* ===== Typing Effect ===== */
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [char, setChar] = useState(0);
  const [deleting, setDeleting] = useState(false);

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

  return (
    <Layout>
      {/* ================= HERO ================= */}
      <section className="home">
        <div className="hero-content">
          <h1 className="hero-title">
            Hi, Saya <span className="hero-name">Miftah</span>
          </h1>

          <p className="hero-typing">
            <span className="typing-text">{text}</span>
            <span className="cursor">|</span>
          </p>

          <div className="home-actions">
            <a href="/project" className="btn-primary">
              Lihat Project
            </a>
            <a href="/cv.pdf" className="btn-outline">
              Lihat CV
            </a>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-text">
            <h2 className="about-title">
              Tentang <span className="hero-name">Saya</span>
            </h2>

            <p className="about-desc">
              Saya adalah seorang Web Developer yang memiliki ketertarikan pada pengembangan
              aplikasi dan website modern menggunakan React, Laravel, serta tools desain
              seperti Figma dan Canva. Saya terbiasa membangun tampilan antarmuka yang rapi,
              responsif, dan mudah digunakan, sekaligus memperhatikan struktur kode dan
              performa aplikasi.
              <br /><br />
              Selain memiliki pengalaman teknis melalui proyek kuliah dan freelance,
              saya juga memiliki pengalaman kerja di bidang operasional dan layanan,
              yang membentuk kedisiplinan, tanggung jawab, serta kemampuan komunikasi
              dengan pelanggan. Pengalaman tersebut membantu saya memahami kebutuhan
              pengguna dan menerjemahkannya ke dalam solusi digital yang fungsional
              dan relevan.
            </p>

            <div className="about-skills-mini">
              <h4 className="mini-skill-title">Skills</h4>
              <div className="mini-skill-list">
                {skills.map((skill) => (
                  <div key={skill.id} className="mini-skill-card">
                    <img src={`/icons/${skill.icon}.svg`} alt={skill.nama} />
                    <span>{skill.nama}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="about-visual">
            <div className="about-photo-wrap">
              <img src={Miftah} alt="Miftah" className="about-photo" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= PROJECTS ================= */}
    <section id="projects" className="projects-section">
  <div className="projects-container">
    <h2 className="section-title">Projects</h2>
    <p
  style={{
    marginTop: "0.75rem",
    fontSize: "0.95rem",
    color: "#64748b",
    lineHeight: "1.6",
    textAlign: "center",
  }}

>Beberapa project yang pernah saya kerjakan</p>

    <div className="projects-grid">
      {projects.map((p) => (
        <div key={p.id} className="project-card">
          <img
            src={p.thumbnail}
            alt={p.nama}
            className="project-image"
          />

          <div className="project-body">
            <h3>{p.nama}</h3>
            <p>{p.deskripsi_pendek}</p>

           <div className="project-actions">
          {p.demo && (
            <a
              href={p.demo}
              target="_blank"
              rel="noreferrer"
              className="project-btn demo"
            >
              Demo
            </a>
          )}

          {p.linkgithub && (
            <a
              href={p.linkgithub}
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
  </div>
</section>



      {/* ================= EXPERIENCE ================= */}
      <section className="timeline-section">
        <h2 className="section-title text-center">
          Experience <span className="hero-name">Saya</span>
        </h2>
       <p
  style={{
    marginTop: "0.75rem",
    fontSize: "0.95rem",
    color: "#64748b",
    lineHeight: "1.6",
    textAlign: "center",
  }}
>
  Beberapa pengalaman kerja dan proyek saya
</p>

        <div className="timeline-container">
          <div className="timeline">
            {experiences.map((exp) => (
              <div key={exp.id} className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <h3>{exp.posisi}</h3>
                  <span className="timeline-company">
                    {exp.nama_perusahaan} • {exp.tipe_pekerjaan}
                  </span>
                  <span className="timeline-date">
                    {exp.tanggal_mulai} – {exp.tanggal_selesai}
                  </span>
                  <p>{exp.deskripsi}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
     <section id="contact" className="contact-section">
  <div className="contact-container">

    {/* HEADER */}
    <div className="contact-header">
      <h2>
        Hubungi <span className="hero-name">Saya</span>
      </h2>
      <p>
        Tertarik bekerja sama atau ingin berdiskusi?
        <br />
        Saya terbuka untuk proyek freelance dan kolaborasi.
      </p>
    </div>

    <div className="contact-content">

      {/* ================= LEFT : CONTACT INFO ================= */}
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
          <span>Instagram</span>
          <a
            href="https://www.instagram.com/mfthkhr_/"
            target="_blank"
            rel="noreferrer"
          >
            instagram.com/mfthkhr_
          </a>
        </div>
      </div>

      {/* ================= RIGHT : CTA ================= */}
      <div className="contact-cta">
        <h3>
          Mari <span className="hero-name">Bekerja Sama</span>
        </h3>

        <p className="contact-desc">
          Punya ide, proyek, atau ingin berdiskusi?
          Saya siap membantu mewujudkan solusi digital
          yang rapi dan fungsional.
        </p>

        <div className="contact-actions">
          <a
             href="https://mail.google.com/mail/?view=cm&fs=1&to=miftah.khur.3@gmail.com"
            className="contact-button email"
          >
            <FaEnvelope />
            <span>Email</span>
          </a>

          <a
            href="https://wa.me/6289512848205"
            target="_blank"
            rel="noreferrer"
            className="contact-button whatsapp"
          >
            <FaWhatsapp />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

    </div>
  </div>
</section>

    </Layout>
  );
}
