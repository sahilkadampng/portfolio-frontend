import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Workflow from '../components/Workflow';
import Platforms from '../components/Platforms';
import Perspectives from '../components/Perspectives';
import Skills from '../components/Skills';
import Donate from '../components/Donate';
import CTA from '../components/CTA';

export default function Home() {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <Workflow />
                <Platforms />
                <Perspectives />
                <Skills />
                <Donate />
                <CTA />
            </main>
            <Footer />
        </>
    );
}
