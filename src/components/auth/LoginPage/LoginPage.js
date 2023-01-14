import React from "react";

import LoginForm from "./LoginForm";
//import useMutation from "../../../hooks/useMutation";
import { useDispatch, useSelector } from "react-redux";
import {
  authLogin,
  uiResetError,
} from "../../../store/Action_Creators/actions";
import { getUi } from "../../../store/selectors";

function LoginPage() {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(getUi);
  const handleResetError = () => dispatch(uiResetError());

  const handleSubmit = async (credentials) => {
    dispatch(authLogin(credentials));

    // execute(credentials)
    //   .then(dispatch(authLoginSuccess()))
    //   .then(() => {
    //     const from = location.state?.from?.pathname || "/";
    //     navigate(from, { replace: true });
    //   });
  };

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />
      {isLoading && <p>...login in nodepop</p>}
      {error && (
        <div onClick={handleResetError} style={{ color: "red" }}>
          {error.message}
        </div>
      )}
    </div>
  );
}

export default LoginPage;
