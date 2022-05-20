import * as React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import LoggedIn from "./LoggedIn";
import NotLoggedIn from "./NotLoggedIn";

function App() {
  const { isAuthenticated } = useAuth0();

  React.useEffect(() => {
    if (!isAuthenticated) {
    }
  }, [isAuthenticated]);

  if (isAuthenticated) return <LoggedIn />;
  return <NotLoggedIn />;
}

export default App;
