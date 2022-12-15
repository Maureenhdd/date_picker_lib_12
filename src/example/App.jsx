import React from "react";
import InputDate from "../lib";
const onClick = (date) => {
  console.log(date);
};
const App = () => (
  <div style={{ width: 640, margin: "15px auto" }}>
    <h1>Hello React</h1>
    <InputDate date={new Date("2012-05-30")} onClick={onClick} width={300} />
  </div>
);

export default App;
