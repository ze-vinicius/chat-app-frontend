import React from "react";
import "./style.css";

const Message = ({ id, createdAt, username, text }) => {
  const [sendDate, setSendDate] = React.useState();
  const [sendTime, setSendTime] = React.useState();

  React.useEffect(() => {
    const dateFormater = (unix_timestamp) => {
      const date = new Date(unix_timestamp * 1000);

      setSendDate(date.toLocaleDateString());
      setSendTime(
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    };
    if (createdAt) dateFormater(createdAt);
  }, [createdAt]);

  return (
    <div className="messageContainer">
      <div className="messageHeader">
        <span className="sendDate">{sendDate} -</span>
        <span className="messageAuthor">{username}</span>
        <span className="sendTime">{sendTime}</span>
      </div>
      <p className="messageText">{text}</p>
    </div>
  );
};

export default Message;
