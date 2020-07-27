export const LOGIN = "LOGIN";
export const FETCH_MESSAGES = "FETCH_MESSAGES";
export const FETCH_USERS = "FETCH_USERS";
export const NEW_MESSAGE = "NEW_MESSAGE";
export const DELETE_MESSAGE = "DELETE_MESSAGE";
export const ADD_ONLINE_USER = "ADD_ONLINE_USER";
export const ADD_FILTER = "ADD_FILTER";
export const REMOVE_FILTER = "REMOVE_FILTER";
export const CLEAN_FILTERS = "CLEAN_FILTERS";

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

export const addFilter = (filter) => {
  return {
    type: ADD_FILTER,
    filter: filter,
  };
};

export const removeFilter = (filter) => {
  return {
    type: REMOVE_FILTER,
    filter: filter,
  };
};
export const cleanFilters = () => {
  return {
    type: CLEAN_FILTERS,
  };
};
