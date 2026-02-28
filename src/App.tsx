import { Header, Hero, Projects, Experience, About, Contact, Footer } from '@/sections';

function App() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Header />
      <main>
        <Hero />
        <Projects />
        <Experience />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
