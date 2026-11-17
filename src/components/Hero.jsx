import React, {useRef} from 'react'
import {useGSAP} from "@gsap/react";
import {SplitText} from "gsap/all";
import gsap from "gsap";
import {useMediaQuery} from "react-responsive";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Make sure this is imported

gsap.registerPlugin(SplitText, ScrollTrigger); // Register ScrollTrigger

function Hero() {
    const videoRef = useRef(null);
    const isMobile = useMediaQuery({maxWidth:767});

    useGSAP(()=>{
        const heroSplit = new SplitText('.title',{type:'chars, words'});
        const paragraphSplit = new SplitText('.subtitle',{type:'lines'});

        if (heroSplit.chars) {
            heroSplit.chars.forEach((char) => {
                char.classList.add('text-gradient');
            });

            gsap.from(heroSplit.chars, {
                yPercent: 100,
                duration: 1.8,
                ease: 'expo.out',
                stagger: 0.05
            });
        }

        if (paragraphSplit.lines) {
            gsap.from(paragraphSplit.lines, {
                opacity: 0,
                yPercent: 100,
                duration: 1.8,
                ease: 'expo.out',
                stagger: 0.06,
                delay: 1,
                force3D: true,
                rotationZ: 0.01,
                z: 0.01
            });
        }

        // 1. Leaf Parallax Timeline
        gsap.timeline({
            scrollTrigger:{
                trigger:'#hero',
                start:"top top",
                end:"bottom top",
                scrub:true,
            }})
            .to('.right-leaf',{ y:200 }, 0)
            .to('.left-leaf',{ y:-200 }, 0);

        // 2. Responsive Video Scroll Timeline
        const startValue = isMobile ? "top 50%" : "center 60%";
        const endValue = isMobile ? "120% top" : "bottom top";

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: 'video',
                start: startValue,
                end: endValue,
                scrub: true,
                pin:true // video stays
            }
        })

        videoRef.current.onloadedmetadata = () => {
            tl.to(videoRef.current,{
                currentTime:videoRef.current.duration,
            })
        }


    }, []) //

    return (
        <>
            <section id="hero" className="noisy">
                <h1 className="title relative z-10">COLD</h1>
                <img src="/images/hero-left-leaf.png" alt="left-leaf" className="left-leaf z-10" />
                <img src="/images/hero-right-leaf.png" alt="right-leaf" className="right-leaf z-10" />

                <div className="body z-10">
                    <div className="content">
                        <div className="space-y-5 hidden md:block ">
                            <p>Drink.Focus.Win </p>
                            <p className="subtitle">Sip the Spirit of <br/> of GOAL </p>
                        </div>

                        <div className="view-cocktails">
                            <p className="subtitle">
                                Formulated to keep you locked in from the first rep to the final hour
                            </p>
                            <a href="#cocktails">View Drinks</a>
                        </div>
                    </div>
                </div>

                <div className="video absolute inset-0 pointer-events-none mix-blend-screen">
                    <video
                        ref={videoRef}
                        src="/videos/output.mp4"
                        muted={true}
                        playsInline={true}
                        preload="auto"
                        className="mix-blend-screen contrast-125 brightness-95"
                    />
                </div>
            </section>
        </>
    )
}
export default Hero