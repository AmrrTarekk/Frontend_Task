import React, { useState } from "react";
import { Button, Modal } from "antd";
import "./search.css";
import EmpForm from "../Form/EmpForm";
import useEmp from "../../hooks/useEmp";

function Search() {
  const { query, setQuery } = useEmp();

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };
  return (
    <div className="d-flex justify-content-between gap-2">
      <input
        type="text"
        className="rounded-2 border-0"
        placeholder="Search Employee"
        value={query}
        onChange={handleSearch}
      />
      <EmpForm />
    </div>
  );
}

export default Search;
