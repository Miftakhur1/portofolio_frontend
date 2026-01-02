import Navbar from "./Navbar";
import BackgroundStars from "./BackgroundStars";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      <Navbar />
      <BackgroundStars />
      <main className="pt-24 max-w-6xl mx-auto px-4">
        {children}
      </main>
      <Footer />
    </div>
  );
}
