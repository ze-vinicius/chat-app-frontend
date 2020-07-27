import React, { useEffect, useCallback } from "react";
import { useQuery, gql } from "@apollo/client";
import Logout from "../Logout";
import Profile from "../Profile";
import AdminOptions from "../AdminOptions";

import "./style.css";

const Header = () => {
  return (
    <div className="headerContainer">
      <Profile />
      <AdminOptions />
      <Logout />
    </div>
  );
};

export default Header;
