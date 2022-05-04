import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";

import { Checkbox } from "@mui/material";

export default forwardRef((props, ref) => {
  const [checked, setChecked] = useState(null);
  const inputElement = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      getValue() {
        return checked;
      },
    };
  });

  return (
    <Checkbox
      ref={inputElement}
      checked={checked}
      indeterminate={checked === null}
      onChange={(event) => setChecked(event.target.checked)}
    />
  );
});
