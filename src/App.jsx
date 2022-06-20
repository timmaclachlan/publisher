import * as React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import LoggedIn from "./LoggedIn";
import LoggedInAuthor from "./components/AsAuthor/LoggedInAuthor";
import NotLoggedIn from "./NotLoggedIn";

function App() {
  const { isAuthenticated, user } = useAuth0();

  React.useEffect(() => {
    if (!isAuthenticated) {
    }
  }, [isAuthenticated]);

  const getDashboard = () => {
    let roleId = user["https://rowanvale-athena/roleId"];
    if (roleId === "author") {
      return <LoggedInAuthor />;
    }
    return <LoggedIn />;
  };

  if (isAuthenticated) {
    return getDashboard();
  }
  return <NotLoggedIn />;
}

export default App;
