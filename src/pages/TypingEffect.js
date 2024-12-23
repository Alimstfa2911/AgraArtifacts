import React, { useState, useEffect } from "react";

const TypingEffect = ({ texts = [], typingSpeed = 100, pauseTime = 1000 }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[currentTextIndex];

    if (isDeleting) {
      // Handle deletion
      if (index > 0) {
        const timer = setTimeout(() => {
          setDisplayedText((prev) => prev.slice(0, -1));
          setIndex(index - 1);
        }, typingSpeed / 2);
        return () => clearTimeout(timer);
      } else {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length); // Move to the next text
      }
    } else {
      // Handle typing
      if (index < currentText.length) {
        const timer = setTimeout(() => {
          setDisplayedText((prev) => prev + currentText.charAt(index));
          setIndex(index + 1);
        }, typingSpeed);
        return () => clearTimeout(timer);
      } else {
        // Pause before deleting
        const timer = setTimeout(() => setIsDeleting(true), pauseTime);
        return () => clearTimeout(timer);
      }
    }
  }, [index, isDeleting, texts, currentTextIndex, typingSpeed, pauseTime]);

  return (
    <div>
      {displayedText}
      <span className="cursor">|</span>
    </div>
  );
};

export default TypingEffect;
