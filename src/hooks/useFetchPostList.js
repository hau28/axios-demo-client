import * as React from "react";
import { getPostList } from "../apis/post";

export default function useFetchPostList() {
  const [posts, setPosts] = React.useState([]);
  const [error, setError] = React.useState();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchPostList();
  }, []);

  async function fetchPostList() {
    getPostList()
      .then((res) => {
        setPosts(res.data);
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
  return { posts, error, loading };
}
