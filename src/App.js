import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SignIn from "./pages/SignIn";
import PostList from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import { Chip, Fab } from "@mui/material";
import CleaningServices from "@mui/icons-material/CleaningServices";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/post/:id" component={PostPage} />
        <Route path="/" component={PostList} />
      </Switch>
      <div
        style={{
          position: "fixed",
          zIndex: 3,
          right: 36,
          bottom: 36,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Chip
          sx={{ boxShadow: 3 }}
          color="secondary"
          label={JSON.parse(localStorage.getItem("user"))?.role || "guest"}
          size="small"
        />
        <Fab
          sx={{ mt: 1 }}
          color="primary"
          aria-label="clean-storage"
          onClick={() => {
            localStorage.removeItem("user");
          }}
        >
          <CleaningServices />
        </Fab>
      </div>
    </Router>
  );
}

export default App;
