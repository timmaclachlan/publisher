import React from "react";

import {
  CircularProgress,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";

const filter = createFilterOptions();

const AutoSuggest = ({
  data,
  label,
  field,
  value,
  allowCreation,
  onOpenAutoSuggest,
  onChange,
}) => {
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const loading = open && data.length === 0;

  const handleChange = (ev, value) => {
    if (value && value.inputValue) {
      debugger;
      setOpenDialog(true);
    }
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <>
      <Autocomplete
        options={data}
        getOptionLabel={(option) => {
          //if (option.id === 0) return "";
          return option[field];
        }}
        onOpen={() => {
          setOpen(true);
          if (onOpenAutoSuggest) onOpenAutoSuggest();
        }}
        onClose={() => setOpen(false)}
        loading={loading}
        autoSelect
        isOptionEqualToValue={(option, value) => {
          //if (value.id === '') return true;
          return option.id === value.id;
        }}
        value={value}
        onChange={handleChange}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (allowCreation) {
            const { inputValue } = params;
            // Suggest the creation of a new value
            const isExisting = options.some(
              (option) => inputValue === option[field]
            );
            if (inputValue !== "" && !isExisting) {
              filtered.push({
                inputValue,
                name: `Quick Add "${inputValue}"`,
              });
            }
          }

          return filtered;
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={"Make selection"}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />

      <Dialog open={openDialog}>
        <DialogTitle>Quick Add Author</DialogTitle>
        <DialogContent>
          <DialogContentText>Quickly add an new author</DialogContentText>

          <TextField
            type="text"
            label="Full Name"
            variant="outlined"
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => setOpenDialog(false)}
            startIcon={<CancelIcon />}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => setOpenDialog(false)}
            startIcon={<SaveIcon />}
            color="success"
            sx={{ width: "100px" }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AutoSuggest;
