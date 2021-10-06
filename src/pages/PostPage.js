import * as React from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import {
  Alert,
  AlertTitle,
  Button,
  Container,
  CssBaseline,
  LinearProgress,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import ArrowBack from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import useFetchPost from "../hooks/useFetchPost";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeletePost, useEditPost } from "../hooks/useUpdatePost";
import LoadingButton from "@mui/lab/LoadingButton";

export default function PostPage() {
  let { id } = useParams();

  const { post, error, loading } = useFetchPost(id);
  const {
    editPost,
    success: editSuccess,
    error: editError,
    loading: editLoading,
    reset: editStatusReset,
  } = useEditPost(id);
  const {
    deletePost,
    success: deleteSuccess,
    error: deleteError,
    loading: deleteLoading,
    reset: deleteStatusReset,
  } = useDeletePost(id);

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
          <LoadingButton
            loading={editLoading}
            loadingPosition="start"
            startIcon={<EditIcon />}
            variant="outlined"
            onClick={() => {
              deleteStatusReset();
              editPost(id);
            }}
          >
            Edit
          </LoadingButton>

          <LoadingButton
            loading={deleteLoading}
            loadingPosition="start"
            startIcon={<DeleteIcon />}
            variant="outlined"
            color="error"
            onClick={() => {
              editStatusReset();
              deletePost(id);
            }}
          >
            Delete
          </LoadingButton>
        </Stack>
      </div>
    );
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    editStatusReset();
    deleteStatusReset();
  };

  const snackMessage = () => {
    if (editSuccess) return "Post edited successfully";
    if (deleteSuccess) return "Post deleted successfully";
  };

  const anyError = () => {
    return {
      hasError: error || editError || deleteError,
      code: error?.code || editError?.code || deleteError?.code,
      name: error?.name || editError?.name || deleteError?.name,
      message: error?.message || editError?.message || deleteError?.message,
    };
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={editSuccess || deleteSuccess}
        onClose={handleCloseSnack}
        autoHideDuration={5000}
      >
        <Alert
          onClose={handleCloseSnack}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackMessage()}
        </Alert>
      </Snackbar>
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
        {anyError().hasError && (
          <Alert sx={{ mt: 3 }} severity="warning">
            <AlertTitle>
              {anyError().code} {anyError().name}
            </AlertTitle>
            {anyError().message}
            <br />
            {anyError()?.code === 401 && (
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
  );
}
