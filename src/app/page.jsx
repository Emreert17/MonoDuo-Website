import Contact from "@/components/Contact";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import Founders from "@/components/Founders";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Positioning from "@/components/Positioning";
import Process from "@/components/Process";
import Services from "@/components/Services";
import Testimonial from "@/components/Testimonial";
import Why from "@/components/Why";
import Work from "@/components/Work";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="top">
        <Hero />
        <Positioning />
        <Services />
        <Work />
        <Testimonial />
        <Process />
        <Why />
        <Founders />
        <Contact />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
