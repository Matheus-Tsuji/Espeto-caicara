import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- Componente de Cursor Personalizado ---
const CustomCursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);

    useEffect(() => {
        // Esconde o cursor padrão do sistema
        document.body.style.cursor = 'none';
        
        const moveCursor = (e) => {
            gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0.1 });
            gsap.to(followerRef.current, { x: e.clientX, y: e.clientY, duration: 0.3, ease: 'power2.out' });
        };

        const onHover = () => gsap.to(followerRef.current, { scale: 2.5, backgroundColor: 'rgba(52, 211, 153, 0.3)' });
        const onUnhover = () => gsap.to(followerRef.current, { scale: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)' });

        window.addEventListener('mousemove', moveCursor);
        document.querySelectorAll('a, button, .hover-target').forEach(el => {
            el.addEventListener('mouseenter', onHover);
            el.addEventListener('mouseleave', onUnhover);
        });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
             document.querySelectorAll('a, button, .hover-target').forEach(el => {
                el.removeEventListener('mouseenter', onHover);
                el.removeEventListener('mouseleave', onUnhover);
            });
            // Restaura o cursor padrão ao desmontar
            document.body.style.cursor = 'auto';
        };
    }, []);

    return (
        <div className="hidden md:block"> {/* Oculta o cursor em telas pequenas para melhor usabilidade touch */}
            <div ref={cursorRef} className="custom-cursor-dot fixed w-2 h-2 bg-[var(--color-accent,theme(colors.emerald.400))] rounded-full z-[1000] pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-colors duration-300"></div>
            <div ref={followerRef} className="custom-cursor-follower fixed w-8 h-8 bg-white/10 rounded-full z-[1000] pointer-events-none -translate-x-1/2 -translate-y-1/2 border border-white/20"></div>
        </div>
    );
};

// --- Ícones SVG ---
const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-200">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);
const MenuIcon = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 12H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 18H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>);
const SocialIcon = ({ href, children }) => (<a href={href} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-[var(--color-accent)] transition-colors duration-300">{children}</a>);
const GitHubIcon = () => ( <svg height="20" width="20" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.19.01-.82.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21-.15.46-.55.38A8.013 8.013 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path></svg>);
const LinkedInIcon = () => ( <svg height="20" width="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2ZM8 19H5V8h3v11ZM6.5 6.73c-.97 0-1.75-.78-1.75-1.75S5.53 3.23 6.5 3.23c.97 0 1.75.78 1.75 1.75S7.47 6.73 6.5 6.73ZM20 19h-3v-5.6c0-3.37-4-3.11-4 0V19h-3V8h3v1.76c.96-1.56 4-1.76 4 1.76V19Z"></path></svg>);

// --- Componentes Gráficos e de Layout ---
const TechIcon = ({ children }) => (<div className="bg-neutral-800/50 border border-[var(--color-border)] text-neutral-300 text-xs font-mono px-2 py-1 rounded-sm">{children}</div>);

const ProjectVisual = ({ title }) => (
    <div className="aspect-video bg-neutral-950 border border-[var(--color-border)] rounded-md mb-6 overflow-hidden relative group">
        <div className="w-full h-full flex items-center justify-center p-4">
            <div className="absolute top-0 left-0 w-full h-full opacity-30 visual-bg transition-opacity duration-300 group-hover:opacity-60">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--color-grid)" strokeWidth="0.5"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>
            <svg className="w-full h-full absolute top-0 left-0" viewBox="0 0 100 56.25">
                 <path className="visual-line" d="M 10 50 L 40 10 L 70 40 L 90 20" stroke="var(--color-accent)" strokeWidth="0.5" fill="none" strokeDasharray="100" strokeDashoffset="100" />
                 <path className="visual-line" d="M 5 15 L 30 45 L 60 5 L 95 35" stroke="var(--color-secondary)" strokeWidth="0.3" fill="none" strokeDasharray="100" strokeDashoffset="100" />
            </svg>
            <h4 className="text-neutral-600 font-mono text-sm tracking-widest uppercase transition-colors duration-300 group-hover:text-[var(--color-accent)]">{title}</h4>
        </div>
    </div>
);

const ProjectCard = ({ title, description, techs, link }) => (
  <div className="bg-neutral-900 border border-[var(--color-border)] rounded-lg p-6 md:p-8 flex flex-col h-full transform transition-all duration-300 hover:-translate-y-2 hover:bg-neutral-800/50 anim-reveal">
    <ProjectVisual title={title} />
    <div className="flex flex-col flex-grow">
      <h3 className="text-xl md:text-2xl font-bold text-neutral-100 mb-2">{title}</h3>
      <p className="text-neutral-400 mb-6 flex-grow">{description}</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {techs.map(tech => <TechIcon key={tech}>{tech}</TechIcon>)}
       </div>
      <a href={link} className="text-[var(--color-accent)] font-semibold group self-start mt-auto">
        Ver projeto <ArrowIcon />
      </a>
    </div>
  </div>
);

