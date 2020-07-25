import { login, LOGIN, NEW_MESSAGE, FETCH_MESSAGES } from "./actions";

const initialState = {
  user: null,
  messages: [],
};

export default function chatApp(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.user,
      };
    case NEW_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.newMessage],
      };
    case FETCH_MESSAGES:
      return {
        ...state,
        messages: action.messages,
      };
    default:
      return state;
  }
}
