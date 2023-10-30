import { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import "./styles/App.module.css";

import quotesData from "./assets/quotes.json";

import img1 from "./assets/images/img1.jpg";
import img2 from "./assets/images/img2.jpg";
import img3 from "./assets/images/img3.jpg";
import img4 from "./assets/images/img4.jpg";
import img5 from "./assets/images/img5.jpg";
import img6 from "./assets/images/img6.jpg";

import "./styles/App.module.css";

interface Quote {
  quoteText: string;
  quoteAuthor: string;
}

const isImageDark = (imgSrc: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = imgSrc;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0);

      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
      let darkCount = 0;
      let totalCount = 0;

      if (imageData) {
        for (let i = 0; i < imageData.data.length; i += 4) {
          const avg =
            (imageData.data[i] +
              imageData.data[i + 1] +
              imageData.data[i + 2]) /
            3;
          if (avg < 128) {
            // this threshold can be adjusted
            darkCount++;
          }
          totalCount++;
        }
      }

      resolve(darkCount / totalCount > 0.5);
    };
  });
};

function App() {
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDark, setIsDark] = useState<boolean>(false);

  const images = [img1, img2, img3, img4, img5, img6];

  useEffect(() => {
    const randomQuote =
      quotesData[Math.floor(Math.random() * quotesData.length)];
    setSelectedQuote(randomQuote);
  }, []);

  const handleGenerateRandom = async () => {
    const randomQuote =
      quotesData[Math.floor(Math.random() * quotesData.length)];
    const randomImage = images[Math.floor(Math.random() * images.length)];

    const darkFlag = await isImageDark(randomImage);
    setIsDark(darkFlag);
    setSelectedQuote(randomQuote);
    setSelectedImage(randomImage);
  };

  const handleSave = async () => {
    const container = document.getElementById("image-container");
    if (container) {
      const canvas = await html2canvas(container);
      const a = document.createElement("a");
      a.href = canvas.toDataURL();
      a.download = "randomImage.png";
      a.click();
    }
  };

  return (
    <>
      <main>
        <div className="main-container">
          <button onClick={handleGenerateRandom}>
            Generate Random Image with Text
          </button>

          {selectedQuote && selectedImage && (
            <div id="image-container" style={{ position: "relative" }}>
              <img src={selectedImage} alt="Random" width={300} />
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: isDark ? "white" : "black",
                  fontWeight: isDark ? "normal" : "bold",
                }}
              >
                {selectedQuote.quoteText} - {selectedQuote.quoteAuthor}
              </div>
            </div>
          )}

          <button onClick={handleSave}>Save Image</button>
        </div>
      </main>

      <footer></footer>
    </>
  );
}

export default App;
