export const LOGIN = "LOGIN";
export const FETCH_MESSAGES = "FETCH_MESSAGES";
export const FETCH_USERS = "FETCH_USERS";
export const NEW_MESSAGE = "NEW_MESSAGE";
export const DELETE_MESSAGE = "DELETE_MESSAGE";
export const ADD_ONLINE_USER = "ADD_ONLINE_USER";

export const login = (user) => {
  return {
    type: LOGIN,
    user: user,
  };
};

export const addOnlineUser = (user) => {
  return {
    type: ADD_ONLINE_USER,
    user,
  };
};

export const fetchUsers = (users) => {
  return {
    type: FETCH_USERS,
    users,
  };
};

export const fetchMessages = (messages) => {
  return {
    type: FETCH_MESSAGES,
    messages,
  };
};

export const addMessage = (newMessage) => {
  return {
    type: NEW_MESSAGE,
    newMessage: newMessage,
  };
};

export const removeMessage = (message) => {
  return {
    type: DELETE_MESSAGE,
    message: message,
  };
};
