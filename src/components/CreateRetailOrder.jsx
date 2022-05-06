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
  TextField,
  Card,
  CardHeader,
  CardContent,
  InputAdornment,
} from "@mui/material";

import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ClearIcon from "@mui/icons-material/Clear";

import AutoSuggest from "./AutoSuggest";
import NumericEditor from "./Editors/NumericEditor";

import { readLookupAll } from "../fetcher";

const CreateRetailOrder = ({ isNew }) => {
  const [books, setBooks] = React.useState([]);
  const [orderHeader, setOrderHeader] = React.useState({
    distributor: "",
    currency: "",
    datePaymentReceived: null,
  });
  const [orderLines, setOrderLines] = React.useState([]);
  const [orderDetails, setOrderDetails] = React.useState({
    id: 0,
    quantity: 1,
    book: { id: 0, title: "" },
    format: 0,
    isFree: "",
    amtPreConv: 0,
    amtReceived: 0,
    royaltyAuthor: 0,
    royaltyPublisher: 0,
  });

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
      flex: 3,
      valueGetter: (params) => {
        return "hello";
      },
    },
    {
      field: "quantity",
      flex: 0.75,
    },
    { field: "format", flex: 1 },
    {
      field: "isFree",
      flex: 0.75,
      headerName: "Is Free",
      valueGetter: (params) => {
        return params.data.isFree ? "Yes" : "No";
      },
    },
    {
      headerName: "Amounts",
      children: [
        {
          field: "amtPreConv",
          flex: 1,
          headerName: "Pre-Converted",
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

  const handleOrderHeaderChange = (field, value) => {
    setOrderHeader((prevState) => {
      return {
        ...prevState,
        [field]: value,
      };
    });
  };

  const handleOrderSelectChange = (event) => {
    const { name, value } = event.target;
    handleOrderHeaderChange(name, value);
  };

  const handleOrderDetailChange = (field, value) => {
    debugger;
    setOrderDetails((prevState) => {
      return {
        ...prevState,
        [field]: value,
      };
    });
  };

  const handleOrderDetailSelectChange = (event) => {
    const { name, value } = event.target;
    handleOrderDetailChange(name, value);
  };

  // const onCellValueChanged = (event) => {
  //   let newStateRows = [...data];

  //   if (event.rowIndex > data.length) {
  //     let emptyItem = generateBlankItem();
  //     let newItem = {
  //       ...emptyItem,
  //       [event.colDef.field]: event.data[event.colDef.field],
  //     };
  //     newStateRows.push(newItem);
  //   } else {
  //     let existingItem = data[event.rowIndex];
  //     let newItem = {
  //       ...existingItem,
  //       [event.colDef.field]: event.data[event.colDef.field],
  //     };
  //     newStateRows[event.rowIndex] = newItem;
  //   }
  //   setData(newStateRows);
  //   console.log(data);
  // };

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

        <Grid item md={4}>
          <FormControl fullWidth>
            <InputLabel id="select-distributor">Distributor</InputLabel>
            <Select
              labelId="select-distributor"
              label="Distributor"
              name="distributor"
              value={orderHeader.distributor}
              onChange={handleOrderSelectChange}
            >
              <MenuItem value="PODWW">Print on Demand Worldwide</MenuItem>
              <MenuItem value="KDP">Kindle Direct Publishing</MenuItem>
              <MenuItem value="LS">Lightning Source</MenuItem>
              <MenuItem value="IS">Ingram Spark</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item md={3}>
          <FormControl fullWidth>
            <InputLabel id="select-currency">Currency</InputLabel>
            <Select
              labelId="select-currency"
              label="Currency"
              name="currency"
              value={orderHeader.currency}
              onChange={handleOrderSelectChange}
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="GBP">GBP</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
              <MenuItem value="CAD">CAD</MenuItem>
              <MenuItem value="AUD">AUD</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item md={3}>
          <DesktopDatePicker
            label="Payment Received"
            value={orderHeader.datePaymentReceived}
            name="datePaymentReceived"
            inputFormat="dd/MM/yyyy"
            renderInput={(params) => <TextField {...params} />}
            onChange={(value) =>
              handleOrderHeaderChange("datePaymentReceived", value)
            }
          />
        </Grid>

        <Grid item md={2} />

        <Grid item md={4}>
          <Card>
            <CardHeader subheader="Details" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item md={12}>
                  <AutoSuggest
                    data={books}
                    value={orderDetails.book}
                    field="title"
                    onChange={(value) => handleOrderDetailChange("book", value)}
                    allowCreation={false}
                  />
                </Grid>

                <Grid item md={4}>
                  <NumericEditor
                    label="Quantity"
                    onCompleteEdit={(value) =>
                      handleOrderDetailChange("quantity", value)
                    }
                    disallowDecimal
                  />
                </Grid>

                <Grid item md={4}>
                  <TextField
                    name="format"
                    variant="outlined"
                    label="Format"
                  ></TextField>
                </Grid>

                <Grid item md={4}>
                  <FormControl fullWidth>
                    <InputLabel id="isFreeLabel">Is Free</InputLabel>
                    <Select
                      labelId="isFreeLabel"
                      value={orderDetails.isFree}
                      label="Is Free"
                      name="isFree"
                      onChange={handleOrderDetailSelectChange}
                    >
                      <MenuItem value={true}>Yes</MenuItem>
                      <MenuItem value={false}>No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item md={3}>
          <Card>
            <CardHeader subheader="Amounts" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item md={12}>
                  <NumericEditor
                    label="Pre-Conversion"
                    onCompleteEdit={(value) =>
                      handleOrderDetailChange("amtPreConv", value)
                    }
                    adornment="£"
                  />
                </Grid>

                <Grid item md={12}>
                  <NumericEditor
                    label="Received"
                    onCompleteEdit={(value) =>
                      handleOrderDetailChange("amtReceived", value)
                    }
                    adornment="£"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item md={3}>
          <Card>
            <CardHeader subheader="Royalties" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item md={12}>
                  <NumericEditor
                    label="Author"
                    onCompleteEdit={(value) =>
                      handleOrderDetailChange("royaltyAuthor", value)
                    }
                    adornment="£"
                  />
                </Grid>

                <Grid item md={12}>
                  <NumericEditor
                    label="Publisher"
                    onCompleteEdit={(value) =>
                      handleOrderDetailChange("royaltyPublisher", value)
                    }
                    adornment="£"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item md={2}>
          <Stack spacing={2}>
            <Button
              variant="contained"
              startIcon={<AddCircleIcon />}
              color="success"
              sx={{ width: "100px" }}
            >
              Add
            </Button>

            <Button
              variant="outlined"
              startIcon={<ClearIcon />}
              color="success"
              sx={{ width: "100px" }}
            >
              Clear
            </Button>
          </Stack>
        </Grid>
      </Grid>

      <Box className="ag-theme-material" sx={{ pt: 2 }}>
        <AgGridReact
          className="ag-theme-alpine"
          containerStyle={{
            height: 200,
            width: 1200,
          }}
          rowData={orderLines}
          columnDefs={columnDefs}
        ></AgGridReact>
      </Box>
    </>
  );
};

export default CreateRetailOrder;
