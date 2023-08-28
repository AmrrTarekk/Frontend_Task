import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import useEmp from "../../hooks/useEmp";
import profileImage from "./profile.jpg";
import { Tooltip } from "antd";
import "./EmpCards.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePause,
  faEnvelope,
  faExclamation,
  faPen,
  faPhone,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import Info from "../Info/Info";

const text = <span>prompt text</span>;
const buttonWidth = 70;

function EmpCards() {
  const { filteredEmployee, employees, setEmployees } = useEmp();

  console.log("Fe eh filter", filteredEmployee);
  const handleDelete = (id) => {
    console.log(employees, id);
    setEmployees(() => {
      return employees.filter((emp) => emp.id !== id);
    });
  };
  return (
    <div className="d-flex flex-wrap gap-3">
      {filteredEmployee.map((emp) => (
        <Card className="Path-120" style={{ width: "25rem" }} key={emp.id}>
          <div className="HR---Employees3 d-flex  ">
            <div>
              {emp.selectedImage && (
                <div className=" d-flex flex-column justify-content-center align-items-center  mt-3 Profile-Picture-Pauline-Suy-circle-ScripturaEngage ">
                  <img
                    className="rounded-2 w-75"
                    variant="top"
                    src={URL.createObjectURL(emp.selectedImage)}
                  />
                  <div className="icons d-flex gap-3 mt-1">
                    <span>
                      <FontAwesomeIcon icon={faPen} />
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faCirclePause} />
                    </span>
                    <span onClick={() => handleDelete(emp.id)}>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div class="Line-200"></div>
            <div className="d-flex flex-column w-100">
              <h5 className="mb-1">
                <span class="sara-khaled-ahmed">{emp.name}</span>
              </h5>
              <div className="d-flex flex-column mb-0">
                <span class="HR-Head">{emp.position}</span>
                <span class="business-development">{emp.department}</span>
              </div>
              <div className="d-flex justify-content-between">
                <div class="Rectangle-1520">
                  <span class="present">present</span>
                </div>

                <div className="contacts d-flex flex-row gap-2">
                  <div className="info-icons">
                    <Tooltip placement="bottom" title={emp.email}>
                      <FontAwesomeIcon icon={faEnvelope} />
                    </Tooltip>
                  </div>
                  <div className="info-icons">
                    <Tooltip placement="bottom" title={emp.phone}>
                      <FontAwesomeIcon className="rotate-135" icon={faPhone} />
                    </Tooltip>
                  </div>
                  <div className="info-icons info">
                    <Tooltip placement="bottom" title={<Info />}>
                      <FontAwesomeIcon icon={faExclamation} />
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default EmpCards;

{
  /* <Card.Body className="">
                <Card.Title className="">
                  <h4>{emp.name}</h4>
                </Card.Title>
                <p>
                  <span className="d-flex justify-content-start gap-2">
                    <b>Phone: </b> {emp.phone}
                  </span>
                  <span className="d-flex justify-content-start gap-2 flex-wrap">
                    <b>Email: </b> <span>{emp.email}</span>
                  </span>
                  <span className="d-flex justify-content-start gap-2">
                    <b>Department: </b> {emp.department}
                  </span>
                  <span className="d-flex justify-content-start gap-2">
                    <b>Position: </b> {emp.position}
                  </span>
                  <span className="d-flex justify-content-start gap-2">
                    <b>Joined Date: </b> {emp.year}/{emp.month}/{emp.day}
                  </span>
                </p>
                <Button onClick={() => handleDelete(emp.id)} variant="primary">
                  Delete
                </Button>
              </Card.Body> */
}

// {
//   filteredEmployee.map((emp) => (
//     <Card className="row flex-row" style={{ width: "25rem" }} key={emp.id}>
//       <div className="col-md-5 col-12 m-auto mt-3 ">
//         {emp.selectedImage ? (
//           <div className="m-auto w-md-100 w-50 ">
//             <Card.Img
//               className="rounded-2"
//               variant="top"
//               src={URL.createObjectURL(emp.selectedImage)}
//             />
//           </div>
//         ) : (
//           <Card.Img variant="top" src={profileImage} />
//         )}
//       </div>
//       <div className="col-md-7 col-12 p-0 mt-0">
//         <Card.Body className="d-flex flex-column justify-content-start p-3">
//           <Card.Title className="d-flex justify-content-start pt-2 mb-0 pb-0">
//             <h4>{emp.name}</h4>
//           </Card.Title>
//           <p>
//             <span className="d-flex justify-content-start gap-2">
//               <b>Phone: </b> {emp.phone}
//             </span>
//             <span className="d-flex justify-content-start gap-2 flex-wrap">
//               <b>Email: </b> <span>{emp.email}</span>
//             </span>
//             <span className="d-flex justify-content-start gap-2">
//               <b>Department: </b> {emp.department}
//             </span>
//             <span className="d-flex justify-content-start gap-2">
//               <b>Position: </b> {emp.position}
//             </span>
//             <span className="d-flex justify-content-start gap-2">
//               <b>Joined Date: </b> {emp.year}/{emp.month}/{emp.day}
//             </span>
//           </p>
//           <Button onClick={() => handleDelete(emp.id)} variant="primary">
//             Delete
//           </Button>
//         </Card.Body>
//       </div>
//     </Card>
//   ));
// }
