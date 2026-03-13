import { useState } from 'react'
import './App.css'

export function App() {

  const [userClickedCard, setUserClickedCard] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [input, setInput] = useState("");
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const cards = [
    { id: 1, question: "What is React?", answer: "A JavaScript library for building user interfaces" },
    { id: 2, question: "What is a component?", answer: "Resuable piece of UI" },
    { id: 3, question: "What is a state?", answer: "A way to store and manage data in a component" },
    { id: 4, question: "What is a prop?", answer: "A way to pass data from a parent component to a child component" },
    { id: 5, question: "What is a hook?", answer: "A way to use state and other react features in a functional component" },
    { id: 6, question: "What is a useState?", answer: "A way to use state and other react features in a functional component" },
    { id: 7, question: "What is a useEffect?", answer: "A way to perform side effects in a functional component" },
    { id: 8, question: "What is a useContext?", answer: "A way to share data between components without passing props" },
    { id: 9, question: "What is a useReducer?", answer: "A way to manage complex state in a functional component" },
    { id: 10, question: "What is a useRef?", answer: "A way to access the DOM and persist value between renders in a functional component" },
    { id: 11, question: "What is a useMemo?", answer: "Caches the result of a computation to avoid recalculating on every render" },
    { id: 12, question: "What is a useCallback?", answer: "Returns a memoized version of a callback function to prevent unnecessary re-creations" },
    { id: 13, question: "What is a useImperativeHandle?", answer: "A way to customize the value exposed as a ref to a parent component" },
    { id: 14, question: "What is a useLayoutEffect?", answer: "A way to perform side effects in a functional component" },
    { id: 15, question: "What is a useDebugValue?", answer: "A way to display a custom value for a custom hook in the React DevTools" },
    { id: 16, question: "What is a useId?", answer: "A way to generate a unique ID for a component" },
    { id: 17, question: "What is a useTransition?", answer: "A way to control the behavior of state updates in a functional component" },
    { id: 18, question: "What is a useDeferredValue?", answer: "A way to defer the rendering of a value in a functional component" },
    { id: 19, question: "What is a useSyncExternalStore?", answer: "A way to sync external stores with React's state in a functional component" },
    { id: 20, question: "What is a useInsertionEffect?", answer: "A way to perform side effects in a functional component" }
  ];

  const [shuffledCards, setShuffledCards] = useState(cards); 
  const currentCard = shuffledCards[currentCardIndex];

  const handleCardClick = () => setUserClickedCard(!userClickedCard);

  // Fisher-Yates shuffle
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const shuffleCardsHandler = () => {
    setShuffledCards(shuffleArray(shuffledCards));
    setCurrentCardIndex(0);
  };

  const checkAnswer = (e) => {
    e.preventDefault();
    if (input.toLowerCase() === currentCard.answer.toLowerCase()) {
      setFeedback("correct");
    } else {
      setFeedback("incorrect");
    }
  };

  return (
    <>
      <div>
        <h2 className="whiteText">The Best React Quiz</h2>
        <h3 className="whiteText">How good are you at React?</h3>
        <h4 className="whiteText"> Total number of cards: {cards.length}</h4>

        <div className="flashCard">
          {currentCard && (
            <div className={`flip-card-inner ${userClickedCard ? 'flip' : ''}`}>
              <div className="flip-card-front">
                <div className="card" key={currentCard.id} onClick={handleCardClick}>
                  <h1>Card #{currentCard.id}</h1>
                  <h2>{currentCard.question}</h2>
                </div>
              </div>
              <div className="flip-card-back">
                <div className="card" onClick={handleCardClick}>
                  <h1>Card #{currentCard.id}</h1>
                  <h2>{currentCard.answer}</h2>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div>
        <form className="guess-form" onSubmit={checkAnswer}>
          <label className="yellowLabel">Your Guess:</label> 
          <input 
            className={`form-input ${feedback}`} 
            type="text" 
            placeholder="Enter your guess..." 
            value={input} 
            onChange={(e) => {setInput(e.target.value); setFeedback("");}} 
          />  
          <button className="blackButtonSubmit" type="submit">Submit</button>
          <button className="blackButtonShuffle" type="button" onClick={shuffleCardsHandler}>Shuffle Cards</button>
        </form>

        <button 
          disabled={currentCardIndex === shuffledCards.length - 1} 
          className="blackfowardbutton" 
          onClick={() => setCurrentCardIndex(prev => prev + 1)}
        >➡️</button>

        <button 
          disabled={currentCardIndex === 0} 
          className="blackBackwardbutton" 
          onClick={() => setCurrentCardIndex(prev => prev - 1)}
        >⬅️</button>
      </div>
    </>
  )
}

export default App;