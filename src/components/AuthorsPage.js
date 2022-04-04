import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { Typography, Box, Button } from "@mui/material";

import { readAll } from "../fetcher";


const LinkComponent = ({ data }) => {
	return <Button component={RouterLink} sx={{ p: 0}} to={"/authors/" + data.id}>{data.name}</Button>
};



const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const retrieveAuthors = async () => {
      try {
        const result = await readAll("author");
        setAuthors(result.data);
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
      <Typography variant="h4">Authors</Typography>

			<Box sx={{ mt: 3}}>
			<Button color="primary" variant="contained" aria-label="add" onClick={createClick}>Create</Button>
			</Box>

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
