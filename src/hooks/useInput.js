import { useState } from "react";

const useInput = (customValue) => {
  const [data, setData] = useState(customValue ? customValue : null);
  const [isTouched, setIsTouched] = useState(false, "");

  const changeHandler = (event) => {
    let key = event.currentTarget.id;
    let value = event.currentTarget.value;
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const blurHandler = () => {
    setIsTouched(true);
  };

  return {
    data,
    setData,
    changeHandler,
    blurHandler,
    isTouched,
    setIsTouched,
  };
};
export default useInput;
