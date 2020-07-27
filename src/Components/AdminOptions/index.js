import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import { useApolloClient, gql } from "@apollo/client";

import "./style.css";
import { fetchMessages } from "../../store/actions";

Modal.setAppElement("#root");

const GET_MESSAGES = gql`
  query GetMessages($sort: String, $username: String, $createdAt: String) {
    messages(sort: $sort, username: $username, createdAt: $createdAt) {
      _id
      text
      createdAt
      users {
        username
      }
    }
  }
`;

const AdminOptions = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const [date, setDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const client = useApolloClient();
  const dispatch = useDispatch();

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  useEffect(() => {
    console.log(date);
  });

  const handleOnDateChange = async (newDate) => {
    setDate(newDate);

    try {
      const { data, loading } = await client.query({
        query: GET_MESSAGES,
        variables: {
          createdAt: newDate.toISOString().substr(0, 10),
        },
      });

      if (data) {
        dispatch(fetchMessages(data.messages));
      }
      closeModal();
    } catch (err) {
      console.log(err);
    }
  };
  if (!currentUser) return <span></span>;

  return (
    <div>
      {currentUser && currentUser.userType === 2 ? (
        <div>
          <button className="AdmFilterOptions">Filtros</button>
          <div className="hideMenu">
            <button onClick={openModal}>Filtrar por data</button>
            <button>Ordenar as mensagens</button>
            <button>Filtrar por usuário</button>
          </div>
          <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            shouldCloseOnOverlayClick={true}
            className="modal"
            overlayClassName="overlay"
          >
            <div>
              <h1>Filtrar</h1>
              <DatePicker
                dateFormat="yyyy/MM/dd"
                className="calendar"
                selected={date}
                onChange={handleOnDateChange}
                inline
              />
            </div>
          </Modal>
        </div>
      ) : (
        <div>Usuário normal</div>
      )}
    </div>
  );
};

export default AdminOptions;
