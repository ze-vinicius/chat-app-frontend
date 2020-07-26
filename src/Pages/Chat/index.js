import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  useQuery,
  gql,
  useMutation,
  useSubscription,
  useApolloClient,
} from "@apollo/client";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Message from "../../Components/Message";
import SideMenu from "../../Components/SideMenu";

import "./style.css";

import { useSelector, useDispatch } from "react-redux";

import { addMessage, fetchMessages, removeMessage } from "../../store/actions";

const GET_USERS = gql`
  query {
    users {
      _id
      username
    }
  }
`;

const GET_MESSAGES = gql`
  query GetMessages {
    messages {
      _id
      text
      createdAt
      users {
        username
      }
    }
  }
`;

const CHAT_SUBSCRIPTION = gql`
  subscription {
    updateChat {
      message {
        _id
        text
        createdAt
        users {
          username
        }
      }
      mutationType
    }
  }
`;

const NEWMESSAGE_MUTATION = gql`
  mutation sendMessage($text: String!) {
    sendMessage(text: $text) {
      _id
      createdAt
      text
    }
  }
`;

const ChatContainer = () => {
  const { data } = useSubscription(CHAT_SUBSCRIPTION);

  const messages = useSelector((state) => state.messages);
  const currentUser = useSelector((state) => state.currentUser);

  const [canDelete, setCanDelete] = useState(false);

  const divRef = useRef(null);
  const dispatch = useDispatch();

  const dispatchNewMessage = useCallback(
    (newMessage) => dispatch(addMessage(newMessage)),
    [dispatch]
  );

  const dispatchDeleteMessage = useCallback(
    (message) => dispatch(removeMessage(message)),
    [dispatch]
  );

  useEffect(() => {
    if (data) {
      if (data.updateChat.mutationType === "CREATE")
        dispatchNewMessage(data.updateChat.message);
      else if (data.updateChat.mutationType === "DELETE")
        dispatchDeleteMessage(data.updateChat.message);
    }
  }, [data, dispatchNewMessage, dispatchDeleteMessage]);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    console.log(currentUser);
    setCanDelete(currentUser && currentUser.userType === 2);
  }, [currentUser]);

  return (
    <div className="chat-container">
      {messages && currentUser && (
        <TransitionGroup component={null}>
          {messages.map((item) => (
            <CSSTransition key={item._id} timeout={350} classNames="message">
              <Message
                id={item._id}
                createdAt={item.createdAt}
                username={item.users.username}
                text={item.text}
                canDelete={canDelete}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      )}
      <div className="dummy-div" ref={divRef}></div>
    </div>
  );
};

const Chat = () => {
  const dispatch = useDispatch();

  const dispatchFetchMessages = useCallback(
    (messages) => dispatch(fetchMessages(messages)),
    [dispatch]
  );

  const { data, error, loading } = useQuery(GET_MESSAGES);

  const [messageText, setMessageText] = useState("");

  const [sendMessage] = useMutation(NEWMESSAGE_MUTATION);

  const messageRef = useRef(null);

  useEffect(() => {
    if (loading) return;
    dispatchFetchMessages(data.messages);
  }, [data, dispatchFetchMessages, loading]);

  useEffect(() => {
    messageRef.current.focus();
  }, [messageRef]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await sendMessage({ variables: { text: messageText } });
    setMessageText("");
  };

  return (
    <div className="chat-screen">
      <SideMenu />
      <ChatContainer />
      <div className="">
        <form className="actions-container" onSubmit={handleSubmit}>
          <input
            type="text"
            value={messageText}
            onChange={(event) => setMessageText(event.target.value)}
            className="message-input"
            placeholder="Mensagem"
            autoFocus
            ref={messageRef}
          />
          <button type="submit" className="send-message-btn">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
