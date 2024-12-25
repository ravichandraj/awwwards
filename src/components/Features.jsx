import {TiLocationArrow} from "react-icons/ti";
import {useRef, useState} from "react";

const BentoTilt = ({children, className = ''}) => {

    const [transform, setTransform] = useState('');
    const elementRef = useRef(null);

    const handleMouseMove = (e) => {
        const {left, top, width,height} = elementRef.current.getBoundingClientRect();

        const relativeX = (e.clientX - left) / width;
        const relativeY = (e.clientY - top) / height;

        const rotateX = (relativeY - 0.5) * 10;
        const rotateY = (relativeX - 0.5) * -10;

        setTransform(`perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(0.98, 0.98, 0.98)`);

    };

    const handleMouseLeave = () => {
        setTransform('');
    }

    return (
        <div
            className={className}
            ref={elementRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{transform: transform}}
        >
            {children}
        </div>
    )
}

const BentoCard = ({src, title, description}) => {
    return (
        <div className="relative size-full">
            <video
                src={src}
                loop
                muted
                autoPlay
                className="absolute left-0 top-0 size-full object-cover object-center"
            />
            <div className="relative z-10 flex size-full flex-col text-blue-50 justify-between p-5">
                <div>
                    <h1 className="bento-title special-font">{title}</h1>
                    {description && (
                        <p className="mt-3 text-xs md:text-base">{description}</p>
                    )}
                </div>
            </div>
        </div>
    )
}


const Features = () => {
    return (
        <section id="features" className="bg-black pb-52">
            <div className="container mx-auto px-3 md:px-10">
                <div className="px-5 py-32">
                    <p className="font-circular-web text-lg text-blue-50">
                        Into the Metagame Layer
                    </p>
                    <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
                        Immerse yourself in a rich and ever-expanding universe where a vibrant array of products
                        converge into an interconnected overlay experience that transforms the way you interact on your
                        world.
                    </p>
                </div>
                <div className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
                    <BentoCard
                        src="videos/feature-1.mp4"
                        title={
                            <>radia<b>n</b>t</>
                        }
                        description="A cross-platform metagame app, turning your activities across Web2 and Web3 games into a rewarding adventure."
                    />
                </div>
                <div className="grid h-[135vh] grid-cols-2 grid-rows-3 gap-7">
                    <BentoTilt className="bento-tilt_1 row-span-1">
                        <BentoCard
                            src="videos/feature-2.mp4"
                            title={<>zig<b>m</b>a</>}
                            description="An anime and gaming inspired NFT collection - the IP primed for expansion."

                        />
                    </BentoTilt>
                    <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
                        <BentoCard
                            src="videos/feature-3.mp4"
                            title={<>n<b>e</b>xus</>}
                            description="A gamified social hub. adding a new dimension of play to social interaction for Web3 communities."
                        />
                    </BentoTilt>
                    <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
                        <BentoCard
                            src="videos/feature-4.mp4"
                            title={<>az<b>u</b>l</>}
                            description="A cross-world AI Agent -elevating your gameplay to be more fun and productive."
                        />
                    </BentoTilt>

                    <BentoTilt className="bento-tilt_2">
                        <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
                            <h1 className="bento-title special-font max-w-64">M<b>o</b>re coming soo<b>n</b>!</h1>
                            <TiLocationArrow className="m-5 scale-[5] self-end"/>
                        </div>
                    </BentoTilt>

                    <BentoTilt className="bento-tilt_2">
                        <video
                            src="/videos/feature-5.mp4"
                            muted
                            loop
                            autoPlay
                            className="size-full object-cover object-center"
                        />
                    </BentoTilt>
                </div>
            </div>
        </section>
    );
};

export default Features;