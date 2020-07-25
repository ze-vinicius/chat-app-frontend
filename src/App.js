import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Chat from "./Pages/Chat";

import { isAuthenticated } from "./services/auth";

const App = () => {
  return (
    <Router>
      <Switch>
        {isAuthenticated() ? (
          <>
            <Route path="/" exact component={Chat} />
          </>
        ) : (
          <>
            <Route path="/login" exact component={SignIn} />
            <Route path="/signup" exact component={SignUp} />
          </>
        )}
        <Route exact path="*">
          {isAuthenticated() ? (
            <Redirect to={{ pathname: "/" }} />
          ) : (
            <Redirect to={{ pathname: "/login" }} />
          )}
        </Route>
      </Switch>
    </Router>
  );
};

// function App() {
//   const { subscribeToMore, ...result } = useQuery(GET_MESSAGES);

//   useEffect(() => {
//     const subscribeToNewMessages = () => {
//       subscribeToMore({
//         document: MESSAGES_SUBSCRIPTION,
//         updateQuery: (prev, { subscriptionData }) => {
//           try {
//             if (!subscriptionData.data) return prev;
//             const newMessageItem = subscriptionData.data.newMessage;
//             console.log("Atualizando");
//             return { messages: [...prev.messages, newMessageItem] };
//           } catch (err) {
//             throw new Error("erro");
//           }
//         },
//       });
//     };
//     subscribeToNewMessages();
//   }, [subscribeToMore]);

//   return (
//     <div className="App">
//       {!result.loading &&
//         result.data.messages.map((item) => <p>{item.text}</p>)}
//     </div>
//   );
// }

export default App;
