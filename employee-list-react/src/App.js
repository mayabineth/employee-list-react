import { useGlobalContext } from "./context";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import ModalRemove from "./components/ModalRemove";
import ModalEdit from "./components/ModalEdit";
import ModalAdd from "./components/ModalAdd";

function App() {
  const {
    isOpenEdit,
    isOpenRemove,
    isOpenAdd,
    loadEmployee,
    employees,
    loading,
  } = useGlobalContext();
  useEffect(() => {
    loadEmployee("");
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <main>
      {isOpenRemove && <ModalRemove />}
      {isOpenEdit && <ModalEdit />}
      {isOpenAdd && <ModalAdd />}

      <Navbar count={employees.length} />

      <CartContainer />
    </main>
  );
}
export default App;
