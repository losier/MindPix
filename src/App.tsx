import { useState } from "react";
import "./styles/App.css";

import QuoteScreen from "./components/QuoteScreen";

function App() {
  const [displayScreen, setDisplayScreen] = useState<boolean>(false);
  return (
    <div className="App">
      <main>
        {displayScreen ? (
          <QuoteScreen />
        ) : (
          <a
            onClick={() => setDisplayScreen(true)}
            className="btn generate-btn"
          >
            <span>Get Started...</span>
          </a>
        )}
      </main>
    </div>
  );
}

export default App;
