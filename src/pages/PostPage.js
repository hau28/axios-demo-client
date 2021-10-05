import * as React from "react";
import {
  BrowserRouter as Router,
  Link,
  useHistory,
  useParams,
  useLocation,
} from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Alert,
  AlertTitle,
  AppBar,
  Badge,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import ArrowBack from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import useFetchPost from "../hooks/useFetchPost";
import DeleteIcon from "@mui/icons-material/Delete";

const mdTheme = createTheme();

export default function PostPage() {
  let { id } = useParams();
  const { post, error, loading } = useFetchPost(id);
  let history = useHistory();
  let location = useLocation();

  const renderPost = () => {
    if (!post) return null;
    return (
      <div>
        <Typography component="h1" variant="h2" gutterBottom sx={{ pt: 3 }}>
          {post.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {post.body}
        </Typography>
        <Stack sx={{ mt: 3 }} direction="row-reverse" spacing={2}>
          <Button variant="outlined" startIcon={<EditIcon />}>
            Edit
          </Button>
          <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
            Delete
          </Button>
        </Stack>
      </div>
    );
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
        }}
      >
        <CssBaseline />
        <Container maxWidth="md" sx={{ mt: 12, mb: 4 }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<ArrowBack />}
            onClick={() => history.push({ pathname: "/" })}
          >
            Back to home
          </Button>
          {renderPost()}
          {loading && <LinearProgress sx={{ mt: 3 }} />}
          {error && (
            <Alert sx={{ mt: 3 }} severity="warning">
              <AlertTitle>
                {error.code} {error.name}
              </AlertTitle>
              {error.message}
              <br />
              {error?.code === 401 && (
                <Button
                  variant="outlined"
                  color="warning"
                  sx={{ mt: 1 }}
                  onClick={() => {
                    console.log(location.pathname);
                    history.push("/signin", { from: location.pathname });
                  }}
                >
                  Sign in
                </Button>
              )}
            </Alert>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}
