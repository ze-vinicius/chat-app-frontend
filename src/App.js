import React, { useEffect } from "react";
import "./App.css";
import { useQuery, gql, useMutation, useSubscription } from "@apollo/client";

const GET_MESSAGES = gql`
  query {
    messages {
      id
      text
    }
  }
`;

const GET_USERS = gql`
  {
    users {
      id
      username
    }
  }
`;

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      token
      username
    }
  }
`;

const MESSAGES_SUBSCRIPTION = gql`
  subscription {
    newMessage {
      id
      text
    }
  }
`;

function App() {
  const { subscribeToMore, ...result } = useQuery(GET_MESSAGES);

  const subscribeToNewMessages = () => {
    subscribeToMore({
      document: MESSAGES_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        try {
          if (!subscriptionData.data) return prev;
          const newMessageItem = subscriptionData.data.newMessage;
          console.log("Atualizando");
          return { messages: [...prev.messages, newMessageItem] };
        } catch (err) {
          throw new Error("erro");
        }
      },
    });
  };

  useEffect(() => {
    subscribeToNewMessages();
  }, []);

  return (
    <div className="App">
      {!result.loading &&
        result.data.messages.map((item) => <p>{item.text}</p>)}
    </div>
  );
}

export default App;
