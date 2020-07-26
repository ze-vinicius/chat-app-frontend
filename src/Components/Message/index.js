import React, { useState } from "react";
import { Trash2 } from "react-feather";
import "./style.css";
import { gql, useMutation } from "@apollo/client";

const DELETE_MESSAGE_MUTATION = gql`
  mutation deleteMessage($messageId: String!) {
    deleteMessage(messageId: $messageId) {
      _id
    }
  }
`;

const Message = ({ id, createdAt, username, text, canDelete }) => {
  const [sendDate, setSendDate] = useState();
  const [sendTime, setSendTime] = useState();
  const [disabled, setDisabled] = useState(false);

  const [deleteMessage] = useMutation(DELETE_MESSAGE_MUTATION);

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

  const handleDelete = async () => {
    setDisabled(true);
    try {
      const { error } = deleteMessage({ variables: { messageId: id } });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="messageContainer">
      <div className="messageHeader">
        <div className="messageInfo">
          <span className="sendDate">{sendDate} -</span>
          <span className="messageAuthor">{username}</span>
          <span className="sendTime">{sendTime}</span>
        </div>
        {canDelete && (
          <button
            className="btnDelete"
            disabled={disabled}
            onClick={handleDelete}
          >
            <Trash2 size={24} color={"#17223b"} />
          </button>
        )}
      </div>
      <p className="messageText">{text}</p>
    </div>
  );
};

export default Message;
