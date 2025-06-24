import './App.css'
import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import HeroSection from '../components/HeroSection'
import About from '../components/About'
import Header from '../components/Header'

// import Teste from '../components/teste'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const headerRef = useRef(null)
  const aboutRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(headerRef.current, {
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top top',
          toggleActions: 'play none none reverse',
          refreshPriority: -1,
        },
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <>
      <Header ref={headerRef} />
      <HeroSection />
      <About ref={aboutRef} />

      {/* <Teste /> */}
    </>
  )
}

export default App
