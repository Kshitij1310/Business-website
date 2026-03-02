import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Stats from '../components/Stats';
import Industries from '../components/Industries';
import Team from '../components/Team';
import CallbackForm from '../components/CallbackForm';
import Clients from '../components/Clients';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Stats />
      <Industries />
      <Team />
      <CallbackForm />
      <Clients />
      <Footer />
    </>
  );
}
