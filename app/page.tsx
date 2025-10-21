import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ScrollingBadges from './components/ScrollingBadges';
import Features from './components/Features';
import Journey from './components/Journey';
import CareerTransformation from './components/CareerTransformation';
import Tools from './components/Tools';
import ProcessSteps from './components/ProcessSteps';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navigation />
      <Hero />
      <ScrollingBadges />
      <Features />
      <Journey />
      <CareerTransformation />
      <Tools />
      <ProcessSteps />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
