import Navigation from './components/Navigation';
import Hero from './components/Hero';
import UniversityStrip from './components/UniversityStrip';
import FeaturedPrograms from './components/FeaturedPrograms';
import ProcessSteps from './components/ProcessSteps';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <section id="universities">
        <UniversityStrip />
      </section>
      <section id="featured">
        <FeaturedPrograms />
      </section>
      {/* <ProcessSteps /> */}
      <FAQ />
      <section id="reviews">
        <Reviews />
      </section>
  
      <Footer />
    </div>
  );
}
