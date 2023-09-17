import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "antd";
import { useState } from "react";
import EmpForm from "./EmpForm";

function FormModal() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button
        type="primary"
        className="addNewBtn d-flex flex-row gap-1 align-items-center"
        onClick={() => setOpen(true)}
      >
        <FontAwesomeIcon icon={faPlus} />
        Add new
      </Button>
      <EmpForm open={open} setOpen={setOpen} />
    </div>
  );
}

export default FormModal;
