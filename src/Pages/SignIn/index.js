import React from "react";
import { useMutation, gql, useQuery } from "@apollo/client";
import { signin } from "../../services/auth";
import { useHistory, Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

// import { onError } from "@apollo/client/link/error";

const SIGNIN_MUTATION = gql`
  mutation signIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      _id
      username
      userType
      token
    }
  }
`;

const SignIn = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const [signIn] = useMutation(SIGNIN_MUTATION);

  const history = useHistory();

  const handleOnUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      if (username === "") throw new Error("O username não pode ser vazio");
      if (password === "") throw new Error("A senha não pode ficar vazia!");

      const { data, loading, error } = await signIn({
        variables: { username: username, password: password },
      });

      if (loading) {
        console.log("Loading");
      } else {
        signin(data.signIn.token);

        history.push("/");
        window.location.reload();
      }
    } catch (err) {
      showError(err.message);
      console.log(err.message);
    }
  };

  const showError = async (errorMessage) => {
    setErrorMessage(errorMessage);
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  };

  return (
    <div className="signContainer">
      <h1 className="signTitle">Entre na conversa!</h1>
      <form onSubmit={handleSubmit} className="formSign">
        <div className="formGroup-0">
          <label htmlFor="username" className="label">
            Username
          </label>
          <input
            value={username}
            type="text"
            name="username"
            onChange={handleOnUsernameChange}
            className="input"
          />
        </div>
        <div className="formGroup">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            value={password}
            type="password"
            name="password"
            onChange={handlePasswordChange}
            className="input"
          />
        </div>
        <CSSTransition
          in={errorMessage !== ""}
          timeout={35}
          unmountOnExit
          classNames="display"
          appear
        >
          <div className="errorMessage">
            <span>{errorMessage}</span>
          </div>
        </CSSTransition>
        <button type="submit" className="btnSubmit">
          Entrar
        </button>
      </form>
      <div className="redirectContainer">
        <p>
          Não possui uma conta?{" "}
          <Link className="redirectLink" to="/signup">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
