import React from "react";

import { AgGridReact } from "ag-grid-react";

import {
  Typography,
  Box,
  Grid,
  Button,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Stack,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";

const CreateRetailOrder = ({ isNew }) => {
  const [data, setData] = React.useState([
    {
      id: 0,
      bookId: 0,
      quantity: 0,
      format: 0,
      isFree: false,
      amtPreConv: 0,
      amtReceived: 0,
      royaltyAuthor: 0,
      royaltyPublisher: 0,
    },
  ]);

  const columnDefs = [
    {
      field: "bookTitle",
      cellRenderer: "LinkComponent",
      flex: 1,
      editable: true,
    },
    { field: "quantity", flex: 1, editable: true },
    { field: "format", flex: 1 },
    { field: "isFree", flex: 0.5, headerName: "Is Free", editable: true },
    {
      field: "amtPreConv",
      flex: 1,
      headerName: "Amount Pre-Converted",
      editable: true,
    },
    { field: "amtReceived", flex: 1, headerName: "Amount Received" },
    { field: "royaltyAuthor", flex: 1, headerName: "Author Royalty" },
    { field: "royaltyPublisher", flex: 1, headerName: "Author Publisher" },
  ];

  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={1}>
          <ShoppingCartIcon color="primary" sx={{ fontSize: 60, mr: 2 }} />
        </Grid>
        <Grid item md={4}>
          <Typography variant="h4" sx={{ pt: 1 }}>
            Create Retail Order
          </Typography>
        </Grid>
        <Grid item md={1} />
        <Grid item md={6}>
          <Stack direction="row-reverse" spacing={2}>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              color="success"
              sx={{ width: "100px" }}
            >
              Save
            </Button>

            {!isNew && (
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            )}

            <Button variant="outlined" startIcon={<CancelIcon />}>
              Cancel
            </Button>
          </Stack>
        </Grid>

        <Grid item md={3}>
          <FormControl fullWidth>
            <InputLabel id="select-distributor">Distributor</InputLabel>
            <Select labelId="select-distributor" label="Distributor">
              <MenuItem value="IngramSpark">Ingram Spark</MenuItem>
              <MenuItem value="Ingram">Ingram</MenuItem>
              <MenuItem value="IngramLightning">
                Ingram Lightning Source
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item md={2}>
          <FormControl fullWidth>
            <InputLabel id="select-currency">Currency</InputLabel>
            <Select labelId="select-currency" label="Currency">
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="GBP">GBP</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
              <MenuItem value="CAD">CAD</MenuItem>
              <MenuItem value="AUD">AUD</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Box className="ag-theme-material" sx={{ pt: 2 }}>
        <AgGridReact
          className="ag-theme-alpine"
          containerStyle={{
            height: 200,
            width: 1200,
          }}
          rowData={data}
          columnDefs={columnDefs}
        ></AgGridReact>
      </Box>
    </>
  );
};

export default CreateRetailOrder;
