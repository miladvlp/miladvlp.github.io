import { useGSAP } from '@gsap/react'
import React from 'react'
import gsap from 'gsap'

import { ScrollTrigger } from 'gsap/all'
import AnimatedTitle from './AnimatedTitle';


gsap.registerPlugin(ScrollTrigger);

const About = () => {
    useGSAP(() => {
        const clipAnimation = gsap.timeline({
            scrollTrigger: {
                trigger: '#clip',
                start: 'center center',
                end: '+=800 center',
                scrub: 0.5,
                pin: true,
                pinSpacing: true,


            }
        })
        clipAnimation.to('.mask-clip-path', {
            width: '100vw',
            height: '100vh',
            borderRadius: 0
        })
    })
    return (
        <div id='about' className='min-h-screen w-screen '>
            <div className='relative mb-8 mt-36 flex flex-col items-center
        gap-5'>
                <h2 className='font-general text-sm uppercase md:text-[10px] '>
                    Software Engineer & AI Developer
                </h2>
                <div className="text-center">
                    <AnimatedTitle
                        title="Crafting sm<b>a</b>rt solutions in <br/> mobil<b>e</b>, AI & Rust"
                        containerClass='mt-5 !text-black text-center '

                    />
                </div>

                <div className='about-subtext text-center'>
                    <p>Building smart mobile experiences tailored to your needs</p>
                    <p>Leveraging AI and Rust to create efficient and reliable software</p>
                </div>

            </div>
            <div className='h-dvh w-screen' id='clip'>
                <div className='mask-clip-path about-image'>
                    <img
                        src='img/about.jpg'
                        alt='Background'
                        className='absolute left-0 top-0 size-full object-cover'
                    />
                </div>
            </div>
        </div>
    )
}

export default About