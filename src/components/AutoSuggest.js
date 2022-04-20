import React from "react";

import { CircularProgress, TextField } from "@mui/material";
import Autocomplete, { createFilterOptions }  from "@mui/material/Autocomplete";

const filter = createFilterOptions();

const AutoSuggest = ({ data, value, onOpenAutoSuggest, onChange }) => {
  const [open, setOpen] = React.useState(false);
  const loading = open && data.length === 0;

  const handleChange = (ev, value) => {
    debugger;
    if (value && value.inputValue) {
        debugger;          
          // Create a new value from the user input
         
        }
    if (onChange) {
      onChange("authorId", parseInt(value.id));
    }
}

  return (
    <Autocomplete
      options={data}    
      getOptionLabel={(option) => option.name}
      onOpen={() => { setOpen(true); onOpenAutoSuggest() }}
      onClose={() => setOpen(false)}
      loading={loading}
      autoSelect
      isOptionEqualToValue={(option, value) => option.name === value.name}
      value={value}
      onChange={handleChange}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.name);
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            name: `Quick Add "${inputValue}"`,
          });
        }

        return filtered;
      }}
    
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
