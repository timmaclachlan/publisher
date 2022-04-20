import React from "react";

import { Autocomplete, CircularProgress, TextField } from "@mui/material";


const AutoSuggest = ({ data, value, onOpenAutoSuggest, onChange }) => {
  const [open, setOpen] = React.useState(false);
  const loading = open && data.length === 0;

  const handleChange = (ev, value) => {
    if (onChange) {
      onChange("authorId", parseInt(value.id));
    }
}

  return (
    <Autocomplete
      options={data}
      getOptionLabel={(option) => option.fullName}
      onOpen={() => { setOpen(true); onOpenAutoSuggest() }}
      onClose={() => setOpen(false)}
      loading={loading}
      autoSelect
      isOptionEqualToValue={(option, value) => option.fullName === value.fullName}
      value={value}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField {...params}
          label="Author"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default AutoSuggest;
