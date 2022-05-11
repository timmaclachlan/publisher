import React from "react";

import { Button, Stack, TextField } from "@mui/material";

const Dashboard = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleUserName = (ev) => {
    setUsername(ev.target.value);
  };

  const handlePassword = (ev) => {
    setUsername(ev.target.value);
  };

  const handleLogin = (ev) => {
    ev.preventDefault();
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
