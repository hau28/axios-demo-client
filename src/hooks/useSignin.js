import * as React from "react";
import { loginAPI } from "../apis/auth";

export default function useSignin() {
  const [error, setError] = React.useState();
  const [loading, setLoading] = React.useState(false);

  function signin(username, password, onSigned) {
    setLoading(true);
    setError(null);
    loginAPI({ username: username, password: username })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        onSigned(res);
      })
      .catch((err) => {
        console.error(err);
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

  return { signin, error, loading };
}
