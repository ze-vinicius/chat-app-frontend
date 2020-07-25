import React from "react";
import { useMutation, gql, useQuery } from "@apollo/client";
import { signin } from "../../services/auth";
import { useHistory, Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

const SIGNUP = gql`
  mutation signUp($username: String!, $password: String!) {
    signUp(username: $username, password: $password, userType: 1) {
      _id
      username
      userType
      token
    }
  }
`;

const SignUp = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const [signUp] = useMutation(SIGNUP);

  const history = useHistory();

  const handleOnUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (username === "") throw new Error("O username não pode ser vazio");
      if (password === "") throw new Error("A senha não pode ficar vazia!");

      const { data, loading, error } = await signUp({
        variables: { username: username, password: password },
      });

      if (loading) {
        console.log("Loading");
      } else {
        signin(data.signUp.token);
        history.push("/");
      }
    } catch (error) {
      showError(error.message);
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
      <h1 className="signTitle">Faça o seu cadastro!</h1>
      <form onSubmit={handleSubmit} className="formSign">
        <div className="formGroup-0">
          <label htmlFor="username" className="label">
            Username
          </label>
          <input
            value={username}
            type="text"
            name="username"
            className="input"
            onChange={handleOnUsernameChange}
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
            className="input"
            onChange={handlePasswordChange}
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
          Criar conta
        </button>
      </form>
      <div className="redirectContainer">
        <p>
          Já possui uma conta?{" "}
          <Link className="redirectLink" to="/login">
            Faça o login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
