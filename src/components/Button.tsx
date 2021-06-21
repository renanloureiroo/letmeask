import { useState } from "react";

export const Button = () => {
  const [counter, setCounter] = useState(0);

  return <button onClick={() => setCounter(counter + 1)}>{counter}</button>;
};
