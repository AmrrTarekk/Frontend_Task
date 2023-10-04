import React from "react";
import { Button, Input } from "antd";
import "./HeaderBar.css";
import useEmp from "../../hooks/useEmp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";

function HeaderBar({ setOpen }) {
  const { query, setQuery } = useEmp();

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };
  return (
    <div className="d-flex justify-content-between gap-3 mb-4 mb-md-5">
      <Input
        className="rounded-2 searchInput"
        type="text"
        placeholder="Search"
        value={query}
        onChange={handleSearch}
        prefix={<FontAwesomeIcon icon={faMagnifyingGlass} />}
      />
      <Button
        type="primary"
        className="addNewBtn d-flex flex-row gap-1 align-items-center"
        onClick={() => setOpen(true)}
      >
        <FontAwesomeIcon icon={faPlus} />
        Add new
      </Button>
    </div>
  );
}

export default HeaderBar;
