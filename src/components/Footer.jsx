export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand */}
        <div className="footer-brand">
          <span className="footer-logo">Miftah</span>
          <span className="footer-dot">.</span>
          <span className="footer-suffix">dev</span>
        </div>

        {/* Navigation */}
        <nav className="footer-nav">
          <a href="#home">Home</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>

        {/* Social */}
        <div className="footer-social">
          <a
            href="https://github.com/Miftakhur1"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a href="mailto:emailkamu@gmail.com">
            Email
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        © {year} Miftah. All rights reserved.
      </div>
    </footer>
  );
}
