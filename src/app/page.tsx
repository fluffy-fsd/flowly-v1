import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Realisations from "@/components/Realisations";
import Processus from "@/components/Processus";
import DevisForm from "@/components/DevisForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <Realisations />
      <Processus />
      <DevisForm />
      <Footer />
    </main>
  );
}
