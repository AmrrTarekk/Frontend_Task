import { useContext } from "react";
import EmpContext from "../context/EmpContext";

const useEmp = () => {
  return useContext(EmpContext);
};

export default useEmp;
