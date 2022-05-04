import React from "react";

import { Button, Stack, TextField } from "@mui/material";

import dbpool from "../postgres";

const Dashboard = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleUserName = (ev) => {
    setUsername(ev.target.value);
  };

  const handlePassword = (ev) => {
    setUsername(ev.target.value);
  };

  const getAuthorsPostgres = () => {
    return new Promise(function (resolve, reject) {
      dbpool.query("SELECT * FROM authors", (error, results) => {
        if (error) {
          reject(error);
        }
        debugger;
        resolve(results.rows);
      });
    });
  };

  const handleLogin = (ev) => {
    ev.preventDefault();

    debugger;
    const getAuthors = async () => {
      debugger;
      const authors = await getAuthorsPostgres();
      return authors;
    };
    getAuthors();
  };

  return (
    <div>
      Dashboard
      <Button variant="contained">Hello World</Button>
      <Stack>
        <TextField
          variant="contained"
          name="username"
          handleChange={handleUserName}
        />
        <TextField
          variant="contained"
          name="password"
          handleChange={handlePassword}
        />
        <Button onClick={handleLogin}>Login</Button>
      </Stack>
    </div>
  );
};

export default Dashboard;
