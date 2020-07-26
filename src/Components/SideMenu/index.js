import React, { useEffect, useCallback } from "react";
import { useQuery, gql } from "@apollo/client";
import { useSelector } from "react-redux";
import Profile from "../Profile";
import OnlineUsers from "../OnlineUsers";
import "./style.css";

const SideMenu = () => {
  return (
    <div className="headerContainer">
      <Profile />
      <OnlineUsers />
    </div>
  );
};

export default SideMenu;
