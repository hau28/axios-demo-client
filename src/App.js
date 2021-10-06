import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import SignIn from "./pages/SignIn";
import PostList from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import { Fab } from "@mui/material";
import CleaningServices from "@mui/icons-material/CleaningServices";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/post/:id" component={PostPage} />
        <Route exact path="/" component={PostList} />
        <Route path="/login">
          <Redirect to="/signin" />
        </Route>
        <Redirect to="/" />
      </Switch>

      <Fab
        sx={{ position: "fixed", bottom: 32, right: 32 }}
        color="primary"
        aria-label="clean-storage"
        onClick={() => {
          localStorage.removeItem("user");
        }}
      >
        <CleaningServices />
      </Fab>
    </Router>
  );
}

export default App;
