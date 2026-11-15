import React from 'react'
import {useGSAP} from "@gsap/react";
import {SplitText} from "gsap/all";
import gsap from "gsap";

gsap.registerPlugin(SplitText);

function Hero() {
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
                force3D: true,      // Keeps it hardware accelerated
                rotationZ: 0.01,    // Prevents the GPU-to-CPU rendering snap
                z: 0.01
            });
        }

        gsap.timeline({
            scrollTrigger:{
                trigger:'#hero',
                start:"top top",
                end:"bottom top",
                scrub:true, //Directly Apply to the Scrol
            }})
                .to('.right-leaf',{
                    y:200
                },0)
                .to('.left-leaf',{
                    y:-200
                },0)


    },[])

    return (
        <>
            <section id="hero" className="noisy">
                <h1 className="title">COLD</h1>
                <img src="/images/hero-left-leaf.png" alt="left-leaf" className="left-leaf" />
                <img src="/images/hero-right-leaf.png" alt="right-leaf" className="right-leaf" />

                <div className="body">
                    <div className="content ">
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
            </section>
        </>
    )
}

export default Hero