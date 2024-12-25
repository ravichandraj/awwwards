import AnimatedTitle from "./AnimatedTitle.jsx";
import {useRef} from "react";
import gsap from "gsap";
import RoundedCorners from "./RoundedCorners.jsx";
import Button from "./Button.jsx";

const Story = () => {

    const frameRef = useRef(null);

    const handleMouseLeave = ()=>{
        const element = frameRef.current;
        gsap.to(element, {
            duration: 0.3,
            rotateX: 0,
            rotateY: 0,
            ease: 'power1.inOut'
        })
    };

    const handleMouseMove = (e)=>{
        const {clientX, clientY} = e;
        const element = frameRef.current;

        if(!element) return;

        const {left, right, width,height} = element.getBoundingClientRect();

        const x = clientX - left;
        const y = clientY - right;

        const centerX = width / 2;
        const centerY = height / 2;

        const rotateX =((y - centerY) / centerY) * -10;
        const rotateY =((x - centerX) / centerX) * 10;

        gsap.to(element, {
            duration: 0.3,
            rotateX,
            rotateY,
            transformPerspective: 500,
            ease: 'power1.inOut'
        })
    };

    return (
        <section id="story" className="bg-black w-screen min-h-dvh text-blue-50">
            <div className="flex flex-col size-full items-center py-10 pb-24">
                <p className="font-general text-sm uppercase md:text-[10px]">The multiversal ip world</p>
                <div className="relative size-full ">
                    <AnimatedTitle
                        title='The st<b>o</b>ry of <br /> a hidden real<b>m</b>'
                        sectionId='#story'
                        containerClass='mt-5 pointer-events-none mix-blend-difference relative z-10'
                    />
                    <div className="story-img-container">
                        <div className="story-img-mask">
                            <div className="story-img-content">
                                <img
                                    ref={frameRef}
                                    onMouseUp={handleMouseLeave}
                                    onMouseLeave={handleMouseLeave}
                                    onMouseEnter={handleMouseLeave}
                                    onMouseMove={handleMouseMove}
                                    src="img/entrance.webp"
                                    alt="entrance"
                                    className="object-contain"
                                />
                            </div>
                        </div>
                        <RoundedCorners />
                    </div>
                </div>
                <div className="-mt-80 flex w-full justify-center md:-mt-64 md:me-64 md:justify-end">
                    <div className="flex h-full w-fit flex-col items-center md:items-start">
                        <p className="mt-3 max-w-sm text-center font-circular-web text-violet-50 md:text-start">Where realm converge, lies Zentry and boundless pillar. Discover it's secrets and shape your fate admist infinate opportunities.</p>
                        <Button
                            id="realm-button"
                            title='Discover Prologue'
                            containerClass="mt-5"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Story;