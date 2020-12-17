import React from "react";
import Confetti from "react-confetti";
import { useState, useEffect } from "react";

export default function test() {
  const size = useWindowSize();

  return (
    <div>
      <Confetti style={{ animation: "2s ease 5s 1 reverse forwards running fadeIn" }} Number="10000" width={parseInt(size.width)} height={parseInt(size.height)} />
      <div className="finished">
        <img src="../static/endCreateProduct.png" alt="Opret et produkt på få øjeblikke" />
        <h2>Dit produkt blev oprettet succesfuldt!!</h2>

        <div className="buttonWrapper">
          <button className="whiteButton">Opret endnu et produkt</button>
          <button className="greenButton">Se produkt</button>
        </div>
      </div>
    </div>
  );
}

// Hook
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}
