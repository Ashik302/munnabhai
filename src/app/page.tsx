import AboutUsSection from "./components/Aboutus";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import PackageSection from "./components/Packages";
import ServicesSection from "./components/Service";


export default function Home() {
  return (
   <>
    <Hero />
    <AboutUsSection />
    <ServicesSection />
    <PackageSection />
    <Footer />
   </>
  );
}
