import React from "react";
import SingleQuestion from "./SingleQuestion";
import { nanoid } from "nanoid";

export default function Questions() {
  // const [questions, setQuestions] = React.useState([]);
  const [info, setInfo] = React.useState([]);
  const [allSelected, setAllSelected] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [showScore, setShowScore] = React.useState(false);

  React.useEffect(() => {
    if (info.length === 0) {
      fetch("https://opentdb.com/api.php?amount=5")
        .then((res) => res.json())
        .then((data) => {
          // setQuestions(data.results);
          setInfo(
            data.results.map((quest) => {
              let allAnswers = [
                ...quest.incorrect_answers,
                quest.correct_answer,
              ];
              let shuffledAnswers = shuffle(allAnswers);
              return {
                question: quest.question,
                answers: shuffledAnswers,
                correct: quest.correct_answer,
                selected: "",
              };
            })
          );
        });
    }
  }, [info]);

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  function updateSelectedAnswer(answer, currentQuestion) {
    setInfo((prev) =>
      prev.map((thing) => {
        return currentQuestion === thing.question
          ? { ...thing, selected: answer }
          : thing;
      })
    );
  }

  function checkAnswers() {
    const notAllIsAnswered = info.some((thing) => thing.selected === "");
    setAllSelected(notAllIsAnswered);
    if (!notAllIsAnswered) {
      info.map((thing) => {
        if (thing.selected === thing.correct) {
          setScore((prev) => prev + 1);
        }
      });
      setShowScore(true);
    }
  }

  function replayGame() {
    setInfo([]);
    setAllSelected(false);
    setScore(0);
    setShowScore(false);
  }

  let myArray = info.map((ans) => {
    return (
      <SingleQuestion
        key={nanoid()}
        question={ans.question}
        answers={ans.answers}
        correct={ans.correct}
        selected={ans.selected}
        update={updateSelectedAnswer}
        showScoreProp={showScore}
      />
    );
  });

  return (
    <div className="bigBoi">
      <div className="questContainer">{myArray}</div>
      {allSelected && (
        <p className="warning">Not all questions are answered!</p>
      )}
      {info.length !== 0 && !showScore ? (
        <button type="button" className="check" onClick={checkAnswers}>
          Check Answers
        </button>
      ) : null}
      {showScore && (
        <div className="scoreContainer">
          <p>You have {score}/5 answers</p>
          <button type="button" className="check" onClick={replayGame}>
            Play again
          </button>
        </div>
      )}
    </div>
  );
}
