import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { Typography, Box, Grid, Button } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";

import { readAll } from "../fetcher";


const LinkComponent = ({ data }) => {
	return <Button component={RouterLink} sx={{ p: 0}} to={"/authors/" + data.id}>{data.name}</Button>
};



const Authors = ({onRecordChange}) => {
  const [authors, setAuthors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const retrieveAuthors = async () => {
      try {
        const result = await readAll("author");
        setAuthors(result.data);
        onRecordChange("");
      } catch (error) {
        console.log(error);
      }
    };
    retrieveAuthors();
  }, []);

  const createClick = (event) => {
    navigate("/authors/new");
  };

  const columnDefs = [
    {
      field: "name",
      cellRenderer: "LinkComponent",
    },
    { field: "address", width: 300 },
    { field: "active" },
	];
	


  return (
    <>
      <Grid container>
        <Grid item>
          <PeopleIcon color="primary" sx={{fontSize: 60, mr: 2}} />
        </Grid>
        <Grid item>
          <Typography variant="h4" sx={{pt: 1}}>Authors</Typography>
        </Grid>
        <Grid item md={3} />
        <Grid item md={2}>
          <Button color="primary" variant="contained" sx={{mt: 1}} aria-label="add" onClick={createClick}>Create</Button>
        </Grid>
      </Grid>
            

			<Box className="ag-theme-material" style={{ height: 800, width: 800 }}>

        <AgGridReact
          rowData={authors}
          columnDefs={columnDefs}
          frameworkComponents={{
            LinkComponent,
          }}
        ></AgGridReact>
      </Box>
    </>
  );
};

export default Authors;
