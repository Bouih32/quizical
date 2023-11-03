import yellow from "./assets/images/shape-1.png";
import blue from "./assets/images/shape-2.png";
import OpenScreen from "./Components/OpenScreen";
import React from "react";
import Questions from "./Components/Questions";

function App() {
  const [start, setStart] = React.useState(false);

  return (
    <div>
      <img src={yellow} alt="yellowBlob" className="yellowBlob" />
      {start ? <Questions /> : <OpenScreen handleClick={setStart} />}

      <img src={blue} alt="blueBlob" className="blueBlob" />
    </div>
  );
}

export default App;
