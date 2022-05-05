import React, { useEffect } from "react";

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

import AutoSuggestEditor from "./Editors/AutoSuggestEditor";
import NumericEditor from "./Editors/NumericEditor";
import CheckboxEditor from "./Editors/CheckboxEditor";

import { readLookupAll } from "../fetcher";

const generateBlankItem = () => {
  return {
    id: 0,
    bookId: 0,
    book: { id: 0, title: "" },
    quantity: 0,
    format: 0,
    isFree: null,
    amtPreConv: 0,
    amtReceived: 0,
  };
};

const CreateRetailOrder = ({ isNew }) => {
  const [books, setBooks] = React.useState([]);
  const [data, setData] = React.useState([generateBlankItem()]);
  const [distributor, setDistributor] = React.useState("");
  const [currency, setCurrency] = React.useState("");

  useEffect(() => {
    const retrieveBooks = async () => {
      try {
        const bookRecords = await readLookupAll("book");
        setBooks(bookRecords.data);
      } catch (error) {
        console.log(error);
      }
    };
    retrieveBooks();
  }, []);

  const columnDefs = [
    {
      field: "book",
      flex: 3,
      editable: true,
      cellEditor: AutoSuggestEditor,
      cellEditorParams: {
        labelField: "title",
        idField: "id",
        placeHolder: "Book title",
        options: books,
        value: { id: 2, title: "Enchanted Forest" },
      },
      valueGetter: (params) => {
        debugger;
        return params.data.book.title;
      },
    },
    {
      field: "quantity",
      flex: 0.75,
      editable: true,
      cellEditor: NumericEditor,
    },
    { field: "format", flex: 1 },
    {
      field: "isFree",
      flex: 0.75,
      headerName: "Is Free",
      editable: true,
      cellEditor: CheckboxEditor,
      valueGetter: (params) => {
        if (params.data.isFree) {
          return "Yes";
        }
        if (params.data.isFree === null) {
          return "Not set";
        }
        if (!params.data.isFree) {
          return "No";
        }
      },
    },
    {
      headerName: "Amounts",
      children: [
        {
          field: "amtPreConv",
          flex: 1,
          headerName: "Pre-Converted",
          editable: true,
        },
        { field: "amtReceived", flex: 1, headerName: "Received" },
      ],
    },
    {
      headerName: "Royalties",
      children: [
        { field: "royaltyAuthor", flex: 1, headerName: "Author" },
        { field: "royaltyPublisher", flex: 1, headerName: "Publisher" },
      ],
    },
  ];

  const onCellValueChanged = (event) => {
    let newStateRows = [...data];
    debugger;

    if (event.rowIndex > data.length) {
      let emptyItem = generateBlankItem();
      let newItem = {
        ...emptyItem,
        [event.colDef.field]: event.newValue,
      };
      newStateRows.push(newItem);
    } else {
      let existingItem = data[event.rowIndex];
      let newItem = {
        ...existingItem,
        [event.colDef.field]: event.newValue,
      };
      newStateRows[event.rowIndex] = newItem;
    }
    setData(newStateRows);
    console.log(data);
  };

  const handleDistributorChange = (ev) => {
    setDistributor(ev.target.value);
  };

  const handleCurrencyChange = (ev) => {
    setCurrency(ev.target.value);
  };

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
            <Select
              labelId="select-distributor"
              label="Distributor"
              value={distributor}
              onChange={handleDistributorChange}
            >
              <MenuItem value="PODWW">Print on Demand Worldwide</MenuItem>
              <MenuItem value="KDP">Kindle Direct Publishing</MenuItem>
              <MenuItem value="LS">Lightning Source</MenuItem>
              <MenuItem value="IS">Ingram Spark</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item md={2}>
          <FormControl fullWidth>
            <InputLabel id="select-currency">Currency</InputLabel>
            <Select
              labelId="select-currency"
              label="Currency"
              value={currency}
              onChange={handleCurrencyChange}
            >
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
          onCellValueChanged={onCellValueChanged}
        ></AgGridReact>
      </Box>
    </>
  );
};

export default CreateRetailOrder;
