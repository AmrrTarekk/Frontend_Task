import Card from "react-bootstrap/Card";
import useEmp from "../../hooks/useEmp";
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

function EmpCards() {
  const { filteredEmployee, employees, setEmployees } = useEmp();

  const handleDelete = (id) => {
    setEmployees(() => {
      return employees.filter((emp) => emp.id !== id);
    });
  };
  return (
    <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-md-start mb-4 mb-md-5">
      {filteredEmployee.length !== 0 ? (
        filteredEmployee.map((emp) => (
          <Card className="Path-120" style={{ width: "24rem" }} key={emp.id}>
            <div className="HR---Employees3 d-flex  ">
              <div>
                {emp.selectedImage ? (
                  <div className=" d-flex flex-column justify-content-center align-items-center  mt-3 Profile-Picture-Pauline-Suy-circle-ScripturaEngage ">
                    <img
                      alt="cardImage"
                      className=""
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
                ) : (
                  <div className=" d-flex flex-column justify-content-center align-items-center  mt-3 Profile-Picture-Pauline-Suy-circle-ScripturaEngage ">
                    <img
                      alt="cardImage"
                      className=""
                      variant="top"
                      src="./profile.jpg"
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
              <div className="Line-200"></div>
              <div className="card-info d-flex flex-column w-100">
                <h5 className="mb-0 mb-sm-1">
                  <span className="sara-khaled-ahmed ">
                    <Tooltip placement="topLeft" title={emp.name}>
                      {emp.name}
                    </Tooltip>
                  </span>
                </h5>
                <div className="d-flex flex-column mb-0">
                  <span className="HR-Head">{emp.position}</span>
                  <span className="business-development">{emp.department}</span>
                </div>
                <div className="present-icons d-flex justify-content-between">
                  <div className="Rectangle-1520">
                    <span className="present">Present</span>
                  </div>

                  <div className="contacts d-flex flex-row gap-2">
                    <Tooltip placement="bottom" title={emp.email}>
                      <div className="info-icons">
                        <FontAwesomeIcon icon={faEnvelope} />
                      </div>
                    </Tooltip>
                    <Tooltip placement="bottom" title={emp.phone}>
                      <div className="info-icons">
                        <FontAwesomeIcon
                          className="rotate-135"
                          icon={faPhone}
                        />
                      </div>
                    </Tooltip>
                    <Tooltip
                      className="info"
                      placement="bottom"
                      title={
                        <Info
                          office={emp.office}
                          role={emp.role}
                          date={emp.date}
                        />
                      }
                    >
                      <div className="info-icons info">
                        <FontAwesomeIcon icon={faExclamation} />
                      </div>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))
      ) : (
        <div className="m-auto d-flex justify-content-center">
          Nothing Here, yet!
        </div>
      )}
    </div>
  );
}

export default EmpCards;
