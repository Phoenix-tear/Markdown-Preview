// navbar.jsx

import React, { useState } from "react";
import "./navbar.css";
import LinkModal from "./linkmodal";
import LinkImg from "./linkimg"; // Import the LinkImg component
import Tippy from '@tippyjs/react'

function Navbar({ handleBold, handleItalics, handleHeadings, isLinkModalOpen, setIsLinkModalOpen, isImageModalOpen, setIsImageModalOpen, handleLinkSubmit, handleCodeblock}) {
    const [showHeadingTooltip, setShowHeadingTooltip] = useState(false);

    const handleLinkButtonClick = () => {
        setIsLinkModalOpen(true); // Open link modal
        setIsImageModalOpen(false); // Close image modal
    };

    const handleImageButtonClick = () => {
        setIsImageModalOpen(true); // Open image modal
        setIsLinkModalOpen(false); // Close link modal
    };

    return (
        <div className="h-[10vh] navbar px-[2vw] py-[2vh] flex text-s w-full md:gap-x-[2vw] md:h-[7vh] lg:gap-x-[2vw] lg:h-[10vh] lg:text-xl lg:">
            <div className="container md:w-[7vw] ">
                <button onClick={handleBold}>Bold</button>
            </div>
            <div className="container md:w-[7vw]">
                <button onClick={handleItalics}>Italics</button>
            </div>
            <div className="container md:w-[6vw]">
                <Tippy content="Select the text with a space before it to enable heading" className=" bg-slate-200">
                    <button
                        onMouseEnter={() => setShowHeadingTooltip(true)} // Show tooltip on mouse enter
                        onMouseLeave={() => setShowHeadingTooltip(false)} // Hide tooltip on mouse leave
                        onClick={handleHeadings}
                    >
                        Heading
                        {showHeadingTooltip && ( // Conditional rendering for tooltip
                            <div className="tooltip"></div>
                        )}
                    </button>
                </Tippy >
            </div>
            <div className="flex flex-col container md:w-[10vw]">
                <button className="linkbtn" onClick={handleLinkButtonClick}>Link</button> 
                <div id="linkModal" className={`modal ${isLinkModalOpen ? "open" : ""}`}>
                    <LinkModal id="btn" isOpen={isLinkModalOpen} onClose={() => setIsLinkModalOpen(false)} onSubmit={handleLinkSubmit} />
                </div>
            </div>
            <div className="container md:w-[7vw]">
                <button className="imgbtn" onClick={handleImageButtonClick}>Image</button>
                <div id="imageModal" className={`modal ${isImageModalOpen ? "open" : ""}`}>
                    <LinkImg id="btn" isOpen={isImageModalOpen} onClose={() => setIsImageModalOpen(false)} onSubmit={handleLinkSubmit} />
                </div>
            </div>
            <div className="container md:w-[20vw]">
            <button onClick={handleCodeblock}>Codeblock</button>
            </div>
        </div>
    );
}

export default Navbar;
