import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import { useApolloClient, gql } from "@apollo/client";
import { XCircle, X } from "react-feather";

import "./style.css";
import { fetchMessages, addFilter, removeFilter } from "../../store/actions";

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
  const users = useSelector((state) => state.users);
  const filters = useSelector((state) => state.filters);

  const [date, setDate] = useState(new Date());
  const [sort, setSort] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isUserModalOpen, setUserModalOpen] = useState(false);

  const client = useApolloClient();
  const dispatch = useDispatch();

  const openModal = () => {
    setIsOpen(true);
  };
  const openUserModal = () => {
    setUserModalOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const closeUserModal = () => {
    setUserModalOpen(false);
  };

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  useEffect(() => {
    const fetchMessageWithFilters = async () => {
      const { sort, username, createdAt } = filters;

      console.log(filters);

      try {
        const { data, loading } = await client.query({
          query: GET_MESSAGES,
          variables: {
            sort: sort,
            username: username,
            createdAt: createdAt,
          },
        });
        console.log(data);
        if (data) dispatch(fetchMessages(data.messages));
      } catch (error) {
        throw error;
      }
    };
    fetchMessageWithFilters();
  }, [date, sort, client, dispatch, filters]);

  const onClickFilterSort = async () => {
    let sort = "";

    if (filters.sort === "asc") sort = "desc";
    else sort = "asc";
    dispatch(addFilter({ name: "sort", value: sort }));
  };

  const onClickFilterDate = () => {
    if (filters.createdAt) {
      dispatch(removeFilter({ name: "createdAt" }));
    } else {
      openModal();
    }
  };

  const onClickFilterUsername = () => {
    if (filters.username) {
      dispatch(removeFilter({ name: "username" }));
    } else {
      openUserModal();
    }
  };

  const handleOnDateChange = async (newDate) => {
    setDate(newDate);

    dispatch(
      addFilter({
        name: "createdAt",
        value: newDate.toISOString().substring(0, 10),
      })
    );

    closeModal();
  };

  const dispatchFilterByUserName = (username) => {
    dispatch(addFilter({ name: "username", value: username }));
    closeUserModal();
  };

  if (!currentUser) return <span></span>;

  return (
    <div>
      {currentUser && currentUser.userType === 2 ? (
        <div className="filtersOptionsContainer">
          <div className="filtersContainer">
            <div className="filterGroup">
              <p className="filtersOptionsTitle">Filtrar por</p>
              <button
                className={`filterButton ${
                  filters.createdAt ? " filterActive" : ""
                }`}
                onClick={onClickFilterDate}
              >
                Data
                {filters.createdAt && <XCircle size={15} color="#e23636" />}
              </button>
            </div>
            <div className="filterGroup">
              <p className="filtersOptionsTitle">Ordenar</p>

              <button className="filterButton" onClick={onClickFilterSort}>
                {filters.sort === "asc" ? "Ascendente" : "Descendente"}
              </button>
            </div>
            <div className="filterGroup">
              <p className="filtersOptionsTitle">Filtrar por</p>
              <button
                className={`filterButton ${
                  filters.username ? " filterActive" : ""
                }`}
                onClick={onClickFilterUsername}
              >
                Username
                {filters.username && <XCircle size={15} color="#e23636" />}
              </button>
            </div>
          </div>
          <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            shouldCloseOnOverlayClick={true}
            className="modal"
            overlayClassName="overlay"
          >
            <div>
              <DatePicker
                dateFormat="yyyy/MM/dd"
                className="calendar"
                selected={date}
                onChange={handleOnDateChange}
                inline
              />
            </div>
          </Modal>
          <Modal
            isOpen={isUserModalOpen}
            onRequestClose={closeUserModal}
            shouldCloseOnOverlayClick={true}
            className="modal"
            overlayClassName="overlay"
          >
            <div className="usersListContainer">
              <h2 className="usersListTitle">Lista de usuários</h2>
              <div className="usersList">
                {users &&
                  users.map((user) => (
                    <button
                      key={user._id}
                      className="userButton"
                      onClick={() => dispatchFilterByUserName(user.username)}
                    >
                      @{user.username}
                    </button>
                  ))}
              </div>
            </div>
          </Modal>
        </div>
      ) : (
        <span></span>
      )}
    </div>
  );
};

export default AdminOptions;
