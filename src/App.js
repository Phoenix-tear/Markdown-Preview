// App.js

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import Navbar from "./components/navbar";

import "./App.css";

function Italics(txt) {
  return '*' + txt + '*';
}
function CodeBlock(txt){
  return '```\n' + txt + '\n```';
}

function Heading(txt) {
  if (txt.startsWith('#') || /^\s/.test(txt)) {
    return txt;
  } else {
    return '#' + txt.trim();
  }
}

function Bold(txt) {
  return '**' + txt + '**';
}

function App() {
  const [markdown, setMarkdown] = useState("# Markdown Preview");
  const [selectedText, setSelectedText] = useState("");
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false); // Add state for image modal

  useEffect(() => {
    document.addEventListener("mouseup", handleTextSelection);

    return () => {
      document.removeEventListener("mouseup", handleTextSelection);
    };
  }, []);
  useEffect(() => {
    const handleClickOutsideModal = (e) => {
      if (
        !e.target.closest(".modal") &&
        !e.target.closest(".input") &&
        !e.target.closest(".linkbtn") &&
        !e.target.closest(".imgbtn") 
      ) {
        setIsLinkModalOpen(false);
        setIsImageModalOpen(false);
      }
    };
  
    document.body.addEventListener("click", handleClickOutsideModal);
  
    return () => {
      document.body.removeEventListener("click", handleClickOutsideModal);
    };
  }, []);
  
  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection) {
      const selectedText = selection.toString();
      setSelectedText(selectedText);
    }
  };

  const handleBold = () => {
    if (selectedText) {
      const boldedText = Bold(selectedText);
      setMarkdown((prevMarkdown) => prevMarkdown.replace(selectedText, boldedText));
    } else {
      setMarkdown((prevMarkdown) => prevMarkdown + "**Add Text Here**");
    }
  };

  const handleItalics = () => {
    if (selectedText) {
      const italicizedText = Italics(selectedText);
      setMarkdown((prevMarkdown) => prevMarkdown.replace(selectedText, italicizedText));
    } else {
      setMarkdown((prevMarkdown) => prevMarkdown + "*Add Text Here*");
    }
  };
  const handleCodeblock = () => {
    if (selectedText) {
      const codeblock = CodeBlock(selectedText);
      setMarkdown((prevMarkdown) => prevMarkdown.replace(selectedText, codeblock));
    } else {
      setMarkdown((prevMarkdown) => prevMarkdown + "```\nAdd Code Here\n```");
    }
  };

  const handleHeadings = () => {
    if (selectedText) {
      const heading = Heading(selectedText);
      setMarkdown((prevMarkdown) => prevMarkdown.replace(selectedText, heading));
    } else {
      setMarkdown((prevMarkdown) => prevMarkdown + "# Add Text Here");
    }
  };

  const handleLinkSubmit = (formattedLink) => {
    setMarkdown((prevMarkdown) => prevMarkdown + " " + formattedLink);
    setIsLinkModalOpen(false); // Close the link modal after submitting
    setIsImageModalOpen(false); // Close the image modal after submitting
  };

  useEffect(() => {
    const modalDiv = document.getElementById("linkModal");
    if (isLinkModalOpen) {
      modalDiv.style.display = "block"; // Show the link modal
    } else {
      modalDiv.style.display = "none"; // Hide the link modal
    }

    const imageModalDiv = document.getElementById("imageModal");
    if (isImageModalOpen) {
      imageModalDiv.style.display = "block"; // Show the image modal
    } else {
      imageModalDiv.style.display = "none"; // Hide the image modal
    }
  }, [isLinkModalOpen, isImageModalOpen]);

  const handleTextareaClick = () => {
    setIsLinkModalOpen(false); // Close the link modal when clicking on the textarea
    setIsImageModalOpen(false); // Close the image modal when clicking on the textarea
  };


  return (
    <main>
      <Navbar className="nav"
        handleItalics={handleItalics}
        handleHeadings={handleHeadings}
        handleBold={handleBold}
        onLinkClick={() => setIsLinkModalOpen(true)}
        onImageClick={() => setIsImageModalOpen(true)} // Handle image button click
        isLinkModalOpen={isLinkModalOpen}
        setIsLinkModalOpen={setIsLinkModalOpen}
        isImageModalOpen={isImageModalOpen} // Pass image modal state
        setIsImageModalOpen={setIsImageModalOpen} // Set image modal state
        handleLinkSubmit={handleLinkSubmit}
        handleCodeblock={handleCodeblock}
      />

      <section className="markdown justify-center">
        <textarea
          onMouseUp={handleTextSelection}
          onClick={handleTextareaClick}
          className="input h-[40vh] md:h-[80vh] lg:h-[70vh]"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
        ></textarea>
        <article className="result h-[40vh] md:h-[80vh] lg:h-[70vh]">
          <ReactMarkdown>{markdown}</ReactMarkdown>

        </article>
      </section>
    </main>
  );
}

export default App;
