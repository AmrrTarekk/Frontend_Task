import React, { useState } from "react";
import { Button, Modal } from "antd";
import "./search.css";
import EmpForm from "../Form/EmpForm";

function Search() {
  return (
    <div className="d-flex justify-content-between gap-2">
      <input
        type="text"
        className="rounded-2 border-0"
        placeholder="Search Employee"
      />
      <EmpForm />
    </div>
  );
}

export default Search;
