import {
  LOGIN,
  NEW_MESSAGE,
  FETCH_MESSAGES,
  DELETE_MESSAGE,
  FETCH_USERS,
  ADD_ONLINE_USER,
} from "./actions";

const initialState = {
  user: null,
  currentUser: null,
  messages: [],
  filters: { sort: "asc", username: "", createdAt: "" },
};

export default function chatApp(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        currentUser: action.user,
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
    case DELETE_MESSAGE:
      return {
        ...state,
        messages: state.messages.filter(
          (item) => item._id !== action.message._id
        ),
      };
    case FETCH_USERS:
      return {
        ...state,
        users: action.users,
      };
    case ADD_ONLINE_USER:
      return {
        ...state,
        users: [
          ...state.users.filter((item) => item._id !== action.user._id),
          action.user,
        ],
      };
    default:
      return state;
  }
}
