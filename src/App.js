import React from 'react';
import './style.css';
import axios from 'axios';
import './style.css';

export default function App() {
  const [ques, setQues] = React.useState([]);
  const [qindex, setQindex] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [isEnded, setIsEnded] = React.useState(false);

  console.log(score, isEnded, qindex);

  let options;
  if (ques[0] && !isEnded) {
    options = [
      ques[qindex].correctAnswer,
      ...ques[qindex].incorrectAnswers,
    ].sort();
  }
  React.useEffect(() => {
    axios
      .get(
        'https://the-trivia-api.com/api/questions?categories=history,general_knowledge,geography,science&limit=20&difficulty=medium'
      )
      .then((res) => {
        setQues(res.data);
      });
  }, []);
  const handleNext = (i) => {
    if (qindex >= 19) {
      setIsEnded(true);
    }

    if (!isEnded && options[i] == ques[qindex].correctAnswer) {
      setScore(score + 1);
    }
    setQindex(qindex + 1);
  };

  return (
    <div className="App">
      {ques[0] && !isEnded === true && (
        <div className="questions">
          <div className="question">{`${qindex + 1}. ${
            ques[qindex].question
          }`}</div>
          <div className="options">
            {options.map((item, index) => (
              <span
                key={index.toString()}
                className="option"
                onClick={() => handleNext(index)}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}
      {isEnded && (
        <div>
          <div>
            Your scrore is <b>{score}</b>
          </div>
          <button onClick={() => document.location.reload()}>
            Restart quiz
          </button>
        </div>
      )}
    </div>
  );
}