const SkillsMarquee = () => {
    const skills = ["React", "Node.js", "GSAP", "Three.js", "WebGL", "TypeScript", "Python", "Figma", "UI/UX Design", "SysArch"];
    return (
        <div className="relative w-full overflow-hidden py-12 md:py-20 border-y border-[var(--color-border)]">
            <div className="marquee flex animate-marquee">
                {skills.concat(skills).map((skill, i) => (
                    <span key={i} className="text-4xl md:text-6xl font-bold text-neutral-700 mx-8 whitespace-nowrap">{skill}</span>
                ))}
            </div>
        </div>
    );
};


export default function Teste() {
  const root = useRef(null);
  
  const projects = [
      { title: "QuantumLeap AI", description: "Plataforma de análise preditiva que utiliza machine learning para otimizar a logística de grandes empresas.", techs: ["React", "Python", "Flask", "D3.js", "AWS"], link: "#" },
      { title: "NovaNet CDN", description: "Rede de distribuição de conteúdo descentralizada, focada em segurança e baixa latência.", techs: ["Go", "WebRTC", "Kubernetes", "Rust"], link: "#" },
      { title: "Helios Design System", description: "Sistema de design modular e acessível construído para escalar aplicações web complexas.", techs: ["React", "TypeScript", "TailwindCSS", "Figma"], link: "#" }
  ];

  useLayoutEffect(() => {
    const sections = document.querySelectorAll('section[data-theme]');
    let ctx = gsap.context(() => {
        gsap.timeline()
          .to(".loader-text-element", { y: 0, stagger: 0.2, duration: 0.7, ease: "power2.out" })
          .to(".loader-text-element", { y: -20, opacity: 0, delay: 1, stagger: 0.1, duration: 0.5, ease: "power2.in" })
          .to(".loader", { yPercent: -100, duration: 0.8, ease: "power3.inOut" }, "-=0.2");
      
        const pageLoadTimeline = gsap.timeline({delay: 2.5});
        pageLoadTimeline
            .from(".header-item", { y: -30, opacity: 0, stagger: 0.1, duration: 0.6, ease: "power2.out" })
            .from(".hero-line", { y: 100, stagger: 0.15, duration: 0.8, ease: "power3.out" }, "<0.2")
            .from(".hero-subtext, .hero-cta", { y: 50, opacity: 0, duration: 0.8, ease: "power2.out" }, "<0.5")
            .fromTo(".hero-graphic", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }, "<");
        
        const revealElements = gsap.utils.toArray(".anim-reveal");
        revealElements.forEach(el => {
            gsap.from(el, {
                y: 50, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.2,
                scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" }
            });
        });
        
        const projectCards = gsap.utils.toArray(".anim-reveal");
        projectCards.forEach(card => {
             gsap.to(card.querySelectorAll(".visual-line"), {
                strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut', stagger: 0.2,
                scrollTrigger: { trigger: card, start: 'top 80%', toggleActions: 'play none none none' }
            })
        });

        sections.forEach(section => {
            const theme = section.getAttribute('data-theme');
            ScrollTrigger.create({
                trigger: section,
                start: "top 40%",
                end: "bottom 40%",
                onEnter: () => gsap.to('body', {
                    '--color-accent': `var(--${theme}-accent)`,
                    '--color-secondary': `var(--${theme}-secondary)`,
                    '--color-border': `var(--${theme}-border)`,
                    '--color-grid': `var(--${theme}-grid)`,
                    duration: 0.8,
                    ease: 'power2.out'
                }),
                onEnterBack: () => gsap.to('body', {
                    '--color-accent': `var(--${theme}-accent)`,
                    '--color-secondary': `var(--${theme}-secondary)`,
                    '--color-border': `var(--${theme}-border)`,
                    '--color-grid': `var(--${theme}-grid)`,
                    duration: 0.8,
                    ease: 'power2.out'
                }),
            });
        });

    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="bg-black text-neutral-200 font-sans antialiased selection:bg-[var(--color-accent)] selection:text-black">
      <CustomCursor />
      
      <div className="loader fixed top-0 left-0 w-full h-full bg-black flex justify-center items-center z-[1000]">
        <div className="text-2xl md:text-4xl font-bold text-neutral-100 overflow-hidden"><span className="loader-text-element inline-block translate-y-full">Conceptualizing.</span></div>
        <div className="text-2xl md:text-4xl font-bold text-neutral-100 overflow-hidden ml-3"><span className="loader-text-element inline-block translate-y-full">Innovating.</span></div>
      </div>
      
      <div className="main-content">
        <header className="fixed top-0 left-0 w-full p-6 md:px-12 md:py-8 flex justify-between items-center z-50">
            <div className="header-item text-xl font-bold text-white mix-blend-difference hover-target">Cortex/IO</div>
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white mix-blend-difference">
                <a href="#about" className="header-item">Abordagem</a>
                <a href="#projects" className="header-item">Projetos</a>
                <a href="#contact" className="header-item">Contato</a>
            </nav>
            <div className="header-item md:hidden hover-target"><MenuIcon /></div>
        </header>

        <main>
          <section id="hero" data-theme="emerald" className="h-screen min-h-[700px] w-full flex flex-col justify-center items-center px-6 relative overflow-hidden">
              <div className="hero-graphic absolute inset-0 z-0 opacity-20">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                      <defs><pattern id="dot-grid" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="0.5" fill="var(--color-grid)" /></pattern></defs>
                      <rect width="100%" height="100%" fill="url(#dot-grid)" />
                  </svg>
              </div>
              <div className="text-center z-10">
                  <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold text-neutral-100 tracking-tighter">
                      <div className="overflow-hidden pb-2 md:pb-4"><span className="hero-line inline-block">Engineering</span></div>
                      <div className="overflow-hidden pb-2 md:pb-4"><span className="hero-line inline-block">Digital</span></div>
                      <div className="overflow-hidden"><span className="hero-line inline-block text-[var(--color-accent)]">Futures</span></div>
                  </h1>
                  <p className="hero-subtext max-w-xl mx-auto mt-6 text-neutral-400 md:text-lg">Soluções digitais de vanguarda que impulsionam o crescimento e definem o futuro da tecnologia.</p>
                  <button className="hero-cta group mt-8 bg-[var(--color-accent)] text-black font-bold py-3 px-8 rounded-full transform transition-transform hover:scale-105">Explorar soluções</button>
              </div>
          </section>

          <section id="about" data-theme="cyan" className="container mx-auto px-6 py-20 md:py-32">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="section-header text-3xl md:text-5xl font-bold text-neutral-100 tracking-tighter anim-reveal">De uma ideia ao impacto.<br />Essa é a minha abordagem.</h2>
                <p className="anim-reveal mt-6 text-neutral-400 md:text-lg">Olá, sou um desenvolvedor e designer de interfaces. O que começou como uma "empresa" é, na verdade, a minha filosofia de trabalho: transformar conceitos complexos em experiências digitais intuitivas, eficientes e esteticamente refinadas. Acredito que a melhor tecnologia é aquela que se torna invisível, capacitando o usuário sem esforço.</p>
            </div>
          </section>
          
          <section id="skills" data-theme="cyan">
             <SkillsMarquee />
          </section>

          <section id="projects" data-theme="violet" className="container mx-auto px-6 py-20 md:py-32">
             <h2 className="section-header text-center text-3xl md:text-5xl font-bold text-neutral-100 tracking-tighter mb-12 md:mb-16 anim-reveal">Projetos Selecionados</h2>
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map(p => <ProjectCard key={p.title} {...p} />)}
             </div>
          </section>

          <section id="contact" data-theme="emerald" className="py-20 md:py-40 bg-neutral-950/50">
              <div className="container mx-auto px-6 text-center">
                   <h2 className="section-header text-4xl md:text-6xl font-bold text-neutral-100 tracking-tighter anim-reveal">Vamos construir algo novo?</h2>
                   <p className="anim-reveal mt-6 max-w-2xl mx-auto text-neutral-400 md:text-lg">Estou sempre em busca de desafios interessantes e colaborações que ultrapassem limites. Se você tem uma ideia ou projeto em mente, vamos conversar.</p>
                   <div className="anim-reveal mt-10">
                       <a href="mailto:contato@email.com" className="group text-xl md:text-2xl text-[var(--color-accent)] font-semibold inline-block">
                           meenvie.um.email
                           <span className="block h-0.5 max-w-0 group-hover:max-w-full transition-all duration-500 bg-[var(--color-accent)] mt-1"></span>
                       </a>
                   </div>
              </div>
          </section>
        </main>
        
        <footer className="container mx-auto px-6 py-12">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-sm text-neutral-500">
                <p>&copy; {new Date().getFullYear()} Desenvolvido com React, GSAP & Paixão.</p>
                <div className="flex gap-6">
                    <SocialIcon href="#"><GitHubIcon /></SocialIcon>
                    <SocialIcon href="#"><LinkedInIcon /></SocialIcon>
                </div>
            </div>
        </footer>
      </div>
    </div>
  );
}