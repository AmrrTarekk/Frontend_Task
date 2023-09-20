import React, { createContext, useEffect, useState } from "react";

const EmpContext = createContext({});

function capitalizeName(name) {
  const nameArr = name.toLowerCase().split(" ");
  for (var i = 0; i < nameArr.length; i++) {
    nameArr[i] = nameArr[i].charAt(0).toUpperCase() + nameArr[i].slice(1);
  }
  return nameArr.join(" ");
}

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
    image,
    date,
    dateFormat,
    office,
    attendanceProfile,
    role,
    id,
    WFH,
  }) => {
    console.log(name, "name");
    name = capitalizeName(name);

    const editableEmployee = filteredEmployee.find((emp) => emp.id === id);
    if (editableEmployee) {
      const newEmployees = employees.map((obj) => {
        if (obj.id === id) {
          return {
            ...obj,
            name,
            phone,
            email,
            department,
            position,
            image,
            date,
            dateFormat,
            office,
            attendanceProfile,
            role,
            WFH,
            id,
          };
        }
        return obj;
      });
      setEmployees(newEmployees);
    } else {
      setEmployees((employees) => [
        ...employees,
        {
          name,
          phone,
          email,
          department,
          position,
          image,
          id: crypto.randomUUID(),
          date,
          dateFormat,
          office,
          attendanceProfile,
          role,
          WFH,
        },
      ]);
    }
  };

  useEffect(() => {
    console.log(employees);
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
