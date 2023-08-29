import React, { createContext, useState } from "react";

const EmpContext = createContext({});

export const EmpProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [query, setQuery] = useState("");

  const handleAddEmployee = (
    empName,
    empPhone,
    empEmail,
    department,
    position,
    selectedImage,
    date,
    office,
    attendance,
    role
  ) => {
    setEmployees((employees) => [
      ...employees,
      {
        name: empName,
        phone: empPhone,
        email: empEmail,
        department,
        position,
        selectedImage: selectedImage,
        id: crypto.randomUUID(),
        date,
        office,
        attendance,
        role,
      },
    ]);
  };

  let filteredEmployee = employees;

  if (query.length >= 2) {
    filteredEmployee = filteredEmployee.filter((emp) =>
      emp.name.toLowerCase().startsWith(query.toLowerCase())
    );
  }

  return (
    <EmpContext.Provider
      value={{
        handleAddEmployee,
        filteredEmployee,
        query,
        employees,
        setEmployees,
        setQuery,
      }}
    >
      {children}
    </EmpContext.Provider>
  );
};

export default EmpContext;
