import "./App.css";
import LayoutWrapper from "./components/LayoutWrapper/LayoutWrapper";
import EmpCards from "./components/Cards/EmpCards";
import EmpForm from "./components/Form/EmpForm";
import { useState } from "react";
import HeaderBar from "./components/HeaderBar/HeaderBar";

const App = () => {
  const [open, setOpen] = useState(false);
  const [editedEmp, setEditedEmp] = useState({});

  const handleEditedEmp = (emp) => {
    setEditedEmp(emp);
    setOpen(true);
  };
  return (
    <LayoutWrapper>
      <HeaderBar setOpen={setOpen} />
      <EmpCards handleEditedEmp={handleEditedEmp} />
      <EmpForm
        open={open}
        setOpen={setOpen}
        setEditedEmp={setEditedEmp}
        {...editedEmp}
      />
    </LayoutWrapper>
  );
};
export default App;
