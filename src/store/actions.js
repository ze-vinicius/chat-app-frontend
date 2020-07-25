export const LOGIN = "LOGIN";
export const FETCH_MESSAGES = "FETCH_MESSAGES";
export const FETCH_USERS = "FETCH_USERS";
export const NEW_MESSAGE = "NEW_MESSAGE";

export const login = (user) => {
  return {
    type: LOGIN,
    user: user,
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
