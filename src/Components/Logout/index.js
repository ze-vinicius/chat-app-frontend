import React from "react";
import { LogOut } from "react-feather";
import { signout } from "../../services/auth";
import { useHistory } from "react-router-dom";

const Logout = () => {
  const history = useHistory();

  const handleLogout = () => {
    signout();
    history.replace("/login");
  };

  return (
    <button onClick={handleLogout}>
      <LogOut />
    </button>
  );
};

export default Logout;
