import * as React from "react";
import { getFullPost } from "../apis/post";

export default function useFetchPost(id) {
  const [post, setPost] = React.useState();
  const [error, setError] = React.useState();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchFullPost();
  }, []);

  async function fetchFullPost() {
    getFullPost(id)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        setError({
          code: err.response?.status,
          name: err.response?.data?.name,
          message: err.response?.data?.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return { post, error, loading };
}
