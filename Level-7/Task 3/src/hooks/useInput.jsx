import { useState, useRef } from "react";

function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef(null);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return {
    value,
    onChange,
    ref: inputRef
  };
}

export default useInput;
