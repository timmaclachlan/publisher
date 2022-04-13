import React from "react";

import { Autocomplete, TextField } from "@mui/material";


const AutoSuggest = ({data, onOpenAutoSuggest}) => {
  return (
    <Autocomplete
      options={data}
      getOptionLabel={(option) => option.name}
      disablePortal
      onOpen={onOpenAutoSuggest}
      renderInput={(params) => <TextField {...params} label="Author" />}
    />
  );
};

export default AutoSuggest;
