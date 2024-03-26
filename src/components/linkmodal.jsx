import React, { useState } from "react";
import "./linkmodal.css";

function LinkModal({ onSubmit, onClose }) {
    const [name, setName] = useState("");
    const [link, setLink] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedLink = `[${name}](${link})`;
        onSubmit(formattedLink);
        setName("");
        setLink("");
    };

    return (


        <form onSubmit={handleSubmit} className=" p-[0.2vh] md:p-[1.2vh] lg:p-[3vh]">

            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className=" bg-slate-700 p-[1vh] " />


            <input type="text" placeholder="Link" value={link} onChange={(e) => setLink(e.target.value)} className=" bg-slate-700 p-[1vh]" />

            <button type="submit">Submit</button>
        </form>


    );
}

export default LinkModal;