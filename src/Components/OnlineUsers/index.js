import React, { useEffect, useCallback, useState } from "react";
import { useQuery, gql, useSubscription } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, addOnlineUser } from "../../store/actions";

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
const OnlineUsersList = () => {
  const users = useSelector((state) => state.users);
  const [onlineUsersCount, setOnlineUsersCount] = useState(0);

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

  useEffect(() => {
    if (users) {
      let countArr = users.filter((item) => {
        if (item.lastseen) {
          let dt = new Date();
          dt.setSeconds(dt.getSeconds() - 10);
          var userDate = new Date(item.lastseen * 1000);
          return dt <= userDate;
        }
        return false;
      });

      setOnlineUsersCount(countArr.length);
    }
  }, [users]);

  return (
    <div>
      <p>
        {onlineUsersCount > 1
          ? `${onlineUsersCount} usuários`
          : `${onlineUsersCount} usuário`}{" "}
        online
      </p>
    </div>
  );
};

const OnlineUsersWrapper = () => {
  const { data, loading, error } = useQuery(FETCH_USERS);
  const users = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const dispatchFetchUsers = useCallback(
    (users) => {
      dispatch(fetchUsers(users));
    },
    [dispatch]
  );

  useEffect(() => {
    if (data) dispatchFetchUsers(data.users);
  }, [data]);

  if (loading) return <span></span>;

  return (
    <div>
      <OnlineUsersList />
    </div>
  );
};

export default OnlineUsersWrapper;
