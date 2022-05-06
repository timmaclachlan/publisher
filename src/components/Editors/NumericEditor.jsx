import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";

import { TextField } from "@mui/material";

const KEY_BACKSPACE = "Backspace";
const KEY_DELETE = "Delete";
const KEY_ENTER = "Enter";
const KEY_TAB = "Tab";
const KEY_ARROWUP = "ArrowUp";
const KEY_ARROWDOWN = "ArrowDown";
const KEY_ARROWLEFT = "ArrowLeft";
const KEY_ARROWRIGHT = "ArrowRight";

export default forwardRef((props, ref) => {
  const [value, setValue] = useState(props.value ?? 1);
  const inputElement = useRef(null);

  // useEffect(() => {
  //   if (inputElement) {
  //     inputElement.current.focus();
  //   }
  // }, []);

  const isLeftOrRight = (event) => {
    return [KEY_ARROWLEFT, KEY_ARROWRIGHT].indexOf(event.key) > -1;
  };

  const isKeyPressedNumeric = (event) => {
    return !!/\d/.test(event.key);
  };

  const deleteOrBackspace = (event) => {
    return [KEY_DELETE, KEY_BACKSPACE].indexOf(event.key) > -1;
  };

  const finishedEditingPressed = (event) => {
    const key = event.key;
    return key === KEY_ENTER || key === KEY_TAB;
  };

  const onKeyDown = (event) => {
    if (isLeftOrRight(event) || deleteOrBackspace(event)) {
      event.stopPropagation();
      return;
    }

    if (event.key === KEY_ARROWUP) {
      setValue(parseInt(value) + 1);
    }
    if (event.key === KEY_ARROWDOWN) {
      if (value > 1) {
        setValue(parseInt(value) - 1);
      }
    }

    if (!finishedEditingPressed(event) && !isKeyPressedNumeric(event)) {
      if (event.preventDefault) event.preventDefault();
    }
  };

  useImperativeHandle(ref, () => {
    return {
      getValue() {
        return value;
      },
    };
  });

  return (
    <TextField
      ref={inputElement}
      value={value}
      size="small"
      onChange={(event) => setValue(event.target.value)}
      onKeyDown={(event) => onKeyDown(event)}
    />
  );
});
