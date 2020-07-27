import React, { useEffect, useCallback, useState } from "react";
import { useQuery, gql, useSubscription } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, addOnlineUser } from "../../store/actions";
import { Smile, Meh, Frown, MessageCircle } from "react-feather";
import "./style.css";

const FETCH_USERS = gql`
  {
    users {
      _id
      username
      lastseen
    }
  }
`;

const ADD_ONLINE_USER_SUBSCRIPTION = gql`
  subscription {
    addOnlineUser {
      _id
      username
      lastseen
    }
  }
`;
const OnlineUsersList = ({ onlineUsersCount }) => {
  const users = useSelector((state) => state.users);

  const { data } = useSubscription(ADD_ONLINE_USER_SUBSCRIPTION);

  const dispatch = useDispatch();

  const dispatchAddOnlineUser = useCallback(
    (user) => {
      dispatch(addOnlineUser(user));
    },
    [dispatch]
  );

  useEffect(() => {
    if (data) {
      dispatchAddOnlineUser(data.addOnlineUser);
    }
  }, [data, dispatchAddOnlineUser]);

  useEffect(() => {}, [users]);

  return (
    <div>
      <div className="onlineUserCountContainer">
        <MessageCircle />
        <p className="onlineUsersCountText">
          {onlineUsersCount > 1
            ? `${onlineUsersCount} usuários`
            : `${onlineUsersCount} usuário`}{" "}
          online
        </p>
      </div>
    </div>
  );
};

const OnlineUsersWrapper = () => {
  const { data, loading, error } = useQuery(FETCH_USERS);
  const users = useSelector((state) => state.users);
  const [onlineUsersCount, setOnlineUsersCount] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState();

  const dispatch = useDispatch();

  const dispatchFetchUsers = useCallback(
    (users) => {
      dispatch(fetchUsers(users));
    },
    [dispatch]
  );

  const Emoji = () => {
    const index = Math.floor(Math.random() * 3);

    if (index === 1) {
      return <Smile />;
    } else if (index === 1) {
      return <Meh />;
    } else {
      return <Frown />;
    }
  };

  useEffect(() => {
    if (data) dispatchFetchUsers(data.users);
  }, [data]);

  useEffect(() => {
    if (users) {
      let countArr = users.filter((item) => {
        if (item.lastseen) {
          let dt = new Date();
          dt.setSeconds(dt.getSeconds() - 15);
          var userDate = new Date(item.lastseen * 1000);
          return dt <= userDate;
        }
        return false;
      });

      setOnlineUsersCount(countArr.length);
      setOnlineUsers(countArr);
    }
  }, [users]);

  if (loading) return <span></span>;

  return (
    <div className="sideNav">
      <div className="sideNavHeader">
        <OnlineUsersList onlineUsersCount={onlineUsersCount} />
      </div>
      <div className="sideNavContent">
        {onlineUsers &&
          onlineUsers.map((item) => (
            <div key={item._id} className="onlineUserContainer">
              {Emoji()}
              <div>
                <p className="onlineUserName">{item.username}</p>
                <p className="onlineUserStatus">online</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OnlineUsersWrapper;
