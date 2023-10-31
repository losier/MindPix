import { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import "../styles/quoteScreen.css";

import { getAverageRGB } from "../hook/getAverageRGB";
import { getVisibleColor } from "../hook/getVisableColor";

import quotesData from "../assets/quotes.json";

import img1 from "../assets/images/img1.jpg";
import img2 from "../assets/images/img2.jpg";
import img3 from "../assets/images/img3.jpg";
import img4 from "../assets/images/img4.jpg";
import img5 from "../assets/images/img5.jpg";
import img6 from "../assets/images/img6.jpg";

interface Quote {
  quoteText: string;
  quoteAuthor: string;
}

const QuoteScreen = () => {
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>("rgb(0,0,0)");

  const images = [img1, img2, img3, img4, img5, img6];

  const fontWeightValue = ["bold", "bolder"];

  useEffect(() => {
    const randomQuote =
      quotesData[Math.floor(Math.random() * quotesData.length)];
    setSelectedQuote(randomQuote);
  }, []);

  const handleGenerateRandom = async () => {
    const randomQuote =
      quotesData[Math.floor(Math.random() * quotesData.length)];
    const randomImage = images[Math.floor(Math.random() * images.length)];

    setSelectedQuote(randomQuote);
    setSelectedImage(randomImage);

    getAverageRGB(randomImage).then((averageRGB) => {
      const { averageR, averageG, averageB } = averageRGB;
      const visibleColor = getVisibleColor({
        r: averageR,
        g: averageG,
        b: averageB,
      });
      const { r, g, b } = visibleColor;
      setColor(`rgb(${r},${g},${b})`);
    });
  };

  const handleSave = async () => {
    const container = document.getElementById("img-container");
    if (container) {
      const canvas = await html2canvas(container);
      const a = document.createElement("a");
      a.href = canvas.toDataURL();
      a.download = `${selectedQuote?.quoteAuthor}.png}`;
      a.click();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      `${selectedQuote?.quoteText} - ${selectedQuote?.quoteAuthor}`
    );
  };

  return (
    <>
      <div className="container">
        <div className="img-section">
          {selectedQuote && selectedImage && (
            <div
              id="img-container"
              className="img-container"
              style={{ position: "relative" }}
            >
              <img
                src={selectedImage}
                alt="Random"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: `${color}`,
                  fontWeight: `${
                    fontWeightValue[
                      Math.floor(Math.random() * fontWeightValue.length)
                    ]
                  }`,
                }}
              >
                {selectedQuote.quoteText}
              </div>
            </div>
          )}
        </div>
        <div className="button-section">
          <a
            onClick={() => handleGenerateRandom()}
            className="btn action-btn"
            data-emoji="✨"
          >
            Generate
          </a>
          <a
            onClick={() => copyToClipboard()}
            className="btn action-btn"
            data-emoji="📋"
          >
            Copy
          </a>
          <a
            onClick={() => handleSave()}
            className="btn action-btn"
            data-emoji="⬇️"
          >
            Download
          </a>
        </div>
      </div>
    </>
  );
};

export default QuoteScreen;
