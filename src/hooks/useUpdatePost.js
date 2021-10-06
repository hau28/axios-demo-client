import * as React from "react";
import { editPostAPI, deletePostAPI } from "../apis/post";

export function useEditPost(id) {
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  function editPost() {
    setLoading(true);
    setSuccess(false);
    setError(null);
    editPostAPI(id)
      .then(() => {
        setSuccess(true);
        setError(null);
      })
      .catch((err) => {
        setError({
          code: err.response?.status,
          name: err.response?.data?.name || err?.name,
          message: err.response?.data?.message || err?.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function reset() {
    setSuccess(false);
    setError(null);
    setLoading(false);
  }

  return { editPost, success, error, loading, reset };
}

export function useDeletePost(id) {
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState();
  const [loading, setLoading] = React.useState(false);

  function deletePost() {
    setLoading(true);
    setSuccess(false);
    setError(null);
    deletePostAPI(id)
      .then((res) => {
        setSuccess(true);
      })
      .catch((err) => {
        setError({
          code: err.response?.status,
          name: err.response?.data?.name || err?.name,
          message: err.response?.data?.message || err?.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function reset() {
    setSuccess(false);
    setError(null);
    setLoading(false);
  }

  return { deletePost, success, error, loading, reset };
}
