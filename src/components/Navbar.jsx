import {useEffect, useRef, useState} from "react";
import Button from "./Button.jsx";
import {TiLocationArrow} from "react-icons/ti";
import {useWindowScroll} from "react-use";
import gsap from "gsap";

const navItems = ['Hero_Section', 'Story', 'Features', 'About', 'Contact'];

const Navbar = () => {

    const [scrollY, setScrollY] = useState(0);
    const [isNavVisible, setNavVisible] = useState(true);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isIndicatorActive, setIsIndicatorActive] = useState(false);
    const navContainerRef = useRef(null);
    const audioElementRef = useRef(null);

    const {y: currentScrollY} = useWindowScroll();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (!isIndicatorActive) {
                setIsIndicatorActive(true);
            }
        }, 5000); // Start after 5 seconds

        const deactivateTimeoutId = setTimeout(() => {
            setIsIndicatorActive(isAudioPlaying);
        }, 7000); // Deactivate after 2 seconds

        return () => {
            clearTimeout(timeoutId);
            clearTimeout(deactivateTimeoutId);
        };
    }, []);

    useEffect(() => {
        if(currentScrollY === 0) {
            setNavVisible(true);
            navContainerRef.current.classList.remove("floating-nav");
        }else if(currentScrollY > scrollY){
            setNavVisible(false);
            navContainerRef.current.classList.add("floating-nav");
        }else if(currentScrollY < scrollY){
            setNavVisible(true);
            navContainerRef.current.classList.add("floating-nav");
        }
        setScrollY(currentScrollY);
    },[currentScrollY, scrollY]);

    useEffect(() => {
        gsap.to(navContainerRef.current, {
            y: isNavVisible ? 0 : -100,
            opacity: isNavVisible ? 1 : 0,
            duration:0.2,
        })
    },[isNavVisible]);

    useEffect(() => {
        if(isAudioPlaying) {
            audioElementRef.current.play();
        }else{
            audioElementRef.current.pause();
        }
    },[isAudioPlaying]);

    const toggleAudioIndicator = () => {
        setIsAudioPlaying(!isAudioPlaying);
        setIsIndicatorActive(!isAudioPlaying);
    }


    return (
        <div ref={navContainerRef}
             className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6">
            <header className="absolute top-1/2 w-full -translate-y-1/2">
                <nav className="flex size-full items-center justify-between p-4">
                    <div className="flex items-center gap-7">
                        <img src="/img/logo.png" alt="logo" className="w-10"/>
                        <Button
                            id="product-button"
                            title="Products"
                            rightIcon={<TiLocationArrow/>}
                            containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
                        />
                    </div>
                    <div className="flex h-full items-center">
                        <div className="hidden sm:block">
                            {navItems.map((item) => (
                                <a key={item} href={`#${item.toLowerCase()}`} className="nav-hover-btn">
                                    {item}
                                </a>
                            ))}
                        </div>
                        <button className="ml-10 flex items-center space-x-0 gap-1 h-full"
                                onClick={toggleAudioIndicator}
                        >
                            <audio
                                ref={audioElementRef}
                                className="hidden"
                                src="/audio/loop.mp3"
                                loop
                            />
                                {[1,2,3,4].map((item) => (
                                    <div key={item}
                                         className={`indicator-line ${isIndicatorActive? 'active': ''}`}
                                         style={{animationDelay: `${item * 0.1}s`}} onClick={toggleAudioIndicator}
                                    />
                                ))}

                        </button>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default Navbar;