import Layout from "../components/Layout";
import cika from "../assets/cika.png";
import image from "../assets/image.png";
import canva from "../assets/canva.png";
import "../project.css";

const projects = [
  {
    id: 1,
    nama: "Cika Laundry Website",
    deskripsi_pendek:
      "Website untuk layanan laundry Cika Laundry menggunakan React dan Tailwind CSS.",
    thumbnail: cika,
    demo: "https://cika-laundry.vercel.app/",
    linkgithub: "https://github.com/Miftakhur1",
  },
  {
    id: 2,
    nama: "UI / UX Mobile Design - Aplikasi Produksi Cika Laundry",
    deskripsi_pendek:
      "Desain UI/UX untuk aplikasi produksi laundry menggunakan Figma.",
    thumbnail: image,
    demo:
      "https://www.figma.com/proto/sI2uruv0OzxwLkKWIO3iaP/Aplikasi-produksi-cika-laundry",
    linkgithub: null,
  },
  {
    id: 3,
    nama: "Desain Brosur Canva",
    deskripsi_pendek:
      "Kumpulan desain brosur menggunakan Canva.",
    thumbnail: canva,
    demo:
      "https://www.canva.com/design/DAGgr_6q9VQ/tAjqrDhskoSrYqRwYd03zA/edit",
    linkgithub: null,
  },
];

export default function Project() {
  return (
    <Layout>
      <section className="projects-section">
        <div className="projects-container">
          <div className="projects-header">
            <h2>
              Projects <span className="hero-name">Saya</span>
            </h2>
            <p>Beberapa project yang pernah saya kerjakan</p>
          </div>

          <div className="projects-grid">
            {projects.map((p) => (
              <div key={p.id} className="project-card">
                {p.thumbnail && (
                  <img
                    src={p.thumbnail}
                    alt={p.nama}
                    className="project-image"
                  />
                )}

                <div className="project-content">
                  <h3 className="project-title">{p.nama}</h3>
                  <p className="project-desc">{p.deskripsi_pendek}</p>

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
    </Layout>
  );
}
