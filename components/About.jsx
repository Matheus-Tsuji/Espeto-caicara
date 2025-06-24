import React, { useLayoutEffect, useRef, forwardRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = forwardRef((props, ref) => {
    const textLine1Ref = useRef(null);
    const textLine2Ref = useRef(null);
    const textLine3Ref = useRef(null);
    const paragraph1Ref = useRef(null);
    const paragraph2Ref = useRef(null);
    const ctaRef = useRef(null); 

    const splitText = (text) => {
        return text.split('').map((char, index) => (
            <span key={index} className="inline-block" style={{ whiteSpace: 'pre' }}>
                {char}
            </span>
        ));
    };

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const aboutTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ref.current,
                    start: 'top 50%',
                    end: 'bottom top',
                    toggleActions: 'play none none reverse',
                }
            });

            aboutTl.from(textLine1Ref.current.children, { y: 20, autoAlpha: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out' })
                .from(textLine2Ref.current.children, { y: 20, autoAlpha: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out' }, '-=0.3')
                .from(textLine3Ref.current.children, { y: 20, autoAlpha: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out' }, '-=0.3')
                .from([paragraph1Ref.current, paragraph2Ref.current], {
                    y: 30,
                    autoAlpha: 0,
                    duration: 0.6,
                    ease: 'power2.out',
                    stagger: 0.2,
                }, '+=0.2')
                .to(ctaRef.current, {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.8,
                    ease: 'power2.out',
                }, '+=0.1'); // <-- AQUI ESTÁ A CORREÇÃO: Usando '>' para iniciar exatamente após a animação anterior.

        }, ref);

        return () => ctx.revert();
    }, [ref]);

    return (
        <section
            ref={ref}
            className="min-h-screen w-full flex flex-col items-center justify-center relative py-32 historia text-[#003018]"
            style={{ backgroundColor: '#EAE2D6' }}
        >
            <div className="container flex flex-col justify-center items-center text-center gap-16">

                <div>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold lora">
                        <p ref={textLine1Ref} className="mb-3">{splitText("Sabor que conta histórias,")}</p>
                        <p ref={textLine2Ref}>{splitText("tradição que abraça.")}</p>
                    </h2>
                    <p ref={textLine3Ref} className="text-2xl md:text-3xl lora italic text-[#C44536] mt-4">
                        {splitText("em cada espeto, uma memória.")}
                    </p>
                </div>

                <div className='flex flex-col gap-8 text-left items-start max-w-prose text-lg md:text-xl text-[#5C6159] lora'>
                    <p ref={paragraph1Ref}>O Espeto Caiçara, em Araçatiba, é um icônico restaurante familiar que serve o melhor da Ilha Grande. Com decoração rústica e um ar de nostalgia, seu forte são os pratos autênticos feitos com peixe fresco, pescado no mesmo dia. O cardápio celebra a fartura do mar, oferecendo desde os famosos espetos até moquecas e pirão, garantindo uma experiência de sabor verdadeiramente local.</p>
                    <p ref={paragraph2Ref}>Mais que um restaurante, o lugar é o sonho realizado de uma família que começou apenas com sua sabedoria de pesca. O Espeto Caiçara se tornou um ponto de encontro da comunidade, onde cada prato é servido com afeto e tradição. Comer ali não é apenas uma refeição, mas uma imersão na cultura e na alma caiçara.</p>
                </div>

                <span 
                    ref={ctaRef}
                    className='opacity-0 translate-y-8 cursor-pointer inline-block border-2 border-[#C44536] text-[#C44536] px-8 py-3 rounded-full text-sm font-semibold archivo tracking-widest uppercase hover:bg-[#C44536] hover:text-[#EAE2D6] mt-8 transition-all duration-300 ease-out'
                >
                    Explore nosso Cardápio
                </span>

            </div>
        </section>
    );
});

export default About;