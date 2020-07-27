import React, { useEffect, useCallback, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { User } from "react-feather";
import { login } from "../../store/actions";
import "./style.css";

const CURRENT_USER = gql`
  {
    currentUser {
      _id
      username
      userType
    }
  }
`;

const FETCH_USERS = gql`
  {
    users {
      _id
      username
    }
  }
`;

const UPDATE_LASTSEEN_MUTATION = gql`
  mutation {
    updateLastSeen {
      _id
      username
      lastseen
    }
  }
`;

const Profile = () => {
  const [onlineIndicator, setOnlineIndicator] = useState(0);
  const { data, loading, error } = useQuery(CURRENT_USER);
  const [updateLastSeen] = useMutation(UPDATE_LASTSEEN_MUTATION);
  const dispatch = useDispatch();

  const dispatchLogin = useCallback(
    (user) => {
      dispatch(login(user));
    },
    [dispatch]
  );

  useEffect(() => {
    setOnlineIndicator(
      setInterval(() => {
        updateLastSeen();
      }, 10000)
    );

    return () => {
      clearInterval(onlineIndicator);
    };
  }, [updateLastSeen]);

  useEffect(() => {
    if (data) {
      dispatchLogin(data.currentUser);
      updateLastSeen();
    }
  }, [data, dispatchLogin, updateLastSeen]);

  if (loading) return <span></span>;

  return (
    <div className="profileContainer">
      <span className="profileIcon">
        <User size={32} />
      </span>
      <span className="profileInfo">
        <h2 className="profileUsername">{data && data.currentUser.username}</h2>
        <p className="profileStatus">
          {onlineIndicator ? "online" : "offline"}
        </p>
      </span>
    </div>
  );
};

export default Profile;
