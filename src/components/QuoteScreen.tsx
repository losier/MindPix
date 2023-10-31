import "../styles/quoteScreen.css";

const QuoteScreen = () => {
  return (
    <>
      <div className="container">
        <div className="img-section">
          <div className="img-container"></div>
        </div>
        <div className="button-section">
          <a className="btn action-btn" data-emoji="✨">
            Generate
          </a>
          <a className="btn action-btn" data-emoji="📋">
            Copy
          </a>
          <a className="btn action-btn" data-emoji="⬇️">
            Download
          </a>
        </div>
      </div>
    </>
  );
};

export default QuoteScreen;
