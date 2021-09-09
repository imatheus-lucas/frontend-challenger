import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { DataContextProvider } from "../contexts/DataContext";
import Home from "../pages/Home";
export default function Routes() {
  return (
    <Router>
      <DataContextProvider>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/:id" component={Home} />
        </Switch>
      </DataContextProvider>
    </Router>
  );
}
