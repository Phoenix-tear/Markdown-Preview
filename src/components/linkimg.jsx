import React, { useState } from "react";
import "./linkmodal.css";

function LinkImg({ onSubmit, onClose }) {
    const [name, setName] = useState("");
    const [link, setLink] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedLink = `![${name}](${link})`;
        onSubmit(formattedLink);
        setName("");
        setLink("");
    };

    return (
        <form onSubmit={handleSubmit} className=" p-[0.5vh] md:p-[1.2vh] lg:p-[3vh] absolute flex flex-col gap-y-[2vh] z-10 w-[20vw] rounded-md ">
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className=" bg-slate-700 p-[1vh] rounded-md" />
            <input type="text" placeholder="Link" value={link} onChange={(e) => setLink(e.target.value)} className=" bg-slate-700 p-[1vh] rounded-md" />
            <button type="submit" className=" ">Submit</button>
        </form>
    );
}

export default LinkImg