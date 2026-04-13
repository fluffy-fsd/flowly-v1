import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Realisations from "@/components/Realisations";
import Processus from "@/components/Processus";
import Blog from "@/components/Blog";
import DevisForm from "@/components/DevisForm";
import Footer from "@/components/Footer";
import { getArticles } from "@/lib/blog";

export default function Home() {
  const articles = getArticles();

  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <Realisations />
      <Processus />
      <Blog articles={articles} />
      <DevisForm />
      <Footer />
    </main>
  );
}
