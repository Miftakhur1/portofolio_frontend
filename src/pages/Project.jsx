import { useEffect, useState } from "react";
import Layout from "../components/Layout";

export default function Project() {
  const [project, setProject] = useState([]);
  const [loading, setLoading] = useState(true);
  // === Fetch Projects ===
  useEffect(() => {
  fetch("/projects")
    .then((res) => res.json())
    .then((data) => {
      console.log("FETCH RESULT:", data);
      console.log("IS ARRAY:", Array.isArray(data));

      setProject(data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error fetch project:", err);
      setLoading(false);
    });
}, []);

  return (
    <Layout>
        <section id="projects" className="projects-section">
  <div className="projects-container">
    <div className="projects-header">
      <h2>Projects <span className="hero-name">Saya</span></h2>
      <p>Beberapa project yang pernah saya kerjakan</p>
    </div>

    {loading ? (
      <p className="projects-loading">Loading projects...</p>
    ) : project.length === 0 ? (
      <p className="projects-empty">Belum ada project.</p>
    ) : (
      <div className="projects-grid">
        {project.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-content">
               {project.thumbnail && (
              <img
                src={`http://127.0.0.1:8000/storage/${project.thumbnail}`}
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
    </Layout>
  );
}
