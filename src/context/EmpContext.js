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
    image,
    date,
    dateFormat,
    office,
    attendanceProfile,
    role,
    id,
  }) => {
    const nameArr = name.toLowerCase().split(" ");
    for (var i = 0; i < nameArr.length; i++) {
      nameArr[i] = nameArr[i].charAt(0).toUpperCase() + nameArr[i].slice(1);
    }
    name = nameArr.join(" ");

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
          };
        }
        return obj;
      });
      // console.log(employees);
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
          id,
          date,
          dateFormat,
          office,
          attendanceProfile,
          role,
        },
      ]);
    }

    // if (existed) {
    //   const newEmployees = employees.map((obj) => {
    //     if (obj.id === id) {
    //       return {
    //         ...obj,
    //         name,
    //         phone,
    //         email,
    //         department,
    //         position,
    //         image,
    //         date,
    //         dateFormat,
    //         office,
    //         attendanceProfile,
    //         role,
    //       };
    //     }
    //     return obj;
    //   });
    //   // console.log(employees);
    //   setEmployees(newEmployees);
    // } else {
    //   setEmployees((employees) => [
    //     ...employees,
    //     {
    //       name,
    //       phone,
    //       email,
    //       department,
    //       position,
    //       image,
    //       id,
    //       date,
    //       dateFormat,
    //       office,
    //       attendanceProfile,
    //       role,
    //     },
    //   ]);
    // }
  };

  useEffect(() => {
    console.log(employees);
    setFilteredEmployee(
      employees.filter((emp) =>
        emp.name.toLowerCase().startsWith(query.toLowerCase())
      )
    );
  }, [employees, query]);

  // useEffect(() => {
  //   console.log(employees);
  // }, [employees]);

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
