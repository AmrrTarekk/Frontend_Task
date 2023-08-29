import React, { useState } from "react";
import { Button, Input, Modal } from "antd";
import "./search.css";
import EmpForm from "../Form/EmpForm";
import useEmp from "../../hooks/useEmp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Search() {
  const { query, setQuery } = useEmp();

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };
  return (
    <div className="d-flex justify-content-between gap-3">
      <Input
        className="rounded-2 searchInput"
        type="text"
        placeholder="Search"
        value={query}
        onChange={handleSearch}
        prefix={<FontAwesomeIcon icon={faMagnifyingGlass} />}
      />
      <EmpForm />
    </div>
  );
}

export default Search;
