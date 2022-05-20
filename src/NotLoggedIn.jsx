import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { Stack, Typography, Button } from "@mui/material";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button variant="contained" onClick={() => loginWithRedirect()}>
      Log In
    </Button>
  );
};

const NotLoggedIn = () => {
  const { isLoading } = useAuth0();
  return (
    <Stack alignItems="center" spacing={5}>
      <img src="rowanvale.jpg" alt="Rowanvale logo" />
      <Typography variant="h5">Welcome to Athena</Typography>
      {!isLoading && <LoginButton />}
      {isLoading && (
        <Typography variant="h4">Logging in ... please wait</Typography>
      )}
    </Stack>
  );
};

export default NotLoggedIn;
