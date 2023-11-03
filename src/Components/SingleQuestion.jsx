import { nanoid } from "nanoid";
import { decode } from "html-entities";

export default function SingleQuestion(props) {
  function handleClick(answer, currentQuestion) {
    props.update(answer, currentQuestion);
  }
  const arrayOfAnswers = props.answers.map((ans) => {
    return (
      <button
        key={nanoid()}
        onClick={() => handleClick(ans, props.question)}
        className={`${ans === props.selected ? "selected" : ""} ${
          ans === props.correct && props.showScoreProp ? "correct" : ""
        } ${
          ans === props.selected && ans !== props.correct && props.showScoreProp
            ? "incorrect"
            : ""
        }${props.showScoreProp && ans !== props.correct ? " dimmed" : ""}`}
        disabled={props.showScoreProp}
      >
        {decode(ans)}
      </button>
    );
  });
  return (
    <div className="container">
      <h1>{decode(props.question)}</h1>
      <div className="answersContainer">{arrayOfAnswers}</div>
    </div>
  );
}
