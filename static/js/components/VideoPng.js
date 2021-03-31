import gsap from "gsap/dist/gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default class videoPng {
    constructor() {
        this.DOM = {
            videoPng: ".js-video-png",
            video: ".js-video-png-video",
            png: ".js-video-png-png",
            states: {
                isActive: "is-active",
            },
        };
        this.videoPng = document.querySelector(this.DOM.videoPng);
        this.video = document.querySelector(this.DOM.video);
        this.png = document.querySelector(this.DOM.png);

        //DIMENSIONS STUFF
        this.frames = 33; //number of png frames
        this.start = ((100 / this.frames) * -1) / 2;
        this.end = (100 + this.start) * -1;
    }

    /**
     * Init
     */
    init() {
        if (this.videoPng === null) {
            return;
        }
        console.log("VideoPng init()");

        this.setLayerDimensions();
        this.videoPngSequence();
    }

    videoPngSequence() {
        console.log("Template method init");

        //set transitionBackground dimentions

        let sequenceTimeline = gsap.timeline({});

        gsap.set(this.png, {
            x: `${this.start}%`,
        });

        sequenceTimeline.add("start")
            .to(this.video, {
                duration: 1.2,
                scale: 1,
            })
            .to(
            this.png,
            {
                x: `${this.end}%`,
                duration: 1.2,
                ease: `steps(${this.frames - 1})`,
            },
            "start",
        );

        ScrollTrigger.create({
            trigger: this.videoPng,
            animation: sequenceTimeline,
            start: "top top",
            end: "300%",
            pin: true,
            //markers: true,
            scrub: 0.8,
        });
    }

    setLayerDimensions() {
        gsap.set(this.png, {
            width: `${this.videoPng.clientWidth * this.frames}px`,
            height: `${this.videoPng.clientHeight}px`,
        });
    }
}
