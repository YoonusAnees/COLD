import React from 'react';
import { navLinks } from "../constants/index.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
    useGSAP(() => {
        // 1. Create the timeline and attach the ScrollTrigger
        const navTween = gsap.timeline({
            scrollTrigger: {
                trigger: 'nav',
                start: "bottom top",
            }
        });

        // 2. Chain your fromTo animation to the timeline
        navTween.fromTo('nav', {
            backgroundColor: 'transparent',
            backdropFilter: 'blur(0px)',
            borderRadius: '0px 0px 0px 0px'
        }, {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(10px)',
            borderRadius: '0px 0px 50px 50px',
            duration: 0.5,
            ease: 'power1.inOut'
        });
    }, []);

    return (
        <nav>
            <div className="p-4">
                <a href="#home" className="flex items-center gap-2">
                    <img src="/images/logo.png" alt="logo" />
                    <p>COLD</p>
                </a>
                <ul>
                    {navLinks.map((link) => (
                        <li key={link.id}>
                            <a href={`#${link.id}`}>{link.title}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;