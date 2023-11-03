export default function OpenScreen(props) {
  return (
    <div className="openScreen">
      <h1>Quiz</h1>
      <p>Answer the questions and test your knowlege!</p>
      <button
        type="button"
        className="startButton"
        onClick={() => props.handleClick(true)}
      >
        Start Quiz
      </button>
    </div>
  );
}
