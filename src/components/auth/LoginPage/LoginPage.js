import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { login } from "../service";
import LoginForm from "./LoginForm";
import useMutation from "../../../hooks/useMutation";
import { useDispatch } from "react-redux";
import { authlogin } from "../../../store/Action_Creators/actions";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoading, error, execute, resetError } = useMutation(login);

  const handleSubmit = (credentials) => {
    execute(credentials)
      .then(dispatch(authlogin()))
      .then(() => {
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
      });
  };

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />
      {isLoading && <p>...login in nodepop</p>}
      {error && (
        <div onClick={resetError} style={{ color: "red" }}>
          {error.message}
        </div>
      )}
    </div>
  );
}

export default LoginPage;
