import React, { useRef } from 'react'
import { useState, useEffect } from 'react';
import Botton from './Botton';
import { TiLocationArrow } from 'react-icons/ti';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import { ScrollTrigger } from 'gsap/all';


gsap.registerPlugin(ScrollTrigger);



const Hero = () => {
    const [curentIndex, setCurentIndex] = useState(1);
    const [hasClicked, setHasClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedVideos, setLoadedVideos] = useState(0);

    const totalVideos = 4;
    const nextVideoRef = useRef(null);

    const upcominVideoIndex = (curentIndex % totalVideos) + 1;

    const handelVideoLoaded = () => {
        setLoadedVideos((prev) => prev + 1)
    }


    const handelMiniVdClick = () => {
        setHasClicked(true);
        setCurentIndex(upcominVideoIndex)

    }

    useEffect(() => {

        if (loadedVideos == totalVideos - 1) {
            setIsLoading(false);
        }
    }, [loadedVideos]);

    useGSAP(() => {
        if (hasClicked) {
            gsap.set('#next-video', { visibility: 'visible' });

            gsap.to('#next-video', {
                transformOrigin: 'center center',
                scale: 1,
                width: '100%',
                height: '100%',
                duration: 1,
                ease: 'power1.inOut',
                onStart: () => nextVideoRef.current.play()
            })
            gsap.from('#current-video', {
                transformOrigin: 'center center',
                scale: 0,
                duration: 1.5,
                ease: 'power1.inOut'

            })
        }
    }, { dependencies: [curentIndex], revertOnUpdate: true })


    useGSAP(() => {
        gsap.set('#video-frame', {
            clipPath: 'polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)',
            borderRadius: '0 0 40% 10%',

        })
        gsap.from('#video-frame', {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            borderRadius: '0 0 0 0',
            ease: 'power1.inOut',
            scrollTrigger: {
                trigger: '#video-frame',
                start: 'center center',
                end: 'bottom center',
                scrub: true,
            }
        })
    })

    const getVideoStc = (index) => `videos/hero-${index}.mp4`









    return (
        <div className='relative h-dvh w-screen overflow-x-hidden'>
            {isLoading && (
                <div className='flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50'>
                    <div className='three-body'>
                        <div className='three-body__dot' />
                        <div className='three-body__dot' />
                        <div className='three-body__dot' />
                    </div>
                </div>
            )}
            <div id='video-frame' className='relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75'>
                <div className='mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg'>
                    <div onClick={handelMiniVdClick} className='origin-center scale-50 opacity-0 transition-all
                    duration-500 ease-in hover:scale-100 hover:opacity-100
                    '>
                        <video
                            ref={nextVideoRef}
                            src={getVideoStc(upcominVideoIndex)}
                            loop
                            muted
                            id='current-video'
                            className='size-64 origin-center scale-150 object-cover object-center'
                            onLoadedData={handelVideoLoaded}
                        />
                    </div>
                </div>
                <video
                    ref={nextVideoRef}
                    src={getVideoStc(curentIndex)}
                    loop
                    muted
                    id='next-video'
                    className='absolute-center invisible absolute z-20 size-64 object-cover object-center'
                    onLoadedData={handelVideoLoaded}
                />


                <video
                    src={getVideoStc(curentIndex == totalVideos - 1 ? 1 : curentIndex)}
                    autoPlay
                    loop
                    muted
                    className='absolute left-0 top-0 size-full object-cover object-center'
                    onLoadedData={handelVideoLoaded}
                />

                <h1 className='special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75'>
                    D<b>e</b>veloper
                </h1>
                <div className='absolute left-0 top-0  z-40 size-full'>
                    <div className='mt-24 px-5 sm:px-10'>
                        <h1 className='special-font hero-heading text-blue-100'>
                            <b>m</b>adidi
                        </h1>
                        <p className='mb-5 max-w-64 font-robert-regular text-blue-100'>
                            Web application developer <br /> Communication methods
                        </p>
                        <Botton id="watch-trailer" title="contact" leftIcon={<TiLocationArrow />} containerClass="!bg-yellow-300 
                            flex-center gap-1"/>
                    </div>
                </div>

            </div>
            <h1 className='special-font hero-heading absolute bottom-5 right-5  text-black'>
                D<b>e</b>veloper
            </h1>
        </div>
    )
}

export default Hero