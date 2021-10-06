import * as React from "react";
import { useHistory, useLocation } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Alert,
  AlertTitle,
  Button,
  Container,
  CssBaseline,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import useFetchPostList from "../hooks/useFetchPostList";

export default function HomePage() {
  const { posts, error, loading } = useFetchPostList();
  let history = useHistory();
  let location = useLocation();
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "whitesmoke",
        minHeight: "100vh",
      }}
    >
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
        <Grid container>
          <Grid item xs={12}>
            <Paper
              sx={{ p: 2, display: "flex", flexDirection: "column", pb: 4 }}
            >
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
                sx={{ pl: 1 }}
              >
                Posts
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Required permission</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {posts?.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>{post.title}</TableCell>
                      <TableCell>{post.permission}</TableCell>
                      <TableCell align="right">
                        <Stack direction="row-reverse" spacing={2}>
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() =>
                              history.push({ pathname: `/post/${post.id}` })
                            }
                          >
                            View
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
                      onClick={() =>
                        history.push("/signin", { from: location.pathname })
                      }
                    >
                      Sign in
                    </Button>
                  )}
                </Alert>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
