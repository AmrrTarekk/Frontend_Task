import { faPenAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import EmpForm from "../Form/EmpForm";
import useEmp from "../../hooks/useEmp";

function EditForm({ id }) {
  const [open, setOpen] = useState(false);
  const { filteredEmployee } = useEmp();

  const editableEmployee = filteredEmployee.find((emp) => emp.id === id);

  const {
    image,
    name,
    phone,
    date,
    email,
    department,
    office,
    attendanceProfile,
    role,
    position,
    dateFormat,
  } = editableEmployee;
  return (
    <div>
      <FontAwesomeIcon
        onClick={() => setOpen(true)}
        title="Edit"
        icon={faPenAlt}
      />
      <EmpForm
        imageCard={image}
        open={open}
        setOpen={setOpen}
        nameCard={name}
        phoneCard={phone}
        dateCard={date}
        dateFormatCard={dateFormat}
        emailCard={email}
        officeCard={office}
        departmentCard={department}
        roleCard={role}
        attendanceProfileCard={attendanceProfile}
        positionCard={position}
        touched={true}
        valid={true}
        idCard={id}
      />
    </div>
  );
}

export default EditForm;
