import React, { useState, useEffect } from "react";
import "./navbar.css";
import LinkModal from "./linkmodal";
import LinkImg from "./linkimg"; 
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

function Navbar({ handleBold, handleItalics, handleHeadings, isLinkModalOpen, setIsLinkModalOpen, isImageModalOpen, setIsImageModalOpen, handleLinkSubmit, handleCodeblock }) {
    const [showHeadingTooltip, setShowHeadingTooltip] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleLinkButtonClick = () => {
        setIsLinkModalOpen(true);
        setIsImageModalOpen(false);
    };

    const handleImageButtonClick = () => {
        setIsImageModalOpen(true);
        setIsLinkModalOpen(false); 
    };

    const headingmanager = () => {
        setShowHeadingTooltip(false);
        handleHeadings();
    };

    return (
        <div className="h-[10vh] navbar md:px-[2vw] py-[2vh] flex text-s w-full md:gap-x-[5vw] lg:gap-x-[5vw] md:text-lg lg:text-lg justify-evenly relative md:justify-normal">
            <div className="container w-max relative hover:scale-110 duration-150 ease-in-out">
                <button onClick={handleBold}>Bold</button>
            </div>
            <div className="container w-max relative hover:scale-110 duration-150 ease-in-out">
                <button onClick={handleItalics}>Italics</button>
            </div>
            <div className="container w-max relative hover:scale-110 duration-150 ease-in-out">
                {!isMobile && (
                    <Tippy content="Select the text with a space before it to enable heading" className=" bg-slate-200 absolute w-[15vw]">
                        <button
                            onMouseEnter={() => setShowHeadingTooltip(true)} 
                            onMouseLeave={() => setShowHeadingTooltip(false)} 
                            onClick={headingmanager}
                        >
                            Heading
                            {showHeadingTooltip && ( 
                                <div className="tooltip"></div>
                            )}
                        </button>
                    </Tippy>
                )}
                {isMobile && (
                    <button onClick={headingmanager}>
                        Heading
                    </button>
                )}
            </div>
            <div className="container w-max relative hover:scale-110 duration-150 ease-in-out">
                <button onClick={handleCodeblock}>Codeblock</button>
            </div>
            <div className="flex flex-col w-max relative ">
                <button className="linkbtn hover:scale-110 duration-150 ease-in-out" onClick={handleLinkButtonClick}>Link</button> 
                <div id="linkModal" className={`modal ${isLinkModalOpen ? "open" : ""}`}>
                    <LinkModal id="btn" isOpen={isLinkModalOpen} onClose={() => setIsLinkModalOpen(false)} onSubmit={handleLinkSubmit} />
                </div>
            </div>
            <div className="flex flex-col w-max relative">
                <button className="imgbtn hover:scale-110 duration-150 ease-in-out" onClick={handleImageButtonClick}>Image</button>
                <div id="imageModal" className={`modal ${isImageModalOpen ? "open" : ""}`}>
                    <LinkImg id="btn" isOpen={isImageModalOpen} onClose={() => setIsImageModalOpen(false)} onSubmit={handleLinkSubmit} />
                </div>
            </div>
            
        </div>
    );
}

export default Navbar;
