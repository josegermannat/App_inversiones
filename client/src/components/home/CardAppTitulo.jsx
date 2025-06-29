import { gsap } from "gsap";
import "../../styles/components/CardTitulo.css";

import { TextPlugin } from "gsap/TextPlugin";
import {  useEffect } from "react";
import { SplitText } from "gsap/all";

export default function CardAppTitulo() {
gsap.registerPlugin(TextPlugin);


useEffect(() => {
        const split = new SplitText(".title", {
            type: "chars",       
      
        });

        gsap.set(split.chars, {
        autoAlpha:0,
           filter: `blur(6px)`
        });

        // 3. ANIMAR LAS PALABRAS CAYENDO
        gsap.to(split.chars, {
            y: 0, 
            duration: 0.5,     
            stagger: 0.1,
            autoAlpha:1 ,
        filter: `blur(0px)`
        });


  },[])




  return (
    <div className="home__title">
        <h1 className="title">Simulador de inveriones</h1>     
    </div>
  );
}
