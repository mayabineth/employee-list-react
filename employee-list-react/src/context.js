import React, { useState, useContext } from "react";
import axios from "axios";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenRemove, setIsOpenRemove] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [clickedItemRemove, setClickedItemRemove] = useState("none");
  const [clickedItemEdit, setClickedItemEdit] = useState({});
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const openModalEdit = (employee) => {
    setIsOpenEdit(true);
    setClickedItemEdit(employee);
  };
  const closeModalEdit = () => {
    setIsOpenEdit(false);
  };
  const openModalRemove = (id) => {
    setIsOpenRemove(true);
    setClickedItemRemove(id);
  };
  const closeModalRemove = () => {
    setIsOpenRemove(false);
  };
  const openModalAdd = () => {
    setIsOpenAdd(true);
  };
  const closeModalAdd = () => {
    setIsOpenAdd(false);
  };

  const loadEmployee = async (query) => {
    setLoading(true);
    try {
      const result = await axios.get(
        `http://localhost:8080/employees?keyword=${query}`
      );
      setEmployees(result.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <AppContext.Provider
      value={{
        isOpenEdit,
        isOpenRemove,
        isOpenAdd,
        clickedItemRemove,
        clickedItemEdit,
        openModalEdit,
        closeModalEdit,
        openModalRemove,
        closeModalRemove,
        openModalAdd,
        closeModalAdd,
        loadEmployee,
        employees,
        loading,
        query,
        setQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
