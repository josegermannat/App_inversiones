import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import {  useEffect } from "react";
import { SplitText } from "gsap/all";

export function useAnimationChars(selector) {
gsap.registerPlugin(TextPlugin);
useEffect(() => {
        const split = new SplitText(selector, {
            type: "chars",       
      
        });

        gsap.set(split.chars, {
        autoAlpha:0,
           filter: `blur(6px)`
        });

        // 3. ANIMAR LAS PALABRAS CAYENDO
        gsap.to(split.chars, {
            y: 0, 
            duration: 0.4,     
            stagger: 0.05,
            autoAlpha:1 ,
        filter: `blur(0px)`
        });


 return () => {
      if (split.revert) split.revert();
    };

  },[selector])

}

