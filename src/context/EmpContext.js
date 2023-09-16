import React, { createContext, useEffect, useState } from "react";

const EmpContext = createContext({});

export const EmpProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployee, setFilteredEmployee] = useState([]);
  const [query, setQuery] = useState("");

  const handleAddEmployee = ({
    name,
    phone,
    email,
    department,
    position,
    selectedImage,
    date,
    office,
    attendanceProfile,
    role,
  }) => {
    const nameArr = name.toLowerCase().split(" ");
    for (var i = 0; i < nameArr.length; i++) {
      nameArr[i] = nameArr[i].charAt(0).toUpperCase() + nameArr[i].slice(1);
    }
    name = nameArr.join(" ");
    setEmployees((employees) => [
      ...employees,
      {
        name,
        phone,
        email,
        department,
        position,
        selectedImage: selectedImage,
        id: crypto.randomUUID(),
        date,
        office,
        attendanceProfile,
        role,
      },
    ]);
  };

  useEffect(() => {
    setFilteredEmployee(
      employees.filter((emp) =>
        emp.name.toLowerCase().startsWith(query.toLowerCase())
      )
    );
  }, [employees, query]);

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
